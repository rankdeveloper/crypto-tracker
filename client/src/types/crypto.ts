export type CryptoData = {
  coinId: string;
  name: string;
  symbol: string;
  price: number;
  marketCap: number;
  priceChange24h: number;
  image: string;
  rank: number;
  lastUpdated: string;
};

export type HistoryData = CryptoData & { timestamp: string };

export type ApiResponse<T> = {
  success: boolean;
  data: T;
  lastUpdated?: string;
  error?: string;
};
