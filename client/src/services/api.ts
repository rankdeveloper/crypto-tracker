import axios from "axios";

// const API_BASE_URL = "http://localhost:5000/api";
const API_BASE_URL = "https://fso4k8kckco4sw44w04w0ccw.coolify.probir.dev/api";

export interface CryptoResponse {
  success: boolean;
  data: Array<{
    coinId: string;
    name: string;
    symbol: string;
    price: number;
    marketCap: number;
    priceChange24h: number;
    image: string;
    rank: number;
    lastUpdated: string;
  }>;
  lastUpdated: string;
}

export interface HistoryResponse {
  success: boolean;
  data: Array<{
    coinId: string;
    name: string;
    symbol: string;
    price: number;
    marketCap: number;
    priceChange24h: number;
    image: string;
    rank: number;
    timestamp: string;
  }>;
  coinId?: string;
  days?: number;
}

export const fetchCryptoData = async (): Promise<CryptoResponse> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/coins/current`);
    return response.data;
  } catch (error) {
    console.error("Error fetching crypto data:", error);
    throw error;
  }
};

export const fetchCurrentData = async (): Promise<CryptoResponse> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/coins/current`);
    return response.data;
  } catch (error) {
    console.error("Error fetching current data:", error);
    throw error;
  }
};

export const saveToHistory = async (): Promise<{
  success: boolean;
  message: string;
}> => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/history`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error saving to history:", error);
    throw error;
  }
};

export const fetchCoinHistory = async (
  coinId: string,
  days: number = 7
): Promise<HistoryResponse> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/history/${coinId}`, {
      params: { days },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching coin history:", error);
    throw error;
  }
};

export const fetchAllHistory = async (
  limit: number = 100
): Promise<HistoryResponse> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/history`, {
      params: { limit },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching history:", error);
    throw error;
  }
};

export const checkServerHealth = async (): Promise<{
  status: string;
  timestamp: string;
  uptime: number;
}> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/health`);
    return response.data;
  } catch (error) {
    console.error("Error checking server health:", error);
    throw error;
  }
};
