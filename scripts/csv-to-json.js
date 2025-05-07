const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// Get command line arguments
const args = process.argv.slice(2);
const csvFile = args[0]; // First argument should be the CSV file name
const year = args[1]; // Second argument should be the year
const month = args[2]; // Third argument is optional - if provided, it's the month

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

// Parse the CSV file
const parseCSV = () => {
    console.log('Reading CSV file...');
    // Read the CSV file line by line
    const csvData = fs.readFileSync(csvPath, 'utf8');

    // Simple CSV parsing approach
    const lines = csvData.split('\n').filter(line => line.trim() !== '');

    const errorLines = [];
    const aircraft = [];

    // Skip lines that are clearly not aircraft data
    const relevantLines = lines.filter(line => {
        return !line.includes('Total AIRCRAFT') &&
            !line.includes('Total VOTES') &&
            !line.includes('Total PARTICIPANTS') &&
            line.trim() !== '';
    });

    // Parse each line
    lines.forEach((line, index) => {
        try {
            // Skip the header row
            if (index === 0) {
                return;
            }

            // Skip the total lines at the end
            if (line.includes('Total VOTES') || line.includes('Total PARTICIPANTS') || line.includes('Total AIRCRAFT')) {
                return;
            }

            // CSV parsing handling quoted fields properly
            const fields = [];
            let fieldValue = '';
            let inQuotes = false;

            for (let i = 0; i < line.length; i++) {
                const char = line[i];

                if (char === '"') {
                    inQuotes = !inQuotes;
                } else if (char === ',' && !inQuotes) {
                    fields.push(fieldValue);
                    fieldValue = '';
                } else {
                    fieldValue += char;
                }
            }
            fields.push(fieldValue); // Push the last field

            // Ensure we have enough columns
            if (fields.length < 10) {
                errorLines.push({ lineNumber: index + 1, line, error: 'Not enough fields' });
                return;
            }

            // Extract the fields we need
            const [prevRank, currentRank, rankChange, developer, name, votes, weeksInChart,
                category, paywareCode, blank, dateAdded, days] = fields;

            // Check if the critical fields are valid
            if (!developer || !name) {
                errorLines.push({ lineNumber: index + 1, line, error: 'Missing developer or aircraft name' });
                return;
            }

            // Determine the payware status
            let paywareStatus;
            switch (paywareCode.trim()) {
                case 'P':
                    paywareStatus = 'Payware';
                    break;
                case 'F':
                    paywareStatus = 'Freeware';
                    break;
                case 'D':
                    paywareStatus = 'Deluxe Edition';
                    break;
                case 'B':
                    paywareStatus = 'Both Free & Premium';
                    break;
                default:
                    paywareStatus = 'Unknown';
            }

            // Parse the date
            let dateAddedFormatted;
            try {
                if (dateAdded && dateAdded.trim()) {
                    const [day, month, year] = dateAdded.trim().split(' ');
                    const monthMap = {
                        'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5,
                        'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11
                    };
                    const monthNum = monthMap[month];
                    if (monthNum !== undefined && day && year) {
                        dateAddedFormatted = new Date(parseInt(year), monthNum, parseInt(day)).toISOString();
                    } else {
                        dateAddedFormatted = null;
                    }
                }
            } catch (e) {
                console.warn(`Error parsing date on line ${index + 1}: ${dateAdded}`);
                dateAddedFormatted = null;
            }

            // Create the aircraft object
            const aircraftObj = {
                id: uuidv4(), // Generate a unique ID
                name: name.trim(),
                manufacturer: developer.trim(),
                category: category.trim(),
                payware: paywareStatus,
                buyUrl: "", // We don't have this data in the CSV
                votes: parseInt(votes) || 0,
                daysOnList: parseInt(days) || 0,
                dateAdded: dateAddedFormatted,
                weeksInChart: parseInt(weeksInChart) || 0
            };

            aircraft.push(aircraftObj);
        } catch (error) {
            errorLines.push({ lineNumber: index + 1, line, error: error.message });
        }
    });

    // Print any errors
    if (errorLines.length > 0) {
        console.error('Errors encountered while parsing:');
        errorLines.forEach(err => {
            console.error(`Line ${err.lineNumber}: ${err.error}`);
            console.error(`  ${err.line}`);
        });
    }

    return { aircraft, errorLines };
};

// Create report from the aircraft data
const createReport = (aircraft) => {
    const now = new Date().toISOString();

    // Get the month name if it's a monthly report
    const getMonthName = (monthNum) => {
        const months = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        return months[parseInt(monthNum) - 1] || '';
    };

    if (isMonthly) {
        // Create monthly report
        const monthName = getMonthName(month);
        const report = {
            id: `${year}-${month.toString().padStart(2, '0')}`,
            type: "monthly",
            year: parseInt(year),
            month: parseInt(month),
            title: `Top Aircraft - ${monthName} ${year}`,
            description: `Monthly report of the most popular MSFS aircraft for ${monthName} ${year}.`,
            createdAt: now,
            updatedAt: now,
            aircraft: aircraft
        };
        return report;
    } else {
        // Create yearly report
        const report = {
            id: `${year}`,
            type: "yearly",
            year: parseInt(year),
            title: `Top Aircraft - ${year}`,
            description: `Yearly report of the most popular MSFS aircraft for ${year}.`,
            createdAt: now,
            updatedAt: now,
            aircraft: aircraft
        };
        return report;
    }
};

// Save the aircraft separately for the aircraft API
const saveAircraftData = (aircraft) => {
    console.log(`Saving ${aircraft.length} aircraft to ${aircraftOutputPath}`);
    fs.writeFileSync(aircraftOutputPath, JSON.stringify(aircraft, null, 2));
};

// Save the report data to the unpublished directory
const saveReportData = (report) => {
    // Create the filename based on the report type and ID
    const filename = `${report.id}.json`;
    const filepath = path.join(unpublishedDir, filename);

    console.log(`Saving report to ${filepath}`);
    fs.writeFileSync(filepath, JSON.stringify(report, null, 2));

    console.log(`Report saved as unpublished. To publish, run:
    cp ${filepath} ${publishedDir}/${filename}`);
};

// Main execution
try {
    const { aircraft, errorLines } = parseCSV();
    console.log(`Parsed ${aircraft.length} aircraft from CSV`);
    console.log(`Encountered ${errorLines.length} errors during parsing`);

    // Create report from the aircraft data
    const report = createReport(aircraft);

    // Save the data
    saveAircraftData(aircraft);
    saveReportData(report);

    console.log('CSV conversion complete!');
} catch (error) {
    console.error('Fatal error:', error);
}
