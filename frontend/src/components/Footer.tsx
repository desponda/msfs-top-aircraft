import { Box, Container, Typography, Link, Divider } from '@mui/material';
import { blue } from '@mui/material/colors';
import { Link as RouterLink } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box sx={{ bgcolor: '#111111', py: 6, mt: 6, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <Container maxWidth="xl">
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
              <Link component={RouterLink} to="/" underline="hover" sx={{ mb: 1, color: '#b0b0b0', '&:hover': { color: '#00e5ff' } }}>
                Latest Reports
              </Link>
              <Link component={RouterLink} to="/legacy" underline="hover" sx={{ mb: 1, color: '#b0b0b0', '&:hover': { color: '#00e5ff' } }}>
                Legacy Charts
              </Link>
              <Link href="#" underline="hover" sx={{ mb: 1, color: '#b0b0b0', '&:hover': { color: '#00e5ff' } }}>
                Military Aircraft
              </Link>
              <Link href="#" underline="hover" sx={{ color: '#b0b0b0', '&:hover': { color: '#00e5ff' } }}>
                Helicopters
              </Link>
            </Box>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: '#ffffff' }}>
              Resources
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Link href="#" underline="hover" sx={{ mb: 1, color: '#b0b0b0', '&:hover': { color: '#00e5ff' } }}>
                About the Charts
              </Link>
              <Link href="#" underline="hover" sx={{ mb: 1, color: '#b0b0b0', '&:hover': { color: '#00e5ff' } }}>
                Submit an Aircraft
              </Link>
              <Link href="#" underline="hover" sx={{ mb: 1, color: '#b0b0b0', '&:hover': { color: '#00e5ff' } }}>
                Voting Guidelines
              </Link>
              <Link href="#" underline="hover" sx={{ color: '#b0b0b0', '&:hover': { color: '#00e5ff' } }}>
                FAQ
              </Link>
            </Box>
          </Box>
        </Box>

        <Box sx={{ mt: 4, pt: 4, borderTop: '1px solid rgba(255,255,255,0.1)', textAlign: 'center' }}>
          <Typography variant="body2" sx={{ color: '#808080' }}>
            © {currentYear} MSFS Aircraft Charts. Not affiliated with Microsoft Flight Simulator or Microsoft.
            All aircraft names and brands are property of their respective owners.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
