import express from "express";
import { fetchTop10Coins } from "../services/coingeckoService.js";
import History from "../models/History.js";
import {
  isConnected,
  saveHistoryToMemory,
  getHistoryFromMemory,
  getAllHistoryFromMemory,
} from "../services/databaseService.js";

export const postHistory = async (req: any, res: any) => {
  try {
    const coinData = await fetchTop10Coins();

    if (isConnected()) {
      await History.insertMany(coinData);
    } else {
      saveHistoryToMemory(coinData);
    }

    res.json({
      success: true,
      message: "cryptocurrency data saved to history",
      count: coinData.length,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error saving to history:", error);
    res.status(500).json({
      success: false,
      error: "Failed to save cryptocurrency data to history",
    });
  }
};

export const getSingleCoin = async (req: any, res: any) => {
  try {
    const { coinId } = req.params;
    const { days = 7 } = req.query;

    let historyData;

    if (isConnected()) {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - parseInt(days));

      historyData = await History.find({
        coinId: coinId,
        timestamp: { $gte: startDate },
      }).sort({ timestamp: -1 });
    } else {
      historyData = getHistoryFromMemory(coinId, parseInt(days));
    }

    res.json({
      success: true,
      data: historyData,
      coinId: coinId,
      days: parseInt(days),
    });
  } catch (error) {
    console.error("Error fetching history:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch historical data",
    });
  }
};

export const getHistorys = async (req: any, res: any) => {
  try {
    const { limit = 100 } = req.query;

    let historyData;

    if (isConnected()) {
      historyData = await History.find({})
        .sort({ timestamp: -1 })
        .limit(parseInt(limit));
    } else {
      historyData = getAllHistoryFromMemory(parseInt(limit));
    }

    res.json({
      success: true,
      data: historyData,
      count: historyData.length,
    });
  } catch (error) {
    console.error("Error fetching history:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch historical data",
    });
  }
};
