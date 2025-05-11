const fs = require('fs');
const path = require('path');

function cleanAircraftName(name) {
  return name.replace(/\s*\([^)]*\)/g, '').trim();
}

const aircraftPath = path.join(__dirname, '../app/data/aircraft.json');
const aircraftList = JSON.parse(fs.readFileSync(aircraftPath, 'utf-8'));

const seen = new Map();
const deduped = [];

for (const aircraft of aircraftList) {
  const cleanedName = cleanAircraftName(aircraft.name);
  const cleanedManufacturer = aircraft.manufacturer.trim();
  const key = `${cleanedManufacturer.toLowerCase()}|${cleanedName.toLowerCase()}`;
  if (!seen.has(key)) {
    // Optionally, update the name in the output to the cleaned version
    // aircraft.name = cleanedName;
    seen.set(key, true);
    deduped.push(aircraft);
  }
}

fs.writeFileSync(aircraftPath, JSON.stringify(deduped, null, 2));
console.log(`Deduplicated aircraft.json: kept ${deduped.length} of ${aircraftList.length} entries.`); 