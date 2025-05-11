import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, TextField } from '@mui/material';
import { Save as SaveIcon } from '@mui/icons-material';
import { Aircraft } from '../types/Aircraft';

interface QuickEditAircraftDialogProps {
    open: boolean;
    fields: Partial<Aircraft>;
    setFields: React.Dispatch<React.SetStateAction<Partial<Aircraft>>>;
    saving: boolean;
    onClose: () => void;
    onSave: () => void;
}

export const QuickEditAircraftDialog: React.FC<QuickEditAircraftDialogProps> = ({
    open,
    fields,
    setFields,
    saving,
    onClose,
    onSave
}) => (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>Quick Edit Aircraft</DialogTitle>
        <DialogContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
                <TextField
                    label="Name"
                    value={fields.name || ''}
                    onChange={e => setFields(f => ({ ...f, name: e.target.value }))}
                    fullWidth
                />
                <TextField
                    label="Manufacturer"
                    value={fields.manufacturer || ''}
                    onChange={e => setFields(f => ({ ...f, manufacturer: e.target.value }))}
                    fullWidth
                />
                <TextField
                    label="Category"
                    value={fields.category || ''}
                    onChange={e => setFields(f => ({ ...f, category: e.target.value }))}
                    fullWidth
                />
                <TextField
                    label="Payware"
                    value={fields.payware || ''}
                    onChange={e => setFields(f => ({ ...f, payware: e.target.value }))}
                    fullWidth
                />
            </Box>
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button
                variant="contained"
                startIcon={<SaveIcon />}
                disabled={saving}
                onClick={onSave}
            >
                Save
            </Button>
        </DialogActions>
    </Dialog>
);

export default QuickEditAircraftDialog; 