import { Router } from 'express';
import { Report, ReportSummary, ReportType } from '../types/Report';
import { Aircraft } from '../types/Aircraft';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const router = Router();
const publishedDir = path.join(__dirname, '../data/published');
const unpublishedDir = path.join(__dirname, '../data/unpublished');

// Ensure directories exist
if (!fs.existsSync(publishedDir)) {
    fs.mkdirSync(publishedDir, { recursive: true });
}
if (!fs.existsSync(unpublishedDir)) {
    fs.mkdirSync(unpublishedDir, { recursive: true });
}

// Middleware for basic authentication - only for admin routes
const authenticate = (req: any, res: any, next: any) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Basic ')) {
        return res.status(401).json({ message: 'Authentication required' });
    }

    // In a real app, we would validate against a real user database
    // For now, we'll use a simple hardcoded admin:admin123 credential
    const base64Credentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('utf-8');
    const [username, password] = credentials.split(':');

    if (username === 'admin' && password === 'admin123') {
        req.user = { username, role: 'admin' };
        next();
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
};

// Get all published reports (just metadata, not full aircraft data)
router.get('/', (req, res) => {
    try {
        const reports = getPublishedReportsData();
        const { year, type, month } = req.query;

        let filteredReports = reports;

        if (year) {
            filteredReports = filteredReports.filter(r => r.year === Number(year));
        }

        if (type) {
            filteredReports = filteredReports.filter(r => r.type === type);
        }

        if (month) {
            filteredReports = filteredReports.filter(r => r.month === Number(month));
        }

        // Convert to report summaries (without full aircraft data)
        const summaries: ReportSummary[] = filteredReports.map(report => ({
            id: report.id,
            type: report.type,
            year: report.year,
            month: report.month,
            title: report.title,
            description: report.description,
            createdAt: report.createdAt,
            updatedAt: report.updatedAt,
            aircraftCount: report.aircraft.length
        }));

        res.json(summaries);
    } catch (error) {
        console.error('Error fetching reports:', error);
        res.status(500).json({ message: 'Failed to fetch reports' });
    }
});

// Get the latest report (monthly and yearly)
router.get('/latest', (req, res) => {
    try {
        const reports = getPublishedReportsData();
        const latestMonthly = reports
            .filter(r => r.type === ReportType.MONTHLY)
            .sort((a, b) => {
                if (a.year !== b.year) return b.year - a.year;
                return (b.month || 0) - (a.month || 0);
            })[0];

        const latestYearly = reports
            .filter(r => r.type === ReportType.YEARLY)
            .sort((a, b) => b.year - a.year)[0];

        res.json({
            monthly: latestMonthly,
            yearly: latestYearly
        });
    } catch (error) {
        console.error('Error fetching latest reports:', error);
        res.status(500).json({ message: 'Failed to fetch latest reports' });
    }
});

// Get a specific published report by ID
router.get('/:id', (req, res) => {
    try {
        const reports = getPublishedReportsData();
        const report = reports.find(r => r.id === req.params.id);

        if (!report) {
            return res.status(404).json({ message: 'Report not found' });
        }        // Sort aircraft by votes (descending) and then by dateAdded (descending for ties)
        const sortedAircraft = [...report.aircraft].sort((a, b) => {
            // First sort by votes (descending)
            if (a.votes !== b.votes) {
                return b.votes - a.votes;
            }
            
            // For tied votes, sort by date added (descending)
            // Later date (newer aircraft) comes first
            if (a.dateAdded && b.dateAdded) {
                return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
            } else if (b.dateAdded) {
                return -1; // b has a date but a doesn't, b comes first
            } else if (a.dateAdded) {
                return 1; // a has a date but b doesn't, a comes first
            }

            // Both dates are null/undefined, preserve original order
            return 0;
        });

        // Add rank property to each aircraft
        sortedAircraft.forEach((aircraft, index) => {
            aircraft.rank = index + 1;
        });

        // Return the modified report with sorted and ranked aircraft
        const rankedReport = {
            ...report,
            aircraft: sortedAircraft
        };

        res.json(rankedReport);
    } catch (error) {
        console.error(`Error fetching report ${req.params.id}:`, error);
        res.status(500).json({ message: 'Failed to fetch report' });
    }
});

// Admin routes

// Get all unpublished reports (for admin only)
router.get('/admin/unpublished', authenticate, (req, res) => {
    try {
        const reports = getUnpublishedReportsData();
        const summaries = reports.map(report => ({
            id: report.id,
            type: report.type,
            year: report.year,
            month: report.month,
            title: report.title,
            description: report.description,
            createdAt: report.createdAt,
            updatedAt: report.updatedAt,
            aircraftCount: report.aircraft.length
        }));
        res.json(summaries);
    } catch (error) {
        console.error('Error fetching unpublished reports:', error);
        res.status(500).json({ message: 'Failed to fetch unpublished reports' });
    }
});

// Create a new report (admin only)
router.post('/', authenticate, (req, res) => {
    try {
        const newReport: Report = req.body;

        if (!newReport.aircraft || !Array.isArray(newReport.aircraft)) {
            return res.status(400).json({ message: 'Aircraft data is required' });
        }

        // Generate ID if not provided
        if (!newReport.id) {
            newReport.id = newReport.type === ReportType.MONTHLY
                ? `${newReport.year}-${newReport.month?.toString().padStart(2, '0')}`
                : `${newReport.year}`;
        }

        // Generate title if not provided
        if (!newReport.title) {
            newReport.title = newReport.type === ReportType.MONTHLY
                ? `Top Aircraft - ${getMonthName(newReport.month || 0)} ${newReport.year}`
                : `Top Aircraft - ${newReport.year}`;
        }

        // Set timestamps
        const now = new Date().toISOString();
        newReport.createdAt = now;
        newReport.updatedAt = now;

        // Save to unpublished directory
        const filename = `${newReport.id}.json`;
        const filepath = path.join(unpublishedDir, filename);
        fs.writeFileSync(filepath, JSON.stringify(newReport, null, 4));

        res.status(201).json(newReport);
    } catch (error) {
        console.error('Error creating report:', error);
        res.status(500).json({ message: 'Failed to create report' });
    }
});

// Update an unpublished report (admin only)
router.put('/:id', authenticate, (req, res) => {
    try {
        const reportId = req.params.id;
        const updatedReport: Report = req.body;

        // Ensure report ID matches
        if (reportId !== updatedReport.id) {
            return res.status(400).json({ message: 'Report ID mismatch' });
        }

        // Set updated timestamp
        updatedReport.updatedAt = new Date().toISOString();

        // Save to unpublished directory
        const filename = `${updatedReport.id}.json`;
        const filepath = path.join(unpublishedDir, filename);
        fs.writeFileSync(filepath, JSON.stringify(updatedReport, null, 4));

        res.json(updatedReport);
    } catch (error) {
        console.error(`Error updating report ${req.params.id}:`, error);
        res.status(500).json({ message: 'Failed to update report' });
    }
});

// Delete an unpublished report (admin only)
router.delete('/:id', authenticate, (req, res) => {
    try {
        const reportId = req.params.id;
        const filepath = path.join(unpublishedDir, `${reportId}.json`);

        if (!fs.existsSync(filepath)) {
            return res.status(404).json({ message: 'Report not found' });
        }

        fs.unlinkSync(filepath);
        res.json({ message: 'Report deleted successfully' });
    } catch (error) {
        console.error(`Error deleting report ${req.params.id}:`, error);
        res.status(500).json({ message: 'Failed to delete report' });
    }
});

// Publish a report (move from unpublished to published)
router.post('/:id/publish', authenticate, (req, res) => {
    try {
        const reportId = req.params.id;
        const unpublishedPath = path.join(unpublishedDir, `${reportId}.json`);
        const publishedPath = path.join(publishedDir, `${reportId}.json`);

        if (!fs.existsSync(unpublishedPath)) {
            return res.status(404).json({ message: 'Unpublished report not found' });
        }

        // Read the unpublished report
        const reportData = fs.readFileSync(unpublishedPath, 'utf-8');
        const report = JSON.parse(reportData);

        // Update the published timestamp
        report.updatedAt = new Date().toISOString();

        // Write to published directory
        fs.writeFileSync(publishedPath, JSON.stringify(report, null, 4));

        res.json({ message: 'Report published successfully', report });
    } catch (error) {
        console.error(`Error publishing report ${req.params.id}:`, error);
        res.status(500).json({ message: 'Failed to publish report' });
    }
});

// Helper functions

// Read all report files from published directory
function getPublishedReportsData(): Report[] {
    try {
        const reports: Report[] = [];

        if (!fs.existsSync(publishedDir)) {
            return reports;
        }

        const files = fs.readdirSync(publishedDir);

        files.forEach(file => {
            if (file.endsWith('.json')) {
                try {
                    const reportPath = path.join(publishedDir, file);
                    const reportData = fs.readFileSync(reportPath, 'utf-8');
                    const report = JSON.parse(reportData);
                    reports.push(report);
                } catch (err) {
                    console.error(`Error reading report file ${file}:`, err);
                }
            }
        });

        return reports;
    } catch (error) {
        console.error('Error reading reports data:', error);
        return [];
    }
}

// Read all report files from unpublished directory
function getUnpublishedReportsData(): Report[] {
    try {
        const reports: Report[] = [];

        if (!fs.existsSync(unpublishedDir)) {
            return reports;
        }

        const files = fs.readdirSync(unpublishedDir);

        files.forEach(file => {
            if (file.endsWith('.json')) {
                try {
                    const reportPath = path.join(unpublishedDir, file);
                    const reportData = fs.readFileSync(reportPath, 'utf-8');
                    const report = JSON.parse(reportData);
                    reports.push(report);
                } catch (err) {
                    console.error(`Error reading report file ${file}:`, err);
                }
            }
        });

        return reports;
    } catch (error) {
        console.error('Error reading reports data:', error);
        return [];
    }
}

function getMonthName(month: number): string {
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return months[month - 1] || '';
}

export default router;
