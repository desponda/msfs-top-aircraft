// filepath: /workspaces/msfs-top-aircraft/frontend/src/components/ReportDisplay.tsx
import { useState, useEffect } from 'react';
import { Box, Typography, Paper, CircularProgress } from '@mui/material';
import { Report } from '../types/Report';
import AircraftTable from './AircraftTable';
import { ReportService } from '../services/ReportService';

interface ReportDisplayProps {
    reportId?: string;
    hideReportHeader?: boolean;
}

export const ReportDisplay = ({ reportId, hideReportHeader = false }: ReportDisplayProps) => {
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
            {!hideReportHeader && (
                <Box sx={{ mb: 4, px: { xs: 0, md: 2 }, py: 2 }}>
                    <Typography variant="h5" sx={{ color: '#a259f7', fontWeight: 700, mb: 1 }}>{report.title}</Typography>
                    {report.description && (
                        <Typography variant="body2" sx={{ mb: 1, color: '#b0b8c1' }}>{report.description}</Typography>
                    )}
                    <Typography variant="caption" color="text.secondary" sx={{ mb: 0 }}>
                        Last updated: {new Date(report.updatedAt).toLocaleDateString()}
                    </Typography>
                </Box>
            )}
            {/* Use the existing AircraftTable component to display aircraft data */}
            <AircraftTable data={report.aircraft} />
        </Box>
    );
};

export default ReportDisplay;
