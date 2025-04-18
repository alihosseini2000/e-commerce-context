'use client';

import { useState, useCallback } from 'react';
import FilterMobile from './FilterMobile';
import SortButton from './SortButton';

interface SortingFilteringProps {
  onSort: (type: "" | "date" | "price") => void;
}

const SortingFiltering: React.FC<SortingFilteringProps> = ({ onSort }) => {

  const [showFilter, setShowFilter] = useState(false);

  const toggleFilter = useCallback(() => setShowFilter((prev) => !prev), []);

  return (
    <div className="flex mb-4">
      {/* Sort Button */}
      <SortButton onSort={onSort} />

      {/* Filter Button */}
      <div className="w-1/2">
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
