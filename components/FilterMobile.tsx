'use client';

import Loading from "@/app/Loading";
import { fetchCategories } from "@/lib/api";
import Link from "next/link";
import { useEffect, useState, useCallback, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Search from "./Search";
import { ICategory } from "./Filter";

interface FilterMobileProps {
    onApply: boolean;
}

const FilterMobile: React.FC<FilterMobileProps> = ({ onApply }) => {
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        if (!onApply || categories.length > 0) return; // Lazy load categories
        setLoading(true);
        fetchCategories()
            .then((data) => {
                setCategories(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });
    }, [onApply, categories.length]);

    const handleApplyFilter = useCallback(() => {
        if (minPrice && maxPrice) {
            const params = new URLSearchParams(searchParams.toString());
            params.set("price_min", minPrice);
            params.set("price_max", maxPrice);
            router.push(`/products?${params.toString()}`);
        }
    }, [minPrice, maxPrice, searchParams, router]);

    if (loading) return <Loading />;

    return (
        <div
            className={`${onApply ? "flex animate-slide-down opacity-100" : "hidden opacity-0"
                } absolute left-0 right-0 top-12 bg-gray-200 dark:bg-gray-900 border-t border-slate-600 z-20 py-6 flex-col gap-3 shadow-lg transition-opacity`}
        >
            <Search />

            {/* Categories */}
            <div className="flex flex-wrap gap-3 justify-center">
                {categories.map((category) => (
                    <Link
                        key={category.id}
                        href={`/products?category=${category.id}`}
                        className="px-3 py-1 bg-orange-700 text-white rounded-md"
                    >
                        {category.name}
                    </Link>
                ))}
            </div>

            {/* Price Filters */}
            <div className="flex flex-col gap-3 px-4">
                <div className="flex flex-col border-2 border-orange-600 rounded-md p-2">
                    <label htmlFor="min_price" className="mb-1 text-sm">Min Price</label>
                    <input
                        onChange={(e) => setMinPrice(e.target.value)}
                        value={minPrice}
                        type="number"
                        name="min_price"
                        id="min_price"
                        placeholder="Min Price"
                        className="text-center p-2 bg-transparent focus:outline-none"
                    />
                </div>
                <div className="flex flex-col border-2 border-orange-600 rounded-md p-2">
                    <label htmlFor="max_price" className="mb-1 text-sm">Max Price</label>
                    <input
                        onChange={(e) => setMaxPrice(e.target.value)}
                        value={maxPrice}
                        type="number"
                        name="max_price"
                        id="max_price"
                        placeholder="Max Price"
                        className="text-center p-2 bg-transparent focus:outline-none"
                    />
                </div>

                {/* Apply Button */}
                <button
                    onClick={handleApplyFilter}
                    disabled={!minPrice || !maxPrice}
                    className={`w-full py-3 text-white rounded-md transition ${minPrice && maxPrice ? "bg-orange-600 hover:bg-orange-700" : "bg-orange-400 cursor-not-allowed"
                        }`}
                >
                    Apply
                </button>
            </div>
        </div>
    );
};

export default FilterMobile;
