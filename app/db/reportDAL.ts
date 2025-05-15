import { prisma } from './prisma';
import { ReportType } from '@prisma/client';

export async function getAllReports(filters?: {
  year?: number;
  type?: string;
  month?: number;
  published?: boolean;
}) {
  const { year, type, month, published } = filters || {};
  return prisma.report.findMany({
    where: {
      ...(year && { year }),
      ...(type && { type: type ? ReportType[type.toUpperCase() as keyof typeof ReportType] : undefined }),
      ...(month && { month }),
      ...(typeof published === 'boolean' ? { published } : {}),
    },
    include: {
      votes: true,
    },
    orderBy: [
      { year: 'desc' },
      { month: 'desc' },
    ],
  });
}

export async function getReportById(id: string) {
  return prisma.report.findUnique({
    where: { id },
    include: { votes: true },
  });
}

export async function createReport(data: {
  type: string;
  year: number;
  month?: number;
  title: string;
  description?: string;
  aircraftVotes: Array<{
    aircraftId: string;
    votes: number;
    daysOnList: number;
    weeksInChart: number;
    positionChange?: number;
    rank?: number;
  }>;
}) {
  return prisma.report.create({
    data: {
      type: ReportType[data.type.toUpperCase() as keyof typeof ReportType],
      year: data.year,
      month: data.month,
      title: data.title,
      description: data.description,
      votes: {
        create: data.aircraftVotes.map(v => ({
          aircraftId: v.aircraftId,
          votes: v.votes,
          daysOnList: v.daysOnList,
          weeksInChart: v.weeksInChart,
          positionChange: v.positionChange,
          rank: v.rank,
        })),
      },
    },
    include: { votes: true },
  });
} 