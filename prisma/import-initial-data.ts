import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

// Helper function to read JSON files with error handling
function readJsonFile(filePath: string): any[] {
  try {
    console.log(`Reading file: ${filePath}`);
    const content = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    console.error(`Error reading or parsing ${filePath}:`, error);
    return [];
  }
}

// Simple async function to handle imports with error handling
async function main() {
  let prisma: PrismaClient | undefined;
  
  try {
    console.log('Starting data import process...');
    
    // Create Prisma client
    prisma = new PrismaClient();
    
    // Read data files
    const exportDir = path.join(process.cwd(), 'data');
    console.log('Reading data from:', exportDir);
    
    // Read JSON files with error handling
    const aircraft = readJsonFile(path.join(exportDir, 'aircraft.json'));
    const reports = readJsonFile(path.join(exportDir, 'reports.json'));
    const aircraftVotes = readJsonFile(path.join(exportDir, 'aircraftVotes.json'));
    
    console.log(`Found ${aircraft.length} aircraft, ${reports.length} reports, and ${aircraftVotes.length} votes to import`);
    
    // Only import if tables are empty
    const aircraftCount = await prisma.aircraft.count();
    const reportCount = await prisma.report.count();
    const aircraftVoteCount = await prisma.aircraftVote.count();
    
    if (aircraftCount === 0) {
      await prisma.aircraft.createMany({ data: aircraft });
      console.log(`Imported ${aircraft.length} aircraft`);
    } else {
      console.log('Aircraft table not empty, skipping import');
    }
    
    if (reportCount === 0) {
      await prisma.report.createMany({ data: reports });
      console.log(`Imported ${reports.length} reports`);
    } else {
      console.log('Report table not empty, skipping import');
    }
    
    if (aircraftVoteCount === 0) {
      await prisma.aircraftVote.createMany({ data: aircraftVotes });
      console.log(`Imported ${aircraftVotes.length} aircraft votes`);
    } else {
      console.log('AircraftVote table not empty, skipping import');
    }
    
    console.log('Import process completed successfully');
  } catch (error: any) {
    console.error('Error during import:', error);
    process.exit(1);
  } finally {
    // Ensure we disconnect the Prisma client
    await prisma?.$disconnect().catch(console.error);
  }
}

// Run the import
main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  }); 