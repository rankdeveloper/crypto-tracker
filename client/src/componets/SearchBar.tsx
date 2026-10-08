import React from "react";
import { Search } from "lucide-react";

type SearchBarProps = {
  searchTerm: string;
  onSearchChange: (term: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  onSearchChange,
}) => {
  return (
    <div className="relative w-full">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
        <Search className="h-4 w-4 text-slate-400" />
      </div>
      <input
        type="text"
        placeholder="Search cryptocurrencies..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full rounded-xl border border-slate-700 bg-slate-950/60 py-3.5 pl-11 pr-4 text-sm text-white placeholder:text-slate-400 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/30"
      />
    </div>
  );
};

export default SearchBar;
