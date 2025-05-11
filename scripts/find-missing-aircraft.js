const fs = require('fs');
const path = require('path');

// Load aircraft.json
const aircraftPath = path.join(__dirname, '../app/data/aircraft.json');
const aircraftList = JSON.parse(fs.readFileSync(aircraftPath, 'utf-8'));
const aircraftIds = new Set(aircraftList.map(a => a.id));

// List of report files
const publishedDir = path.join(__dirname, '../app/data/published');
const unpublishedDir = path.join(__dirname, '../app/data/unpublished');
const reportFiles = fs.readdirSync(publishedDir).filter(f => f.endsWith('.json'));
const unpublishedFiles = fs.readdirSync(unpublishedDir).filter(f => f.endsWith('.json'));

const missing = new Set();
const referenced = new Set();

function checkReportFiles(files, dir) {
  for (const file of files) {
    const reportPath = path.join(dir, file);
    const report = JSON.parse(fs.readFileSync(reportPath, 'utf-8'));
    if (Array.isArray(report.aircraftVotes)) {
      for (const vote of report.aircraftVotes) {
        referenced.add(vote.aircraftId);
        if (!aircraftIds.has(vote.aircraftId)) {
          missing.add(vote.aircraftId);
        }
      }
    }
  }
}

checkReportFiles(reportFiles, publishedDir);
checkReportFiles(unpublishedFiles, unpublishedDir);

console.log('Missing aircraft IDs referenced in published or unpublished reports but not in aircraft.json:');
console.log(Array.from(missing));
console.log(`\nTotal missing: ${missing.size}`); 