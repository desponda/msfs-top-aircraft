import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';

interface DeleteReportDialogProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export const DeleteReportDialog: React.FC<DeleteReportDialogProps> = ({ open, onClose, onConfirm }) => (
    <Dialog open={open} onClose={onClose}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
            <DialogContentText>
                Are you sure you want to delete this report? This action cannot be undone.
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={onConfirm} variant="contained" color="error">
                Delete
            </Button>
        </DialogActions>
    </Dialog>
);

export default DeleteReportDialog; 