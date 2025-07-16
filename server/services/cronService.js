import cron from "node-cron";
import { fetchTop10Coins } from "./coingeckoService.js";
import History from "../models/History.js";
import Coin from "../models/Coin.js";
import {
  isConnected,
  saveHistoryToMemory,
  saveCoinsToMemory,
} from "./databaseService.js";
import { getFallbackData } from "../utils/index.js";

const retryWithBackoff = async (fn, maxRetries = 5, baseDelay = 10000) => {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      if (error.message.includes("429") && attempt < maxRetries) {
        const delay = baseDelay * Math.pow(2, attempt - 1);
        console.log(
          `rate limited, waiting ${
            delay / 1000
          }s before retry (attempt ${attempt}/${maxRetries})`
        );
        await new Promise((resolve) => setTimeout(resolve, delay));
      } else if (attempt === maxRetries) {
        console.error(`fail after ${maxRetries} attempts: ${error.message}`);
        throw error;
      } else {
        throw error;
      }
    }
  }
};

export const startCronJob = () => {
  cron.schedule(
    "0 * * * *",
    async () => {
      console.log(" coinGecko api...", new Date().toTimeString());

      try {
        const coinData = await fetchTop10Coins();

        if (isConnected()) {
          for (const coin of coinData) {
            await Coin.findOneAndUpdate({ coinId: coin.coinId }, coin, {
              upsert: true,
              new: true,
            });
          }
          await History.insertMany(coinData);
        } else {
          saveHistoryToMemory(coinData);
        }

        console.log(
          ` saved ${
            coinData.length
          } coins to history :  ${new Date().toISOString()}`
        );
      } catch (error) {
        console.error("error scheduling", error.message);
      }
    },
    {
      timezone: "UTC",
    }
  );

  console.log("Cron job scheduled: Running every hour");

  setTimeout(async () => {
    console.log(" initial crypto data sync...");
    try {
      const coinData = await retryWithBackoff(fetchTop10Coins, 5, 15000);

      if (isConnected()) {
        //saving both col history and coin wla
        for (const coin of coinData) {
          await Coin.findOneAndUpdate({ coinId: coin.coinId }, coin, {
            upsert: true,
            new: true,
          });
        }
        await History.insertMany(coinData);
      } else {
        saveCoinsToMemory(coinData);
        saveHistoryToMemory(coinData);
      }

      console.log("sync completed");
    } catch (error) {
      console.error(
        "error in initial sync, loading fallback data:",
        error.message
      );

      const fallbackData = getFallbackData();

      if (isConnected()) {
        try {
          for (const coin of fallbackData) {
            await Coin.findOneAndUpdate({ coinId: coin.coinId }, coin, {
              upsert: true,
              new: true,
            });
          }
          console.log("fallback data loaded to database");
        } catch (dbError) {
          console.error(
            "err saving fallback data to database:",
            dbError.message
          );
        }
      } else {
        saveCoinsToMemory(fallbackData);
        console.log("data loaded to memory");
      }
    }
  }, 5000);
};
