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

// Log every request to this router
router.use((req, res, next) => {
    console.log(`[API] ${req.method} ${req.originalUrl}`);
    next();
});

// Ensure directories exist
if (!fs.existsSync(publishedDir)) {
    fs.mkdirSync(publishedDir, { recursive: true });
}
if (!fs.existsSync(unpublishedDir)) {
    fs.mkdirSync(unpublishedDir, { recursive: true });
}

// Middleware for session-based authentication - only for admin routes
const authenticate = (req: any, res: any, next: any) => {
    if (req.session && req.session.user && req.session.user.role === 'admin') {
        return next();
    }
    res.status(401).json({ message: 'Authentication required' });
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

// ===================== PUBLIC ROUTES =====================
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

// ===================== ADMIN ROUTES =====================
// All admin routes require authentication

// Get all unpublished reports (summary) - admin only
router.get('/admin/unpublished', authenticate, (req, res) => {
    try {
        const unpublished = getUnpublishedReportsData();
        const summaries = unpublished.map(report => ({
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
        console.error('Error fetching unpublished reports:', error);
        res.status(500).json({ message: 'Failed to fetch unpublished reports' });
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

// Create a new unpublished report (draft) - admin only
router.post('/admin/unpublished', authenticate, (req, res) => {
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

// Update an unpublished report - admin only
router.put('/admin/unpublished/:id', authenticate, (req, res) => {
    try {
        const { title, description, aircraftVotes } = req.body;
        const reportId = req.params.id;

        // Only allow editing unpublished reports
        const unpublishedReports = getUnpublishedReportsData();
        const report = unpublishedReports.find(r => r.id === reportId);
        if (!report) {
            return res.status(404).json({ message: 'Unpublished report not found' });
        }
        const reportFilePath = path.join(unpublishedDir, `${reportId}.json`);

        // Update the report
        const updatedReport: ReportData = {
            ...report,
            title: title || report.title,
            description: description !== undefined ? description : report.description,
            updatedAt: new Date().toISOString(),
            aircraftVotes: aircraftVotes || report.aircraftVotes
        };

        // Save the updated report
        fs.writeFileSync(reportFilePath, JSON.stringify(updatedReport, null, 2));

        // Return the full report with aircraft data
        const fullReport = mergeAircraftWithVotes(updatedReport);
        res.json(fullReport);
    } catch (error) {
        console.error('Error updating unpublished report:', error);
        res.status(500).json({ message: 'Failed to update report' });
    }
});

// Delete an unpublished report - admin only
router.delete('/admin/unpublished/:id', authenticate, (req, res) => {
    try {
        const reportId = req.params.id;
        const unpublishedFile = path.join(unpublishedDir, `${reportId}.json`);
        const publishedFile = path.join(publishedDir, `${reportId}.json`);
        // Disallow deletion if a published report exists
        if (fs.existsSync(publishedFile)) {
            return res.status(409).json({ message: 'Cannot delete draft: published report exists. Unpublish first.' });
        }
        if (fs.existsSync(unpublishedFile)) {
            fs.unlinkSync(unpublishedFile);
            return res.json({ message: 'Unpublished report deleted successfully' });
        }
        return res.status(404).json({ message: 'Unpublished report not found' });
    } catch (error) {
        console.error('Error deleting unpublished report:', error);
        res.status(500).json({ message: 'Failed to delete unpublished report' });
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
            // Overwrite the published report with the latest draft
            const updatedReport = {
                ...report,
                updatedAt: new Date().toISOString()
            };
            fs.writeFileSync(destFile, JSON.stringify(updatedReport, null, 2));
            return res.json({ message: 'Report re-published successfully' });
        } else {
            // Publish for the first time
            const updatedReport = {
                ...report,
                updatedAt: new Date().toISOString()
            };
            fs.writeFileSync(destFile, JSON.stringify(updatedReport, null, 2));
            return res.json({ message: 'Report published successfully' });
        }
        // Note: Do NOT remove the draft after publishing
    } catch (error) {
        console.error('Error publishing report:', error);
        res.status(500).json({ message: 'Failed to publish report' });
    }
});

// Unpublish (delete) a published report - admin only
router.delete('/admin/published/:id', authenticate, (req, res) => {
    try {
        const reportId = req.params.id;
        const publishedFile = path.join(publishedDir, `${reportId}.json`);
        if (fs.existsSync(publishedFile)) {
            fs.unlinkSync(publishedFile);
            return res.json({ message: 'Published report deleted (unpublished) successfully' });
        }
        return res.status(404).json({ message: 'Published report not found' });
    } catch (error) {
        console.error('Error unpublishing report:', error);
        res.status(500).json({ message: 'Failed to unpublish report' });
    }
});

export default router;
