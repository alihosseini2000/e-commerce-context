'use client';

import { useState, useCallback } from 'react';
import FilterMobile from './FilterMobile';

interface SortingFilteringProps {
  onSort: (type: "" | "date" | "price") => void;
}

const SortingFiltering: React.FC<SortingFilteringProps> = ({ onSort }) => {
  const [sortType, setSortType] = useState<"" | "date" | "price">("");
  const [showSort, setShowSort] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  const toggleSort = useCallback(() => setShowSort((prev) => !prev), []);
  const toggleFilter = useCallback(() => setShowFilter((prev) => !prev), []);

  const handleSort = useCallback(
    (type: "date" | "price") => {
      const newSortType = sortType === type ? "" : type;
      setSortType(newSortType);
      onSort(newSortType);
      setShowSort(false); // Close dropdown after selection
    },
    [sortType, onSort]
  );

  return (
    <div className="flex lg:hidden mb-4">
      {/* Sort Button */}
      <div className="relative w-1/2">
        <button
          onClick={toggleSort}
          className="w-full px-4 py-3.5 bg-gray-200 dark:bg-gray-900 border-e border-slate-600"
          aria-label="Sort"
        >
          Sort By
        </button>

        {/* Sort Dropdown */}
        {showSort && (
          <div className="absolute left-0 w-full mt-1 bg-white dark:bg-gray-900 shadow-md rounded-md z-20 transition-opacity">
            <button
              className={`block w-full px-4 py-2 hover:bg-gray-300 dark:hover:bg-gray-800 ${sortType === "date" ? "font-bold" : ""
                }`}
              onClick={() => handleSort("date")}
            >
              Sort By Date
            </button>
            <button
              className={`block w-full px-4 py-2 hover:bg-gray-300 dark:hover:bg-gray-800 ${sortType === "price" ? "font-bold" : ""
                }`}
              onClick={() => handleSort("price")}
            >
              Sort By Price
            </button>
          </div>
        )}
      </div>

      {/* Filter Button */}
      <div className="relative w-1/2">
        <button
          onClick={toggleFilter}
          className="w-full px-4 py-3.5 bg-gray-200 dark:bg-gray-900"
          aria-label="Filter"
        >
          Filter
        </button>
      </div>

      {/* Filter Mobile Component */}
      <FilterMobile onApply={showFilter} />
    </div>
  );
};

export default SortingFiltering;
