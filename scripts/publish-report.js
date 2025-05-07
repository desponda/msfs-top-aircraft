const fs = require('fs');
const path = require('path');

// Get command line arguments
const args = process.argv.slice(2);
const reportId = args[0]; // The report ID (e.g. "2025-04" or "2025")

// Check if required arguments are provided
if (!reportId) {
    console.error('Usage: node publish-report.js <report-id>');
    console.error('  - report-id: The ID of the report to publish (e.g. "2025-04" or "2025")');
    process.exit(1);
}

// Paths to the unpublished and published directories
const unpublishedDir = path.join(__dirname, '..', 'app', 'data', 'unpublished');
const publishedDir = path.join(__dirname, '..', 'app', 'data', 'published');

// The source and destination file paths
const sourceFile = path.join(unpublishedDir, `${reportId}.json`);
const destFile = path.join(publishedDir, `${reportId}.json`);

// Check if the source file exists
if (!fs.existsSync(sourceFile)) {
    console.error(`Error: Report ${reportId} not found in unpublished directory.`);
    console.error(`  - Looked for: ${sourceFile}`);
    process.exit(1);
}

try {
    // Create a backup of the published file if it exists
    if (fs.existsSync(destFile)) {
        const backupFile = `${destFile}.backup-${new Date().toISOString().replace(/:/g, '-')}`;
        fs.copyFileSync(destFile, backupFile);
        console.log(`Created backup of existing published report: ${backupFile}`);
    }

    // Copy the unpublished file to the published directory
    fs.copyFileSync(sourceFile, destFile);
    console.log(`Successfully published report ${reportId}!`);
    console.log(`  - From: ${sourceFile}`);
    console.log(`  - To  : ${destFile}`);
} catch (error) {
    console.error('Error publishing report:', error);
    process.exit(1);
}
