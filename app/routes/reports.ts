import { Router } from 'express';
import { Report, ReportSummary, ReportType } from '../types/Report';
import { Aircraft } from '../types/Aircraft';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const router = Router();
const dataPath = path.join(__dirname, '../data/reports.json');

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

// Get all reports (just metadata, not full aircraft data)
router.get('/', (req, res) => {
    try {
        const reports = getReportsData();
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
            ...report,
            aircraftCount: report.aircraft.length,
            aircraft: undefined
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
        const reports = getReportsData();
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

// Get a specific report by ID
router.get('/:id', (req, res) => {
    try {
        const reports = getReportsData();
        const report = reports.find(r => r.id === req.params.id);

        if (!report) {
            return res.status(404).json({ message: 'Report not found' });
        }

        res.json(report);
    } catch (error) {
        console.error(`Error fetching report ${req.params.id}:`, error);
        res.status(500).json({ message: 'Failed to fetch report' });
    }
});

// Admin Routes - requires authentication
// Create a new report
router.post('/', authenticate, (req, res) => {
    try {
        const reports = getReportsData();
        const newReport = req.body as Report;

        // Validate report data
        if (!newReport.type || !newReport.year || (newReport.type === ReportType.MONTHLY && !newReport.month)) {
            return res.status(400).json({ message: 'Invalid report data' });
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

        // Check if report with same ID already exists
        const existingIndex = reports.findIndex(r => r.id === newReport.id);
        if (existingIndex >= 0) {
            reports[existingIndex] = newReport;
        } else {
            reports.push(newReport);
        }

        saveReportsData(reports);
        res.status(201).json(newReport);
    } catch (error) {
        console.error('Error creating report:', error);
        res.status(500).json({ message: 'Failed to create report' });
    }
});

// Update an existing report
router.put('/:id', authenticate, (req, res) => {
    try {
        const reports = getReportsData();
        const reportIndex = reports.findIndex(r => r.id === req.params.id);

        if (reportIndex === -1) {
            return res.status(404).json({ message: 'Report not found' });
        }

        const updatedReport = {
            ...reports[reportIndex],
            ...req.body,
            updatedAt: new Date().toISOString()
        };

        reports[reportIndex] = updatedReport;
        saveReportsData(reports);

        res.json(updatedReport);
    } catch (error) {
        console.error(`Error updating report ${req.params.id}:`, error);
        res.status(500).json({ message: 'Failed to update report' });
    }
});

// Delete a report
router.delete('/:id', authenticate, (req, res) => {
    try {
        const reports = getReportsData();
        const updatedReports = reports.filter(r => r.id !== req.params.id);

        if (updatedReports.length === reports.length) {
            return res.status(404).json({ message: 'Report not found' });
        }

        saveReportsData(updatedReports);
        res.json({ message: 'Report deleted successfully' });
    } catch (error) {
        console.error(`Error deleting report ${req.params.id}:`, error);
        res.status(500).json({ message: 'Failed to delete report' });
    }
});

// Helper functions
function getReportsData(): Report[] {
    try {
        const raw = fs.readFileSync(dataPath, 'utf-8');
        return JSON.parse(raw);
    } catch (error) {
        console.error('Error reading reports data:', error);
        return [];
    }
}

function saveReportsData(reports: Report[]): void {
    fs.writeFileSync(dataPath, JSON.stringify(reports, null, 4));
}

function getMonthName(month: number): string {
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return months[month - 1] || '';
}

export default router;
