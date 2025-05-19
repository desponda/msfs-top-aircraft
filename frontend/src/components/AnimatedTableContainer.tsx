import React from 'react';
import { motion } from 'framer-motion';
import { TableContainer, Table, SxProps, Theme } from '@mui/material';

interface AnimatedTableContainerProps {
  children: React.ReactNode;
  sx?: SxProps<Theme>;
  onAnimationComplete?: () => void;
}

const AnimatedTableContainer: React.FC<AnimatedTableContainerProps> = ({ children, sx, onAnimationComplete }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scaleY: 0.8, height: 0, transformOrigin: 'top' }}
      animate={{ opacity: 1, scaleY: 1, height: 'auto' }}
      exit={{ opacity: 0, scaleY: 0.8, height: 0 }}
      transition={{ duration: 0.6, ease: [0.04, 0.62, 0.23, 0.98] }}
      onAnimationComplete={onAnimationComplete}
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
          ...sx
        }}
      >
        <Table stickyHeader>
          {children}
        </Table>
      </TableContainer>
    </motion.div>
  );
};

export default AnimatedTableContainer;
