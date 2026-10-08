import axios from "axios";
import { getFallbackData } from "../utils/index.js";

const COINGECKO_API_BASE =
  process.env.COINGECKO_API_BASE || "https://api.coingecko.com/api/v3";

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const getRetryDelay = (error, attempt) => {
  const retryAfterHeader = error?.response?.headers?.["retry-after"];
  const retryAfterValue = Number(retryAfterHeader);

  if (Number.isFinite(retryAfterValue) && retryAfterValue > 0) {
    return retryAfterValue * 1000;
  }

  return Math.min(30000, 15000 * attempt);
};

export const fetchTop10Coins = async () => {
  const maxRetries = 5;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await axios.get(
        `${COINGECKO_API_BASE}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false`,
      );

      console.log("successfully fetched data from coinGecko API");

      return response.data.map((coin) => ({
        coinId: coin.id,
        name: coin.name,
        symbol: coin.symbol.toUpperCase(),
        price: coin.current_price,
        marketCap: coin.market_cap,
        priceChange24h: coin.price_change_percentage_24h,
        image: coin.image,
        rank: coin.market_cap_rank,
        lastUpdated: new Date(),
      }));
    } catch (error) {
      const message = error?.message || "Unknown CoinGecko error";
      const isRateLimited =
        error?.response?.status === 429 || message.includes("429");

      if (isRateLimited && attempt < maxRetries) {
        const delay = getRetryDelay(error, attempt);
        console.log(
          `failed to fetch data from CoinGecko API ${message}; rate limited, waiting ${delay / 1000}s before retry (attempt ${attempt + 1}/${maxRetries})`,
        );
        await wait(delay);
        continue;
      }

      console.error("failed to fetch data from CoinGecko API", message);
      break;
    }
  }

  console.warn("CoinGecko unavailable, using fallback data");
  return getFallbackData();
};

export const fetchCoinHistory = async (coinId, days = 7) => {
  const maxRetries = 3;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await axios.get(
        `${COINGECKO_API_BASE}/coins/${coinId}/market_chart?vs_currency=usd&days=${days}`,
      );

      return response.data;
    } catch (error) {
      const message = error?.message || "Unknown CoinGecko error";
      const isRateLimited =
        error?.response?.status === 429 || message.includes("429");

      if (isRateLimited && attempt < maxRetries) {
        const delay = getRetryDelay(error, attempt);
        console.log(
          `failed to fetch history for ${coinId} ${message}; rate limited, waiting ${delay / 1000}s before retry (attempt ${attempt + 1}/${maxRetries})`,
        );
        await wait(delay);
        continue;
      }

      console.error(`Error fetching history for ${coinId}:`, message);
      return [];
    }
  }

  return [];
};
