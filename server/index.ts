import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { startCronJob } from "./services/cronService.js";
import coinsRoutes from "./routes/coins.js";
import historyRoutes from "./routes/history.js";
import { initializeDatabase } from "./services/databaseService.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

initializeDatabase()
  .then(() => {
    console.log("database initialized successfully");
    startCronJob();
  })
  .catch((error) => {
    console.error("database initialization error:", error);
    console.log("continuing with in-memory storage for demo purposes");

    startCronJob();
  });

app.use("/api/coins", coinsRoutes);
app.use("/api/history", historyRoutes);

app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
