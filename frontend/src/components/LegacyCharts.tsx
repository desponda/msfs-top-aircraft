import { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  // Grid not used in this component
  Skeleton,
  Button,
  useTheme,
  SelectChangeEvent,
  Paper
} from '@mui/material';
import { ReportService } from '../services/ReportService';
import { Report, ReportType } from '../types/Report';
import AircraftTable from './AircraftTable';
import { CalendarMonth, CalendarToday } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

const LegacyCharts = () => {
  const [availableYears, setAvailableYears] = useState<number[]>([]);
  const [availableMonths, setAvailableMonths] = useState<{id: string, month: number, year: number}[]>([]);
  const [availableYearReports, setAvailableYearReports] = useState<{id: string, year: number}[]>([]);
  
  const [selectedYearReport, setSelectedYearReport] = useState<string | null>(null);
  const [selectedMonthReport, setSelectedMonthReport] = useState<string | null>(null);
  
  const [yearReportData, setYearReportData] = useState<Report | null>(null);
  const [monthReportData, setMonthReportData] = useState<Report | null>(null);
  
  const [initialLoading, setInitialLoading] = useState<boolean>(true);
  const [reportLoading, setReportLoading] = useState<boolean>(false);
  const [reportType, setReportType] = useState<'monthly' | 'yearly'>('yearly');
  const [error, setError] = useState<string | null>(null);
  
  const theme = useTheme();

  // Initial load to get all available reports
  useEffect(() => {
    const fetchReports = async () => {
      setInitialLoading(true);
      setError(null);
      try {
        const reports = await ReportService.getAll();
        
        // Extract unique years
        const years = [...new Set(reports.map(r => r.year))].sort((a, b) => b - a);
        setAvailableYears(years);
        
        // Group monthly reports
        const monthlyReports = reports
          .filter(r => r.type === ReportType.MONTHLY)
          .map(r => ({
            id: r.id,
            month: r.month || 0,
            year: r.year
          }))
          .sort((a, b) => {
            if (a.year !== b.year) return b.year - a.year;
            return b.month - a.month;
          });
        
        setAvailableMonths(monthlyReports);
        
        // Group yearly reports
        const yearlyReports = reports
          .filter(r => r.type === ReportType.YEARLY)
          .map(r => ({
            id: r.id,
            year: r.year
          }))
          .sort((a, b) => b.year - a.year);
        
        setAvailableYearReports(yearlyReports);
        
        // Set defaults if available
        if (yearlyReports.length > 0) {
          setSelectedYearReport(yearlyReports[0].id);
        }
        
        if (monthlyReports.length > 0) {
          setSelectedMonthReport(monthlyReports[0].id);
        }
        
        // Set initial report type based on availability
        if (yearlyReports.length === 0 && monthlyReports.length > 0) {
          setReportType('monthly');
        }
      } catch (error) {
        console.error('Failed to fetch reports:', error);
        setError('Failed to load available reports. Please try refreshing the page.');
      } finally {
        setInitialLoading(false);
      }
    };
    
    fetchReports();
  }, []);
  
  // Load selected year report
  useEffect(() => {
    if (!selectedYearReport) return;
    
    const fetchYearReport = async () => {
      if (reportType === 'yearly') {
        setReportLoading(true);
      }
      setError(null);
      
      try {
        const report = await ReportService.getById(selectedYearReport);
        setYearReportData(report);
      } catch (error) {
        console.error('Failed to fetch year report:', error);
        setYearReportData(null);
        if (reportType === 'yearly') {
          setError('Failed to load the report. Please try selecting a different one.');
        }
      } finally {
        if (reportType === 'yearly') {
          setReportLoading(false);
        }
      }
    };
    
    fetchYearReport();
  }, [selectedYearReport, reportType]);
  
  // Load selected month report
  useEffect(() => {
    if (!selectedMonthReport) return;
    
    const fetchMonthReport = async () => {
      if (reportType === 'monthly') {
        setReportLoading(true);
      }
      setError(null);
      
      try {
        const report = await ReportService.getById(selectedMonthReport);
        setMonthReportData(report);
      } catch (error) {
        console.error('Failed to fetch month report:', error);
        setMonthReportData(null);
        if (reportType === 'monthly') {
          setError('Failed to load the report. Please try selecting a different one.');
        }
      } finally {
        if (reportType === 'monthly') {
          setReportLoading(false);
        }
      }
    };
    
    fetchMonthReport();
  }, [selectedMonthReport, reportType]);
  
  const handleYearReportChange = (event: SelectChangeEvent<string>) => {
    setSelectedYearReport(event.target.value);
  };
  
  const handleMonthReportChange = (event: SelectChangeEvent<string>) => {
    setSelectedMonthReport(event.target.value);
  };
  
  const handleReportTypeChange = (type: 'monthly' | 'yearly') => {
    setReportType(type);
  };

  // Get month name from number
  const getMonthName = (month: number): string => {
    return new Date(2000, month - 1).toLocaleString('default', { month: 'long' });
  };

  if (initialLoading) {
    return (
      <Container maxWidth="xl">
        <Box sx={{ py: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            <Skeleton width="60%" />
          </Typography>
          <Skeleton variant="rectangular" height={400} />
        </Box>
      </Container>
    );
  }
  
  if (error && availableYears.length === 0) {
    return (
      <Container maxWidth="xl">
        <Box sx={{ py: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Historical Charts
          </Typography>
          <Box sx={{ 
            textAlign: 'center', 
            py: 8, 
            px: 3,
            backgroundColor: 'rgba(255, 82, 82, 0.05)',
            borderRadius: 2
          }}>
            <Typography variant="h6" color="error" sx={{ mb: 2 }}>
              Error
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {error}
            </Typography>
          </Box>
        </Box>
      </Container>
    );
  }

  const activeReport = reportType === 'yearly' ? yearReportData : monthReportData;
  const monthOptions = availableMonths.map(m => (
    <MenuItem key={m.id} value={m.id}>
      {getMonthName(m.month)} {m.year}
    </MenuItem>
  ));
  
  const yearOptions = availableYearReports.map(y => (
    <MenuItem key={y.id} value={y.id}>
      {y.year}
    </MenuItem>
  ));

  return (
    <Container maxWidth="xl">
      <Box sx={{ pt: 4, pb: 2 }}>
        <Typography variant="h4" component="h1" sx={{
          fontWeight: 700,
          mb: 1,
          color: theme.palette.primary.main
        }}>
          Historical Charts
        </Typography>
        <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
          View past monthly and yearly aircraft rankings
        </Typography>
        
        {/* Report type selection */}
        <Box sx={{ mb: 4, display: 'flex', gap: 2 }}>
          <Button 
            variant={reportType === 'yearly' ? 'contained' : 'outlined'}
            onClick={() => handleReportTypeChange('yearly')}
            startIcon={<CalendarToday />}
            sx={{ borderRadius: 2 }}
          >
            Yearly Reports
          </Button>
          <Button
            variant={reportType === 'monthly' ? 'contained' : 'outlined'}
            onClick={() => handleReportTypeChange('monthly')}
            startIcon={<CalendarMonth />}
            sx={{ borderRadius: 2 }}
          >
            Monthly Reports
          </Button>
        </Box>
        
        {/* Report selection */}
        <Paper elevation={0} sx={{
          p: 3,
          borderRadius: 3,
          mb: 4,
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)'
        }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Select a report
          </Typography>
          
          {reportType === 'yearly' ? (
            <FormControl fullWidth>
              <InputLabel>Year</InputLabel>
              <Select
                value={selectedYearReport || ''}
                onChange={handleYearReportChange}
                label="Year"
              >
                {yearOptions}
              </Select>
            </FormControl>
          ) : (
            <FormControl fullWidth>
              <InputLabel>Month</InputLabel>
              <Select
                value={selectedMonthReport || ''}
                onChange={handleMonthReportChange}
                label="Month"
              >
                {monthOptions}
              </Select>
            </FormControl>
          )}
        </Paper>
        
        {/* Report display */}
        {reportLoading ? (
          <>
            <Box sx={{ mb: 2 }}>
              <Skeleton variant="text" width="50%" height={40} />
              <Skeleton variant="text" width="70%" />
            </Box>
            <Skeleton variant="rectangular" height={400} />
          </>
        ) : error ? (
          <Box sx={{ 
            textAlign: 'center', 
            py: 8, 
            px: 3,
            backgroundColor: 'rgba(255, 82, 82, 0.05)',
            borderRadius: 2
          }}>
            <Typography variant="h6" color="error" sx={{ mb: 2 }}>
              Error
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {error}
            </Typography>
          </Box>
        ) : activeReport ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeReport.id} // Use ID to trigger animation on report change
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <Box sx={{ mb: 2 }}>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                >
                  <Typography variant="h5" component="h2" sx={{ fontWeight: 600 }}>
                    {activeReport.title}
                  </Typography>
                  {activeReport.description && (
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                      {activeReport.description}
                    </Typography>
                  )}
                </motion.div>
              </Box>
              
              <motion.div
                initial={{ opacity: 0, scaleY: 0.9, transformOrigin: "top" }}
                animate={{ opacity: 1, scaleY: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <motion.div
              initial={{ opacity: 0, scaleY: 0.9, transformOrigin: "top" }}
              animate={{ opacity: 1, scaleY: 1 }}
              transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1] }}
              style={{ overflow: 'hidden' }}
            >
              <AircraftTable data={activeReport.aircraft} showPositionChange={true} />
            </motion.div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        ) : (
          <Box sx={{ 
            textAlign: 'center', 
            py: 8, 
            px: 3,
            backgroundColor: 'rgba(0,0,0,0.04)',
            borderRadius: 2
          }}>
            <Typography variant="body1" color="text.secondary">
              {availableYears.length === 0 ? 
                'No historical reports available' : 
                'Select a report to view'
              }
            </Typography>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default LegacyCharts;
