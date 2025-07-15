import { useState } from "react";
import { TrendingUp, TrendingDown, RefreshCw, BarChart3 } from "lucide-react";
import SearchBar from "./componets/SearchBar";
import FilterSort from "./componets/FilterSort";
import CryptoCard from "./componets/CryptoCard";
import LoadingSpinner from "./componets/LoadingSpinner";

function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("rank");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8 flex flex-col h-screen">
        <div className="sticky top-0 z-10 ">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <BarChart3 className="w-10 h-10 text-purple-400" />
              <h1 className="text-4xl font-bold text-white">Crypto Tracker</h1>
            </div>
            <p className="text-gray-400 text-lg">
              Real-time cryptocurrency market data
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Market Cap</p>
                  <p className="text-2xl font-bold text-white">$ 100.00</p>
                </div>
                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-purple-400" />
                </div>
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">24h Gainers</p>
                  <p className="text-2xl font-bold text-green-400">10</p>
                </div>
                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-400" />
                </div>
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">24h Losers</p>
                  <p className="text-2xl font-bold text-red-400">4</p>
                </div>
                <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center">
                  <TrendingDown className="w-6 h-6 text-red-400" />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-4 mb-4">
            <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
            <FilterSort
              sortBy={sortBy}
              sortOrder={sortOrder}
              onSortChange={setSortBy}
              onOrderChange={setSortOrder}
            />
            <button className="bg-purple-600 hover:bg-purple-700 disabled:bg-purple-800 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors duration-200">
              <RefreshCw
                className={`w-5 h-5 ${loading ? "animate-spin" : ""}`}
              />
              Refresh
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {lastUpdated && (
            <div className="text-center mb-6">
              <p className="text-gray-400 text-sm">
                Last updated: 15 minutes ago
              </p>
            </div>
          )}

          {error && (
            <div className="bg-red-900/20 border border-red-500 text-red-300 px-6 py-4 rounded-lg mb-6">
              {error}
            </div>
          )}

          {false && <LoadingSpinner />}

          {true && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:flex-grow-1">
              {[1, 2, 3, 5, 6, 7, 8, 9, 10].map((item: any, i) => (
                <CryptoCard key={i} coin={item} />
              ))}
            </div>
          )}

          {[1, 2, 3].length == 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">
                No cryptocurrencies found matching your search.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
