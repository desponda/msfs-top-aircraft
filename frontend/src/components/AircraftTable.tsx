// filepath: /workspaces/msfs-top-aircraft/frontend/src/components/AircraftTable.tsx
import { useEffect, useState } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Typography,
  Button,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { AircraftWithVotes, CompatibilityStatus } from '../types/Aircraft';
import { AircraftService } from '../services/AircraftService';
import AircraftTableRow from './AircraftTableRow';
import AircraftCard from './AircraftCard';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedTableContainer from './AnimatedTableContainer';

interface AircraftTableProps {
  data?: AircraftWithVotes[];
  showPositionChange?: boolean;
}


const PAGE_SIZE = 50;

const AircraftTable = ({ data, showPositionChange = false }: AircraftTableProps) => {
  const [aircraftData, setAircraftData] = useState<AircraftWithVotes[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [categoryFilter, setCategoryFilter] = useState<string>('');
  const [manufacturerFilter, setManufacturerFilter] = useState<string>('');
  const [paywareFilter, setPaywareFilter] = useState<string>('');
  const [msfs2020Filter, setMsfs2020Filter] = useState<string>('');
  const [msfs2024Filter, setMsfs2024Filter] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [page, setPage] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    // If data is passed as a prop, use it directly
    if (data) {
      setAircraftData(data as AircraftWithVotes[]);
      setLoading(false);
      return;
    }
    // Otherwise fetch from API
    const fetchAircraft = async () => {
      try {
        const data = await AircraftService.getAll();
        setAircraftData(data as AircraftWithVotes[]);
      } catch (error) {
        console.error('Error fetching aircraft data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAircraft();
  }, [data]);

  // Reset to first page on filter/search change
  useEffect(() => { setPage(0); }, [categoryFilter, manufacturerFilter, paywareFilter, msfs2020Filter, msfs2024Filter, searchTerm]);

  // Extract unique categories, manufacturers, and payware types for filters
  const categories = [...new Set(aircraftData.map(aircraft => aircraft.category))];
  const manufacturers = [...new Set(aircraftData.map(aircraft => aircraft.manufacturer))];
  const paywareTypes = [...new Set(aircraftData.map(aircraft => aircraft.payware || 'Unknown'))];

  // Only filter, do not sort (backend provides correct order)
  const filteredData = [...aircraftData]
    .filter(aircraft => {
      const matchesCategory = !categoryFilter || aircraft.category === categoryFilter;
      const matchesManufacturer = !manufacturerFilter || aircraft.manufacturer === manufacturerFilter;
      const matchesPayware = !paywareFilter || aircraft.payware === paywareFilter;
      const matchesMsfs2020 = !msfs2020Filter ||
        (msfs2020Filter === CompatibilityStatus.NATIVE && aircraft.msfs2020Compatibility === CompatibilityStatus.NATIVE) ||
        (msfs2020Filter === CompatibilityStatus.COMPATIBLE &&
          (aircraft.msfs2020Compatibility === CompatibilityStatus.COMPATIBLE ||
            aircraft.msfs2020Compatibility === CompatibilityStatus.NATIVE));
      const matchesMsfs2024 = !msfs2024Filter ||
        (msfs2024Filter === CompatibilityStatus.NATIVE && aircraft.msfs2024Compatibility === CompatibilityStatus.NATIVE) ||
        (msfs2024Filter === CompatibilityStatus.COMPATIBLE &&
          (aircraft.msfs2024Compatibility === CompatibilityStatus.COMPATIBLE ||
            aircraft.msfs2024Compatibility === CompatibilityStatus.NATIVE));
      const matchesSearch = !searchTerm ||
        aircraft.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (aircraft.description?.toLowerCase() || '').includes(searchTerm.toLowerCase());

      return matchesCategory && matchesManufacturer && matchesPayware && matchesMsfs2020 && matchesMsfs2024 && matchesSearch;
    });

  const paginatedData = filteredData.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);
  const totalPages = Math.ceil(filteredData.length / PAGE_SIZE);

  return (
    <Box sx={{
      width: '100%',
      position: 'relative',
      // Subtle SVG pattern background
      '::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        opacity: 0.13,
        backgroundImage:
          'url("data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' viewBox=\'0 0 40 40\' fill=\'none\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Crect x=\'0\' y=\'0\' width=\'40\' height=\'40\' fill=\'none\'/%3E%3Ccircle cx=\'20\' cy=\'20\' r=\'1.5\' fill=\'%23a259f7\' fill-opacity=\'0.18\'/%3E%3C/svg%3E")',
        pointerEvents: 'none',
      },
      background: 'linear-gradient(120deg, #191A23 0%, #232946 100%)',
      minHeight: '100vh',
      zIndex: 1,
    }}>
      <Box sx={{ position: 'relative', zIndex: 2 }}>
        <Box sx={{ width: '100%', mb: 2, p: 0 }}>
          <Typography variant="subtitle2" gutterBottom component="div" sx={{ mb: 2, color: 'text.secondary', fontWeight: 600, fontSize: '1.1rem', letterSpacing: 0 }}>
            Aircraft Rankings & Data
          </Typography>

          {/* Filters */}
          <Box sx={{ mb: 2, display: 'flex', gap: 1.5, flexWrap: 'wrap', background: 'transparent', p: 0, border: 'none', alignItems: 'center', flexDirection: { xs: 'column', sm: 'row' } }}>
            <TextField
              label="Search"
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: <SearchIcon fontSize="small" sx={{ mr: 1 }} />,
              }}
              sx={{ minWidth: 140, background: 'rgba(255,255,255,0.02)', borderRadius: 2, width: { xs: '100%', sm: 'auto' } }}
            />

            <FormControl size="small" sx={{ minWidth: 120, background: 'rgba(255,255,255,0.02)', borderRadius: 2, width: { xs: '100%', sm: 'auto' } }}>
              <InputLabel id="category-filter-label">Category</InputLabel>
              <Select
                labelId="category-filter-label"
                id="category-filter"
                value={categoryFilter}
                label="Category"
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <MenuItem value="">All</MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>{category}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 120, background: 'rgba(255,255,255,0.02)', borderRadius: 2, width: { xs: '100%', sm: 'auto' } }}>
              <InputLabel id="manufacturer-filter-label">Developer</InputLabel>
              <Select
                labelId="manufacturer-filter-label"
                id="manufacturer-filter"
                value={manufacturerFilter}
                label="Developer"
                onChange={(e) => setManufacturerFilter(e.target.value)}
              >
                <MenuItem value="">All</MenuItem>
                {manufacturers.map((manufacturer) => (
                  <MenuItem key={manufacturer} value={manufacturer}>{manufacturer}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 100, background: 'rgba(255,255,255,0.02)', borderRadius: 2, width: { xs: '100%', sm: 'auto' } }}>
              <InputLabel id="payware-filter-label">Type</InputLabel>
              <Select
                labelId="payware-filter-label"
                id="payware-filter"
                value={paywareFilter}
                label="Type"
                onChange={(e) => setPaywareFilter(e.target.value)}
              >
                <MenuItem value="">All</MenuItem>
                {paywareTypes.map((type) => (
                  <MenuItem key={type} value={type}>{type}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 110, background: 'rgba(255,255,255,0.02)', borderRadius: 2, width: { xs: '100%', sm: 'auto' } }}>
              <InputLabel id="msfs2020-filter-label">MSFS 2020</InputLabel>
              <Select
                labelId="msfs2020-filter-label"
                id="msfs2020-filter"
                value={msfs2020Filter}
                label="MSFS 2020"
                onChange={(e) => setMsfs2020Filter(e.target.value)}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value={CompatibilityStatus.NATIVE}>Native</MenuItem>
                <MenuItem value={CompatibilityStatus.COMPATIBLE}>Compatible</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 110, background: 'rgba(255,255,255,0.02)', borderRadius: 2, width: { xs: '100%', sm: 'auto' } }}>
              <InputLabel id="msfs2024-filter-label">MSFS 2024</InputLabel>
              <Select
                labelId="msfs2024-filter-label"
                id="msfs2024-filter"
                value={msfs2024Filter}
                label="MSFS 2024"
                onChange={(e) => setMsfs2024Filter(e.target.value)}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value={CompatibilityStatus.NATIVE}>Native</MenuItem>
                <MenuItem value={CompatibilityStatus.COMPATIBLE}>Compatible</MenuItem>
              </Select>
            </FormControl>

            <Button
              variant="outlined"
              sx={{
                color: 'text.secondary',
                borderColor: 'rgba(255,255,255,0.07)',
                fontWeight: 500,
                fontSize: '0.97rem',
                px: 2,
                borderRadius: 3,
                background: 'none',
                textTransform: 'none',
                minHeight: 40,
                width: { xs: '100%', sm: 'auto' },
                '&:hover': {
                  color: '#a259f7',
                  borderColor: '#a259f7',
                  background: 'rgba(162,89,247,0.08)',
                },
              }}
              onClick={() => {
                setSearchTerm('');
                setCategoryFilter('');
                setManufacturerFilter('');
                setPaywareFilter('');
                setMsfs2020Filter('');
                setMsfs2024Filter('');
              }}
            >
              Clear Filters
            </Button>
          </Box>

          {/* Responsive Table/Card Layout */}
          {isMobile ? (
            <Box>
              {loading ? (
                <Typography align="center" sx={{ py: 4 }}>Loading...</Typography>
              ) : paginatedData.length === 0 ? (
                <Typography align="center" sx={{ py: 4 }}>No aircraft found</Typography>
              ) : (
                paginatedData.map((aircraft) => (
                  <AircraftCard key={aircraft.id} aircraft={aircraft} showPositionChange={showPositionChange} />
                ))
              )}
              {/* Pagination Controls */}
              {totalPages > 1 && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, gap: 2 }}>
                  <Button disabled={page === 0} onClick={() => setPage(page - 1)}>Previous</Button>
                  <Typography sx={{ alignSelf: 'center' }}>Page {page + 1} of {totalPages}</Typography>
                  <Button disabled={page === totalPages - 1} onClick={() => setPage(page + 1)}>Next</Button>
                </Box>
              )}
            </Box>
          ) : (
            <Box>
              <AnimatedTableContainer>
                <TableHead>
                  <TableRow sx={{ background: 'rgba(255,255,255,0.01)' }}>
                    <TableCell sx={{ fontWeight: 600, color: 'text.secondary', background: 'rgba(255,255,255,0.01)', fontSize: { xs: '0.92rem', md: '1rem' }, borderBottom: '1px solid rgba(255,255,255,0.04)', zIndex: 2, px: { xs: 1, md: 2 } }}>Rank</TableCell>
                    {showPositionChange && (
                      <TableCell sx={{ fontWeight: 600, color: 'text.secondary', background: 'rgba(255,255,255,0.01)', fontSize: { xs: '0.92rem', md: '1rem' }, borderBottom: '1px solid rgba(255,255,255,0.04)', zIndex: 2, px: { xs: 1, md: 2 } }}>Δ</TableCell>
                    )}
                    <TableCell sx={{ fontWeight: 600, color: 'text.secondary', background: 'rgba(255,255,255,0.01)', fontSize: { xs: '0.92rem', md: '1rem' }, borderBottom: '1px solid rgba(255,255,255,0.04)', zIndex: 2, px: { xs: 1, md: 2 } }}>Aircraft</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: 'text.secondary', background: 'rgba(255,255,255,0.01)', fontSize: { xs: '0.92rem', md: '1rem' }, borderBottom: '1px solid rgba(255,255,255,0.04)', zIndex: 2, px: { xs: 1, md: 2 } }}>Developer</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: 'text.secondary', background: 'rgba(255,255,255,0.01)', fontSize: { xs: '0.92rem', md: '1rem' }, borderBottom: '1px solid rgba(255,255,255,0.04)', zIndex: 2, px: { xs: 1, md: 2 } }}>Votes</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: 'text.secondary', background: 'rgba(255,255,255,0.01)', fontSize: { xs: '0.92rem', md: '1rem' }, borderBottom: '1px solid rgba(255,255,255,0.04)', zIndex: 2, px: { xs: 1, md: 2 } }}>Category</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: 'text.secondary', background: 'rgba(255,255,255,0.01)', fontSize: { xs: '0.92rem', md: '1rem' }, borderBottom: '1px solid rgba(255,255,255,0.04)', zIndex: 2, px: { xs: 1, md: 2 } }}>Type</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: 'text.secondary', background: 'rgba(255,255,255,0.01)', fontSize: { xs: '0.92rem', md: '1rem' }, borderBottom: '1px solid rgba(255,255,255,0.04)', zIndex: 2, px: { xs: 1, md: 2 } }}>Weeks in Chart</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: 'text.secondary', background: 'rgba(255,255,255,0.01)', fontSize: { xs: '0.92rem', md: '1rem' }, borderBottom: '1px solid rgba(255,255,255,0.04)', zIndex: 2, px: { xs: 1, md: 2 } }}>Compatibility</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={showPositionChange ? 9 : 8} align="center">Loading...</TableCell>
                    </TableRow>
                  ) : paginatedData.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={showPositionChange ? 9 : 8} align="center">No aircraft found</TableCell>
                    </TableRow>
                  ) : (
                    paginatedData.map((aircraft, idx) => (
                      <AircraftTableRow 
                        key={aircraft.id} 
                        aircraft={aircraft} 
                        showPositionChange={showPositionChange} 
                        idx={idx} 
                      />
                    ))
                  )}
                </TableBody>
              </AnimatedTableContainer>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, gap: 2 }}>
                  <Button disabled={page === 0} onClick={() => setPage(page - 1)}>Previous</Button>
                  <Typography sx={{ alignSelf: 'center' }}>Page {page + 1} of {totalPages}</Typography>
                  <Button disabled={page === totalPages - 1} onClick={() => setPage(page + 1)}>Next</Button>
                </Box>
              )}
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default AircraftTable;
