import React from "react";
import { Filter, ArrowUpDown } from "lucide-react";

type FilterSortProps = {
  sortBy: string;
  sortOrder: "asc" | "desc";
  onSortChange: (sortBy: string) => void;
  onOrderChange: (order: "asc" | "desc") => void;
};

const FilterSort: React.FC<FilterSortProps> = ({
  sortBy,
  sortOrder,
  onSortChange,
  onOrderChange,
}) => {
  const sortOptions = [
    { value: "rank", label: "Rank" },
    { value: "name", label: "Name" },
    { value: "price", label: "Price" },
    { value: "marketCap", label: "Market Cap" },
    { value: "priceChange24h", label: "24h Change" },
  ];

  return (
    <div className="flex gap-3">
      <div className="relative">
        <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="appearance-none pl-10 pr-8 py-3 bg-slate-800/50 backdrop-blur-lg border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
        >
          {sortOptions.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className="bg-slate-800"
            >
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={() => onOrderChange(sortOrder === "asc" ? "desc" : "asc")}
        className="px-4 py-3 bg-slate-800/50 backdrop-blur-lg border border-slate-700 rounded-lg text-white hover:bg-slate-700/50 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200 flex items-center gap-2"
      >
        <ArrowUpDown className="w-5 h-5" />
        {sortOrder === "asc" ? "ASC" : "DESC"}
      </button>
    </div>
  );
};

export default FilterSort;
