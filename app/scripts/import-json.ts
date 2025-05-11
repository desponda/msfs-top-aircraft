import { PrismaClient } from '@prisma/client';
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

function cleanAircraftName(name: string): string {
  // Remove anything in parentheses and trim whitespace at the end
  return name.replace(/\s*\([^)]*\)/g, '').trim();
}

async function importAircraft() {
  const aircraftPath = path.join(process.cwd(), 'app/data/aircraft.json');
  if (!fs.existsSync(aircraftPath)) {
    console.error('Aircraft JSON not found:', aircraftPath);
    return;
  }
  const raw = fs.readFileSync(aircraftPath, 'utf-8');
  const aircraftList = JSON.parse(raw);
  // Use a map to enforce uniqueness on (manufacturer, name)
  const uniqueAircraft = new Map();
  for (const aircraft of aircraftList) {
    const cleanedName = cleanAircraftName(aircraft.name);
    const cleanedManufacturer = aircraft.manufacturer.trim();
    const key = `${cleanedManufacturer.toLowerCase()}|${cleanedName.toLowerCase()}`;
    if (uniqueAircraft.has(key)) continue; // skip duplicates
    uniqueAircraft.set(key, { ...aircraft, name: cleanedName, manufacturer: cleanedManufacturer });
  }
  for (const aircraft of uniqueAircraft.values()) {
    const { votes, ...aircraftData } = aircraft;
    await prisma.aircraft.upsert({
      where: { id: aircraftData.id },
      update: aircraftData,
      create: aircraftData,
    });
  }
  console.log('Aircraft import complete.');
  // Log all aircraft IDs in the database
  const dbAircraft = await prisma.aircraft.findMany({ select: { id: true } });
  console.log('Aircraft IDs in DB after import:', dbAircraft.map((a: { id: string }) => a.id));
  // Check for specific aircraft ID
  const specificId = '05354448-83b4-4bb3-96ad-a0a2da2333e6';
  const found = dbAircraft.some((a: { id: string }) => a.id === specificId);
  if (found) {
    console.log(`Aircraft with ID ${specificId} exists in the DB after import.`);
  } else {
    console.error(`Aircraft with ID ${specificId} is MISSING from the DB after import!`);
  }
}

async function importReports() {
  // Import published reports
  const publishedDir = path.join(process.cwd(), 'app/data/published');
  if (fs.existsSync(publishedDir)) {
    const files = fs.readdirSync(publishedDir).filter((f: string) => f.endsWith('.json'));
    for (const [i, file] of files.entries()) {
      const filePath = path.join(publishedDir, file);
      const raw = fs.readFileSync(filePath, 'utf-8');
      const report = JSON.parse(raw);
      // Deduplicate aircraftVotes by aircraftId
      const seenAircraft = new Set();
      const mappedVotes = [];
      for (const v of report.aircraftVotes) {
        if (seenAircraft.has(v.aircraftId)) continue;
        seenAircraft.add(v.aircraftId);
        mappedVotes.push({
          aircraftId: v.aircraftId,
          votes: v.votes,
          positionChange: v.positionChange,
        });
      }
      if (i === 0) {
        console.log('First published report mappedVotes:', mappedVotes.slice(0, 10));
        console.log('First 20 aircraft IDs referenced in first report:', mappedVotes.slice(0, 20).map(v => v.aircraftId));
      }
      // Check if all aircraftIds in mappedVotes exist in the database
      const voteAircraftIds = mappedVotes.map(v => v.aircraftId);
      const dbAircraftIdsSet = new Set((await prisma.aircraft.findMany({ select: { id: true } })).map((a: { id: string }) => a.id));
      const missingIds = voteAircraftIds.filter(id => !dbAircraftIdsSet.has(id));
      if (missingIds.length > 0) {
        console.error(`Report ${report.id} references missing aircraft IDs:`, missingIds);
        throw new Error(`Aborting import for report ${report.id} due to missing aircraft IDs.`);
      }
      const existing = await prisma.report.findUnique({ where: { id: report.id } });
      if (existing) {
        await prisma.report.update({
          where: { id: report.id },
          data: {
            type: report.type,
            year: report.year,
            month: report.month,
            title: report.title,
            description: report.description,
            createdAt: report.createdAt ? new Date(report.createdAt) : undefined,
            updatedAt: report.updatedAt ? new Date(report.updatedAt) : undefined,
            published: true,
          },
        });
        await prisma.aircraftVote.deleteMany({ where: { reportId: report.id } });
        if (mappedVotes.length > 0) {
          console.log(`About to createMany for reportId ${report.id}:`, JSON.stringify(mappedVotes, null, 2));
          const createManyResult = await prisma.aircraftVote.createMany({
            data: mappedVotes.map((v) => ({ ...v, reportId: report.id })),
          });
          console.log(`createMany result for reportId ${report.id}:`, createManyResult);
        }
      } else {
        await prisma.report.create({
          data: {
            id: report.id,
            type: report.type,
            year: report.year,
            month: report.month,
            title: report.title,
            description: report.description,
            createdAt: report.createdAt ? new Date(report.createdAt) : undefined,
            updatedAt: report.updatedAt ? new Date(report.updatedAt) : undefined,
            published: true,
            votes: {
              create: mappedVotes,
            },
          },
        });
      }
    }
    console.log('Published reports import complete.');
  }

  // Import unpublished reports
  const unpublishedDir = path.join(process.cwd(), 'app/data/unpublished');
  if (fs.existsSync(unpublishedDir)) {
    const files = fs.readdirSync(unpublishedDir).filter((f: string) => f.endsWith('.json'));
    for (const file of files) {
      const filePath = path.join(unpublishedDir, file);
      const raw = fs.readFileSync(filePath, 'utf-8');
      const report = JSON.parse(raw);
      // Use a different id for unpublished reports to avoid overwriting published ones
      const unpublishedId = report.id + '-draft';
      // Deduplicate aircraftVotes by aircraftId
      const seenAircraft = new Set();
      const mappedVotes = [];
      for (const v of report.aircraftVotes) {
        if (seenAircraft.has(v.aircraftId)) continue;
        seenAircraft.add(v.aircraftId);
        mappedVotes.push({
          aircraftId: v.aircraftId,
          votes: v.votes,
          // Do not import positionChange for unpublished
        });
      }
      // Check if all aircraftIds in mappedVotes exist in the database
      const voteAircraftIds = mappedVotes.map(v => v.aircraftId);
      const dbAircraftIdsSet = new Set((await prisma.aircraft.findMany({ select: { id: true } })).map((a: { id: string }) => a.id));
      const missingIds = voteAircraftIds.filter(id => !dbAircraftIdsSet.has(id));
      if (missingIds.length > 0) {
        console.error(`Report ${report.id} references missing aircraft IDs:`, missingIds);
        throw new Error(`Aborting import for report ${report.id} due to missing aircraft IDs.`);
      }
      const existing = await prisma.report.findUnique({ where: { id: unpublishedId } });
      if (existing) {
        await prisma.report.update({
          where: { id: unpublishedId },
          data: {
            type: report.type,
            year: report.year,
            month: report.month,
            title: report.title,
            description: report.description,
            createdAt: report.createdAt ? new Date(report.createdAt) : undefined,
            updatedAt: report.updatedAt ? new Date(report.updatedAt) : undefined,
            published: false,
          },
        });
        await prisma.aircraftVote.deleteMany({ where: { reportId: unpublishedId } });
        if (mappedVotes.length > 0) {
          console.log(`About to createMany for (unpublished) reportId ${unpublishedId}:`, JSON.stringify(mappedVotes, null, 2));
          const createManyResult = await prisma.aircraftVote.createMany({
            data: mappedVotes.map((v) => ({ ...v, reportId: unpublishedId })),
          });
          console.log(`createMany result for (unpublished) reportId ${unpublishedId}:`, createManyResult);
        }
      } else {
        await prisma.report.create({
          data: {
            id: unpublishedId,
            type: report.type,
            year: report.year,
            month: report.month,
            title: report.title,
            description: report.description,
            createdAt: report.createdAt ? new Date(report.createdAt) : undefined,
            updatedAt: report.updatedAt ? new Date(report.updatedAt) : undefined,
            published: false,
            votes: {
              create: mappedVotes,
            },
          },
        });
      }
    }
    console.log('Unpublished reports import complete.');
  }
}

async function main() {
  const onlyAircraft = process.argv.includes('--aircraft-only');
  if (onlyAircraft) {
    await importAircraft();
  } else {
    await importAircraft();
    await importReports();
  }
  await prisma.$disconnect();
}

main().catch(e => {
  console.error(e);
  process.exit(1);
}); 