import { Router } from 'express';
import { Report, ReportData, ReportSummary, ReportType, AircraftVoteData } from '../types/Report';
import { Aircraft, AircraftWithVotes } from '../types/Aircraft';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const router = Router();
const publishedDir = path.join(__dirname, '../data/published');
const unpublishedDir = path.join(__dirname, '../data/unpublished');
const aircraftDataPath = path.join(__dirname, '../data/aircraft.json');

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

// Helper function to get aircraft data
function getAircraftData(): Aircraft[] {
    const raw = fs.readFileSync(aircraftDataPath, 'utf-8');
    return JSON.parse(raw);
}

// Function to get published reports
function getPublishedReportsData(): ReportData[] {
    try {
        const files = fs.readdirSync(publishedDir);
        return files
            .filter(file => file.endsWith('.json'))
            .map(file => {
                const filePath = path.join(publishedDir, file);
                const raw = fs.readFileSync(filePath, 'utf-8');
                return JSON.parse(raw) as ReportData;
            });
    } catch (error) {
        console.error('Error reading published reports:', error);
        return [];
    }
}

// Function to get unpublished reports
function getUnpublishedReportsData(): ReportData[] {
    try {
        const files = fs.readdirSync(unpublishedDir);
        return files
            .filter(file => file.endsWith('.json'))
            .map(file => {
                const filePath = path.join(unpublishedDir, file);
                const raw = fs.readFileSync(filePath, 'utf-8');
                return JSON.parse(raw) as ReportData;
            });
    } catch (error) {
        console.error('Error reading unpublished reports:', error);
        return [];
    }
}

// Helper function to combine aircraft data with vote data
function mergeAircraftWithVotes(reportData: ReportData): Report {
    const aircraftData = getAircraftData();

    // Combine aircraft base data with votes
    const aircraftWithVotes: AircraftWithVotes[] = reportData.aircraftVotes.map(voteData => {
        const baseAircraft = aircraftData.find(a => a.id === voteData.aircraftId);

        if (!baseAircraft) {
            console.warn(`Aircraft with ID ${voteData.aircraftId} not found in base data`);
            return null;
        }

        return {
            ...baseAircraft,
            votes: voteData.votes,
            daysOnList: voteData.daysOnList,
            weeksInChart: voteData.weeksInChart
        };
    }).filter((a): a is AircraftWithVotes => a !== null);

    // Sort by votes
    const sortedAircraft = aircraftWithVotes.sort((a, b) => {
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

    // Add rank
    sortedAircraft.forEach((aircraft, index) => {
        aircraft.rank = index + 1;
    });

    // Build the full report
    const report: Report = {
        ...reportData,
        aircraft: sortedAircraft
    };

    return report;
}

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
            aircraftCount: report.aircraftVotes.length
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
        const latestMonthlyData = reports
            .filter(r => r.type === ReportType.MONTHLY)
            .sort((a, b) => {
                if (a.year !== b.year) return b.year - a.year;
                return (b.month || 0) - (a.month || 0);
            })[0];

        const latestYearlyData = reports
            .filter(r => r.type === ReportType.YEARLY)
            .sort((a, b) => b.year - a.year)[0];

        // Merge with aircraft data to get full reports
        const latestMonthly = latestMonthlyData ? mergeAircraftWithVotes(latestMonthlyData) : undefined;
        const latestYearly = latestYearlyData ? mergeAircraftWithVotes(latestYearlyData) : undefined;

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
        const reportData = reports.find(r => r.id === req.params.id);

        if (!reportData) {
            return res.status(404).json({ message: 'Report not found' });
        }

        // Merge with aircraft data to get full report
        const fullReport = mergeAircraftWithVotes(reportData);

        const { msfs2020, msfs2024 } = req.query;
        let filteredAircraft = [...fullReport.aircraft];

        // Filter by MSFS compatibility if needed
        if (msfs2020) {
            filteredAircraft = filteredAircraft.filter(a => {
                if (msfs2020 === 'Native') {
                    return a.msfs2020Compatibility === 'Native';
                } else if (msfs2020 === 'Compatible') {
                    return a.msfs2020Compatibility === 'Native' || a.msfs2020Compatibility === 'Compatible';
                }
                return true;
            });
        }

        if (msfs2024) {
            filteredAircraft = filteredAircraft.filter(a => {
                if (msfs2024 === 'Native') {
                    return a.msfs2024Compatibility === 'Native';
                } else if (msfs2024 === 'Compatible') {
                    return a.msfs2024Compatibility === 'Native' || a.msfs2024Compatibility === 'Compatible';
                }
                return true;
            });
        }

        // Return the report with filtered aircraft
        res.json({
            ...fullReport,
            aircraft: filteredAircraft
        });
    } catch (error) {
        console.error('Error fetching report:', error);
        res.status(500).json({ message: 'Failed to fetch report' });
    }
});

// Admin routes
// Get all reports (published and unpublished) - admin only
router.get('/admin/all', authenticate, (req, res) => {
    try {
        const published = getPublishedReportsData();
        const unpublished = getUnpublishedReportsData();

        const publishedSummaries = published.map(report => ({
            ...report,
            aircraftCount: report.aircraftVotes.length,
            status: 'published'
        }));

        const unpublishedSummaries = unpublished.map(report => ({
            ...report,
            aircraftCount: report.aircraftVotes.length,
            status: 'unpublished'
        }));

        res.json([...publishedSummaries, ...unpublishedSummaries]);
    } catch (error) {
        console.error('Error fetching all reports:', error);
        res.status(500).json({ message: 'Failed to fetch reports' });
    }
});

// Get a specific unpublished report by ID - admin only
router.get('/admin/unpublished/:id', authenticate, (req, res) => {
    try {
        const reports = getUnpublishedReportsData();
        const reportData = reports.find(r => r.id === req.params.id);

        if (!reportData) {
            return res.status(404).json({ message: 'Report not found' });
        }

        // Merge with aircraft data to get full report
        const fullReport = mergeAircraftWithVotes(reportData);
        res.json(fullReport);
    } catch (error) {
        console.error('Error fetching unpublished report:', error);
        res.status(500).json({ message: 'Failed to fetch report' });
    }
});

// Create a new report - admin only
router.post('/', authenticate, (req, res) => {
    try {
        const { title, description, type, year, month, aircraftIds } = req.body;

        // Validate required fields
        if (!title || !type || !year || !aircraftIds) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        if (type === ReportType.MONTHLY && !month) {
            return res.status(400).json({ message: 'Month is required for monthly reports' });
        }

        // Create report ID
        const reportId = type === ReportType.MONTHLY
            ? `${year}-${month.toString().padStart(2, '0')}`
            : `${year}`;

        // Check if report with this ID already exists
        const unpublishedReports = getUnpublishedReportsData();
        const publishedReports = getPublishedReportsData();

        if (unpublishedReports.some(r => r.id === reportId) || publishedReports.some(r => r.id === reportId)) {
            return res.status(409).json({ message: 'Report with this ID already exists' });
        }

        // Get base aircraft data
        const allAircraft = getAircraftData();
        const selectedAircraft = allAircraft.filter(a => aircraftIds.includes(a.id));

        if (selectedAircraft.length === 0) {
            return res.status(400).json({ message: 'No valid aircraft selected' });
        }

        const now = new Date().toISOString();

        // Create vote data for each aircraft
        const aircraftVotes: AircraftVoteData[] = selectedAircraft.map(aircraft => ({
            aircraftId: aircraft.id,
            votes: 0, // Default to 0 votes for new report
            daysOnList: 0,
            weeksInChart: 0
        }));

        // Create the new report
        const newReport: ReportData = {
            id: reportId,
            type: type as ReportType,
            year: Number(year),
            month: type === ReportType.MONTHLY ? Number(month) : undefined,
            title,
            description,
            createdAt: now,
            updatedAt: now,
            aircraftVotes
        };

        // Save the report to the unpublished directory
        const filePath = path.join(unpublishedDir, `${reportId}.json`);
        fs.writeFileSync(filePath, JSON.stringify(newReport, null, 2));

        // Return the full report with aircraft data
        const fullReport = mergeAircraftWithVotes(newReport);
        res.status(201).json(fullReport);
    } catch (error) {
        console.error('Error creating report:', error);
        res.status(500).json({ message: 'Failed to create report' });
    }
});

// Update a report - admin only
router.put('/:id', authenticate, (req, res) => {
    try {
        const { title, description, aircraftVotes } = req.body;
        const reportId = req.params.id;

        // Try to find in unpublished, then published
        let report;
        let isPublished = false;
        let reportFilePath;

        const unpublishedReports = getUnpublishedReportsData();
        report = unpublishedReports.find(r => r.id === reportId);

        if (report) {
            reportFilePath = path.join(unpublishedDir, `${reportId}.json`);
        } else {
            const publishedReports = getPublishedReportsData();
            report = publishedReports.find(r => r.id === reportId);

            if (report) {
                reportFilePath = path.join(publishedDir, `${reportId}.json`);
                isPublished = true;
            }
        }

        if (!report || !reportFilePath) {
            return res.status(404).json({ message: 'Report not found' });
        }

        // Update the report
        const updatedReport: ReportData = {
            ...report,
            title: title || report.title,
            description: description !== undefined ? description : report.description,
            updatedAt: new Date().toISOString()
        };

        // Update aircraft votes if provided
        if (aircraftVotes) {
            updatedReport.aircraftVotes = aircraftVotes;
        }

        // Save the updated report
        fs.writeFileSync(reportFilePath, JSON.stringify(updatedReport, null, 2));

        // Return the full report with aircraft data
        const fullReport = mergeAircraftWithVotes(updatedReport);
        res.json(fullReport);
    } catch (error) {
        console.error('Error updating report:', error);
        res.status(500).json({ message: 'Failed to update report' });
    }
});

// Publish a report - admin only
router.post('/admin/publish/:id', authenticate, (req, res) => {
    try {
        const reportId = req.params.id;

        // Check if report exists in unpublished
        const unpublishedReports = getUnpublishedReportsData();
        const report = unpublishedReports.find(r => r.id === reportId);

        if (!report) {
            return res.status(404).json({ message: 'Unpublished report not found' });
        }

        const sourceFile = path.join(unpublishedDir, `${reportId}.json`);
        const destFile = path.join(publishedDir, `${reportId}.json`);

        // Check if report already exists in published
        if (fs.existsSync(destFile)) {
            return res.status(409).json({ message: 'Report is already published' });
        }

        // Update the publish date
        const updatedReport = {
            ...report,
            updatedAt: new Date().toISOString()
        };

        // Write to published and delete from unpublished
        fs.writeFileSync(destFile, JSON.stringify(updatedReport, null, 2));
        fs.unlinkSync(sourceFile);

        res.json({ message: 'Report published successfully' });
    } catch (error) {
        console.error('Error publishing report:', error);
        res.status(500).json({ message: 'Failed to publish report' });
    }
});

// Delete a report - admin only
router.delete('/:id', authenticate, (req, res) => {
    try {
        const reportId = req.params.id;
        let found = false;

        // Check if report exists in unpublished first
        const unpublishedFile = path.join(unpublishedDir, `${reportId}.json`);
        if (fs.existsSync(unpublishedFile)) {
            fs.unlinkSync(unpublishedFile);
            found = true;
        }

        // Then check published
        const publishedFile = path.join(publishedDir, `${reportId}.json`);
        if (fs.existsSync(publishedFile)) {
            fs.unlinkSync(publishedFile);
            found = true;
        }

        if (!found) {
            return res.status(404).json({ message: 'Report not found' });
        }

        res.json({ message: 'Report deleted successfully' });
    } catch (error) {
        console.error('Error deleting report:', error);
        res.status(500).json({ message: 'Failed to delete report' });
    }
});

export default router;
