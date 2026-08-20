import { z } from "zod";

export const predictorInputSchema = z.object({
  exam: z.string().trim().min(1),
  category: z.enum(["General", "OBC", "SC", "ST"]),
  rank: z.coerce.number().int().positive(),
});

export type PredictorInput = z.infer<typeof predictorInputSchema>;