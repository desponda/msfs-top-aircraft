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
            <Button
              component={RouterLink}
              to="/admin"
              disableElevation
              variant="outlined"
              sx={{
                color: location.pathname === '/admin' ? 'primary.main' : '#f4f4fa',
                borderColor: '#23233a',
                fontWeight: 600,
                fontSize: '1rem',
                px: 2,
                minWidth: 0,
                borderRadius: 2,
                background: 'none',
                textTransform: 'none',
                '&:hover': {
                  color: 'primary.main',
                  borderColor: 'primary.main',
                  background: 'rgba(59,130,246,0.08)',
                },
              }}
            >
              Admin
            </Button>
          </Box>
        </Container>
      </Box>
      {/* Banner hero section below the header */}
      <Box
        sx={{
          width: '100%',
          aspectRatio: '16/4', // Use a wide aspect ratio for hero look
          overflow: 'hidden',
          position: 'relative',
          zIndex: 110,
          animation: 'fadeInBanner 1.2s cubic-bezier(0.4,0,0.2,1)',
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
            objectFit: 'cover', // Fill the box, cropping minimally if needed
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
            height: 40,
            background: 'linear-gradient(180deg, rgba(25,26,35,0) 0%, #191A23 100%)',
            pointerEvents: 'none',
          }}
        />
      </Box>
    </>
  );
};

export default MinimalHeader;
