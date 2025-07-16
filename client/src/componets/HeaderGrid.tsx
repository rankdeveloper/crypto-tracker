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
      transition={{
        delay: 1,
        duration: 1,
        type: "keyframes",
        stiffness: 100,
      }}
      className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-3 md:mb-4"
    >
      <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700 ">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm">Total Market Cap</p>
            <p className="text-2xl font-bold text-white">
              {" "}
              $
              {totalMarketCap.toLocaleString(undefined, {
                maximumFractionDigits: 0,
              })}
            </p>
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
            <p className="text-2xl font-bold text-green-400">{gainers}</p>
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
            <p className="text-2xl font-bold text-red-400">{losers}</p>
          </div>
          <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center">
            <TrendingDown className="w-6 h-6 text-red-400" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
