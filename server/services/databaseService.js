import mongoose from "mongoose";

let inMemoryCoins = [];
let inMemoryHistory = [];

let isMongoConnected = false;

export const initializeDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 5000,
    });

    isMongoConnected = true;
    console.log("mongodb connected");
    return true;
  } catch (error) {
    console.log("connection failed ", error.message);
    isMongoConnected = false;
    return false;
  }
};

export const isConnected = () => isMongoConnected;

export const saveCoinsToMemory = (coins) => {
  inMemoryCoins = coins.map((coin) => ({
    ...coin,
    _id: coin.coinId,
    createdAt: new Date(),
    updatedAt: new Date(),
  }));
};

export const getCoinsFromMemory = () => {
  return inMemoryCoins;
};

export const saveHistoryToMemory = (historyData) => {
  const historyEntries = historyData.map((coin) => ({
    ...coin,
    _id: `${coin.coinId}-${Date.now()}`,
    createdAt: new Date(),
    updatedAt: new Date(),
  }));

  inMemoryHistory.push(...historyEntries);

  //keeping last 1000
  if (inMemoryHistory.length > 1000) {
    inMemoryHistory = inMemoryHistory.slice(-1000);
  }
};

export const getHistoryFromMemory = (coinId = null, days = 7) => {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  let filtered = inMemoryHistory.filter(
    (entry) => new Date(entry.timestamp) >= startDate
  );

  if (coinId) {
    filtered = filtered.filter((entry) => entry.coinId === coinId);
  }

  return filtered.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
};

export const getAllHistoryFromMemory = (limit = 100) => {
  return inMemoryHistory
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    .slice(0, limit);
};
