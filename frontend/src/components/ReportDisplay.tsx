import { useState, useEffect } from 'react';
import { Box, Typography, Paper, CircularProgress } from '@mui/material';
import { Report } from '../types/Report';
import AircraftTable from './AircraftTable';
import { ReportService } from '../services/ReportService';

interface ReportDisplayProps {
    reportId?: string;
}

export const ReportDisplay = ({ reportId }: ReportDisplayProps) => {
    const [report, setReport] = useState<Report | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchReport = async () => {
            if (!reportId) {
                setReport(null);
                return;
            }

            setLoading(true);
            setError(null);

            try {
                const reportData = await ReportService.getById(reportId);
                setReport(reportData);
            } catch (err) {
                console.error('Error fetching report:', err);
                setError('Failed to load report');
                setReport(null);
            } finally {
                setLoading(false);
            }
        };

        fetchReport();
    }, [reportId]);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Paper sx={{ p: 3, mb: 3, bgcolor: '#fff4f4' }}>
                <Typography variant="h6" color="error">Error</Typography>
                <Typography>{error}</Typography>
            </Paper>
        );
    }

    if (!report) {
        return (
            <Paper sx={{ p: 3, mb: 3 }}>
                <Typography>Select a report to view</Typography>
            </Paper>
        );
    }

    return (
        <Box>
            <Paper sx={{ p: 3, mb: 3 }}>
                <Typography variant="h4" gutterBottom>{report.title}</Typography>
                {report.description && (
                    <Typography variant="body1" sx={{ mb: 2 }}>{report.description}</Typography>
                )}
                <Typography variant="body2" color="text.secondary">
                    Last updated: {new Date(report.updatedAt).toLocaleDateString()}
                </Typography>
            </Paper>

            {/* Use the existing AircraftTable component to display aircraft data */}
            <AircraftTable data={report.aircraft} />
        </Box>
    );
};
