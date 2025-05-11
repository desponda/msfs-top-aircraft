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
    Tooltip,
    Snackbar,
    Tabs,
    Tab
} from '@mui/material';
import {
    Add as AddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Save as SaveIcon,
    Publish as PublishIcon,
    Unpublished as UnpublishedIcon
} from '@mui/icons-material';
import { ReportService } from '../services/ReportService';
import { AircraftService } from '../services/AircraftService';
import { Aircraft } from '../types/Aircraft';
import { Report, ReportSummary, ReportType } from '../types/Report';
import { useNavigate } from 'react-router-dom';
import AircraftEditor from './AircraftEditor';

// Add a type for the report update payload
interface ReportUpdatePayload extends Partial<Report> {
    aircraftVotes?: { aircraftId: string; votes: number }[];
}

export const AdminReportManager = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [authLoading, setAuthLoading] = useState(true);
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
    const [quickEditAircraft, setQuickEditAircraft] = useState<Aircraft | null>(null);
    const [quickEditFields, setQuickEditFields] = useState<Partial<Aircraft>>({});
    const [quickEditSaving, setQuickEditSaving] = useState(false);
    const [voteEditSnackbar, setVoteEditSnackbar] = useState(false);
    const [editAircraftVotes, setEditAircraftVotes] = useState<{ aircraftId: string; votes: number }[]>([]);
    const [publishedReports, setPublishedReports] = useState<string[]>([]);
    const [snackbarMsg, setSnackbarMsg] = useState<string | null>(null);
    const [tab, setTab] = useState<'drafts' | 'published' | 'aircraft'>('drafts');
    const [unpublishingId, setUnpublishingId] = useState<string | null>(null);
    const [publishingId, setPublishingId] = useState<string | null>(null);
    const navigate = useNavigate();

    // On mount, check if session is still valid
    useEffect(() => {
        setAuthLoading(true);
        fetch('/api/session', { credentials: 'include' })
            .then(res => res.json())
            .then(data => {
                if (data.loggedIn) setIsLoggedIn(true);
                else setIsLoggedIn(false);
            })
            .finally(() => setAuthLoading(false));
    }, []);

    // Login handler
    const handleLogin = async () => {
        if (!username || !password) {
            setLoginError('Username and password are required');
            return;
        }
        try {
            const res = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ username, password })
            });
            if (!res.ok) throw new Error('Invalid credentials');
            setIsLoggedIn(true);
            setLoginError('');
        } catch (err) {
            setLoginError('Invalid credentials');
        }
    };

    // Helper to handle 401 errors
    const handleAuthError = (error: any) => {
        if (error && error.response && error.response.status === 401) {
            setIsLoggedIn(false);
            setAuthToken('');
            localStorage.removeItem('adminAuthToken');
            setLoginError('Session expired or invalid credentials. Please log in again.');
        }
    };

    // Guard: Prevent admin API calls if not logged in
    const guardToken = () => {
        if (!isLoggedIn) {
            setLoginError('Session expired or invalid credentials. Please log in again.');
            return false;
        }
        return true;
    };

    // Fetch all drafts (unpublished) and published reports
    const [published, setPublished] = useState<ReportSummary[]>([]);
    const [publishedLoading, setPublishedLoading] = useState(false);
    const [publishedError, setPublishedError] = useState<string | null>(null);

    useEffect(() => {
        if (isLoggedIn) {
            fetchReports();
            fetchAircraft();
            fetchPublished();
        }
    }, [isLoggedIn]);

    const fetchReports = async (showLoading: boolean = true) => {
        if (!guardToken()) return;
        if (showLoading) setLoading(true);
        try {
            const data = await ReportService.getAllUnpublished();
            setReports(data.sort((a, b) => {
                if (a.year !== b.year) return b.year - a.year;
                return (b.month || 0) - (a.month || 0);
            }));
            // For each report, check if it is published
            const publishedIds: string[] = [];
            await Promise.all(data.map(async (report) => {
                if (await ReportService.isPublished(report.id)) publishedIds.push(report.id);
            }));
            setPublishedReports(publishedIds);
        } catch (error: any) {
            handleAuthError(error);
            console.error('Error fetching reports:', error);
        } finally {
            if (showLoading) setLoading(false);
        }
    };

    const fetchAircraft = async () => {
        // No auth needed
        try {
            const data = await AircraftService.getAll();
            setAllAircraft(data);
        } catch (error) {
            console.error('Error fetching aircraft:', error);
        }
    };

    const fetchPublished = async () => {
        // No auth needed
        setPublishedLoading(true);
        setPublishedError(null);
        try {
            const data = await ReportService.getAll();
            setPublished(data);
        } catch (e: any) {
            setPublishedError(e.message);
        } finally {
            setPublishedLoading(false);
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
        setEditAircraftVotes([]);
        setOpenDialog(true);
    };

    const handleDeleteReport = (reportId: string) => {
        setReportToDelete(reportId);
        setDeleteConfirmOpen(true);
    };

    const confirmDelete = async () => {
        if (!guardToken()) return;
        if (!reportToDelete) return;
        try {
            await ReportService.delete(reportToDelete);
            setReports(reports.filter(r => r.id !== reportToDelete));
            setOperationSuccess('Report deleted successfully');
            setTimeout(() => setOperationSuccess(''), 3000);
        } catch (error: any) {
            handleAuthError(error);
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
        if (!guardToken()) return;
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

        // Use editAircraftVotes for aircraftVotes
        const aircraftVotes = editAircraftVotes;

        const reportData: ReportUpdatePayload = {
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
                await ReportService.create(reportData);
                setOperationSuccess('Report created successfully');
            } else {
                await ReportService.update(reportId, reportData);
                setOperationSuccess('Report updated successfully');
            }
            setTimeout(() => setOperationSuccess(''), 3000);
            fetchReports();
            setOpenDialog(false);
        } catch (error: any) {
            handleAuthError(error);
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

    // When selecting/deselecting aircraft, update editAircraftVotes
    useEffect(() => {
        setEditAircraftVotes(prevVotes => {
            // Add new selected aircraft with 0 votes if not present
            const updated = selectedAircraftIds.map(id => {
                const found = prevVotes.find(v => v.aircraftId === id);
                return found ? found : { aircraftId: id, votes: 0 };
            });
            return updated;
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedAircraftIds]);

    // Handler for publish/unpublish (placeholder)
    const handlePublish = async (reportId: string) => {
        if (!guardToken()) return;
        setPublishingId(reportId);
        try {
            await ReportService.publish(reportId);
            setSnackbarMsg('Report published');
            fetchReports(false);
            // Force no-cache fetch for published reports
            const fresh = await ReportService.getAllNoCache();
            setPublished(fresh);
            ReportService.clearCache();
        } catch (error: any) {
            handleAuthError(error);
            setSnackbarMsg('Failed to publish report');
        } finally {
            setPublishingId(null);
        }
    };

    const handleUnpublish = async (reportId: string) => {
        if (!guardToken()) return;
        setUnpublishingId(reportId);
        try {
            await ReportService.unpublish(reportId);
            setSnackbarMsg('Report unpublished');
            fetchReports(false);
            // Force no-cache fetch for published reports
            const fresh = await ReportService.getAllNoCache();
            setPublished(fresh);
            ReportService.clearCache();
            // Clear selected report from localStorage if it matches the unpublished report
            if (localStorage.getItem('selectedReportId') === reportId) {
                localStorage.removeItem('selectedReportId');
            }
        } catch (error: any) {
            handleAuthError(error);
            setSnackbarMsg('Failed to unpublish report');
        } finally {
            setUnpublishingId(null);
        }
    };

    // Logout handler
    const handleLogout = async () => {
        await fetch('/api/logout', { method: 'POST', credentials: 'include' });
        setIsLoggedIn(false);
        setUsername('');
        setPassword('');
    };

    if (authLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
                <CircularProgress />
            </Box>
        );
    }

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
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
                <Button onClick={handleLogout} color="secondary" variant="outlined">
                    Logout
                </Button>
            </Box>
            <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 2 }}>
                <Tab label="Drafts" value="drafts" />
                <Tab label="Published" value="published" />
                <Tab label="Aircraft" value="aircraft" />
            </Tabs>
            {tab === 'drafts' && (
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
                                                    onClick={() => navigate(`/admin/report/${report.id}`)}
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
                                                <Tooltip title="Publish">
                                                    <span>
                                                        <IconButton
                                                            size="small"
                                                            color="success"
                                                            onClick={() => handlePublish(report.id)}
                                                            disabled={publishingId === report.id}
                                                        >
                                                            {publishingId === report.id ? <CircularProgress size={20} /> : <PublishIcon />}
                                                        </IconButton>
                                                    </span>
                                                </Tooltip>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                </Paper>
            )}
            {tab === 'published' && (
                <Paper sx={{ p: 3, mb: 3 }}>
                    <Typography variant="h5" sx={{ mb: 2 }}>Published Reports</Typography>
                    {publishedLoading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                            <CircularProgress />
                        </Box>
                    ) : publishedError ? (
                        <Alert severity="error">{publishedError}</Alert>
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
                                    {published.map(report => (
                                        <TableRow key={report.id}>
                                            <TableCell>{report.id}</TableCell>
                                            <TableCell>{report.title}</TableCell>
                                            <TableCell>{report.type}</TableCell>
                                            <TableCell>{report.year}</TableCell>
                                            <TableCell>{report.month ? getMonthName(report.month) : '-'}</TableCell>
                                            <TableCell>{report.aircraftCount}</TableCell>
                                            <TableCell>
                                                <Tooltip title="Unpublish">
                                                    <span>
                                                        <IconButton
                                                            size="small"
                                                            color="warning"
                                                            onClick={() => handleUnpublish(report.id)}
                                                            disabled={unpublishingId === report.id}
                                                        >
                                                            {unpublishingId === report.id ? <CircularProgress size={20} /> : <UnpublishedIcon />}
                                                        </IconButton>
                                                    </span>
                                                </Tooltip>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                </Paper>
            )}
            {tab === 'aircraft' && (
                <AircraftEditor />
            )}

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

                    <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>Edit Votes</Typography>
                    <TableContainer sx={{ maxHeight: 300, mb: 2 }}>
                        <Table stickyHeader size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Manufacturer</TableCell>
                                    <TableCell>Votes</TableCell>
                                    <TableCell>Edit</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {selectedAircraftIds.map((id) => {
                                    const aircraft = allAircraft.find(a => a.id === id);
                                    if (!aircraft) return null;
                                    // Find the vote for this aircraft
                                    const voteObj = editAircraftVotes.find(v => v.aircraftId === id) || { votes: 0 };
                                    return (
                                        <TableRow key={id}>
                                            <TableCell>{aircraft.name}</TableCell>
                                            <TableCell>{aircraft.manufacturer}</TableCell>
                                            <TableCell>
                                                <TextField
                                                    type="number"
                                                    size="small"
                                                    value={voteObj.votes}
                                                    inputProps={{ min: 0, style: { width: 60 } }}
                                                    onChange={async (e) => {
                                                        const newVotes = parseInt(e.target.value, 10) || 0;
                                                        // Update local state
                                                        setEditAircraftVotes(prevVotes => prevVotes.map(v => v.aircraftId === id ? { ...v, votes: newVotes } : v));
                                                        // Auto-save
                                                        if (editingReport && editingReport.id) {
                                                            const payload: ReportUpdatePayload = { ...editingReport, aircraftVotes: editAircraftVotes.map(v => v.aircraftId === id ? { ...v, votes: newVotes } : v) };
                                                            if (!guardToken()) return;
                                                            await ReportService.update(editingReport.id, payload);
                                                            setVoteEditSnackbar(true);
                                                        }
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Tooltip title="Quick Edit Aircraft Info">
                                                    <IconButton size="small" onClick={() => {
                                                        setQuickEditAircraft(aircraft);
                                                        setQuickEditFields(aircraft);
                                                    }}>
                                                        <EditIcon />
                                                    </IconButton>
                                                </Tooltip>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Snackbar
                        open={voteEditSnackbar}
                        autoHideDuration={1200}
                        onClose={() => setVoteEditSnackbar(false)}
                        message="Votes updated"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    />
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

            {/* Quick Edit Aircraft Modal */}
            <Dialog open={!!quickEditAircraft} onClose={() => setQuickEditAircraft(null)} maxWidth="sm" fullWidth>
                <DialogTitle>Quick Edit Aircraft</DialogTitle>
                <DialogContent>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
                        <TextField
                            label="Name"
                            value={quickEditFields.name || ''}
                            onChange={e => setQuickEditFields(f => ({ ...f, name: e.target.value }))}
                            fullWidth
                        />
                        <TextField
                            label="Manufacturer"
                            value={quickEditFields.manufacturer || ''}
                            onChange={e => setQuickEditFields(f => ({ ...f, manufacturer: e.target.value }))}
                            fullWidth
                        />
                        <TextField
                            label="Category"
                            value={quickEditFields.category || ''}
                            onChange={e => setQuickEditFields(f => ({ ...f, category: e.target.value }))}
                            fullWidth
                        />
                        <TextField
                            label="Payware"
                            value={quickEditFields.payware || ''}
                            onChange={e => setQuickEditFields(f => ({ ...f, payware: e.target.value }))}
                            fullWidth
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setQuickEditAircraft(null)}>Cancel</Button>
                    <Button
                        variant="contained"
                        startIcon={<SaveIcon />}
                        disabled={quickEditSaving}
                        onClick={async () => {
                            if (!quickEditAircraft || !quickEditAircraft.id) return;
                            setQuickEditSaving(true);
                            try {
                                await AircraftService.update(quickEditAircraft.id, quickEditFields);
                                setAllAircraft(allAircraft.map(a => a.id === quickEditAircraft.id ? { ...a, ...quickEditFields } : a));
                                setQuickEditAircraft(null);
                            } catch (err) {
                                // Optionally show error
                            } finally {
                                setQuickEditSaving(false);
                            }
                        }}
                    >
                        Save
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar
                open={!!snackbarMsg}
                autoHideDuration={2000}
                onClose={() => setSnackbarMsg(null)}
                message={snackbarMsg}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            />
        </Box>
    );
};
