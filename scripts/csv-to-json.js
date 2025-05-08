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

// Create a map of existing aircraft by name + manufacturer for fast lookups
const existingAircraftMap = new Map();
existingAircraft.forEach(aircraft => {
    const key = `${aircraft.manufacturer.trim().toLowerCase()}|${aircraft.name.trim().toLowerCase()}`;
    existingAircraftMap.set(key, aircraft);
});

// We no longer need to read aircraft-votes.json since we now store votes directly in each report

// Generate the report ID
const reportId = isMonthly
    ? `${year}-${month.toString().padStart(2, '0')}`
    : `${year}`;

console.log(`Report ID: ${reportId}`);

// Parse CSV and create aircraft data
const parseCSV = (csvContent) => {
    const lines = csvContent.split('\n');

    // Extract header line
    const header = lines[0].trim();

    // Determine CSV format based on headers
    let format;
    if (header.includes('Developer,Aircraft,Votes')) {
        format = 'simple';
    } else if (header.includes('Developer,Aircraft,Category,P/F,Votes,Days')) {
        format = 'detailed';
    } else {
        throw new Error('Unknown CSV format. Expected headers not found.');
    }

    console.log(`Detected CSV format: ${format}`);

    const aircraft = [];
    const aircraftVotes = [];
    const errorLines = [];

    // Parse data lines
    lines.slice(1).forEach((line, index) => {
        if (!line.trim()) return; // Skip empty lines

        try {
            // Split the line by commas, but handle quoted values
            const values = [];
            let currentValue = '';
            let inQuotes = false;

            for (let i = 0; i < line.length; i++) {
                const char = line[i];

                if (char === '"') {
                    inQuotes = !inQuotes;
                } else if (char === ',' && !inQuotes) {
                    values.push(currentValue.trim());
                    currentValue = '';
                } else {
                    currentValue += char;
                }
            }

            // Add the last value
            values.push(currentValue.trim());

            let developer, name, category, paywareCode, votes, days, dateAdded, weeksInChart;

            if (format === 'simple') {
                [developer, name, votes] = values;
                category = 'Unknown';
                paywareCode = 'U';
                days = '0';
                dateAdded = '';
                weeksInChart = '0';
            } else { // detailed format
                [developer, name, category, paywareCode, votes, days, dateAdded, weeksInChart] = values;

                // Handle missing values
                weeksInChart = weeksInChart || '0';
            }

            // Check if the critical fields are valid
            if (!developer || !name) {
                errorLines.push({ lineNumber: index + 1, line, error: 'Missing developer or aircraft name' });
                return;
            }

            // Determine the payware status
            let paywareStatus;
            switch (paywareCode?.trim()) {
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

            // Create a unique key for lookups using cleaned names
            const cleanedName = name.trim().toLowerCase();
            const cleanedDeveloper = developer.trim().toLowerCase();
            const key = `${cleanedDeveloper}|${cleanedName}`;

            // Check if aircraft already exists in our data
            let aircraftId;
            const existingAircraft = existingAircraftMap.get(key);

            if (existingAircraft) {
                // Use existing aircraft ID
                aircraftId = existingAircraft.id;

                // Update any fields that might have changed (but preserve the ID)
                const updatedAircraft = {
                    ...existingAircraft,
                    category: category?.trim() || existingAircraft.category,
                    payware: paywareStatus || existingAircraft.payware,
                    dateAdded: dateAddedFormatted || existingAircraft.dateAdded,
                };

                // Update both the map and the array
                existingAircraftMap.set(key, updatedAircraft);

                console.log(`Updated existing aircraft: ${developer.trim()} - ${name.trim()} (ID: ${aircraftId})`);
            } else {
                // Create new aircraft with a unique ID
                aircraftId = uuidv4();

                // Basic aircraft data (without votes)
                const aircraftObj = {
                    id: aircraftId,
                    name: name.trim(),
                    manufacturer: developer.trim(),
                    category: category?.trim() || 'Unknown',
                    payware: paywareStatus,
                    buyUrl: "", // We don't have this data in the CSV
                    dateAdded: dateAddedFormatted
                };

                // Add to both the map and array
                existingAircraftMap.set(key, aircraftObj);

                console.log(`Added new aircraft: ${developer.trim()} - ${name.trim()} (ID: ${aircraftId})`);
            }

            // Now create the vote data separately
            const voteData = {
                aircraftId,
                votes: parseInt(votes) || 0,
                daysOnList: parseInt(days) || 0,
                weeksInChart: parseInt(weeksInChart) || 0
            };

            aircraftVotes.push(voteData);
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

    return { aircraftData: existingAircraft, aircraftVotes, errorLines };
};

// Create report from the aircraft votes data
const createReport = (aircraftVotes) => {
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
            id: reportId,
            type: "monthly",
            year: parseInt(year),
            month: parseInt(month),
            title: `Top Aircraft - ${monthName} ${year}`,
            description: `Monthly report of the most popular MSFS aircraft for ${monthName} ${year}.`,
            createdAt: now,
            updatedAt: now,
            aircraftVotes: aircraftVotes
        };
        return report;
    } else {
        // Create yearly report
        const report = {
            id: reportId,
            type: "yearly",
            year: parseInt(year),
            title: `Top Aircraft - ${year}`,
            description: `Yearly report of the most popular MSFS aircraft for ${year}.`,
            createdAt: now,
            updatedAt: now,
            aircraftVotes: aircraftVotes
        };
        return report;
    }
};

// Save the aircraft data separately
const saveAircraftData = (aircraftMap) => {
    const aircraftArray = Array.from(aircraftMap.values());
    console.log(`Saving ${aircraftArray.length} aircraft to ${aircraftOutputPath}`);
    fs.writeFileSync(aircraftOutputPath, JSON.stringify(aircraftArray, null, 2));
};

// Save the report data to the unpublished directory
const saveReportData = (report) => {
    // Create the filename based on the report type and ID
    const filename = `${report.id}.json`;
    const filePath = path.join(unpublishedDir, filename);

    console.log(`Saving unpublished report to ${filePath}`);
    fs.writeFileSync(filePath, JSON.stringify(report, null, 2));
};

// Main execution
try {
    // Read the CSV file
    const csvContent = fs.readFileSync(csvPath, 'utf8');

    // Parse the CSV and create aircraft data
    const { aircraftData, aircraftVotes, errorLines } = parseCSV(csvContent);

    // Create the report object
    const report = createReport(aircraftVotes);

    // Save all the data
    saveAircraftData(existingAircraftMap);
    saveReportData(report);

    console.log(`Successfully created report with ${aircraftVotes.length} aircraft`);

    // Exit with error if there were parsing errors
    if (errorLines.length > 0) {
        process.exit(1);
    }
} catch (error) {
    console.error('Error processing CSV:', error);
    process.exit(1);
}
