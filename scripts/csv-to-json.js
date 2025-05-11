const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { parse } = require('csv-parse/sync');

// Get command line arguments
const args = process.argv.slice(2);
const csvFile = args[0]; // First argument should be the CSV file name
const year = args[1]; // Second argument should be the year
const month = args[2]; // Third argument is optional - if provided, it's the month

// Add CLI option for validation only
const validateOnly = args.includes('--validate-only');

if (validateOnly) {
    // Path setup for validation
    const publishedDir = path.join(__dirname, '..', 'app', 'data', 'published');
    const unpublishedDir = path.join(__dirname, '..', 'app', 'data', 'unpublished');
    const aircraftOutputPath = path.join(__dirname, '..', 'app', 'data', 'aircraft.json');
    let existingAircraft = [];
    if (fs.existsSync(aircraftOutputPath)) {
        try {
            existingAircraft = JSON.parse(fs.readFileSync(aircraftOutputPath, 'utf8'));
        } catch (error) {
            console.error('Error reading existing aircraft data:', error);
            process.exit(1);
        }
    }
    const aircraftIdSet = new Set(existingAircraft.map(a => a.id));
    const reportsDirs = [publishedDir, unpublishedDir];
    let allValid = true;
    for (const dir of reportsDirs) {
        const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));
        for (const file of files) {
            const report = JSON.parse(fs.readFileSync(path.join(dir, file), 'utf8'));
            const missing = (report.aircraftVotes || []).filter(v => !aircraftIdSet.has(v.aircraftId));
            if (missing.length > 0) {
                allValid = false;
                console.error(`Validation failed for ${dir}/${file}:`, missing);
            }
        }
    }
    if (allValid) {
        console.log('All reports are valid: all aircraftIds exist in aircraft.json');
    } else {
        process.exit(1);
    }
    process.exit(0);
}

// Check if required arguments are provided
if (!csvFile || !year) {
    console.error('Usage: node csv-to-json.js <csv-file> <year> [month]');
    console.error('  - csv-file: Path to the CSV file (required)');
    console.error('  - year: The year for the report, e.g. 2025 (required)');
    console.error('  - month: The month number (1-12), if creating a monthly report (optional)');
    process.exit(1);
}

// Determine report type based on arguments
const isMonthly = !!month;
const reportType = isMonthly ? 'monthly' : 'yearly';
console.log(`Creating ${reportType} report for ${isMonthly ? `month ${month} ` : ''}year ${year}`);

// Path to the CSV file and output directories
const csvPath = path.resolve(csvFile);
const publishedDir = path.join(__dirname, '..', 'app', 'data', 'published');
const unpublishedDir = path.join(__dirname, '..', 'app', 'data', 'unpublished');
const aircraftOutputPath = path.join(__dirname, '..', 'app', 'data', 'aircraft.json');

// Create directories if they don't exist
if (!fs.existsSync(publishedDir)) {
    fs.mkdirSync(publishedDir, { recursive: true });
}
if (!fs.existsSync(unpublishedDir)) {
    fs.mkdirSync(unpublishedDir, { recursive: true });
}

// Read existing aircraft data if it exists
let existingAircraft = [];
if (fs.existsSync(aircraftOutputPath)) {
    try {
        existingAircraft = JSON.parse(fs.readFileSync(aircraftOutputPath, 'utf8'));
        console.log(`Loaded ${existingAircraft.length} existing aircraft`);
    } catch (error) {
        console.error('Error reading existing aircraft data:', error);
    }
}

// Helper to clean aircraft name for deduplication
function cleanAircraftName(name) {
    return name.replace(/\s*\([^)]*\)/g, '').trim();
}

// Create a map of existing aircraft by cleaned name + manufacturer for fast lookups
const existingAircraftMap = new Map();
existingAircraft.forEach(aircraft => {
    const key = `${aircraft.manufacturer.trim().toLowerCase()}|${cleanAircraftName(aircraft.name).toLowerCase()}`;
    existingAircraftMap.set(key, aircraft);
});

// We no longer need to read aircraft-votes.json since we now store votes directly in each report

// Generate the report ID
const reportId = isMonthly
    ? `${year}-${month.toString().padStart(2, '0')}`
    : `${year}`;

console.log(`Report ID: ${reportId}`);

// Read CSV file content
const csvContent = fs.readFileSync(csvPath, 'utf8');

// Parse CSV using csv-parse (handles multiline and quoted fields)
const records = parse(csvContent, {
    columns: false,
    skip_empty_lines: true,
    relax_column_count: true,
    trim: true,
});

// Remove header row
const dataRows = records.slice(1);

const aircraftVotes = [];
const errorRows = [];

// Helper to parse date in 'dd mon yyyy' format
function parseDateAdded(dateStr) {
    if (!dateStr) return null;
    const [day, mon, year] = dateStr.trim().split(' ');
    const monthMap = {
        'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5,
        'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11
    };
    if (!day || !mon || !year) return null;
    const monthNum = monthMap[mon];
    if (monthNum === undefined) return null;
    return new Date(parseInt(year), monthNum, parseInt(day));
}

// Today's date for days/weeks calculation
const today = new Date();

for (let i = 0; i < dataRows.length; i++) {
    const row = dataRows[i];
    // Defensive: some rows may be shorter/longer due to CSV issues
    // Columns: skip 3, then developer, aircraft, votes, skip, category, type, skip, date added
    const developer = row[3]?.trim();
    const name = row[4]?.trim();
    const votes = parseInt(row[5], 10) || 0;
    const category = row[7]?.trim() || 'Unknown';
    const payware = row[8]?.trim() || 'Unknown';
    const dateAddedStr = row[10]?.trim();
    const dateAdded = parseDateAdded(dateAddedStr);
    if (!developer || !name) {
        errorRows.push({ row: i + 2, error: 'Missing developer or aircraft name', rowData: row });
        continue;
    }
    // Calculate daysOnList and weeksInChart
    let daysOnList = 0, weeksInChart = 0, dateAddedISO = null;
    if (dateAdded) {
        daysOnList = Math.floor((today - dateAdded) / (1000 * 60 * 60 * 24));
        weeksInChart = Math.floor(daysOnList / 7);
        dateAddedISO = dateAdded.toISOString();
    }
    // Aircraft uniqueness key
    const key = `${developer.toLowerCase()}|${cleanAircraftName(name).toLowerCase()}`;
    let aircraftId;
    let aircraftObj = existingAircraftMap.get(key);
    if (!aircraftObj) {
        // Add new aircraft
        aircraftId = uuidv4();
        aircraftObj = {
            id: aircraftId,
            name,
            manufacturer: developer,
            category,
            payware,
            buyUrl: '',
            dateAdded: dateAddedISO,
        };
        existingAircraftMap.set(key, aircraftObj);
    } else {
        aircraftId = aircraftObj.id;
        // Optionally update missing fields if needed
        if (!aircraftObj.category && category) aircraftObj.category = category;
        if (!aircraftObj.payware && payware) aircraftObj.payware = payware;
        if (!aircraftObj.dateAdded && dateAddedISO) aircraftObj.dateAdded = dateAddedISO;
    }
    // Add to aircraftVotes
    aircraftVotes.push({
        aircraftId,
        votes,
    });
}

// Save updated aircraft.json
const dedupedAircraft = Array.from(existingAircraftMap.values());
fs.writeFileSync(aircraftOutputPath, JSON.stringify(dedupedAircraft, null, 2));
console.log(`Deduplicated aircraft.json: kept ${dedupedAircraft.length} unique aircraft.`);

// Build report object
const report = {
    id: reportId,
    type: reportType,
    year: parseInt(year, 10),
    ...(isMonthly ? { month: parseInt(month, 10) } : {}),
    title: isMonthly ? `Top Aircraft - ${new Date(year, month - 1).toLocaleString('default', { month: 'long' })} ${year}` : `Top Aircraft - ${year}`,
    description: isMonthly ? `Monthly report of the most popular MSFS aircraft for ${new Date(year, month - 1).toLocaleString('default', { month: 'long' })} ${year}.` : `Yearly report of the most popular MSFS aircraft for ${year}.`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    aircraftVotes,
};

// Validation: ensure all aircraftIds in aircraftVotes exist in aircraft.json
const aircraftIdSet = new Set(dedupedAircraft.map(a => a.id));
const missingIds = report.aircraftVotes.filter(v => !aircraftIdSet.has(v.aircraftId));
if (missingIds.length > 0) {
    console.error('Validation failed: Some aircraftIds in report are missing from aircraft.json:', missingIds);
    process.exit(1);
}

// Save report to published and unpublished
const outName = isMonthly ? `${year}-${month.toString().padStart(2, '0')}.json` : `${year}.json`;
fs.writeFileSync(path.join(publishedDir, outName), JSON.stringify(report, null, 2));
fs.writeFileSync(path.join(unpublishedDir, outName), JSON.stringify(report, null, 2));
console.log(`Saved report to published/${outName} and unpublished/${outName}`);

if (errorRows.length > 0) {
    console.warn('Some rows had errors and were skipped:', errorRows);
}
