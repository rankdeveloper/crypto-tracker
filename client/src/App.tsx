import { useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";
import SearchBar from "./componets/SearchBar";
import FilterSort from "./componets/FilterSort";
import CryptoCard from "./componets/CryptoCard";

import "./App.css";
import { motion } from "framer-motion";
import { fetchCryptoData } from "./services/api";
import type { CryptoData } from "./types/crypto";
import { useQuery } from "@tanstack/react-query";
import { childVariants, parentVariants } from "./utils/variants";
import Card_Shimmer from "./loading";
import LastUpdate from "./componets/LastUpdated";
import Header from "./componets/Header";
import HeaderGrid from "./componets/HeaderGrid";
import { ErrorComponent } from "./componets/LoadingSpinner";

function App() {
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([]);
  const [filteredData, setFilteredData] = useState<CryptoData[]>([]);
  const [lastUpdated, setLastUpdated] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("rank");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["crypto"],
    queryFn: fetchCryptoData,
    gcTime: 5 * 60 * 1000,
    refetchInterval: 30 * 60 * 1000,
  });

  useEffect(() => {
    if (data) {
      setCryptoData(data.data);
      setFilteredData(data.data);
      setLastUpdated(data.lastUpdated);
    }
  }, [data]);

  useEffect(() => {
    let filtered = cryptoData.filter(
      (coin) =>
        coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    );

    filtered = [...filtered].sort((a, b) => {
      let aValue = a[sortBy as keyof CryptoData];
      let bValue = b[sortBy as keyof CryptoData];

      if (typeof aValue === "string") {
        aValue = aValue.toLowerCase();
        bValue = (bValue as string).toLowerCase();
      }

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredData(filtered);
  }, [cryptoData, searchTerm, sortBy, sortOrder]);

  const totalMarketCap = filteredData.reduce(
    (sum, coin) => sum + coin.marketCap,
    0
  );
  const gainers = filteredData.filter((coin) => coin.priceChange24h > 0).length;
  const losers = filteredData.filter((coin) => coin.priceChange24h < 0).length;

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col no-scrollbar ">
        <div className="sm:sticky top-0 z-10 filter backdrop-blur-md px-4 py-3 shadow-lg">
          <div className="container mx-auto">
            <Header />

            <HeaderGrid
              totalMarketCap={totalMarketCap}
              gainers={gainers}
              losers={losers}
            />
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 1,
                duration: 1,
                type: "keyframes",
                stiffness: 100,
              }}
              className="flex flex-col lg:flex-row gap-3 lg:gap-2 mb-1 lg:mb-2 sticky sm:relative top-0 z-10"
            >
              <SearchBar
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
              />
              <FilterSort
                sortBy={sortBy}
                sortOrder={sortOrder}
                onSortChange={setSortBy}
                onOrderChange={setSortOrder}
              />
              <button className="bg-purple-600 hover:bg-purple-700 disabled:bg-purple-800 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors duration-200">
                <RefreshCw
                  className={`w-5 h-5 ${isLoading ? "animate-spin" : ""}`}
                />
                Refresh
              </button>
            </motion.div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar container mx-auto px-4">
          {isError && <ErrorComponent isError={isError} />}
          {isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 py-4">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, i) => (
                <Card_Shimmer key={i} />
              ))}
            </div>
          )}
          {!isLoading && (
            <motion.div
              variants={parentVariants}
              initial={"hidden"}
              animate={"visible"}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 py-4"
            >
              {filteredData.map((coin, i) => (
                <motion.div variants={childVariants} key={i}>
                  <CryptoCard key={coin.coinId} coin={coin} />
                </motion.div>
              ))}
            </motion.div>
          )}
          {!isLoading && filteredData.length === 0 && !isError && (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">
                No cryptocurrencies found matching your search.
              </p>
            </div>
          )}
        </div>
      </div>

      {lastUpdated && <LastUpdate lastUpdated={lastUpdated} />}
    </>
  );
}

export default App;
