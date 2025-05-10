// filepath: /workspaces/msfs-top-aircraft/frontend/src/components/AircraftTable.tsx
import React from 'react';
import { useEffect, useState } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Chip,
  Typography,
  Button,
  Link,
  Card,
  CardContent,
  Tooltip,
  useMediaQuery,
  useTheme
} from '@mui/material';
import {
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
  Remove as RemoveIcon,
  Search as SearchIcon,
  FilterList as FilterListIcon,
  OpenInNew as OpenInNewIcon,
  Check as CheckIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import { Aircraft, AircraftWithVotes, CompatibilityStatus } from '../types/Aircraft';
import { AircraftService } from '../services/AircraftService';

interface AircraftTableProps {
  data?: Aircraft[] | AircraftWithVotes[];
}

function isWithVotes(a: Aircraft | AircraftWithVotes): a is AircraftWithVotes {
  return typeof (a as AircraftWithVotes).votes === 'number';
}

const PAGE_SIZE = 50;

const AircraftTable = ({ data }: AircraftTableProps) => {
  const [aircraftData, setAircraftData] = useState<(Aircraft | AircraftWithVotes)[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [sortField, setSortField] = useState<keyof (Aircraft & AircraftWithVotes)>('votes');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
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
      setAircraftData(data);
      setLoading(false);
      return;
    }

    // Otherwise fetch from API
    const fetchAircraft = async () => {
      try {
        const data = await AircraftService.getAll();
        setAircraftData(data);
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

  function getField(obj: Aircraft | AircraftWithVotes, field: keyof (Aircraft & AircraftWithVotes)) {
    // Only return the field if it exists on the object
    return (obj as any)[field as any];
  }

  // Sort and filter data
  const sortedAndFilteredData = [...aircraftData]
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
    })
    .sort((a, b) => {
      const fieldA = getField(a, sortField);
      const fieldB = getField(b, sortField);
      if (fieldA !== undefined && fieldB !== undefined) {
        if (fieldA < fieldB) return sortDirection === 'asc' ? -1 : 1;
        if (fieldA > fieldB) return sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });

  const handleSort = (field: keyof (Aircraft & AircraftWithVotes)) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Helper function to render compatibility chips for both MSFS 2020 and 2024
  const renderCombinedCompatibility = (aircraft: Aircraft | AircraftWithVotes) => {
    const chips: React.ReactNode[] = [];
    const compat = [
      { label: 'MSFS 2020', status: (aircraft as any).msfs2020Compatibility },
      { label: 'MSFS 2024', status: (aircraft as any).msfs2024Compatibility },
    ];
    compat.forEach(({ label, status }) => {
      if (status === CompatibilityStatus.NATIVE) {
        chips.push(
          <Chip key={label} label={label} size="small" sx={{ bgcolor: '#22C55E', color: '#fff', mr: 0.5, fontWeight: 600 }} />
        );
      } else if (status === CompatibilityStatus.COMPATIBLE) {
        chips.push(
          <Chip key={label} label={label} size="small" sx={{ bgcolor: '#FFD600', color: '#232946', mr: 0.5, fontWeight: 600 }} />
        );
      }
      // No chip for not compatible
    });
    return chips.length > 0 ? chips : <Typography variant="caption" color="text.secondary">Not Compatible</Typography>;
  };

  const paginatedData = sortedAndFilteredData.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);
  const totalPages = Math.ceil(sortedAndFilteredData.length / PAGE_SIZE);

  return (
    <Box sx={{ width: '100%' }}>
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
              paginatedData.map((aircraft, idx) => (
                <Card key={aircraft.id} sx={{ mb: 2, background: 'rgba(255,255,255,0.01)', borderRadius: 4, boxShadow: '0 2px 8px 0 rgba(31,38,135,0.07)', width: '100%' }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ color: '#a259f7', fontWeight: 700, mb: 1 }}>
                      {isWithVotes(aircraft) && aircraft.rank !== undefined ? `#${aircraft.rank}` : '-'} {aircraft.name}
                    </Typography>
                    <Typography variant="subtitle2" sx={{ color: 'text.secondary', mb: 0.5 }}>
                      <b>Aircraft:</b> {aircraft.name}
                    </Typography>
                    <Typography variant="subtitle2" sx={{ color: 'text.secondary', mb: 0.5 }}>
                      <b>Developer:</b> {aircraft.manufacturer}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 0.5 }}>
                      <b>Votes:</b> {isWithVotes(aircraft) ? aircraft.votes : '-'}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 0.5 }}>
                      <b>Category:</b> {aircraft.category}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 0.5 }}>
                      <b>Type:</b> {aircraft.payware === 'Both Free & Premium' ? 'Mixed' : (aircraft.payware || 'Unknown')}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 0.5 }}>
                      <b>Weeks in Chart:</b> {isWithVotes(aircraft) ? aircraft.weeksInChart : '-'}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 0.5 }}>
                      <b>Compatibility:</b> {renderCombinedCompatibility(aircraft)}
                    </Typography>
                    {aircraft.buyUrl && (
                      <Button href={aircraft.buyUrl} target="_blank" rel="noopener noreferrer" variant="outlined" size="small" sx={{ mt: 1 }}>
                        View Product
                      </Button>
                    )}
                  </CardContent>
                </Card>
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
          <>
            <TableContainer sx={{
              mt: 3,
              boxShadow: '0 2px 8px 0 rgba(31,38,135,0.07)',
              borderRadius: 4,
              overflow: 'auto',
              background: 'rgba(255,255,255,0.01)',
              width: '100%',
              maxWidth: '100vw',
              minWidth: 700,
            }}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow sx={{ background: 'rgba(255,255,255,0.01)' }}>
                    <TableCell sx={{ fontWeight: 600, color: 'text.secondary', background: 'rgba(255,255,255,0.01)', fontSize: { xs: '0.92rem', md: '1rem' }, borderBottom: '1px solid rgba(255,255,255,0.04)', zIndex: 2, px: { xs: 1, md: 2 } }}>Rank</TableCell>
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
                      <TableCell colSpan={8} align="center">Loading...</TableCell>
                    </TableRow>
                  ) : paginatedData.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} align="center">No aircraft found</TableCell>
                    </TableRow>
                  ) : (
                    paginatedData.map((aircraft, idx) => (
                      <TableRow
                        key={aircraft.id}
                        hover
                        sx={{
                          background: idx % 2 === 0 ? 'rgba(255,255,255,0.01)' : 'rgba(255,255,255,0.03)',
                          transition: 'background 0.2s',
                          '&:hover': {
                            background: 'rgba(162,89,247,0.07)',
                          },
                        }}
                      >
                        <TableCell sx={{ color: '#f4f4fa', fontWeight: 700, px: { xs: 1, md: 2 }, fontSize: { xs: '0.92rem', md: '1rem' } }}>{isWithVotes(aircraft) && aircraft.rank !== undefined ? aircraft.rank : '-'}</TableCell>
                        <TableCell sx={{ px: { xs: 1, md: 2 }, fontSize: { xs: '0.92rem', md: '1rem' } }}>
                          <Tooltip title={aircraft.name} placement="top" arrow>
                            <span style={{ color: '#f4f4fa', textDecoration: 'underline', cursor: 'pointer', fontWeight: 500 }}>
                              <Link
                                href={aircraft.buyUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {aircraft.name}
                                <OpenInNewIcon fontSize="small" sx={{ ml: 0.5 }} />
                              </Link>
                            </span>
                          </Tooltip>
                        </TableCell>
                        <TableCell sx={{ color: '#f4f4fa', fontWeight: 600, px: { xs: 1, md: 2 }, fontSize: { xs: '0.92rem', md: '1rem' } }}>{aircraft.manufacturer}</TableCell>
                        <TableCell sx={{ color: '#f4f4fa', fontWeight: 600, px: { xs: 1, md: 2 }, fontSize: { xs: '0.92rem', md: '1rem' } }}>{isWithVotes(aircraft) ? aircraft.votes : '-'}</TableCell>
                        <TableCell sx={{ px: { xs: 1, md: 2 }, fontSize: { xs: '0.92rem', md: '1rem' } }}>
                          <Chip
                            label={aircraft.category}
                            variant="outlined"
                            size="small"
                            sx={{
                              background: 'rgba(255,255,255,0.04)',
                              color: 'text.secondary',
                              fontWeight: 500,
                              fontSize: '0.92rem',
                              borderRadius: 2,
                              letterSpacing: 0,
                            }}
                          />
                        </TableCell>
                        <TableCell sx={{ px: { xs: 1, md: 2 }, fontSize: { xs: '0.92rem', md: '1rem' } }}>
                          <Chip
                            label={aircraft.payware === 'Both Free & Premium' ? 'Mixed' : (aircraft.payware || 'Unknown')}
                            variant="filled"
                            size="small"
                            sx={{
                              background: 'rgba(255,255,255,0.04)',
                              color: 'text.secondary',
                              fontWeight: 500,
                              fontSize: '0.92rem',
                              paddingX: 1.2,
                              borderRadius: 2,
                              letterSpacing: 0,
                            }}
                          />
                        </TableCell>
                        <TableCell sx={{ color: '#f4f4fa', fontWeight: 600, px: { xs: 1, md: 2 }, fontSize: { xs: '0.92rem', md: '1rem' } }}>{isWithVotes(aircraft) ? aircraft.weeksInChart : '-'}</TableCell>
                        <TableCell sx={{ px: { xs: 1, md: 2 }, fontSize: { xs: '0.92rem', md: '1rem' } }}>{renderCombinedCompatibility(aircraft)}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            {/* Pagination Controls */}
            {totalPages > 1 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, gap: 2 }}>
                <Button disabled={page === 0} onClick={() => setPage(page - 1)}>Previous</Button>
                <Typography sx={{ alignSelf: 'center' }}>Page {page + 1} of {totalPages}</Typography>
                <Button disabled={page === totalPages - 1} onClick={() => setPage(page + 1)}>Next</Button>
              </Box>
            )}
          </>
        )}
      </Box>
    </Box>
  );
};

export default AircraftTable;
