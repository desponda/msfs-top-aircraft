import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

async function exportData() {
  const aircraft = await prisma.aircraft.findMany();
  const reports = await prisma.report.findMany();
  const aircraftVotes = await prisma.aircraftVote.findMany();

  const exportDir = path.join(process.cwd(), 'app/data/dev-export');
  fs.mkdirSync(exportDir, { recursive: true });
  fs.writeFileSync(path.join(exportDir, 'aircraft.json'), JSON.stringify(aircraft, null, 2));
  fs.writeFileSync(path.join(exportDir, 'reports.json'), JSON.stringify(reports, null, 2));
  fs.writeFileSync(path.join(exportDir, 'aircraftVotes.json'), JSON.stringify(aircraftVotes, null, 2));
}

exportData().then(() => {
  console.log('Export complete');
  process.exit(0);
}); 