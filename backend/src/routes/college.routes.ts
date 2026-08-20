import { Router } from "express";
import { listColleges, getCollege, compareCollegesHandler } from "../controllers/college.controller";

const router = Router();

router.get("/", listColleges);
router.get("/compare", compareCollegesHandler);
router.get("/:id", getCollege);

export default router;