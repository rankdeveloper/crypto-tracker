import express from "express";
import { getCoins, getCurrent } from "../controllers/coins.js";

const router = express.Router();

router.get("/", getCoins);

router.get("/current", getCurrent);

export default router;
