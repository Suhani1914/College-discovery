import type { Request, Response, NextFunction } from "express";
import {
  collegeListQuerySchema,
  collegeIdParamSchema,
  compareQuerySchema,
} from "../validation/college.validation.js";
import {
  getColleges,
  getCollegeById,
  compareColleges,
} from "../services/college.service.js";

export async function listColleges(req: Request, res: Response, next: NextFunction) {
  try {
    const parsed = collegeListQuerySchema.safeParse(req.query);

    if (!parsed.success) {
      return res.status(400).json({ error: "Invalid query parameters", details: parsed.error.flatten() });
    }

    const result = await getColleges(parsed.data);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function getCollege(req: Request, res: Response, next: NextFunction) {
  try {
    const parsed = collegeIdParamSchema.safeParse(req.params);

    if (!parsed.success) {
      return res.status(400).json({ error: "Invalid college id" });
    }

    const college = await getCollegeById(parsed.data.id);

    if (!college) {
      return res.status(404).json({ error: "College not found" });
    }

    res.json(college);
  } catch (err) {
    next(err);
  }
}

export async function compareCollegesHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const parsed = compareQuerySchema.safeParse(req.query);

    if (!parsed.success) {
      return res.status(400).json({ error: "Invalid query", details: parsed.error.flatten() });
    }

    const colleges = await compareColleges(parsed.data.ids);

    if (colleges.length === 0) {
      return res.status(404).json({ error: "No colleges found for given ids" });
    }

    res.json({ data: colleges });
  } catch (err) {
    next(err);
  }
}