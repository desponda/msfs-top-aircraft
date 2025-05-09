import { Box, Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { blue, indigo } from '@mui/material/colors';
import AircraftTable from './components/AircraftTable';
import MinimalHeader from './components/Header';
import Footer from './components/Footer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ReportDisplay } from './components/ReportDisplay';
import { AdminReportManager } from './components/AdminReportManager';
import { useState } from 'react';
import { ReportSelector } from './components/ReportSelector';

function App() {
  // Define a dark theme with diversified accent palette
  const theme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#3B82F6', // Blue 500
        light: '#60A5FA',
        dark: '#1D4ED8',
      },
      secondary: {
        main: '#2DD4BF', // Teal 400
        light: '#5EEAD4',
        dark: '#0F766E',
      },
      background: {
        default: '#191A23', // Deep neutral
        paper: 'rgba(255,255,255,0.01)', // Lighter, glassy
      },
      success: { main: '#22C55E' }, // Green 500
      error: { main: '#EF4444' },   // Red 500
      warning: { main: '#FBBF24' }, // Amber 400
      info: { main: '#3B82F6' },    // Blue 500
      text: {
        primary: '#f4f4fa',
        secondary: '#b0b8c1',
      },
    },
    typography: {
      fontFamily: [
        'Manrope',
        'Inter',
        'Roboto',
        '-apple-system',
        'BlinkMacSystemFont',
        'Segoe UI',
        'Arial',
        'sans-serif',
      ].join(','),
      h3: {
        fontWeight: 700,
        letterSpacing: '-0.5px',
        color: '#f4f4fa',
        fontSize: '2rem',
      },
      h4: {
        fontWeight: 600,
        color: '#f4f4fa',
        fontSize: '1.4rem',
      },
      h5: {
        fontWeight: 600,
        color: '#f4f4fa',
        fontSize: '1.1rem',
      },
      h6: {
        fontWeight: 500,
        color: '#b0b8c1',
        fontSize: '1rem',
      },
      subtitle2: {
        fontWeight: 600,
        color: '#b0b8c1',
        fontSize: '1rem',
        letterSpacing: 0,
      },
      body1: {
        fontWeight: 400,
        color: '#b0b8c1',
      },
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 18,
            boxShadow: '0 2px 8px 0 rgba(31,38,135,0.07)',
            background: 'rgba(255,255,255,0.01)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.04)',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 18,
            boxShadow: '0 2px 8px 0 rgba(31,38,135,0.07)',
            background: 'rgba(255,255,255,0.01)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.04)',
          },
        },
      },
      MuiTableContainer: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            background: 'rgba(255,255,255,0.01)',
            backdropFilter: 'blur(4px)',
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          head: {
            fontWeight: 600,
            backgroundColor: 'rgba(255,255,255,0.01)',
            color: '#b0b8c1',
          },
          root: {
            borderColor: 'rgba(255,255,255,0.04)',
            color: '#f4f4fa',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 999,
            textTransform: 'none',
            fontWeight: 600,
            fontSize: '1rem',
            padding: '0.5rem 1.5rem',
            boxShadow: '0 2px 8px rgba(59,130,246,0.08)', // blue shadow
          },
          containedPrimary: {
            background: 'linear-gradient(90deg, #3B82F6 0%, #232946 100%)',
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            fontWeight: 500,
            background: 'rgba(45,212,191,0.10)', // teal tint
            color: '#2DD4BF', // teal
          },
          colorPrimary: {
            background: '#3B82F6', // blue
            color: '#fff',
          },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: {
            color: '#b0b8c1',
            fontWeight: 600,
            '&.Mui-selected': {
              color: '#3B82F6',
            },
          },
        },
      },
      MuiTabs: {
        styleOverrides: {
          indicator: {
            background: '#3B82F6',
            height: 3,
            borderRadius: 2,
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
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            background: 'linear-gradient(120deg, #191A23 0%, #232946 100%)',
            position: 'relative',
          }}
        >
          <MinimalHeader />
          <Container maxWidth="lg" sx={{ py: 5, flex: 1, position: 'relative', zIndex: 1, mx: 'auto', mt: 4, mb: 4, px: { xs: 2, sm: 3, md: 4, lg: 6 } }}>
            <Routes>
              <Route path="/" element={
                <>
                  <ReportSelector onReportSelected={setSelectedReportId} reportId={selectedReportId} />
                  <ReportDisplay reportId={selectedReportId} hideReportHeader />
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
