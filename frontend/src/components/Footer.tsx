import { Box, Container, Typography, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box sx={{ bgcolor: 'rgba(24,28,36,0.85)', py: 6, mt: 6, borderTop: '1.5px solid rgba(0,229,255,0.08)', boxShadow: '0 8px 32px 0 rgba(31,38,135,0.13)', backdropFilter: 'blur(8px)', position: 'relative', overflow: 'hidden' }}>
      {/* Subtle gradient overlay */}
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'radial-gradient(circle at 80% 10%, rgba(127,90,240,0.10) 0%, transparent 70%)',
        zIndex: 0,
        pointerEvents: 'none',
      }} />
      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, color: '#00e5ff', mb: 2 }}>
              MSFS Aircraft Charts
            </Typography>
            <Typography variant="body2" sx={{ maxWidth: '400px', color: '#a0a0a0' }}>
              A community-driven resource ranking the most popular aircraft add-ons
              for Microsoft Flight Simulator. Updated regularly based on user votes and feedback.
            </Typography>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: '#ffffff' }}>
              Navigation
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Link component={RouterLink} to="/" underline="hover" sx={{ mb: 1, color: '#b0b8c1', borderRadius: 999, px: 2, py: 0.5, fontWeight: 600, transition: 'background 0.2s, color 0.2s', '&:hover': { color: '#00e5ff', background: 'rgba(0,229,255,0.10)' } }}>
                Latest Reports
              </Link>
              <Link component={RouterLink} to="/legacy" underline="hover" sx={{ mb: 1, color: '#b0b8c1', borderRadius: 999, px: 2, py: 0.5, fontWeight: 600, transition: 'background 0.2s, color 0.2s', '&:hover': { color: '#00e5ff', background: 'rgba(0,229,255,0.10)' } }}>
                Legacy Charts
              </Link>
              <Link href="#" underline="hover" sx={{ mb: 1, color: '#b0b8c1', borderRadius: 999, px: 2, py: 0.5, fontWeight: 600, transition: 'background 0.2s, color 0.2s', '&:hover': { color: '#00e5ff', background: 'rgba(0,229,255,0.10)' } }}>
                Military Aircraft
              </Link>
              <Link href="#" underline="hover" sx={{ color: '#b0b8c1', borderRadius: 999, px: 2, py: 0.5, fontWeight: 600, transition: 'background 0.2s, color 0.2s', '&:hover': { color: '#00e5ff', background: 'rgba(0,229,255,0.10)' } }}>
                Helicopters
              </Link>
            </Box>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: '#ffffff' }}>
              Resources
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Link href="#" underline="hover" sx={{ mb: 1, color: '#b0b8c1', borderRadius: 999, px: 2, py: 0.5, fontWeight: 600, transition: 'background 0.2s, color 0.2s', '&:hover': { color: '#00e5ff', background: 'rgba(0,229,255,0.10)' } }}>
                About the Charts
              </Link>
              <Link href="#" underline="hover" sx={{ mb: 1, color: '#b0b8c1', borderRadius: 999, px: 2, py: 0.5, fontWeight: 600, transition: 'background 0.2s, color 0.2s', '&:hover': { color: '#00e5ff', background: 'rgba(0,229,255,0.10)' } }}>
                Submit an Aircraft
              </Link>
              <Link href="#" underline="hover" sx={{ mb: 1, color: '#b0b8c1', borderRadius: 999, px: 2, py: 0.5, fontWeight: 600, transition: 'background 0.2s, color 0.2s', '&:hover': { color: '#00e5ff', background: 'rgba(0,229,255,0.10)' } }}>
                Voting Guidelines
              </Link>
              <Link href="#" underline="hover" sx={{ color: '#b0b8c1', borderRadius: 999, px: 2, py: 0.5, fontWeight: 600, transition: 'background 0.2s, color 0.2s', '&:hover': { color: '#00e5ff', background: 'rgba(0,229,255,0.10)' } }}>
                FAQ
              </Link>
            </Box>
          </Box>
        </Box>

        <Box sx={{ mt: 4, pt: 4, borderTop: '1px solid rgba(255,255,255,0.1)', textAlign: 'center' }}>
          <Typography variant="body2" sx={{ color: '#7f8fa6', fontWeight: 500 }}>
            © {currentYear} MSFS Aircraft Charts. Not affiliated with Microsoft Flight Simulator or Microsoft.
            All aircraft names and brands are property of their respective owners.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
