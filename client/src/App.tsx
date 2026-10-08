import { useEffect, useState, type CSSProperties } from "react";
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
  const [isScrolled, setIsScrolled] = useState(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["crypto"],
    queryFn: fetchCryptoData,
    gcTime: 5 * 60 * 1000,
    refetchInterval: 30 * 60 * 1000,
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
        coin.symbol.toLowerCase().includes(searchTerm.toLowerCase()),
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
    0,
  );
  const gainers = filteredData.filter((coin) => coin.priceChange24h > 0).length;
  const losers = filteredData.filter((coin) => coin.priceChange24h < 0).length;

  const shellStyle = {
    "--header-offset": isScrolled ? "15rem" : "21rem",
  } as CSSProperties;

  return (
    <div
      className="dashboard-shell min-h-screen text-slate-100"
      style={shellStyle}
    >
      <div className="dashboard-glow dashboard-glow-one" />
      <div className="dashboard-glow dashboard-glow-two" />

      <header
        className={`topbar rounded-[28px] border border-white/10 bg-slate-900/70 p-4 shadow-[0_20px_80px_rgba(15,23,42,0.7)] backdrop-blur-xl sm:p-5 ${
          isScrolled ? "header-scrolled" : ""
        }`}
      >
        <Header />

        <div className="mt-6">
          <HeaderGrid
            totalMarketCap={totalMarketCap}
            gainers={gainers}
            losers={losers}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="mt-5 flex flex-col gap-3 lg:flex-row lg:items-center"
        >
          <div className="flex-1">
            <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
          </div>

          <div className="flex items-center gap-3">
            <FilterSort
              sortBy={sortBy}
              sortOrder={sortOrder}
              onSortChange={setSortBy}
              onOrderChange={setSortOrder}
            />

            <button className="premium-button flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-white sm:px-5">
              <RefreshCw
                className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`}
              />
              Refresh
            </button>
          </div>
        </motion.div>
      </header>

      <div className="dashboard-content relative z-10 mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <main>
          {isError && <ErrorComponent isError={isError} />}

          {isLoading && (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((_, i) => (
                <Card_Shimmer key={i} />
              ))}
            </div>
          )}

          {!isLoading && (
            <motion.div
              variants={parentVariants}
              initial="hidden"
              animate="visible"
              className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4"
            >
              {filteredData.map((coin, i) => (
                <motion.div variants={childVariants} key={coin.coinId || i}>
                  <CryptoCard coin={coin} />
                </motion.div>
              ))}
            </motion.div>
          )}

          {!isLoading && filteredData.length === 0 && !isError && (
            <div className="mt-8 rounded-2xl border border-slate-700 bg-slate-900/50 px-6 py-12 text-center shadow-2xl shadow-slate-950/30 backdrop-blur-sm">
              <p className="text-lg font-medium text-slate-200">
                No cryptocurrencies found matching your search.
              </p>
            </div>
          )}
        </main>
      </div>

      {lastUpdated && <LastUpdate lastUpdated={lastUpdated} />}
    </div>
  );
}

export default App;
