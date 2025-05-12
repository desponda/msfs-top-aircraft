import { useState, useEffect, useReducer } from 'react';
import { Box, Snackbar, Tabs, Tab, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import useAdminAuth from './useAdminAuth';
import useAdminReports from './useAdminReports';
import useErrorSnackbar from './useErrorSnackbar';

import AdminLogin from './AdminLogin';
import DraftsTable from './DraftsTable';
import PublishedReportsTable from './PublishedReportsTable';
import { ReportDialog } from './ReportDialog';
import DeleteReportDialog from './DeleteReportDialog';
import QuickEditAircraftDialog from './QuickEditAircraftDialog';
import AircraftEditor from './AircraftEditor';

import { Aircraft } from '../types/Aircraft';
import { Report, ReportType } from '../types/Report';
import { ReportService } from '../services/ReportService';
import { AircraftService } from '../services/AircraftService';

// Add a type for the report update payload
interface ReportUpdatePayload extends Partial<Report> {
    aircraftVotes?: { aircraftId: string; votes: number }[];
}

// Report dialog reducer and initial state
const initialDialogState = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    type: ReportType.MONTHLY,
    title: '',
    description: '',
};

type DialogState = {
    year: number;
    month: number;
    type: ReportType;
    title: string;
    description: string;
};
type DialogAction =
    | { type: 'SET_YEAR'; value: number }
    | { type: 'SET_MONTH'; value: number }
    | { type: 'SET_TYPE'; value: ReportType }
    | { type: 'SET_TITLE'; value: string }
    | { type: 'SET_DESCRIPTION'; value: string }
    | { type: 'RESET'; value?: Partial<DialogState> };

function dialogReducer(state: DialogState, action: DialogAction): DialogState {
    switch (action.type) {
        case 'SET_YEAR': return { ...state, year: action.value };
        case 'SET_MONTH': return { ...state, month: action.value };
        case 'SET_TYPE': return { ...state, type: action.value };
        case 'SET_TITLE': return { ...state, title: action.value };
        case 'SET_DESCRIPTION': return { ...state, description: action.value };
        case 'RESET': return { ...initialDialogState, ...action.value };
        default: return state;
    }
}

export const AdminReportManager = () => {
    const {
        isLoggedIn,
        authLoading,
        username,
        setUsername,
        password,
        setPassword,
        loginError,
        handleLogin,
        handleLogout
    } = useAdminAuth();
    const [openDialog, setOpenDialog] = useState(false);
    const [editingReport, setEditingReport] = useState<Partial<Report> | null>(null);
    const [dialogState, dispatchDialog] = useReducer(dialogReducer, initialDialogState);
    const [allAircraft, setAllAircraft] = useState<Aircraft[]>([]);
    const [selectedAircraftIds, setSelectedAircraftIds] = useState<string[]>([]);
    const [dialogMode, setDialogMode] = useState<'create' | 'edit'>('create');
    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
    const [reportToDelete, setReportToDelete] = useState<string | null>(null);
    const [quickEditAircraft, setQuickEditAircraft] = useState<Aircraft | null>(null);
    const [quickEditFields, setQuickEditFields] = useState<Partial<Aircraft>>({});
    const [quickEditSaving, setQuickEditSaving] = useState(false);
    const [voteEditSnackbar, setVoteEditSnackbar] = useState(false);
    const [editAircraftVotes, setEditAircraftVotes] = useState<{ aircraftId: string; votes: number }[]>([]);
    const [tab, setTab] = useState<'drafts' | 'published' | 'aircraft'>('drafts');
    const [unpublishingId, setUnpublishingId] = useState<string | null>(null);
    const [publishingId, setPublishingId] = useState<string | null>(null);
    const navigate = useNavigate();
    const errorSnackbar = useErrorSnackbar();
    const [createError, setCreateError] = useState<string | null>(null);

    const {
        reports,
        setReports,
        loading,
        published,
        setPublished,
        publishedLoading,
        publishedError,
        fetchReports
    } = useAdminReports(isLoggedIn, setAllAircraft);

    const handleCreateReport: () => void = () => {
        setDialogMode('create');
        setEditingReport(null);
        dispatchDialog({ type: 'RESET', value: { year: new Date().getFullYear(), month: new Date().getMonth() + 1, type: ReportType.MONTHLY, title: '', description: '' } });
        setSelectedAircraftIds([]);
        setEditAircraftVotes([]);
        setOpenDialog(true);
        setCreateError(null);
    };

    const handleDeleteReport: (reportId: string) => void = (reportId) => {
        setReportToDelete(reportId);
        setDeleteConfirmOpen(true);
    };

    const confirmDelete: () => Promise<void> = async () => {
        if (!isLoggedIn) return;
        if (!reportToDelete) return;
        try {
            await ReportService.delete(reportToDelete);
            setReports(reports.filter(r => r.id !== reportToDelete));
            errorSnackbar.showMessage('Report deleted successfully');
        } catch {
            // error handled
        } finally {
            setDeleteConfirmOpen(false);
            setReportToDelete(null);
        }
    };

    const handleCloseDialog: () => void = () => {
        setOpenDialog(false);
    };

    const handleSaveReport: () => Promise<void> = async () => {
        if (!isLoggedIn) return;
        // Generate reportId
        let reportId = dialogState.type === ReportType.MONTHLY
            ? `${dialogState.year}-${String(dialogState.month).padStart(2, '0')}`
            : `${dialogState.year}`;

        // If editing and not changing type/year/month, keep same id
        if (dialogMode === 'edit' && editingReport?.id) {
            reportId = editingReport.id;
        }

        // Create title if not provided
        const title = dialogState.title || (dialogState.type === ReportType.MONTHLY
            ? `Top Aircraft - ${getMonthName(dialogState.month)} ${dialogState.year}`
            : `Top Aircraft - ${dialogState.year}`);

        // Get selected aircraft details and create vote data entries

        // Use editAircraftVotes for aircraftVotes
        const aircraftVotes = editAircraftVotes;

        const reportData: ReportUpdatePayload = {
            id: reportId,
            type: dialogState.type,
            year: dialogState.year,
            title,
            description: dialogState.description || undefined,
            aircraftVotes: aircraftVotes,
        };

        if (dialogState.type === ReportType.MONTHLY) {
            reportData.month = dialogState.month;
        }

        try {
            if (dialogMode === 'create') {
                await ReportService.create(reportData);
                errorSnackbar.showMessage('Report created successfully');
            } else {
                await ReportService.update(reportId, reportData);
                errorSnackbar.showMessage('Report updated successfully');
            }
            fetchReports();
            setOpenDialog(false);
        } catch {
            // error handled
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
    const handlePublish: (reportId: string) => Promise<void> = async (reportId) => {
        if (!isLoggedIn) return;
        setPublishingId(reportId);
        try {
            await ReportService.publish(reportId);
            errorSnackbar.showMessage('Report published');
            fetchReports(false);
            // Force no-cache fetch for published reports
            const fresh = await ReportService.getAllNoCache();
            setPublished(fresh);
            ReportService.clearCache();
        } catch {
            // error handled
        } finally {
            setPublishingId(null);
        }
    };

    const handleUnpublish: (reportId: string) => Promise<void> = async (reportId) => {
        if (!isLoggedIn) return;
        setUnpublishingId(reportId);
        try {
            await ReportService.unpublish(reportId);
            errorSnackbar.showMessage('Report unpublished');
            fetchReports(false);
            // Force no-cache fetch for published reports
            const fresh = await ReportService.getAllNoCache();
            setPublished(fresh);
            ReportService.clearCache();
            // Clear selected report from localStorage if it matches the unpublished report
            if (localStorage.getItem('selectedReportId') === reportId) {
                localStorage.removeItem('selectedReportId');
            }
        } catch {
            // error handled
        } finally {
            setUnpublishingId(null);
        }
    };

    // Helper to check if a draft exists for a given type/year/month
    const draftExists = (type: string, year: number, month?: number) => {
        return reports.some(r => r.type === type && r.year === year && r.month === month);
    };

    if (!isLoggedIn) {
        return (
            <AdminLogin
                username={username}
                setUsername={setUsername}
                password={password}
                setPassword={setPassword}
                loginError={loginError}
                handleLogin={handleLogin}
                authLoading={authLoading}
            />
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
                <DraftsTable
                    reports={reports}
                    publishedReports={published}
                    loading={loading}
                    onCreate={handleCreateReport}
                    onEdit={(id) => navigate(`/admin/report/${id}`)}
                    onDelete={handleDeleteReport}
                    onPublish={handlePublish}
                    publishingId={publishingId}
                    getMonthName={getMonthName}
                />
            )}
            {tab === 'published' && (
                <PublishedReportsTable
                    published={published}
                    publishedLoading={publishedLoading}
                    publishedError={publishedError}
                    onUnpublish={handleUnpublish}
                    unpublishingId={unpublishingId}
                    getMonthName={getMonthName}
                />
            )}
            {tab === 'aircraft' && (
                <AircraftEditor />
            )}

            {/* Create/Edit Report Dialog */}
            <ReportDialog
                open={openDialog}
                onClose={handleCloseDialog}
                onSave={handleSaveReport}
                dialogMode={dialogMode}
                reportType={dialogState.type}
                setReportType={(type) => dispatchDialog({ type: 'SET_TYPE', value: type })}
                reportYear={dialogState.year}
                setReportYear={(year) => dispatchDialog({ type: 'SET_YEAR', value: year })}
                reportMonth={dialogState.month}
                setReportMonth={(month) => dispatchDialog({ type: 'SET_MONTH', value: month })}
                reportTitle={dialogState.title}
                setReportTitle={(title) => dispatchDialog({ type: 'SET_TITLE', value: title })}
                reportDescription={dialogState.description}
                setReportDescription={(description) => dispatchDialog({ type: 'SET_DESCRIPTION', value: description })}
                allAircraft={allAircraft}
                selectedAircraftIds={selectedAircraftIds}
                setSelectedAircraftIds={setSelectedAircraftIds}
                editAircraftVotes={editAircraftVotes}
                setEditAircraftVotes={setEditAircraftVotes}
                voteEditSnackbar={voteEditSnackbar}
                setVoteEditSnackbar={setVoteEditSnackbar}
                getMonthName={getMonthName}
                editingReport={editingReport}
                guardToken={() => isLoggedIn}
                ReportService={ReportService}
                setQuickEditAircraft={setQuickEditAircraft}
                setQuickEditFields={setQuickEditFields}
                setCreateError={setCreateError}
                draftExists={draftExists}
            />

            {/* Delete Confirmation Dialog */}
            <DeleteReportDialog
                open={deleteConfirmOpen}
                onClose={() => setDeleteConfirmOpen(false)}
                onConfirm={confirmDelete}
            />

            {/* Quick Edit Aircraft Modal */}
            <QuickEditAircraftDialog
                open={!!quickEditAircraft}
                fields={quickEditFields}
                setFields={setQuickEditFields}
                saving={quickEditSaving}
                onClose={() => setQuickEditAircraft(null)}
                onSave={async () => {
                    if (!quickEditAircraft || !quickEditAircraft.id) return;
                    setQuickEditSaving(true);
                    try {
                        await AircraftService.update(quickEditAircraft.id, quickEditFields);
                        setAllAircraft(allAircraft.map(a => a.id === quickEditAircraft.id ? { ...a, ...quickEditFields } : a));
                        setQuickEditAircraft(null);
                    } catch {
                        // error handled
                    } finally {
                        setQuickEditSaving(false);
                    }
                }}
            />

            <Snackbar
                open={errorSnackbar.open}
                autoHideDuration={2000}
                onClose={errorSnackbar.handleClose}
                message={errorSnackbar.snackbarMsg}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            />

            <Snackbar
                open={!!createError}
                autoHideDuration={4000}
                onClose={() => setCreateError(null)}
                message={createError}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            />
        </Box>
    );
};
