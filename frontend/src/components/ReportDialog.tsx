import React from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, FormControl, InputLabel, Select, MenuItem, TextField, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Tooltip, Snackbar
} from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';
import { ReportType } from '../types/Report';
import { Aircraft } from '../types/Aircraft';

interface ReportDialogProps {
    open: boolean;
    onClose: () => void;
    onSave: () => void;
    dialogMode: 'create' | 'edit';
    reportType: ReportType;
    setReportType: (type: ReportType) => void;
    reportYear: number;
    setReportYear: (year: number) => void;
    reportMonth: number;
    setReportMonth: (month: number) => void;
    reportTitle: string;
    setReportTitle: (title: string) => void;
    reportDescription: string;
    setReportDescription: (desc: string) => void;
    allAircraft: Aircraft[];
    selectedAircraftIds: string[];
    setSelectedAircraftIds: (ids: string[]) => void;
    editAircraftVotes: { aircraftId: string; votes: number }[];
    setEditAircraftVotes: React.Dispatch<React.SetStateAction<{ aircraftId: string; votes: number }[]>>;
    voteEditSnackbar: boolean;
    setVoteEditSnackbar: (open: boolean) => void;
    getMonthName: (month: number) => string;
    editingReport: any;
    guardToken: () => boolean;
    ReportService: any;
    setQuickEditAircraft: (aircraft: Aircraft | null) => void;
    setQuickEditFields: (fields: Partial<Aircraft>) => void;
}

export const ReportDialog: React.FC<ReportDialogProps> = ({
    open,
    onClose,
    onSave,
    dialogMode,
    reportType,
    setReportType,
    reportYear,
    setReportYear,
    reportMonth,
    setReportMonth,
    reportTitle,
    setReportTitle,
    reportDescription,
    setReportDescription,
    allAircraft,
    selectedAircraftIds,
    setSelectedAircraftIds,
    editAircraftVotes,
    setEditAircraftVotes,
    voteEditSnackbar,
    setVoteEditSnackbar,
    getMonthName,
    editingReport,
    guardToken,
    ReportService,
    setQuickEditAircraft,
    setQuickEditFields
}) => (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
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
                                                setEditAircraftVotes((prevVotes: { aircraftId: string; votes: number }[]) => prevVotes.map((v: { aircraftId: string; votes: number }) => v.aircraftId === id ? { ...v, votes: newVotes } : v));
                                                if (editingReport && editingReport.id) {
                                                    const payload = { ...editingReport, aircraftVotes: editAircraftVotes.map(v => v.aircraftId === id ? { ...v, votes: newVotes } : v) };
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
            <Button onClick={onClose}>Cancel</Button>
            <Button
                onClick={onSave}
                variant="contained"
                disabled={selectedAircraftIds.length === 0}
            >
                Save
            </Button>
        </DialogActions>
    </Dialog>
);

export default ReportDialog; 