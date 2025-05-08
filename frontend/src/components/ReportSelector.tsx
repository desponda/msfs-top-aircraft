import { useState, useEffect } from 'react';
import {
    Box,
    Tabs,
    Tab,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Typography,
    Grid,
    Paper
} from '@mui/material';
import { ReportService } from '../services/ReportService';
import { ReportSummary, ReportType } from '../types/Report';

interface ReportSelectorProps {
    onReportSelected: (reportId: string) => void;
    reportId?: string;
}

export const ReportSelector = ({ onReportSelected, reportId }: ReportSelectorProps) => {
    const [tab, setTab] = useState(0); // 0 = Latest, 1 = Historical
    const [yearlyReports, setYearlyReports] = useState<ReportSummary[]>([]);
    const [monthlyReports, setMonthlyReports] = useState<ReportSummary[]>([]);
    const [selectedYear, setSelectedYear] = useState<number | ''>('');
    const [selectedMonth, setSelectedMonth] = useState<number | ''>('');
    const [availableYears, setAvailableYears] = useState<number[]>([]);
    const [availableMonths, setAvailableMonths] = useState<number[]>([]);
    const [latestMonthlyId, setLatestMonthlyId] = useState<string>('');
    const [latestYearlyId, setLatestYearlyId] = useState<string>('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Get latest reports
                const latestReports = await ReportService.getLatest();
                setLatestMonthlyId(latestReports.monthly?.id || '');
                setLatestYearlyId(latestReports.yearly?.id || '');

                // Fetch all report summaries
                const allReports = await ReportService.getAll();

                // Split by type
                const yearly = allReports.filter(r => r.type === ReportType.YEARLY);
                const monthly = allReports.filter(r => r.type === ReportType.MONTHLY);

                setYearlyReports(yearly);
                setMonthlyReports(monthly);

                // Extract unique years from all reports
                const years = [...new Set([...yearly, ...monthly].map(r => r.year))].sort((a, b) => b - a);
                setAvailableYears(years);

                // If we have years, select the first one
                if (years.length > 0) {
                    setSelectedYear(years[0]);
                }

                // Select latest yearly report by default
                if (latestReports.yearly) {
                    onReportSelected(latestReports.yearly.id);
                } else if (latestReports.monthly) {
                    onReportSelected(latestReports.monthly.id);
                }

                setLoading(false);
            } catch (error) {
                console.error('Error fetching reports:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // When year changes, update available months
    useEffect(() => {
        if (selectedYear) {
            const monthsForYear = monthlyReports
                .filter(r => r.year === selectedYear)
                .map(r => r.month || 0)
                .filter(month => month > 0)
                .sort((a, b) => b - a); // Most recent month first

            setAvailableMonths(monthsForYear);

            if (monthsForYear.length > 0) {
                setSelectedMonth(monthsForYear[0]);
            } else {
                setSelectedMonth('');
            }
        } else {
            setAvailableMonths([]);
            setSelectedMonth('');
        }
    }, [selectedYear, monthlyReports]);

    // When month changes in historical view, find the right report ID
    useEffect(() => {
        if (tab === 1 && selectedYear && selectedMonth) {
            const report = monthlyReports.find(r =>
                r.year === selectedYear && r.month === selectedMonth);

            if (report) {
                onReportSelected(report.id);
            }
        } else if (tab === 1 && selectedYear) {
            const report = yearlyReports.find(r => r.year === selectedYear);
            if (report) {
                onReportSelected(report.id);
            }
        }
    }, [tab, selectedYear, selectedMonth]);

    const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
        setTab(newValue);

        // When switching tabs, select appropriate report
        if (newValue === 0) {
            // Latest tab
            onReportSelected(latestMonthlyId || latestYearlyId);
        } else {
            // Historical tab - will be handled by the useEffect above
        }
    };

    const handleYearChange = (event: any) => {
        setSelectedYear(event.target.value);
    };

    const handleMonthChange = (event: any) => {
        setSelectedMonth(event.target.value);
    };

    const handleReportTypeChange = (_: React.SyntheticEvent, newValue: number) => {
        if (newValue === 0) {
            // Monthly
            if (selectedYear && availableMonths.length > 0) {
                setSelectedMonth(availableMonths[0]);
                const report = monthlyReports.find(r =>
                    r.year === selectedYear && r.month === availableMonths[0]);

                if (report) {
                    onReportSelected(report.id);
                }
            }
        } else {
            // Yearly
            setSelectedMonth('');
            const report = yearlyReports.find(r => r.year === selectedYear);
            if (report) {
                onReportSelected(report.id);
            }
        }
    };

    // Convert month number to name
    const getMonthName = (month: number) => {
        const months = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        return months[month - 1] || '';
    };

    if (loading) {
        return <Typography>Loading reports...</Typography>;
    }

    return (
        <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 2, background: '#2d2d2d', boxShadow: '0 8px 24px rgba(0,0,0,0.2)' }}>
            <Box sx={{ mb: 3 }}>
                <Tabs value={tab} onChange={handleTabChange}>
                    <Tab label="Latest Reports" />
                    <Tab label="Historical Reports" />
                </Tabs>
            </Box>

            {tab === 0 ? (
                // Latest Reports tab
                <Box>
                    <Typography variant="h6" sx={{ mb: 3, color: '#00e5ff', fontWeight: 'bold' }}>
                        Latest Reports
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Paper
                                elevation={1}
                                sx={{
                                    p: 3,
                                    textAlign: 'center',
                                    cursor: 'pointer',
                                    bgcolor: reportId === latestYearlyId ? 'rgba(0, 229, 255, 0.15)' : '#2d2d2d',
                                    color: reportId === latestYearlyId ? '#00e5ff' : 'inherit',
                                    border: reportId === latestYearlyId ? '1px solid #00e5ff' : '1px solid transparent',
                                    '&:hover': {
                                        bgcolor: reportId === latestYearlyId ? 'rgba(0, 229, 255, 0.2)' : '#3a3a3a',
                                    },
                                    transition: 'all 0.3s',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: '100%',
                                    justifyContent: 'center'
                                }}
                                onClick={() => latestYearlyId && onReportSelected(latestYearlyId)}
                            >
                                <Typography variant="h6" sx={{ fontWeight: 'bold', color: reportId === latestYearlyId ? '#00e5ff' : '#fff' }}>Current Year</Typography>
                                <Typography variant="body1" sx={{ color: reportId === latestYearlyId ? '#b0f0ff' : '#b0b0b0', mt: 1 }}>
                                    {latestYearlyId
                                        ? yearlyReports.find(r => r.id === latestYearlyId)?.title || 'Latest Yearly Report'
                                        : 'No yearly report available'}
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Paper
                                elevation={1}
                                sx={{
                                    p: 3,
                                    textAlign: 'center',
                                    cursor: 'pointer',
                                    bgcolor: reportId === latestMonthlyId ? 'rgba(0, 229, 255, 0.15)' : '#2d2d2d',
                                    color: reportId === latestMonthlyId ? '#00e5ff' : 'inherit',
                                    border: reportId === latestMonthlyId ? '1px solid #00e5ff' : '1px solid transparent',
                                    '&:hover': {
                                        bgcolor: reportId === latestMonthlyId ? 'rgba(0, 229, 255, 0.2)' : '#3a3a3a',
                                    },
                                    transition: 'all 0.3s',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: '100%',
                                    justifyContent: 'center'
                                }}
                                onClick={() => latestMonthlyId && onReportSelected(latestMonthlyId)}
                            >
                                <Typography variant="h6" sx={{ fontWeight: 'bold', color: reportId === latestMonthlyId ? '#00e5ff' : '#fff' }}>Current Month</Typography>
                                <Typography variant="body1" sx={{ color: reportId === latestMonthlyId ? '#b0f0ff' : '#b0b0b0', mt: 1 }}>
                                    {latestMonthlyId
                                        ? monthlyReports.find(r => r.id === latestMonthlyId)?.title || 'Latest Monthly Report'
                                        : 'No monthly report available'}
                                </Typography>
                            </Paper>
                        </Grid>
                    </Grid>
                </Box>
            ) : (
                // Historical Reports tab
                <Box>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={4}>
                            <FormControl fullWidth>
                                <InputLabel>Year</InputLabel>
                                <Select
                                    value={selectedYear}
                                    label="Year"
                                    onChange={handleYearChange}
                                >
                                    {availableYears.map(year => (
                                        <MenuItem key={year} value={year}>{year}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Tabs
                                value={selectedMonth ? 0 : 1}
                                onChange={handleReportTypeChange}
                            >
                                <Tab label="Monthly" disabled={availableMonths.length === 0} />
                                <Tab label="Yearly" />
                            </Tabs>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            {selectedMonth !== '' && (
                                <FormControl fullWidth>
                                    <InputLabel>Month</InputLabel>
                                    <Select
                                        value={selectedMonth}
                                        label="Month"
                                        onChange={handleMonthChange}
                                        disabled={availableMonths.length === 0}
                                    >
                                        {availableMonths.map(month => (
                                            <MenuItem key={month} value={month}>{getMonthName(month)}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            )}
                        </Grid>
                    </Grid>
                </Box>
            )}
        </Paper>
    );
};
