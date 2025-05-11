import { Box, Typography, Container, Button } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';

const BANNER_HEIGHT = { xs: 80, sm: 120, md: 180, lg: 220 };

const MinimalHeader = () => {
  const location = useLocation();
  return (
    <>
      {/* Sticky header at the very top */}
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 120,
          height: 56,
          background: 'rgba(20,22,34,0.5)',
          color: '#f4f4fa',
          borderBottom: '1px solid #23233a',
          boxShadow: '0 4px 24px 0 rgba(25,26,35,0.18)',
          display: 'flex',
          alignItems: 'center',
          backdropFilter: 'blur(12px)',
        }}
      >
        <Container maxWidth="xl" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', height: 1 }}>
          {/* Navigation only, no logo/product name */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Button
              component={RouterLink}
              to="/"
              disableElevation
              variant="text"
              sx={{
                color: location.pathname === '/' ? 'primary.main' : '#f4f4fa',
                fontWeight: 600,
                fontSize: '1rem',
                px: 2,
                minWidth: 0,
                borderRadius: 2,
                background: 'none',
                textTransform: 'none',
                '&:hover': {
                  color: 'primary.main',
                  background: 'rgba(59,130,246,0.08)',
                },
              }}
            >
              Home
            </Button>
            <Button
              component={RouterLink}
              to="/legacy"
              disableElevation
              variant="text"
              sx={{
                color: location.pathname === '/legacy' ? 'primary.main' : '#f4f4fa',
                fontWeight: 600,
                fontSize: '1rem',
                px: 2,
                minWidth: 0,
                borderRadius: 2,
                background: 'none',
                textTransform: 'none',
                '&:hover': {
                  color: 'primary.main',
                  background: 'rgba(59,130,246,0.08)',
                },
              }}
            >
              Legacy Charts
            </Button>
          </Box>
        </Container>
      </Box>
      {/* Banner hero section below the header */}
      <Box
        sx={{
          width: '100%',
          aspectRatio: '16/4',
          overflow: 'hidden',
          position: 'relative',
          zIndex: 110,
          animation: 'fadeInBanner 1.2s cubic-bezier(0.4,0,0.2,1)',
          mb: -4, // Reduce vertical gap below banner
          '@keyframes fadeInBanner': {
            from: { opacity: 0, transform: 'translateY(-16px)' },
            to: { opacity: 1, transform: 'none' },
          },
        }}
      >
        <Box
          component="img"
          src="/banner-with-title.png"
          alt="MSFS Aircraft Charts Banner"
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            display: 'block',
            userSelect: 'none',
            filter: 'brightness(0.96)',
            position: 'absolute',
            left: 0,
            top: 0,
          }}
        />
        {/* Subtle dark overlay for contrast */}
        <Box
          sx={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(180deg, rgba(20,22,34,0.18) 0%, rgba(20,22,34,0.32) 100%)',
            pointerEvents: 'none',
          }}
        />
        {/* Gradient fade at the bottom for blending */}
        <Box
          sx={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: 64,
            background: 'linear-gradient(180deg, rgba(25,26,35,0) 0%, #191A23 100%)',
            pointerEvents: 'none',
          }}
        />
      </Box>
      {/* Hero section below the banner */}
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          zIndex: 120,
          mt: { xs: 0, md: -6 }, // Pull hero up closer to banner
          mb: 4,
        }}
      >
        <Box sx={{ textAlign: 'center', mb: 2 }}>
          <Box
            component="h1"
            sx={{
              fontSize: { xs: '2.2rem', md: '3.2rem' },
              fontWeight: 800,
              letterSpacing: '-1px',
              color: '#3B82F6',
              lineHeight: 1.1,
              mb: 1,
              display: 'inline-block',
              textShadow: '0 4px 32px rgba(59,130,246,0.18), 0 1.5px 0 #232347',
            }}
          >
            Discover the Top MSFS Aircraft
          </Box>
          <Box
            component="h2"
            sx={{
              fontSize: { xs: '1.2rem', md: '1.7rem' }, // Larger
              fontWeight: 600, // Bolder
              color: '#b0b8c1',
              mt: 1,
              mb: 2,
              maxWidth: 600,
              mx: 'auto',
              lineHeight: 1.4,
            }}
          >
            Live, community-driven charts for Microsoft Flight Simulator. Explore, compare, and vote for your favorite aircraft.
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default MinimalHeader;
