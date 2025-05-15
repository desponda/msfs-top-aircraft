import React from 'react';
import { motion } from 'framer-motion';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';

const containerVariants = {
  hidden: { 
    opacity: 0, 
    height: 0,
    scaleY: 0, 
    transformOrigin: 'top' 
  },
  visible: { 
    opacity: 1, 
    height: 'auto',
    scaleY: 1,
    transition: { 
      duration: 0.5, 
      ease: "easeOut",
      staggerChildren: 0.05
    }
  }
};

const rowVariants = {
  hidden: { 
    opacity: 0, 
    y: 20,
    scaleY: 0.8
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scaleY: 1,
    transition: { duration: 0.3 }
  }
};

interface AnimatedTableProps {
  children: React.ReactNode;
  tableProps?: React.ComponentProps<typeof Table>;
  containerSx?: React.ComponentProps<typeof TableContainer>['sx'];
  showPositionChange?: boolean;
  loading?: boolean;
  noDataMessage?: string;
}

const AnimatedTable: React.FC<AnimatedTableProps> = ({ 
  children, 
  tableProps, 
  containerSx,
  showPositionChange,
  loading,
  noDataMessage
}) => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <TableContainer 
        sx={{
          mt: 3,
          boxShadow: '0 2px 8px 0 rgba(31,38,135,0.07)',
          borderRadius: 4,
          overflow: 'auto',
          background: 'rgba(255,255,255,0.01)',
          width: '100%',
          maxWidth: '100vw',
          minWidth: 700,
          ...containerSx
        }}
      >
        <Table stickyHeader {...tableProps}>
          {children}
        </Table>
      </TableContainer>
    </motion.div>
  );
};

// Animated versions of the table components
export const AnimatedTableRow = motion(TableRow);
AnimatedTableRow.defaultProps = {
  variants: rowVariants,
};

export default AnimatedTable;
