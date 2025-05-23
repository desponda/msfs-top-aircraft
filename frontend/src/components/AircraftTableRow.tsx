import React from 'react';
import { TableRow, TableCell, Chip, Tooltip, Link, Box } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { AircraftWithVotes } from '../types/Aircraft';
import CompatibilityChips from './CompatibilityChips';
import { getAircraftTypeLabels, getAircraftTypeColors } from '../utils/aircraftTypeUtils';

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
  const posChange = (aircraft as AircraftWithVotes & { positionChange?: number }).positionChange;
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
      <TableCell sx={{ color: '#f4f4fa', fontWeight: 700, px: { xs: 1, md: 2 }, fontSize: { xs: '0.92rem', md: '1rem' } }}>{(aircraft as AircraftWithVotes & { rank?: number }).rank != null ? (aircraft as AircraftWithVotes & { rank?: number }).rank : '-'}</TableCell>
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
      <TableCell sx={{ color: '#f4f4fa', fontWeight: 600, px: { xs: 1, md: 2 }, fontSize: { xs: '0.92rem', md: '1rem' } }}>{aircraft.votes != null ? aircraft.votes : '-'}</TableCell>
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
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, alignItems: 'flex-start' }}>
          {getAircraftTypeLabels(aircraft.payware).map((label, index) => (
            <Chip
              key={`${aircraft.id}-type-${index}`}
              label={label}
              variant="filled"
              size="small"
              sx={{
                background: getAircraftTypeColors(label).bg,
                color: getAircraftTypeColors(label).color,
                fontWeight: 600,
                fontSize: '0.92rem',
                paddingX: 1.2,
                borderRadius: 2,
                letterSpacing: 0,
                transition: 'transform 0.18s',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                },
              }}
            />
          ))}
        </Box>
      </TableCell>
      <TableCell sx={{ color: '#f4f4fa', fontWeight: 600, px: { xs: 1, md: 2 }, fontSize: { xs: '0.92rem', md: '1rem' } }}>{(aircraft as AircraftWithVotes & { weeksInChart?: number }).weeksInChart != null ? (aircraft as AircraftWithVotes & { weeksInChart?: number }).weeksInChart : '-'}</TableCell>
      <TableCell sx={{ px: { xs: 1, md: 2 }, fontSize: { xs: '0.92rem', md: '1rem' } }}>
        <CompatibilityChips msfs2020Compatibility={(aircraft as AircraftWithVotes & { msfs2020Compatibility?: string }).msfs2020Compatibility} msfs2024Compatibility={(aircraft as AircraftWithVotes & { msfs2024Compatibility?: string }).msfs2024Compatibility} />
      </TableCell>
    </TableRow>
  );
};

export default AircraftTableRow; 