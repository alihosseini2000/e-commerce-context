"use client"

import React, { useCallback, useState } from 'react'

interface SortingFilteringProps {
    onSort: (type: "" | "date" | "price") => void;
}

const SortButton: React.FC<SortingFilteringProps> = ({ onSort }) => {

    const toggleSort = useCallback(() => setShowSort((prev) => !prev), []);
    const [showSort, setShowSort] = useState(false);
    const [sortType, setSortType] = useState<"" | "date" | "price">("");


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
        <>
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
            </div>

            {showSort && (
                <div className="absolute left-0 right-0 top-36 lg:top-[22rem] opacity-95 flex mt-1 bg-white dark:bg-gray-900 shadow-md rounded-md z-20 transition-opacity">
                    <button
                        className={`w-full px-4 py-2 hover:bg-gray-300 dark:hover:bg-gray-800 ${sortType === "date" ? "font-bold" : ""
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
        </>
    )
}

export default SortButton