import { motion } from "framer-motion";
import { BarChart3, TrendingDown, TrendingUp } from "lucide-react";

type HeaderProps = {
  totalMarketCap: number;
  gainers: number;
  losers: number;
};

export default function HeaderGrid({
  totalMarketCap,
  gainers,
  losers,
}: HeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.7 }}
      className="grid grid-cols-1 gap-4 md:grid-cols-3"
    >
      <div className="rounded-2xl border border-violet-500/20 bg-gradient-to-br from-slate-900 via-slate-900 to-violet-950/40 p-5 shadow-lg shadow-violet-950/20">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400">
              Total Market Cap
            </p>
            <p className="mt-2 text-2xl font-bold text-white">
              $
              {totalMarketCap.toLocaleString(undefined, {
                maximumFractionDigits: 0,
              })}
            </p>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/15 text-violet-300 ring-1 ring-inset ring-violet-500/30">
            <BarChart3 className="h-6 w-6" />
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/30 p-5 shadow-lg shadow-emerald-950/20">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400">
              24h Gainers
            </p>
            <p className="mt-2 text-2xl font-bold text-emerald-400">
              {gainers}
            </p>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-300 ring-1 ring-inset ring-emerald-500/30">
            <TrendingUp className="h-6 w-6" />
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-rose-500/20 bg-gradient-to-br from-slate-900 via-slate-900 to-rose-950/30 p-5 shadow-lg shadow-rose-950/20">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400">
              24h Losers
            </p>
            <p className="mt-2 text-2xl font-bold text-rose-400">{losers}</p>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-500/15 text-rose-300 ring-1 ring-inset ring-rose-500/30">
            <TrendingDown className="h-6 w-6" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
