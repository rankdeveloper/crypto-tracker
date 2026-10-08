import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import type { CryptoData } from "../types/crypto";

type CryptoCardProps = {
  coin: CryptoData;
};

const CryptoCard: React.FC<CryptoCardProps> = ({ coin }) => {
  const isPositive = coin.priceChange24h > 0;

  const formatPrice = (price: number) => {
    if (price < 0.01) return `$${price.toFixed(6)}`;
    if (price < 1) return `$${price.toFixed(4)}`;
    return `$${price.toFixed(2)}`;
  };

  const formatMarketCap = (marketCap: number) => {
    if (marketCap >= 1e12) return `$${(marketCap / 1e12).toFixed(2)}T`;
    if (marketCap >= 1e9) return `$${(marketCap / 1e9).toFixed(2)}B`;
    if (marketCap >= 1e6) return `$${(marketCap / 1e6).toFixed(2)}M`;
    return `$${marketCap.toFixed(2)}`;
  };

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/65 p-5 shadow-[0_20px_50px_rgba(15,23,42,0.5)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/60 hover:shadow-[0_25px_60px_rgba(139,92,246,0.2)]">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-400/80 to-transparent" />

      <div className="mb-5 flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-slate-700 bg-slate-800/80">
            <img
              src={coin.image}
              alt={coin.name}
              className="h-8 w-8 rounded-full object-cover"
            />
          </div>

          <div className="min-w-0">
            <h3 className="truncate text-base font-semibold text-white">
              {coin.name}
            </h3>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
              {coin.symbol}
            </p>
          </div>
        </div>

        <div className="rounded-full border border-slate-700 bg-slate-800/70 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-300">
          #{coin.rank}
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <p className="mb-1 text-[11px] uppercase tracking-[0.18em] text-slate-400">
            Price
          </p>
          <p className="text-3xl font-bold tracking-tight text-white">
            {formatPrice(coin.price)}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-sm font-semibold ${
              isPositive
                ? "bg-emerald-500/10 text-emerald-400 ring-1 ring-inset ring-emerald-500/20"
                : "bg-rose-500/10 text-rose-400 ring-1 ring-inset ring-rose-500/20"
            }`}
          >
            {isPositive ? (
              <TrendingUp className="h-4 w-4" />
            ) : (
              <TrendingDown className="h-4 w-4" />
            )}
            {coin.priceChange24h.toFixed(2)}%
          </div>
          <span className="text-xs uppercase tracking-[0.18em] text-slate-500">
            24h
          </span>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-3">
          <p className="mb-1 text-[11px] uppercase tracking-[0.18em] text-slate-400">
            Market Cap
          </p>
          <p className="text-lg font-semibold text-slate-100">
            {formatMarketCap(coin.marketCap)}
          </p>
        </div>

        <div className="flex items-center justify-between border-t border-slate-800 pt-3 text-xs text-slate-400">
          <span>Updated</span>
          <span>
            {new Date(coin.lastUpdated).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CryptoCard;
