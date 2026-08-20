import { Request, Response, NextFunction } from "express";
import { predictorInputSchema } from "../validation/predictor.validation";
import { predictColleges } from "../services/predictor.service";

export async function predict(req: Request, res: Response, next: NextFunction) {
  try {
    const parsed = predictorInputSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({ error: "Invalid input", details: parsed.error.flatten() });
    }

    const results = await predictColleges(parsed.data);

    res.json({ data: results, count: results.length });
  } catch (err) {
    next(err);
  }
}