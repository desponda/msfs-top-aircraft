import React from 'react';
import { Chip, Tooltip } from '@mui/material';
import { Check as CheckIcon, Close as CloseIcon } from '@mui/icons-material';
import { CompatibilityStatus } from '../types/Aircraft';

interface CompatibilityIndicatorProps {
  status?: CompatibilityStatus;
  simulator: 'MSFS 2020' | 'MSFS 2024';
  compact?: boolean;
}

const CompatibilityIndicator: React.FC<CompatibilityIndicatorProps> = ({
  status,
  simulator,
  compact = false
}) => {
  if (!status) {
    return <span>-</span>;
  }

  if (status === CompatibilityStatus.NATIVE) {
    return (
      <Tooltip title={`Native support for ${simulator}`}>
        <Chip
          label={compact ? undefined : "Native"}
          size="small"
          color="success"
          variant="outlined"
          icon={<CheckIcon fontSize="small" />}
          sx={compact ?
            { '& .MuiChip-label': { display: 'none' }, width: 32 } :
            {
              bgcolor: 'rgba(0, 229, 255, 0.1)',
              borderColor: '#00e5ff',
              color: '#00e5ff',
              '& .MuiChip-icon': { color: '#00e5ff' }
            }
          }
        />
      </Tooltip>
    );
  } else if (status === CompatibilityStatus.COMPATIBLE) {
    return (
      <Tooltip title={`Compatible with ${simulator}`}>
        <Chip
          label={compact ? undefined : "Compatible"}
          size="small"
          color="info"
          variant="outlined"
          icon={<CheckIcon fontSize="small" />}
          sx={compact ?
            { '& .MuiChip-label': { display: 'none' }, width: 32 } :
            {
              bgcolor: 'rgba(0, 229, 255, 0.05)',
              borderColor: '#0097a7',
              color: '#0097a7',
              '& .MuiChip-icon': { color: '#0097a7' }
            }
          }
        />
      </Tooltip>
    );
  } else {
    return (
      <Tooltip title={`Not compatible with ${simulator}`}>
        <Chip
          label={compact ? undefined : "Not Compatible"}
          size="small"
          color="error"
          variant="outlined"
          icon={<CloseIcon fontSize="small" />}
          sx={compact ?
            { '& .MuiChip-label': { display: 'none' }, width: 32 } :
            {
              bgcolor: 'rgba(244, 67, 54, 0.1)',
              borderColor: '#d32f2f',
              color: '#f44336',
              '& .MuiChip-icon': { color: '#f44336' }
            }
          }
        />
      </Tooltip>
    );
  }
};

export default CompatibilityIndicator;
