import { BarChart3 } from "lucide-react";
import { motion } from "framer-motion";
export default function Header() {
  return (
    <div className="text-center sm:mb-3 md:mb-4 xl:mb-8">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, type: "keyframes", stiffness: 100 }}
        className="flex items-center justify-center gap-3 sm:mb-2 lg:mb-2 mb-4"
      >
        <BarChart3 className="w-10 h-10 text-purple-400" />
        <h1 className="text-4xl font-bold text-white">Crypto Tracker</h1>
      </motion.div>
      <motion.p
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.5,
          duration: 1,
          type: "keyframes",
          stiffness: 100,
        }}
        className="text-gray-400 text-lg"
      >
        Real-time cryptocurrency market data
      </motion.p>
    </div>
  );
}
