import { useEffect, useState, memo, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box, Button, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, TextField, Paper, Tooltip, Snackbar, CircularProgress
} from '@mui/material';
import { ArrowUpward, ArrowDownward, Save as SaveIcon, ArrowBack } from '@mui/icons-material';
import { ReportService } from '../services/ReportService';
import { AircraftService } from '../services/AircraftService';
import { Aircraft } from '../types/Aircraft';
import { Report, ReportUpdatePayload } from '../types/Report';

function parseReportDate(report: Report) {
  if (report.type === 'monthly' && report.month) {
    return new Date(report.year, report.month - 1, 31); // End of month
  }
  return new Date(report.year, 11, 31); // End of year
}

// Memoized row for performance
const VoteTableRow = memo(function VoteTableRow({ a, votes, onVoteChange }: { a: Aircraft, votes: number, onVoteChange: (id: string, delta: number) => void }) {
  return (
    <TableRow key={a.id}>
      <TableCell>{a.name}</TableCell>
      <TableCell>{a.manufacturer}</TableCell>
      <TableCell>{votes}</TableCell>
      <TableCell>
        <Tooltip title="Add Vote">
          <IconButton size="small" onClick={() => onVoteChange(a.id, 1)}><ArrowUpward /></IconButton>
        </Tooltip>
        <Tooltip title="Remove Vote">
          <IconButton size="small" onClick={() => onVoteChange(a.id, -1)} disabled={!(votes > 0)}><ArrowDownward /></IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
});

export default function ReportEditorPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [report, setReport] = useState<Report | null>(null);
  const [aircraft, setAircraft] = useState<Aircraft[]>([]);
  const [votes, setVotes] = useState<{ [aircraftId: string]: number }>({});
  const [initialVotes, setInitialVotes] = useState<{ [aircraftId: string]: number }>({}); // Track initial votes
  const [search, setSearch] = useState('');
  const [snackbar, setSnackbar] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true); // <-- Add loading state

  const handleVoteChange = useCallback((id: string, delta: number) => {
    setVotes(v => ({ ...v, [id]: Math.max(0, (v[id] || 0) + delta) }));
  }, []);

  useEffect(() => {
    if (id) {
      setLoading(true); // <-- Set loading true at start
      Promise.all([fetchReport(id), fetchAircraft()]).finally(() => setLoading(false));
    }
  }, [id]);

  const fetchReport = async (reportId: string) => {
    const data = await ReportService.getUnpublishedById(reportId);
    setReport(data);
    // Map votes from report
    if ((data as any).aircraftVotes) {
      const v: { [aircraftId: string]: number } = {};
      (data as any).aircraftVotes.forEach((av: any) => { v[av.aircraftId] = av.votes; });
      setVotes(v);
      setInitialVotes(v); // Set initial votes
    } else if (data.aircraft) {
      const v: { [aircraftId: string]: number } = {};
      data.aircraft.forEach((a: any) => { v[a.id] = a.votes || 0; });
      setVotes(v);
      setInitialVotes(v); // Set initial votes
    }
  };

  const fetchAircraft = async () => {
    const data = await AircraftService.getAll();
    setAircraft(data);
  };

  if (loading) return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
      <CircularProgress />
      <Typography sx={{ ml: 2 }}>Loading...</Typography>
    </Box>
  );
  if (!report) return null;

  // Filter aircraft by dateAdded and search
  const reportDate = parseReportDate(report);
  const filteredAircraft = aircraft.filter(a => {
    if (!a.dateAdded) return true;
    const added = new Date(a.dateAdded);
    return added <= reportDate;
  }).filter(a => {
    const q = search.toLowerCase();
    return (
      a.name.toLowerCase().includes(q) ||
      a.manufacturer.toLowerCase().includes(q) ||
      (a.category || '').toLowerCase().includes(q)
    );
  });

  const handleSave = async () => {
    if (!report) return;
    setSaving(true);
    try {
      const aircraftVotes = filteredAircraft.map(a => ({ aircraftId: a.id, votes: votes[a.id] || 0 }));
      const payload: ReportUpdatePayload = { aircraftVotes };
      await ReportService.update(report.id, payload);
      setSnackbar('Votes saved');
    } catch {
      setSnackbar('Error saving votes');
    } finally {
      setSaving(false);
    }
  };

  // Detect unsaved changes (shallow compare)
  const hasUnsavedChanges = Object.keys(votes).length !== Object.keys(initialVotes).length ||
    Object.keys(votes).some(key => votes[key] !== initialVotes[key]);

  return (
    <Box sx={{ mt: 4, position: 'relative' }}>
      <Button startIcon={<ArrowBack />} onClick={() => navigate('/admin')}>Back to Reports</Button>
      <Paper sx={{ p: 3, mb: 3, mt: 2 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>{report.title}</Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>{report.description}</Typography>
        <TextField
          label="Search Aircraft"
          value={search}
          onChange={e => setSearch(e.target.value)}
          sx={{ mb: 2, width: 320 }}
        />
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Manufacturer</TableCell>
                <TableCell>Votes</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredAircraft.map(a => (
                <VoteTableRow key={a.id} a={a} votes={votes[a.id] || 0} onVoteChange={handleVoteChange} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Button
          variant="contained"
          startIcon={<SaveIcon />}
          sx={{ mt: 3 }}
          onClick={handleSave}
          disabled={saving || !hasUnsavedChanges}
        >
          Save
        </Button>
      </Paper>
      {/* Sticky Save Bar */}
      {hasUnsavedChanges && (
        <Box
          sx={{
            position: 'fixed',
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 2000,
            bgcolor: 'background.paper',
            boxShadow: '0 -2px 16px 0 rgba(31,38,135,0.10)',
            borderTop: '2px solid #3B82F6',
            py: 2,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Typography variant="body1" sx={{ mr: 2 }} color="primary">You have unsaved changes</Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<SaveIcon />}
            onClick={handleSave}
            disabled={saving}
            sx={{ minWidth: 120 }}
          >
            {saving ? 'Saving...' : 'Save'}
          </Button>
        </Box>
      )}
      <Snackbar open={!!snackbar} autoHideDuration={2000} onClose={() => setSnackbar(null)} message={snackbar} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} />
    </Box>
  );
} 