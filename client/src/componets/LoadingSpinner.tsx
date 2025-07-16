import React from "react";
import { Loader2 } from "lucide-react";

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="text-center">
        <Loader2 className="w-12 h-12 text-purple-400 animate-spin mx-auto mb-4" />
        <p className="text-gray-400 text-lg">Loading cryptocurrency data...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;

export function ErrorComponent({ isError }: { isError: any }) {
  return (
    <div className="bg-red-900/20 border border-red-500 text-red-300 px-6 py-4 rounded-lg mb-6">
      {isError}
    </div>
  );
}
