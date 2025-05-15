import React from 'react';
import { Card, CardContent, Typography, Button, Chip, Box } from '@mui/material';
import CompatibilityChips from './CompatibilityChips';
import { AircraftWithVotes } from '../types/Aircraft';
import { getAircraftTypeLabels, getAircraftTypeColors } from '../utils/aircraftTypeUtils';

interface AircraftCardProps {
  aircraft: AircraftWithVotes;
  showPositionChange: boolean;
}

const AircraftCard: React.FC<AircraftCardProps> = ({ aircraft, showPositionChange }) => {
  const posChange = (aircraft as AircraftWithVotes & { positionChange?: number }).positionChange;
  let posChangeDisplay = null;
  if (posChange === null || posChange === undefined) {
    posChangeDisplay = <Chip label="NEW" size="small" sx={{ bgcolor: '#22C55E', color: '#fff', fontWeight: 700, ml: 1 }} />;
  } else if (posChange > 0) {
    posChangeDisplay = <span style={{ color: '#22C55E' }}>▲ {Math.abs(posChange)}</span>;
  } else if (posChange < 0) {
    posChangeDisplay = <span style={{ color: '#EF4444' }}>▼ {Math.abs(posChange)}</span>;
  } else {
    posChangeDisplay = <span style={{ color: '#FFD600' }}>–</span>;
  }

  return (
    <Card sx={{ mb: 2, background: 'rgba(255,255,255,0.01)', borderRadius: 4, boxShadow: '0 2px 8px 0 rgba(31,38,135,0.07)', width: '100%' }}>
      <CardContent>
        <Typography variant="h6" sx={{ color: '#a259f7', fontWeight: 700, mb: 1 }}>
          {(aircraft as AircraftWithVotes & { rank?: number }).rank !== undefined ? `#${(aircraft as AircraftWithVotes & { rank?: number }).rank}` : '-'} {aircraft.name}
          {showPositionChange && posChangeDisplay}
        </Typography>
        <Typography variant="subtitle2" sx={{ color: 'text.secondary', mb: 0.5 }}>
          <b>Aircraft:</b> {aircraft.name}
        </Typography>
        <Typography variant="subtitle2" sx={{ color: 'text.secondary', mb: 0.5 }}>
          <b>Developer:</b> {aircraft.manufacturer}
        </Typography>
        <Typography variant="body2" sx={{ mb: 0.5 }}>
          <b>Votes:</b> {typeof aircraft.votes === 'number' ? aircraft.votes : '-'}
        </Typography>
        <Typography variant="body2" sx={{ mb: 0.5 }}>
          <b>Category:</b> {aircraft.category}
        </Typography>
        <Typography variant="body2" sx={{ mb: 0.5 }}>
          <b>Type:</b> 
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, mt: 0.5, ml: 1 }}>
            {getAircraftTypeLabels(aircraft.payware).map((label, index) => (
              <Chip
                key={`${aircraft.id}-type-${index}`}
                label={label}
                size="small"
                sx={{
                  background: getAircraftTypeColors(label).bg,
                  color: getAircraftTypeColors(label).color,
                  fontWeight: 600,
                  fontSize: '0.8rem',
                  height: '20px',
                }}
              />
            ))}
          </Box>
        </Typography>
        <Typography variant="body2" sx={{ mb: 0.5 }}>
          <b>Weeks in Chart:</b> {typeof (aircraft as AircraftWithVotes & { weeksInChart?: number }).weeksInChart === 'number' ? (aircraft as AircraftWithVotes & { weeksInChart?: number }).weeksInChart : '-'}
        </Typography>
        <Typography variant="body2" sx={{ mb: 0.5 }}>
          <b>Compatibility:</b> <CompatibilityChips msfs2020Compatibility={(aircraft as AircraftWithVotes & { msfs2020Compatibility?: string }).msfs2020Compatibility} msfs2024Compatibility={(aircraft as AircraftWithVotes & { msfs2024Compatibility?: string }).msfs2024Compatibility} />
        </Typography>
        {aircraft.buyUrl && (
          <Button href={aircraft.buyUrl} target="_blank" rel="noopener noreferrer" variant="outlined" size="small" sx={{ mt: 1 }}>
            View Product
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default AircraftCard; 