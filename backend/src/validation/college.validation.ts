import { z } from "zod";

export const collegeListQuerySchema = z.object({
  search: z.string().trim().optional(),
  city: z.string().trim().optional(),
  maxFees: z.coerce.number().int().positive().optional(),
  minRating: z.coerce.number().min(0).max(5).optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(50).default(10),
});

export type CollegeListQuery = z.infer<typeof collegeListQuerySchema>;

export const collegeIdParamSchema = z.object({
  id: z.string().min(1),
});

export const compareQuerySchema = z.object({
  ids: z
    .string()
    .transform((val) => val.split(",").map((id) => id.trim()).filter(Boolean))
    .refine((arr) => arr.length >= 2 && arr.length <= 3, {
      message: "Provide between 2 and 3 college ids",
    }),
});