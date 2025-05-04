import { Box, Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { blue, indigo } from '@mui/material/colors';
import AircraftTable from './components/AircraftTable';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  // Define a theme with blue/indigo colors for an aviation feel
  const theme = createTheme({
    palette: {
      mode: 'light',
      primary: blue,
      secondary: indigo,
      background: {
        default: '#f5f5f7',
      },
    },
    typography: {
      fontFamily: [
        'Inter',
        'Roboto',
        '-apple-system',
        'BlinkMacSystemFont',
        'Segoe UI',
        'Arial',
        'sans-serif',
      ].join(','),
      h4: {
        fontWeight: 600,
        color: blue[700],
      },
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
          },
        },
      },
      MuiTableContainer: {
        styleOverrides: {
          root: {
            borderRadius: 8,
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          head: {
            fontWeight: 600,
            backgroundColor: blue[50],
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            textTransform: 'none',
            fontWeight: 500,
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 6,
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          bgcolor: theme.palette.background.default,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Header />
        <Container maxWidth="xl" sx={{ py: 4, flex: 1 }}>
          <AircraftTable />
        </Container>
        <Footer />
      </Box>
    </ThemeProvider>
  )
}

export default App
