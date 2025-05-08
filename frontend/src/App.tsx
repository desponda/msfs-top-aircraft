import { Box, Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { blue, indigo } from '@mui/material/colors';
import AircraftTable from './components/AircraftTable';
import Header from './components/Header';
import Footer from './components/Footer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ReportSelector } from './components/ReportSelector';
import { ReportDisplay } from './components/ReportDisplay';
import { AdminReportManager } from './components/AdminReportManager';
import { useState } from 'react';

function App() {
  // Define a dark theme with cyan/blue accents inspired by the screenshot
  const theme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#00e5ff', // Bright cyan similar to the screenshot
        light: '#33eaff',
        dark: '#00a0b2',
      },
      secondary: {
        main: '#7986cb', // Light indigo
        light: '#aab6fe',
        dark: '#49599a',
      },
      background: {
        default: '#1e1e1e',
        paper: '#2d2d2d',
      },
      text: {
        primary: '#ffffff',
        secondary: '#b0b0b0',
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
        color: '#00e5ff', // Cyan accent color
      },
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
            background: '#2d2d2d',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
            background: '#2d2d2d',
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
            backgroundColor: '#1a1a1a', // Dark header
          },
          root: {
            borderColor: 'rgba(255, 255, 255, 0.1)', // Subtle border color
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
          containedPrimary: {
            background: 'linear-gradient(45deg, #00e5ff 10%, #2979ff 90%)',
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
      MuiTab: {
        styleOverrides: {
          root: {
            color: '#b0b0b0',
            '&.Mui-selected': {
              color: '#00e5ff',
            }
          },
        },
      },
      MuiTabs: {
        styleOverrides: {
          indicator: {
            backgroundColor: '#00e5ff',
          },
        },
      },
    },
  });

  const [selectedReportId, setSelectedReportId] = useState<string>('');

  return (
    <BrowserRouter>
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
            <Routes>
              <Route path="/" element={
                <>
                  <ReportSelector onReportSelected={setSelectedReportId} reportId={selectedReportId} />
                  <ReportDisplay reportId={selectedReportId} />
                </>
              } />
              <Route path="/admin" element={<AdminReportManager />} />
              <Route path="/legacy" element={<AircraftTable />} />
            </Routes>
          </Container>
          <Footer />
        </Box>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
