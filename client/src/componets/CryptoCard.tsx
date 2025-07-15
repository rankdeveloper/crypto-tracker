import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import type { CryptoData } from "../types/crypto";

type CryptoCardProps = {
  coin: CryptoData;
};

const CryptoCard: React.FC<CryptoCardProps> = () => {
  const isPositive = 10 > 0;

  return (
    <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700 hover:border-purple-500 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <img
            src="https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png?1696501400
"
            alt="con"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h3 className="text-white font-semibold">Bitcoin</h3>
            <p className="text-gray-400 text-sm">-</p>
          </div>
        </div>
        <div className="text-right">
          <div className="bg-slate-700/50 px-2 py-1 rounded text-xs text-gray-300">
            #12
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <p className="text-gray-400 text-sm">Price</p>
          <p className="text-2xl font-bold text-white">$10.00</p>
        </div>

        <div className="flex items-center gap-2">
          <div
            className={`flex items-center gap-1 px-2 py-1 rounded-full text-sm ${
              isPositive
                ? "bg-green-500/20 text-green-400"
                : "bg-red-500/20 text-red-400"
            }`}
          >
            {isPositive ? (
              <TrendingUp className="w-4 h-4" />
            ) : (
              <TrendingDown className="w-4 h-4" />
            )}
            {isPositive ? "+" : ""}
            10%
          </div>
          <span className="text-gray-400 text-sm">24h</span>
        </div>

        <div>
          <p className="text-gray-400 text-sm">Market Cap</p>
          <p className="text-lg font-semibold text-white">102</p>
        </div>

        <div className="pt-3 border-t border-slate-700">
          <p className="text-gray-400 text-xs">
            Updated: {new Date().toLocaleTimeString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CryptoCard;
