import { useEffect, useState } from 'react';
import {
  Box, Button, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Paper, Tooltip, Snackbar
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon, Save as SaveIcon } from '@mui/icons-material';
import { AircraftService } from '../services/AircraftService';
import { Aircraft } from '../types/Aircraft';

const emptyAircraft: Partial<Aircraft> = { name: '', manufacturer: '', category: '', payware: '' };

export default function AircraftEditor() {
  const [aircraft, setAircraft] = useState<Aircraft[]>([]);
  const [loading, setLoading] = useState(true);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editFields, setEditFields] = useState<Partial<Aircraft>>(emptyAircraft);
  const [editId, setEditId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [snackbar, setSnackbar] = useState<string | null>(null);

  useEffect(() => {
    fetchAircraft();
  }, []);

  const fetchAircraft = async () => {
    setLoading(true);
    try {
      const data = await AircraftService.getAll();
      setAircraft(data);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (a: Aircraft) => {
    setEditFields(a);
    setEditId(a.id);
    setEditModalOpen(true);
  };

  const handleAdd = () => {
    setEditFields(emptyAircraft);
    setEditId(null);
    setEditModalOpen(true);
  };

  const handleSave = async () => {
    if (!editFields.name || !editFields.manufacturer) {
      setSnackbar('Name and Manufacturer are required');
      return;
    }
    try {
      if (editId) {
        await AircraftService.update(editId, editFields);
        setSnackbar('Aircraft updated');
      } else {
        // Add new aircraft (assume backend supports POST /aircraft)
        await AircraftService.create(editFields);
        setSnackbar('Aircraft added');
      }
      setEditModalOpen(false);
      fetchAircraft();
    } catch {
      setSnackbar('Error saving aircraft');
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await AircraftService.delete(deleteId);
      setSnackbar('Aircraft deleted');
      setDeleteId(null);
      fetchAircraft();
    } catch {
      setSnackbar('Error deleting aircraft');
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h5">Aircraft Management</Typography>
          <Button variant="contained" startIcon={<AddIcon />} onClick={handleAdd}>Add Aircraft</Button>
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Manufacturer</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Payware</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {aircraft.map(a => (
                <TableRow key={a.id}>
                  <TableCell>{a.name}</TableCell>
                  <TableCell>{a.manufacturer}</TableCell>
                  <TableCell>{a.category}</TableCell>
                  <TableCell>{a.payware}</TableCell>
                  <TableCell>
                    <Tooltip title="Edit">
                      <IconButton size="small" onClick={() => handleEdit(a)}><EditIcon /></IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton size="small" color="error" onClick={() => setDeleteId(a.id)}><DeleteIcon /></IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      {/* Edit/Add Modal */}
      <Dialog open={editModalOpen} onClose={() => setEditModalOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{editId ? 'Edit Aircraft' : 'Add Aircraft'}</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            <TextField label="Name" value={editFields.name || ''} onChange={e => setEditFields(f => ({ ...f, name: e.target.value }))} fullWidth />
            <TextField label="Manufacturer" value={editFields.manufacturer || ''} onChange={e => setEditFields(f => ({ ...f, manufacturer: e.target.value }))} fullWidth />
            <TextField label="Category" value={editFields.category || ''} onChange={e => setEditFields(f => ({ ...f, category: e.target.value }))} fullWidth />
            <TextField label="Payware" value={editFields.payware || ''} onChange={e => setEditFields(f => ({ ...f, payware: e.target.value }))} fullWidth />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditModalOpen(false)}>Cancel</Button>
          <Button variant="contained" startIcon={<SaveIcon />} onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deleteId} onClose={() => setDeleteId(null)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this aircraft?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteId(null)}>Cancel</Button>
          <Button variant="contained" color="error" onClick={handleDelete}>Delete</Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={!!snackbar} autoHideDuration={2000} onClose={() => setSnackbar(null)} message={snackbar} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} />
    </Box>
  );
} 