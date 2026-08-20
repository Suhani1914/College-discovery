import { Router } from "express";
import { predict } from "../controllers/predictor.controller";

const router = Router();

router.post("/", predict);

export default router;