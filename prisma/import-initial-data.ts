import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

async function importData() {
  const exportDir = path.join(process.cwd(), 'prisma/data');
  const aircraft = JSON.parse(fs.readFileSync(path.join(exportDir, 'aircraft.json'), 'utf-8'));
  const reports = JSON.parse(fs.readFileSync(path.join(exportDir, 'reports.json'), 'utf-8'));
  const aircraftVotes = JSON.parse(fs.readFileSync(path.join(exportDir, 'aircraftVotes.json'), 'utf-8'));

  // Only import if tables are empty
  const aircraftCount = await prisma.aircraft.count();
  const reportCount = await prisma.report.count();
  const aircraftVoteCount = await prisma.aircraftVote.count();

  if (aircraftCount === 0) {
    await prisma.aircraft.createMany({ data: aircraft });
    console.log('Imported aircraft');
  } else {
    console.log('Aircraft table not empty, skipping import');
  }

  if (reportCount === 0) {
    await prisma.report.createMany({ data: reports });
    console.log('Imported reports');
  } else {
    console.log('Report table not empty, skipping import');
  }

  if (aircraftVoteCount === 0) {
    await prisma.aircraftVote.createMany({ data: aircraftVotes });
    console.log('Imported aircraft votes');
  } else {
    console.log('AircraftVote table not empty, skipping import');
  }
}

importData().then(() => {
  console.log('Import complete');
  process.exit(0);
}); 