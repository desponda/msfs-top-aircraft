import React from 'react';
import {
    Paper, Box, Typography, Button, Alert, CircularProgress, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Tooltip
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon, Publish as PublishIcon } from '@mui/icons-material';
import { ReportSummary } from '../types/Report';

interface DraftsTableProps {
    reports: ReportSummary[];
    loading: boolean;
    operationSuccess?: string;
    onCreate: () => void;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
    onPublish: (id: string) => void;
    publishingId: string | null;
    getMonthName: (month: number) => string;
}

const DraftsTable: React.FC<DraftsTableProps> = ({
    reports,
    loading,
    operationSuccess,
    onCreate,
    onEdit,
    onDelete,
    onPublish,
    publishingId,
    getMonthName
}) => (
    <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h5">Report Management</Typography>
            <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={onCreate}
            >
                Create Report
            </Button>
        </Box>
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
                                    <IconButton size="small" onClick={() => onEdit(report.id)} title="Edit">
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton size="small" color="error" onClick={() => onDelete(report.id)} title="Delete">
                                        <DeleteIcon />
                                    </IconButton>
                                    <Tooltip title="Publish">
                                        <span>
                                            <IconButton
                                                size="small"
                                                color="success"
                                                onClick={() => onPublish(report.id)}
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
);

export default DraftsTable; 