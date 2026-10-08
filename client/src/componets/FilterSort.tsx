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
    <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center">
      <div className="relative w-full sm:w-auto">
        <Filter className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="w-full appearance-none rounded-xl border border-slate-700 bg-slate-950/60 py-3 pl-10 pr-9 text-sm text-white focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/30 sm:w-auto"
        >
          {sortOptions.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className="bg-slate-900"
            >
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={() => onOrderChange(sortOrder === "asc" ? "desc" : "asc")}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-950/60 px-3 py-3 text-sm font-medium text-slate-200 transition hover:border-violet-500/60 hover:text-white sm:w-auto"
      >
        <ArrowUpDown className="h-4 w-4" />
        {sortOrder === "asc" ? "ASC" : "DESC"}
      </button>
    </div>
  );
};

export default FilterSort;
