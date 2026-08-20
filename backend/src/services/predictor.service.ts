import { prisma } from "../db";
import { PredictorInput } from "../validation/predictor.validation";

export async function predictColleges(input: PredictorInput) {
  const { exam, category, rank } = input;

  const cutoffs = await prisma.cutoffRecord.findMany({
    where: {
      exam,
      category,
      closingRank: { gte: rank },
    },
    orderBy: { closingRank: "asc" },
    include: {
      college: {
        select: {
          id: true,
          name: true,
          city: true,
          state: true,
          fees: true,
          rating: true,
        },
      },
    },
    take: 20,
  });

  return cutoffs.map((c) => ({
    college: c.college,
    closingRank: c.closingRank,
  }));
}