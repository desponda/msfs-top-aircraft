import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box, Button, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, TextField, Paper, Tooltip, Snackbar
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

export default function ReportEditorPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [report, setReport] = useState<Report | null>(null);
  const [aircraft, setAircraft] = useState<Aircraft[]>([]);
  const [votes, setVotes] = useState<{ [aircraftId: string]: number }>({});
  const [search, setSearch] = useState('');
  const [snackbar, setSnackbar] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (id) {
      fetchReport(id);
      fetchAircraft();
    }
  }, [id]);

  const fetchReport = async (reportId: string) => {
    const authToken = localStorage.getItem('authToken') || '';
    const data = await ReportService.getUnpublishedById(reportId, authToken);
    setReport(data);
    // Map votes from report
    if ((data as any).aircraftVotes) {
      const v: { [aircraftId: string]: number } = {};
      (data as any).aircraftVotes.forEach((av: any) => { v[av.aircraftId] = av.votes; });
      setVotes(v);
    } else if (data.aircraft) {
      const v: { [aircraftId: string]: number } = {};
      data.aircraft.forEach((a: any) => { v[a.id] = a.votes || 0; });
      setVotes(v);
    }
  };

  const fetchAircraft = async () => {
    const data = await AircraftService.getAll();
    setAircraft(data);
  };

  if (!report) return <Typography sx={{ mt: 4 }}>Loading...</Typography>;

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

  const handleVoteChange = (id: string, delta: number) => {
    setVotes(v => ({ ...v, [id]: Math.max(0, (v[id] || 0) + delta) }));
  };

  const handleSave = async () => {
    if (!report) return;
    setSaving(true);
    try {
      const aircraftVotes = filteredAircraft.map(a => ({ aircraftId: a.id, votes: votes[a.id] || 0 }));
      const payload: ReportUpdatePayload = { aircraftVotes };
      await ReportService.update(report.id, payload, localStorage.getItem('authToken') || '');
      setSnackbar('Votes saved');
    } catch {
      setSnackbar('Error saving votes');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
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
                <TableRow key={a.id}>
                  <TableCell>{a.name}</TableCell>
                  <TableCell>{a.manufacturer}</TableCell>
                  <TableCell>{votes[a.id] || 0}</TableCell>
                  <TableCell>
                    <Tooltip title="Add Vote">
                      <IconButton size="small" onClick={() => handleVoteChange(a.id, 1)}><ArrowUpward /></IconButton>
                    </Tooltip>
                    <Tooltip title="Remove Vote">
                      <IconButton size="small" onClick={() => handleVoteChange(a.id, -1)} disabled={!(votes[a.id] > 0)}><ArrowDownward /></IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Button
          variant="contained"
          startIcon={<SaveIcon />}
          sx={{ mt: 3 }}
          onClick={handleSave}
          disabled={saving}
        >
          Save
        </Button>
      </Paper>
      <Snackbar open={!!snackbar} autoHideDuration={2000} onClose={() => setSnackbar(null)} message={snackbar} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} />
    </Box>
  );
} 