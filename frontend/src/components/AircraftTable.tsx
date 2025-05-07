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
  CardContent
} from '@mui/material';
import {
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
  Remove as RemoveIcon,
  Search as SearchIcon,
  FilterList as FilterListIcon,
  OpenInNew as OpenInNewIcon
} from '@mui/icons-material';
import { Aircraft } from '../types/Aircraft';
import { AircraftService } from '../services/AircraftService';

interface AircraftTableProps {
  data?: Aircraft[];
}

const AircraftTable = ({ data }: AircraftTableProps) => {
  const [aircraftData, setAircraftData] = useState<Aircraft[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [sortField, setSortField] = useState<keyof Aircraft>('votes');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [categoryFilter, setCategoryFilter] = useState<string>('');
  const [manufacturerFilter, setManufacturerFilter] = useState<string>('');
  const [paywareFilter, setPaywareFilter] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');

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
  }, []);

  // Extract unique categories, manufacturers, and payware types for filters
  const categories = [...new Set(aircraftData.map(aircraft => aircraft.category))];
  const manufacturers = [...new Set(aircraftData.map(aircraft => aircraft.manufacturer))];
  const paywareTypes = [...new Set(aircraftData.map(aircraft => aircraft.payware || 'Unknown'))];

  // Sort and filter data
  const sortedAndFilteredData = [...aircraftData]
    .filter(aircraft => {
      const matchesCategory = !categoryFilter || aircraft.category === categoryFilter;
      const matchesManufacturer = !manufacturerFilter || aircraft.manufacturer === manufacturerFilter;
      const matchesPayware = !paywareFilter || aircraft.payware === paywareFilter;
      const matchesSearch = !searchTerm ||
        aircraft.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (aircraft.description?.toLowerCase() || '').includes(searchTerm.toLowerCase());

      return matchesCategory && matchesManufacturer && matchesPayware && matchesSearch;
    })
    .sort((a, b) => {
      const fieldA = a[sortField];
      const fieldB = b[sortField];

      if (fieldA !== undefined && fieldB !== undefined) {
        if (fieldA < fieldB) return sortDirection === 'asc' ? -1 : 1;
        if (fieldA > fieldB) return sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });

  const handleSort = (field: keyof Aircraft) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // We no longer need the trend icon function as we're not tracking rank changes

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2, p: 2 }}>
        <Typography variant="h5" gutterBottom component="div" sx={{ mb: 3 }}>
          Aircraft Rankings & Data
        </Typography>

        {/* Filters */}
        <Box sx={{ mb: 2, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <TextField
            label="Search"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: <SearchIcon fontSize="small" sx={{ mr: 1 }} />,
            }}
          />

          <FormControl size="small" sx={{ minWidth: 150 }}>
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

          <FormControl size="small" sx={{ minWidth: 150 }}>
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

          <FormControl size="small" sx={{ minWidth: 150 }}>
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

          <Button
            variant="outlined"
            onClick={() => {
              setSearchTerm('');
              setCategoryFilter('');
              setManufacturerFilter('');
              setPaywareFilter('');
            }}
          >
            Clear Filters
          </Button>
        </Box>

        {/* Table */}
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="aircraft table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <TableSortLabel
                    active={sortField === 'rank'}
                    direction={sortDirection}
                    onClick={() => handleSort('rank')}
                  >
                    Rank
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortField === 'manufacturer'}
                    direction={sortDirection}
                    onClick={() => handleSort('manufacturer')}
                  >
                    Developer
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortField === 'name'}
                    direction={sortDirection}
                    onClick={() => handleSort('name')}
                  >
                    Aircraft
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortField === 'votes'}
                    direction={sortDirection}
                    onClick={() => handleSort('votes')}
                  >
                    Votes
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortField === 'category'}
                    direction={sortDirection}
                    onClick={() => handleSort('category')}
                  >
                    Category
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortField === 'daysOnList'}
                    direction={sortDirection}
                    onClick={() => handleSort('daysOnList')}
                  >
                    Days
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortField === 'payware'}
                    direction={sortDirection}
                    onClick={() => handleSort('payware')}
                  >
                    Type
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortField === 'weeksInChart'}
                    direction={sortDirection}
                    onClick={() => handleSort('weeksInChart')}
                  >
                    Weeks in Chart
                  </TableSortLabel>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={9} align="center">Loading...</TableCell>
                </TableRow>
              ) : sortedAndFilteredData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} align="center">No aircraft found</TableCell>
                </TableRow>
              ) : (
                sortedAndFilteredData.map((aircraft) => (
                  <TableRow
                    key={aircraft.id}
                    hover
                  >
                    <TableCell>
                      {aircraft.rank || '-'}
                    </TableCell>
                    <TableCell>{aircraft.manufacturer}</TableCell>
                    <TableCell>
                      <Link
                        href={aircraft.buyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {aircraft.name}
                        <OpenInNewIcon fontSize="small" sx={{ ml: 0.5 }} />
                      </Link>
                    </TableCell>
                    <TableCell>{aircraft.votes}</TableCell>
                    <TableCell>
                      <Chip
                        label={aircraft.category}
                        variant="outlined"
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{aircraft.daysOnList}</TableCell>
                    <TableCell>
                      <Chip
                        label={aircraft.payware || 'Unknown'}
                        variant="outlined"
                        color={aircraft.payware === 'Freeware' ? 'success' :
                          aircraft.payware === 'Payware' ? 'primary' : 'default'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{aircraft.weeksInChart}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Summary Cards */}
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 2 }}>
        <Card sx={{ minWidth: 200 }}>
          <CardContent>
            <Typography variant="h6" component="div" gutterBottom>
              Total Aircraft
            </Typography>
            <Typography variant="h3" component="div">
              {aircraftData.length}
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ minWidth: 200 }}>
          <CardContent>
            <Typography variant="h6" component="div" gutterBottom>
              Most Popular Category
            </Typography>
            <Typography variant="h5" component="div">
              {categories.length > 0 ?
                categories.sort((a, b) =>
                  aircraftData.filter(aircraft => aircraft.category === b).length -
                  aircraftData.filter(aircraft => aircraft.category === a).length
                )[0] :
                'N/A'
              }
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ minWidth: 200 }}>
          <CardContent>
            <Typography variant="h6" component="div" gutterBottom>
              Top Developer
            </Typography>
            <Typography variant="h5" component="div">
              {manufacturers.length > 0 ?
                manufacturers.sort((a, b) =>
                  aircraftData.filter(aircraft => aircraft.manufacturer === b).length -
                  aircraftData.filter(aircraft => aircraft.manufacturer === a).length
                )[0] :
                'N/A'
              }
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default AircraftTable;
