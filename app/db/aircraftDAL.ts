import { prisma } from './prisma';

export async function getAllAircraft(filters?: {
  manufacturer?: string;
  category?: string;
  tag?: string;
  search?: string;
}) {
  const { manufacturer, category, tag, search } = filters || {};
  return prisma.aircraft.findMany({
    where: {
      ...(manufacturer && { manufacturer: { equals: manufacturer, mode: 'insensitive' } }),
      ...(category && { category: { equals: category, mode: 'insensitive' } }),
      ...(tag && { tags: { has: tag } }),
      ...(search && {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { manufacturer: { contains: search, mode: 'insensitive' } },
        ],
      }),
    },
  });
}

export async function getAircraftById(id: string) {
  return prisma.aircraft.findUnique({ where: { id } });
} 