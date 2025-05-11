import React from 'react';
import { Chip, Typography } from '@mui/material';
import { CompatibilityStatus } from '../types/Aircraft';

interface CompatibilityChipsProps {
  msfs2020Compatibility?: string;
  msfs2024Compatibility?: string;
}

const CompatibilityChips: React.FC<CompatibilityChipsProps> = ({ msfs2020Compatibility, msfs2024Compatibility }) => {
  const chips: React.ReactNode[] = [];
  if (msfs2020Compatibility === CompatibilityStatus.NATIVE) {
    chips.push(<Chip key="2020-native" label="MSFS 2020" size="small" sx={{ bgcolor: '#22C55E', color: '#fff', mr: 0.5, fontWeight: 600 }} />);
  } else if (msfs2020Compatibility === CompatibilityStatus.COMPATIBLE) {
    chips.push(<Chip key="2020-compatible" label="MSFS 2020" size="small" sx={{ bgcolor: '#FFD600', color: '#232946', mr: 0.5, fontWeight: 600 }} />);
  }
  if (msfs2024Compatibility === CompatibilityStatus.NATIVE) {
    chips.push(<Chip key="2024-native" label="MSFS 2024" size="small" sx={{ bgcolor: '#22C55E', color: '#fff', mr: 0.5, fontWeight: 600 }} />);
  } else if (msfs2024Compatibility === CompatibilityStatus.COMPATIBLE) {
    chips.push(<Chip key="2024-compatible" label="MSFS 2024" size="small" sx={{ bgcolor: '#FFD600', color: '#232946', mr: 0.5, fontWeight: 600 }} />);
  }
  return chips.length > 0 ? <>{chips}</> : <Typography variant="caption" color="text.secondary">Not Compatible</Typography>;
};

export default CompatibilityChips; 