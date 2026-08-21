import { Router } from "express";
import { predict } from "../controllers/predictor.controller.js";

const router = Router();

router.post("/", predict);

export default router;