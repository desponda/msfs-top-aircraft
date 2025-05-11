import React from 'react';
import { TableRow, TableCell, Chip, Tooltip, Link } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { AircraftWithVotes } from '../types/Aircraft';
import CompatibilityChips from './CompatibilityChips';

interface AircraftTableRowProps {
  aircraft: AircraftWithVotes;
  showPositionChange: boolean;
  idx: number;
}

const CATEGORY_COLORS: Record<string, { bg: string; color: string }> = {
  'Piston GA': { bg: 'linear-gradient(90deg, #3B82F6 0%, #60A5FA 100%)', color: '#fff' },
  'Airliner': { bg: 'linear-gradient(90deg, #EF4444 0%, #F59E42 100%)', color: '#fff' },
  'Turboprop': { bg: 'linear-gradient(90deg, #FBBF24 0%, #F59E42 100%)', color: '#232946' },
  'Jet': { bg: 'linear-gradient(90deg, #6366F1 0%, #A259F7 100%)', color: '#fff' },
  'Helicopter': { bg: 'linear-gradient(90deg, #10B981 0%, #22D3EE 100%)', color: '#fff' },
  'Glider': { bg: 'linear-gradient(90deg, #F472B6 0%, #A259F7 100%)', color: '#fff' },
  'Ultralight': { bg: 'linear-gradient(90deg, #F59E42 0%, #FBBF24 100%)', color: '#232946' },
  'Military': { bg: 'linear-gradient(90deg, #232946 0%, #6366F1 100%)', color: '#fff' },
};

const AircraftTableRow: React.FC<AircraftTableRowProps> = ({ aircraft, showPositionChange, idx }) => {
  let posChange = (aircraft as any).positionChange;
  let posChangeDisplay = null;
  if (posChange === null || posChange === undefined) {
    posChangeDisplay = <Chip label="NEW" size="small" sx={{ bgcolor: '#22C55E', color: '#fff', fontWeight: 700 }} />;
  } else if (posChange > 0) {
    posChangeDisplay = <span style={{ color: '#22C55E', fontWeight: 700 }}>▲ {Math.abs(posChange)}</span>;
  } else if (posChange < 0) {
    posChangeDisplay = <span style={{ color: '#EF4444', fontWeight: 700 }}>▼ {Math.abs(posChange)}</span>;
  } else {
    posChangeDisplay = <span style={{ color: '#FFD600', fontWeight: 700 }}>–</span>;
  }

  return (
    <TableRow
      key={aircraft.id}
      hover
      sx={{
        background: idx % 2 === 0 ? 'rgba(255,255,255,0.01)' : 'rgba(255,255,255,0.03)',
        transition: 'background 0.2s',
        '&:hover': {
          background: 'rgba(162,89,247,0.07)',
        },
      }}
    >
      <TableCell sx={{ color: '#f4f4fa', fontWeight: 700, px: { xs: 1, md: 2 }, fontSize: { xs: '0.92rem', md: '1rem' } }}>{(aircraft as any).rank !== undefined ? (aircraft as any).rank : '-'}</TableCell>
      {showPositionChange && (
        <TableCell sx={{ px: { xs: 1, md: 2 }, fontSize: { xs: '1.1rem', md: '1.1rem' }, textAlign: 'center' }}>{posChangeDisplay}</TableCell>
      )}
      <TableCell sx={{ px: { xs: 1, md: 2 }, fontSize: { xs: '0.92rem', md: '1rem' } }}>
        <Tooltip title={aircraft.name} placement="top" arrow>
          <span style={{ color: '#f4f4fa', textDecoration: 'underline', cursor: 'pointer', fontWeight: 500 }}>
            <Link
              href={aircraft.buyUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {aircraft.name}
              <OpenInNewIcon fontSize="small" sx={{ ml: 0.5 }} />
            </Link>
          </span>
        </Tooltip>
      </TableCell>
      <TableCell sx={{ color: '#f4f4fa', fontWeight: 600, px: { xs: 1, md: 2 }, fontSize: { xs: '0.92rem', md: '1rem' } }}>{aircraft.manufacturer}</TableCell>
      <TableCell sx={{ color: '#f4f4fa', fontWeight: 600, px: { xs: 1, md: 2 }, fontSize: { xs: '0.92rem', md: '1rem' } }}>{typeof aircraft.votes === 'number' ? aircraft.votes : '-'}</TableCell>
      <TableCell sx={{ px: { xs: 1, md: 2 }, fontSize: { xs: '0.92rem', md: '1rem' } }}>
        <Chip
          label={aircraft.category}
          variant="outlined"
          size="small"
          sx={{
            background: CATEGORY_COLORS[aircraft.category]?.bg || 'rgba(255,255,255,0.08)',
            color: CATEGORY_COLORS[aircraft.category]?.color || '#fff',
            fontWeight: 600,
            fontSize: '0.92rem',
            borderRadius: 2,
            letterSpacing: 0,
            boxShadow: '0 2px 8px 0 rgba(31,38,135,0.10)',
            border: 'none',
            px: 1.5,
            py: 0.5,
            transition: 'transform 0.18s',
            '&:hover': {
              transform: 'scale(1.08)',
              boxShadow: '0 4px 16px 0 rgba(162,89,247,0.18)',
            },
          }}
        />
      </TableCell>
      <TableCell sx={{ px: { xs: 1, md: 2 }, fontSize: { xs: '0.92rem', md: '1rem' } }}>
        <Chip
          label={aircraft.payware === 'Both Free & Premium' ? 'Mixed' : (aircraft.payware || 'Unknown')}
          variant="filled"
          size="small"
          sx={{
            background: 'rgba(255,255,255,0.04)',
            color: 'text.secondary',
            fontWeight: 500,
            fontSize: '0.92rem',
            paddingX: 1.2,
            borderRadius: 2,
            letterSpacing: 0,
          }}
        />
      </TableCell>
      <TableCell sx={{ color: '#f4f4fa', fontWeight: 600, px: { xs: 1, md: 2 }, fontSize: { xs: '0.92rem', md: '1rem' } }}>{typeof (aircraft as any).weeksInChart === 'number' ? (aircraft as any).weeksInChart : '-'}</TableCell>
      <TableCell sx={{ px: { xs: 1, md: 2 }, fontSize: { xs: '0.92rem', md: '1rem' } }}>
        <CompatibilityChips msfs2020Compatibility={(aircraft as any).msfs2020Compatibility} msfs2024Compatibility={(aircraft as any).msfs2024Compatibility} />
      </TableCell>
    </TableRow>
  );
};

export default AircraftTableRow; 