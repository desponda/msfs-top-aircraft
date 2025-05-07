import { Box, Container, Typography, Link, Divider } from '@mui/material';
import { blue } from '@mui/material/colors';
import { Link as RouterLink } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box sx={{ bgcolor: 'white', py: 6, mt: 6 }}>
      <Container maxWidth="xl">
        <Divider sx={{ mb: 4 }} />
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, color: blue[700], mb: 2 }}>
              MSFS Aircraft Charts
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ maxWidth: '400px' }}>
              A community-driven resource ranking the most popular aircraft add-ons
              for Microsoft Flight Simulator. Updated regularly based on user votes and feedback.
            </Typography>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
              Navigation
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Link component={RouterLink} to="/" underline="hover" color="text.secondary" sx={{ mb: 1 }}>
                Latest Reports
              </Link>
              <Link component={RouterLink} to="/legacy" underline="hover" color="text.secondary" sx={{ mb: 1 }}>
                Legacy Charts
              </Link>
              <Link href="#" underline="hover" color="text.secondary" sx={{ mb: 1 }}>
                Military Aircraft
              </Link>
              <Link href="#" underline="hover" color="text.secondary">
                Helicopters
              </Link>
            </Box>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
              Resources
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Link href="#" underline="hover" color="text.secondary" sx={{ mb: 1 }}>
                About the Charts
              </Link>
              <Link href="#" underline="hover" color="text.secondary" sx={{ mb: 1 }}>
                Submit an Aircraft
              </Link>
              <Link href="#" underline="hover" color="text.secondary" sx={{ mb: 1 }}>
                Voting Guidelines
              </Link>
              <Link href="#" underline="hover" color="text.secondary">
                FAQ
              </Link>
            </Box>
          </Box>
        </Box>

        <Box sx={{ mt: 4, pt: 4, borderTop: '1px solid #eaeaea', textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            © {currentYear} MSFS Aircraft Charts. Not affiliated with Microsoft Flight Simulator or Microsoft.
            All aircraft names and brands are property of their respective owners.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
