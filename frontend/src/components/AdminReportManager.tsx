import { useState, useEffect } from 'react';
import {
    Box,
    Button,
    Paper,
    Typography,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    CircularProgress,
    Alert,
} from '@mui/material';
import {
    Add as AddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
} from '@mui/icons-material';
import { ReportService } from '../services/ReportService';
import { AircraftService } from '../services/AircraftService';
import { Aircraft } from '../types/Aircraft';
import { Report, ReportSummary, ReportType } from '../types/Report';

export const AdminReportManager = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [authToken, setAuthToken] = useState('');
    const [loginError, setLoginError] = useState('');
    const [reports, setReports] = useState<ReportSummary[]>([]);
    const [loading, setLoading] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [editingReport, setEditingReport] = useState<Partial<Report> | null>(null);
    const [reportYear, setReportYear] = useState(new Date().getFullYear());
    const [reportMonth, setReportMonth] = useState(new Date().getMonth() + 1);
    const [reportType, setReportType] = useState<ReportType>(ReportType.MONTHLY);
    const [reportTitle, setReportTitle] = useState('');
    const [reportDescription, setReportDescription] = useState('');
    const [allAircraft, setAllAircraft] = useState<Aircraft[]>([]);
    const [selectedAircraftIds, setSelectedAircraftIds] = useState<string[]>([]);
    const [dialogMode, setDialogMode] = useState<'create' | 'edit'>('create');
    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
    const [reportToDelete, setReportToDelete] = useState<string | null>(null);
    const [operationSuccess, setOperationSuccess] = useState('');

    // Login handler
    const handleLogin = () => {
        if (!username || !password) {
            setLoginError('Username and password are required');
            return;
        }

        const token = btoa(`${username}:${password}`);
        setAuthToken(token);
        setIsLoggedIn(true);
        setLoginError('');
    };

    // Fetch all reports when logged in
    useEffect(() => {
        if (isLoggedIn) {
            fetchReports();
            fetchAircraft();
        }
    }, [isLoggedIn]);

    const fetchReports = async () => {
        setLoading(true);
        try {
            const data = await ReportService.getAll();
            setReports(data.sort((a, b) => {
                if (a.year !== b.year) return b.year - a.year;
                return (b.month || 0) - (a.month || 0);
            }));
        } catch (error) {
            console.error('Error fetching reports:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchAircraft = async () => {
        try {
            const data = await AircraftService.getAll();
            setAllAircraft(data);
        } catch (error) {
            console.error('Error fetching aircraft:', error);
        }
    };

    const handleCreateReport = () => {
        setDialogMode('create');
        setEditingReport(null);
        setReportYear(new Date().getFullYear());
        setReportMonth(new Date().getMonth() + 1);
        setReportType(ReportType.MONTHLY);
        setReportTitle('');
        setReportDescription('');
        setSelectedAircraftIds([]);
        setOpenDialog(true);
    };

    const handleEditReport = (report: ReportSummary) => {
        setDialogMode('edit');
        setEditingReport(report);
        setReportYear(report.year);
        setReportMonth(report.month || new Date().getMonth() + 1);
        setReportType(report.type);
        setReportTitle(report.title);
        setReportDescription(report.description || '');

        // Fetch full report details to get aircraft list
        ReportService.getById(report.id)
            .then(fullReport => {
                setSelectedAircraftIds(fullReport.aircraft.map(a => a.id));
                setOpenDialog(true);
            })
            .catch(error => {
                console.error('Error fetching report details:', error);
            });
    };

    const handleDeleteReport = (reportId: string) => {
        setReportToDelete(reportId);
        setDeleteConfirmOpen(true);
    };

    const confirmDelete = async () => {
        if (!reportToDelete) return;

        try {
            await ReportService.delete(reportToDelete, authToken);
            setReports(reports.filter(r => r.id !== reportToDelete));
            setOperationSuccess('Report deleted successfully');
            setTimeout(() => setOperationSuccess(''), 3000);
        } catch (error) {
            console.error('Error deleting report:', error);
        } finally {
            setDeleteConfirmOpen(false);
            setReportToDelete(null);
        }
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleSaveReport = async () => {
        // Generate reportId
        let reportId = reportType === ReportType.MONTHLY
            ? `${reportYear}-${String(reportMonth).padStart(2, '0')}`
            : `${reportYear}`;

        // If editing and not changing type/year/month, keep same id
        if (dialogMode === 'edit' && editingReport?.id) {
            reportId = editingReport.id;
        }

        // Create title if not provided
        const title = reportTitle || (reportType === ReportType.MONTHLY
            ? `Top Aircraft - ${getMonthName(reportMonth)} ${reportYear}`
            : `Top Aircraft - ${reportYear}`);

        // Get selected aircraft details and create vote data entries
        const selectedAircraft = allAircraft.filter(a =>
            selectedAircraftIds.includes(a.id));

        // For new reports, we'll initialize vote data to 0
        // For existing reports, we'll keep existing vote data
        const aircraftVotes = selectedAircraftIds.map(id => {
            // If editing, try to find existing vote data for this aircraft
            let votes = 0;
            let daysOnList = 0;
            let weeksInChart = 0;

            if (dialogMode === 'edit' && editingReport?.id) {
                const fullReport = editingReport as Report;
                // Find the aircraft vote data in the report
                if (fullReport.aircraft) {
                    // Handle old format for backward compatibility
                    const existingAircraft = fullReport.aircraft.find(a => a.id === id);
                    if (existingAircraft) {
                        votes = existingAircraft.votes || 0;
                        daysOnList = existingAircraft.daysOnList || 0;
                        weeksInChart = existingAircraft.weeksInChart || 0;
                    }
                } else if (fullReport.aircraftVotes) {
                    // Handle new format
                    const existingVoteData = fullReport.aircraftVotes.find(v => v.aircraftId === id);
                    if (existingVoteData) {
                        votes = existingVoteData.votes || 0;
                        daysOnList = existingVoteData.daysOnList || 0;
                        weeksInChart = existingVoteData.weeksInChart || 0;
                    }
                }
            }

            return {
                aircraftId: id,
                votes,
                daysOnList,
                weeksInChart
            };
        });

        const reportData = {
            id: reportId,
            type: reportType,
            year: reportYear,
            title,
            description: reportDescription || undefined,
            aircraftVotes: aircraftVotes,
        };

        if (reportType === ReportType.MONTHLY) {
            reportData.month = reportMonth;
        }

        try {
            if (dialogMode === 'create') {
                await ReportService.create(reportData, authToken);
                setOperationSuccess('Report created successfully');
            } else {
                await ReportService.update(reportId, reportData, authToken);
                setOperationSuccess('Report updated successfully');
            }

            setTimeout(() => setOperationSuccess(''), 3000);
            fetchReports();
            setOpenDialog(false);
        } catch (error) {
            console.error('Error saving report:', error);
        }
    };

    const getMonthName = (month: number) => {
        const months = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        return months[month - 1] || '';
    };

    if (!isLoggedIn) {
        return (
            <Paper sx={{ p: 4, maxWidth: 400, mx: 'auto', mt: 4 }}>
                <Typography variant="h5" gutterBottom>Admin Login</Typography>

                {loginError && (
                    <Alert severity="error" sx={{ mb: 2 }}>{loginError}</Alert>
                )}

                <Box component="form" sx={{ mt: 2 }}>
                    <TextField
                        label="Username"
                        fullWidth
                        margin="normal"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        fullWidth
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        variant="contained"
                        fullWidth
                        sx={{ mt: 2 }}
                        onClick={handleLogin}
                    >
                        Login
                    </Button>
                </Box>
            </Paper>
        );
    }

    return (
        <Box>
            <Paper sx={{ p: 3, mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h5">Report Management</Typography>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={handleCreateReport}
                    >
                        Create Report
                    </Button>
                </Box>

                {operationSuccess && (
                    <Alert severity="success" sx={{ mb: 2 }}>{operationSuccess}</Alert>
                )}

                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Title</TableCell>
                                    <TableCell>Type</TableCell>
                                    <TableCell>Year</TableCell>
                                    <TableCell>Month</TableCell>
                                    <TableCell>Aircraft</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {reports.map(report => (
                                    <TableRow key={report.id}>
                                        <TableCell>{report.id}</TableCell>
                                        <TableCell>{report.title}</TableCell>
                                        <TableCell>{report.type}</TableCell>
                                        <TableCell>{report.year}</TableCell>
                                        <TableCell>{report.month ? getMonthName(report.month) : '-'}</TableCell>
                                        <TableCell>{report.aircraftCount}</TableCell>
                                        <TableCell>
                                            <IconButton
                                                size="small"
                                                onClick={() => handleEditReport(report)}
                                                title="Edit"
                                            >
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton
                                                size="small"
                                                color="error"
                                                onClick={() => handleDeleteReport(report.id)}
                                                title="Delete"
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </Paper>

            {/* Create/Edit Report Dialog */}
            <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
                <DialogTitle>
                    {dialogMode === 'create' ? 'Create New Report' : 'Edit Report'}
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: 'repeat(2, 1fr)', my: 1 }}>
                        <FormControl fullWidth>
                            <InputLabel>Report Type</InputLabel>
                            <Select
                                value={reportType}
                                label="Report Type"
                                onChange={(e) => setReportType(e.target.value as ReportType)}
                            >
                                <MenuItem value={ReportType.MONTHLY}>Monthly</MenuItem>
                                <MenuItem value={ReportType.YEARLY}>Yearly</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl fullWidth>
                            <InputLabel>Year</InputLabel>
                            <Select
                                value={reportYear}
                                label="Year"
                                onChange={(e) => setReportYear(Number(e.target.value))}
                            >
                                {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i).map(year => (
                                    <MenuItem key={year} value={year}>{year}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        {reportType === ReportType.MONTHLY && (
                            <FormControl fullWidth>
                                <InputLabel>Month</InputLabel>
                                <Select
                                    value={reportMonth}
                                    label="Month"
                                    onChange={(e) => setReportMonth(Number(e.target.value))}
                                >
                                    {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                                        <MenuItem key={month} value={month}>{getMonthName(month)}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        )}

                        <TextField
                            label="Title"
                            fullWidth
                            value={reportTitle}
                            onChange={(e) => setReportTitle(e.target.value)}
                            placeholder={reportType === ReportType.MONTHLY
                                ? `Top Aircraft - ${getMonthName(reportMonth)} ${reportYear}`
                                : `Top Aircraft - ${reportYear}`}
                        />

                        <TextField
                            label="Description"
                            fullWidth
                            multiline
                            rows={2}
                            value={reportDescription}
                            onChange={(e) => setReportDescription(e.target.value)}
                            sx={{ gridColumn: 'span 2' }}
                        />
                    </Box>

                    <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>Select Aircraft</Typography>
                    <TableContainer sx={{ maxHeight: 300 }}>
                        <Table stickyHeader size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell padding="checkbox">Select</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Manufacturer</TableCell>
                                    <TableCell>Category</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {allAircraft.map((aircraft) => (
                                    <TableRow
                                        key={aircraft.id}
                                        onClick={() => {
                                            if (selectedAircraftIds.includes(aircraft.id)) {
                                                setSelectedAircraftIds(selectedAircraftIds.filter(id => id !== aircraft.id));
                                            } else {
                                                setSelectedAircraftIds([...selectedAircraftIds, aircraft.id]);
                                            }
                                        }}
                                        sx={{
                                            cursor: 'pointer',
                                            backgroundColor: selectedAircraftIds.includes(aircraft.id) ? 'rgba(0, 0, 0, 0.04)' : 'transparent'
                                        }}
                                    >
                                        <TableCell padding="checkbox">
                                            <input
                                                type="checkbox"
                                                checked={selectedAircraftIds.includes(aircraft.id)}
                                                readOnly
                                            />
                                        </TableCell>
                                        <TableCell>{aircraft.name}</TableCell>
                                        <TableCell>{aircraft.manufacturer}</TableCell>
                                        <TableCell>{aircraft.category}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                        {selectedAircraftIds.length} aircraft selected
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <Button
                        onClick={handleSaveReport}
                        variant="contained"
                        disabled={selectedAircraftIds.length === 0}
                    >
                        Save
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog open={deleteConfirmOpen} onClose={() => setDeleteConfirmOpen(false)}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this report? This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteConfirmOpen(false)}>Cancel</Button>
                    <Button onClick={confirmDelete} variant="contained" color="error">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};
