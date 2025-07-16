import express from "express";
import {
  getHistorys,
  getSingleCoin,
  postHistory,
} from "../controllers/history.js";

const router = express.Router();

router.post("/", postHistory);

router.get("/:coinId", getSingleCoin);

router.get("/", getHistorys);

export default router;
