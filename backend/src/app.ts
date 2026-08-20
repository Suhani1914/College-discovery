import express from "express";
import cors from "cors";
import collegeRoutes from "./routes/college.routes";
import predictorRoutes from "./routes/predictor.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/colleges", collegeRoutes);
app.use("/api/predictor", predictorRoutes);

export default app;