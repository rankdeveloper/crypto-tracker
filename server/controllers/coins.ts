import express from "express";
import { fetchTop10Coins } from "../services/coingeckoService.js";
import Coin from "../models/Coin.js";
import {
  isConnected,
  saveCoinsToMemory,
  getCoinsFromMemory,
} from "../services/databaseService.js";

export const getCoins = async (req: any, res: any) => {
  try {
    const coinData = await fetchTop10Coins();

    if (isConnected()) {
      for (const coin of coinData) {
        await Coin.findOneAndUpdate({ coinId: coin.coinId }, coin, {
          upsert: true,
          new: true,
        });
      }
    } else {
      saveCoinsToMemory(coinData);
    }

    res.json({
      success: true,
      data: coinData,
      lastUpdated: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error fetching coins:", error);
    res.status(500).json({
      success: false,
      error: "failed to fetch cryptocurrency data",
    });
  }
};

export const getCurrent = async (req: any, res: any) => {
  try {
    let coins;

    if (isConnected()) {
      coins = await Coin.find({}).sort({ rank: 1 });
    } else {
      coins = getCoinsFromMemory().sort((a, b) => a.rank - b.rank);
    }

    res.json({
      success: true,
      data: coins,
      lastUpdated: coins[0]?.lastUpdated || new Date().toISOString(),
    });
  } catch (error) {
    console.error("error fetching current coins:", error);
    res.status(500).json({
      success: false,
      error: "failed to fetch current cryptocurrency data",
    });
  }
};
