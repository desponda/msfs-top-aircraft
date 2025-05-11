import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { ReportService } from '../services/ReportService';
import { ReportSummary } from '../types/Report';

interface ReportSelectorProps {
  onReportSelected: (reportId: string) => void;
  reportId?: string;
}

export function ReportSelector({ onReportSelected, reportId }: ReportSelectorProps) {
  const [yearly, setYearly] = useState<ReportSummary | null>(null);
  const [monthly, setMonthly] = useState<ReportSummary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const latest = await ReportService.getLatest();
        if (latest.yearly) {
          setYearly({ ...latest.yearly, aircraftCount: latest.yearly.aircraft.length } as ReportSummary);
        }
        if (latest.monthly) {
          setMonthly({ ...latest.monthly, aircraftCount: latest.monthly.aircraft.length } as ReportSummary);
        }
        // Select yearly by default if nothing selected
        if (!reportId && latest.yearly) onReportSelected(latest.yearly.id);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    // eslint-disable-next-line
  }, []);

  if (loading) return <Typography>Loading reports...</Typography>;
  if (!yearly && !monthly) return null;

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: 'text.secondary', letterSpacing: 0 }}>
        Latest Reports
      </Typography>
      <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', mb: 4 }}>
        {yearly && (
          <Box
            sx={{
              flex: 1,
              minWidth: 220,
              background: reportId === yearly.id ? 'rgba(162,89,247,0.08)' : 'rgba(255,255,255,0.01)',
              color: reportId === yearly.id ? '#a259f7' : 'text.primary',
              borderRadius: 12,
              boxShadow: '0 2px 8px 0 rgba(31,38,135,0.07)',
              border: reportId === yearly.id ? '1.5px solid #a259f7' : '1.5px solid transparent',
              p: 3,
              cursor: 'pointer',
              transition: 'all 0.18s',
              '&:hover': {
                boxShadow: '0 4px 16px 0 rgba(31,38,135,0.10)',
                border: '1.5px solid #a259f7',
                color: '#a259f7',
                background: 'rgba(162,89,247,0.08)',
              },
            }}
            onClick={() => onReportSelected(yearly.id)}
          >
            <Typography variant="body1" sx={{ fontWeight: 600, fontSize: '1.05rem', mb: 0.5, color: reportId === yearly.id ? '#a259f7' : 'text.primary' }}>
              Top Aircraft - {yearly.year}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Yearly report of the most popular MSFS aircraft for {yearly.year}.
            </Typography>
          </Box>
        )}
        {monthly && (
          <Box
            sx={{
              flex: 1,
              minWidth: 220,
              background: reportId === monthly.id ? 'rgba(162,89,247,0.08)' : 'rgba(255,255,255,0.01)',
              color: reportId === monthly.id ? '#a259f7' : 'text.primary',
              borderRadius: 12,
              boxShadow: '0 2px 8px 0 rgba(31,38,135,0.07)',
              border: reportId === monthly.id ? '1.5px solid #a259f7' : '1.5px solid transparent',
              p: 3,
              cursor: 'pointer',
              transition: 'all 0.18s',
              '&:hover': {
                boxShadow: '0 4px 16px 0 rgba(31,38,135,0.10)',
                border: '1.5px solid #a259f7',
                color: '#a259f7',
                background: 'rgba(162,89,247,0.08)',
              },
            }}
            onClick={() => onReportSelected(monthly.id)}
          >
            <Typography variant="body1" sx={{ fontWeight: 600, fontSize: '1.05rem', mb: 0.5, color: reportId === monthly.id ? '#a259f7' : 'text.primary' }}>
              Top Aircraft - {monthly.month && monthly.year ? `${new Date(0, monthly.month - 1).toLocaleString('default', { month: 'long' })} ${monthly.year}` : ''}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Monthly report of the most popular MSFS aircraft for {monthly.month && monthly.year ? `${new Date(0, monthly.month - 1).toLocaleString('default', { month: 'long' })} ${monthly.year}` : ''}.
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}
