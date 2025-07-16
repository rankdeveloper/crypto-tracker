import axios from "axios";

export const fetchTop10Coins = async () => {
  try {
    const response = await axios.get(
      `${process.env.COINGECKO_API_BASE}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false`
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
    console.error("failed to fetch data from CoinGecko API", error.message);

    if (error) {
      throw new Error(`Failed to fetch cryptocurrency data: ${error.message}`);
    }
  }
};

export const fetchCoinHistory = async (coinId, days = 7) => {
  try {
    const response = await axios.get(
      `${COINGECKO_API_BASE}/coins/${coinId}/market_chart?vs_currency=usd&days=${days}`
    );

    return response.data;
  } catch (error) {
    console.error(`Error fetching history for ${coinId}:`, error.message);
    throw new Error("failed to fetch coin history");
  }
};
