import { BarChart3 } from "lucide-react";
import { motion } from "framer-motion";

export default function Header() {
  return (
    <div className="text-center">
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-3 flex items-center justify-center gap-3"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-500/10 ring-1 ring-inset ring-violet-500/20">
          <BarChart3 className="h-6 w-6 text-violet-300" />
        </div>

        <div>
          <div className="header-pill mb-1">LIVE MARKET</div>
          <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Crypto Tracker
          </h1>
        </div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-sm uppercase tracking-[0.22em] text-slate-400"
      >
        Real-time market intelligence
      </motion.p>
    </div>
  );
}
