import { Box, Typography, Container, Paper, Button } from '@mui/material';
import { blue } from '@mui/material/colors';
import { Link as RouterLink } from 'react-router-dom';

const Header = () => {
  return (
    <Paper
      elevation={0}
      sx={{
        position: 'relative',
        backgroundColor: '#111111',
        backgroundImage: 'linear-gradient(to right, #000000, #1a1a1a)',
        color: '#fff',
        mb: 4,
        borderRadius: 0,
        overflow: 'hidden',
      }}
    >
      {/* Abstract aircraft pattern background */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.1,
          zIndex: 0,
        }}
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1000 400"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Abstract aviation-themed pattern */}
          <path
            d="M100,200 Q150,100 200,200 T300,200 T400,200 T500,200 T600,200 T700,200 T800,200"
            fill="none"
            stroke="white"
            strokeWidth="2"
          />
          <path
            d="M100,220 Q150,120 200,220 T300,220 T400,220 T500,220 T600,220 T700,220 T800,220"
            fill="none"
            stroke="white"
            strokeWidth="2"
          />
          <path
            d="M100,180 Q150,80 200,180 T300,180 T400,180 T500,180 T600,180 T700,180 T800,180"
            fill="none"
            stroke="white"
            strokeWidth="2"
          />

          {/* Simplified airplane silhouettes */}
          <g transform="translate(100, 300) scale(0.5) rotate(-10)">
            <path
              d="M50,30 L80,30 L100,10 L350,10 L370,30 L400,30 L420,50 L350,50 L330,70 L120,70 L100,50 L50,50 Z"
              fill="white"
              opacity="0.5"
            />
            <path
              d="M250,10 L250,70"
              stroke="white"
              strokeWidth="5"
              opacity="0.5"
            />
            <path
              d="M200,20 L220,0 L280,0 L300,20 L300,30 L200,30 Z"
              fill="white"
              opacity="0.5"
            />
          </g>

          <g transform="translate(600, 100) scale(0.3) rotate(15)">
            <path
              d="M50,30 L80,30 L100,10 L350,10 L370,30 L400,30 L420,50 L350,50 L330,70 L120,70 L100,50 L50,50 Z"
              fill="white"
              opacity="0.5"
            />
            <path
              d="M250,10 L250,70"
              stroke="white"
              strokeWidth="5"
              opacity="0.5"
            />
            <path
              d="M200,20 L220,0 L280,0 L300,20 L300,30 L200,30 Z"
              fill="white"
              opacity="0.5"
            />
          </g>

          {/* Grid lines */}
          {Array(20).fill(0).map((_, i) => (
            <line
              key={`h-${i}`}
              x1="0"
              y1={i * 20}
              x2="1000"
              y2={i * 20}
              stroke="white"
              strokeWidth="0.5"
              opacity="0.2"
            />
          ))}

          {Array(50).fill(0).map((_, i) => (
            <line
              key={`v-${i}`}
              x1={i * 20}
              y1="0"
              x2={i * 20}
              y2="400"
              stroke="white"
              strokeWidth="0.5"
              opacity="0.2"
            />
          ))}
        </svg>
      </Box>

      {/* Content */}
      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ py: 8 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ mr: 4, flexShrink: 0 }}>
              {/* Modern airplane icon */}
              <RouterLink to="/">
                <svg width="120" height="120" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21.5,16v1L16,14v6l2,2v1H10v-1l2-2v-6L6.5,17v-1L12,9V4c0-1.1,0.9-2,2-2s2,0.9,2,2v5L21.5,16z" />
                </svg>
              </RouterLink>
            </Box>
            <Box>
              <Typography variant="h3" component="h1" sx={{ fontWeight: 700, mb: 1, color: '#00e5ff' }}>
                MSFS Aircraft Charts 2025
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 300, maxWidth: '800px', color: '#b0b0b0' }}>
                The comprehensive ranking of Microsoft Flight Simulator aircraft based on community popularity,
                votes, and trending data. Updated for 2025.
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', mt: 3, justifyContent: 'flex-end' }}>
            <Button
              component={RouterLink}
              to="/"
              sx={{
                color: '#00e5ff',
                mr: 2,
                '&:hover': {
                  backgroundColor: 'rgba(0, 229, 255, 0.08)'
                }
              }}
            >
              Home
            </Button>
            <Button
              component={RouterLink}
              to="/legacy"
              sx={{
                color: '#00e5ff',
                mr: 2,
                '&:hover': {
                  backgroundColor: 'rgba(0, 229, 255, 0.08)'
                }
              }}
            >
              Legacy Charts
            </Button>
            <Button
              component={RouterLink}
              to="/admin"
              variant="outlined"
              sx={{
                color: '#00e5ff',
                borderColor: '#00e5ff',
                '&:hover': {
                  borderColor: '#33eaff',
                  backgroundColor: 'rgba(0, 229, 255, 0.08)'
                }
              }}
            >
              Admin
            </Button>
          </Box>
        </Box>
      </Container>
    </Paper>
  );
};

export default Header;
