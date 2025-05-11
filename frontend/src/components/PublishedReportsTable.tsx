import React from 'react';
import {
    Paper, Typography, Box, CircularProgress, Alert, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Tooltip
} from '@mui/material';
import { Unpublished as UnpublishedIcon } from '@mui/icons-material';
import { ReportSummary } from '../types/Report';

interface PublishedReportsTableProps {
    published: ReportSummary[];
    publishedLoading: boolean;
    publishedError: string | null;
    onUnpublish: (id: string) => void;
    unpublishingId: string | null;
    getMonthName: (month: number) => string;
}

const PublishedReportsTable: React.FC<PublishedReportsTableProps> = ({
    published,
    publishedLoading,
    publishedError,
    onUnpublish,
    unpublishingId,
    getMonthName
}) => (
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
                                                onClick={() => onUnpublish(report.id)}
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
);

export default PublishedReportsTable; 