import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

async function importData() {
  const exportDir = path.join(process.cwd(), 'app/data/dev-export');
  const aircraft = JSON.parse(fs.readFileSync(path.join(exportDir, 'aircraft.json'), 'utf-8'));
  const reports = JSON.parse(fs.readFileSync(path.join(exportDir, 'reports.json'), 'utf-8'));
  const aircraftVotes = JSON.parse(fs.readFileSync(path.join(exportDir, 'aircraftVotes.json'), 'utf-8'));

  // Optionally clear tables first
  await prisma.aircraftVote.deleteMany();
  await prisma.report.deleteMany();
  await prisma.aircraft.deleteMany();

  await prisma.aircraft.createMany({ data: aircraft });
  await prisma.report.createMany({ data: reports });
  await prisma.aircraftVote.createMany({ data: aircraftVotes });
}

importData().then(() => {
  console.log('Import complete');
  process.exit(0);
}); 