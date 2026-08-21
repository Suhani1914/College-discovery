import { prisma } from "../db.js";
import type { CollegeListQuery } from "../validation/college.validation.js";

export async function getColleges(query: CollegeListQuery) {
  const { search, city, maxFees, minRating, page, limit } = query;

  const where = {
    ...(search && {
      name: { contains: search, mode: "insensitive" as const },
    }),
    ...(city && { city: { equals: city, mode: "insensitive" as const } }),
    ...(maxFees && { fees: { lte: maxFees } }),
    ...(minRating && { rating: { gte: minRating } }),
  };

  const [colleges, total] = await Promise.all([
    prisma.college.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { rating: "desc" },
      select: {
        id: true,
        name: true,
        city: true,
        state: true,
        fees: true,
        rating: true,
      },
    }),
    prisma.college.count({ where }),
  ]);

  return {
    data: colleges,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}

export async function getCollegeById(id: string) {
  const college = await prisma.college.findUnique({
    where: { id },
    include: {
      courses: true,
      placements: {
        orderBy: { year: "desc" },
      },
      reviews: {
        orderBy: { createdAt: "desc" },
      },
    },
  });

  

  return college;
}

export async function compareColleges(ids: string[]) {
  const colleges = await prisma.college.findMany({
    where: { id: { in: ids } },
    include: {
      placements: {
        orderBy: { year: "desc" },
        take: 1,
      },
    },
  });

  return colleges;
}