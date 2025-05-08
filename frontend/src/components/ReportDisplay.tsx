// filepath: /workspaces/msfs-top-aircraft/frontend/src/components/ReportDisplay.tsx
import { useState, useEffect } from 'react';
import { Box, Typography, Paper, CircularProgress, FormControl, InputLabel, MenuItem, Select, Grid } from '@mui/material';
import { Report } from '../types/Report';
import { CompatibilityStatus } from '../types/Aircraft';
import AircraftTable from './AircraftTable';
import { ReportService } from '../services/ReportService';

interface ReportDisplayProps {
    reportId?: string;
}

export const ReportDisplay = ({ reportId }: ReportDisplayProps) => {
    const [report, setReport] = useState<Report | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [msfs2020Filter, setMsfs2020Filter] = useState<string>('');
    const [msfs2024Filter, setMsfs2024Filter] = useState<string>('');

    useEffect(() => {
        const fetchReport = async () => {
            if (!reportId) {
                setReport(null);
                return;
            }

            setLoading(true);
            setError(null);

            try {
                const reportData = await ReportService.getById(
                    reportId,
                    msfs2020Filter || undefined,
                    msfs2024Filter || undefined
                );
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
    }, [reportId, msfs2020Filter, msfs2024Filter]);

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

                <Box sx={{ mt: 3, mb: 2 }}>
                    <Typography variant="h6" gutterBottom>Compatibility Filters</Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={3}>
                            <FormControl fullWidth size="small">
                                <InputLabel id="msfs2020-filter-label">MSFS 2020</InputLabel>
                                <Select
                                    labelId="msfs2020-filter-label"
                                    id="msfs2020-filter"
                                    value={msfs2020Filter}
                                    label="MSFS 2020"
                                    onChange={(e) => setMsfs2020Filter(e.target.value)}
                                >
                                    <MenuItem value="">All</MenuItem>
                                    <MenuItem value={CompatibilityStatus.NATIVE}>Native</MenuItem>
                                    <MenuItem value={CompatibilityStatus.COMPATIBLE}>Compatible</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <FormControl fullWidth size="small">
                                <InputLabel id="msfs2024-filter-label">MSFS 2024</InputLabel>
                                <Select
                                    labelId="msfs2024-filter-label"
                                    id="msfs2024-filter"
                                    value={msfs2024Filter}
                                    label="MSFS 2024"
                                    onChange={(e) => setMsfs2024Filter(e.target.value)}
                                >
                                    <MenuItem value="">All</MenuItem>
                                    <MenuItem value={CompatibilityStatus.NATIVE}>Native</MenuItem>
                                    <MenuItem value={CompatibilityStatus.COMPATIBLE}>Compatible</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>

            {/* Use the existing AircraftTable component to display aircraft data */}
            <AircraftTable data={report.aircraft} />
        </Box>
    );
};

export default ReportDisplay;
