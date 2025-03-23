"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductItem, { IProductItemProps } from "./ProductItem";
import Link from "next/link";
import Loading from "@/app/Loading";
import { useSearchParams } from "next/navigation";
import SortingFiltering from "./SortingFiltering";

const ProductList = () => {

    const searchParams = useSearchParams()
    const search = searchParams.get("title") || ""
    const category = searchParams.get("category") || ""
    const maxPrice = searchParams.get("price_max") || ""
    const minPrice = searchParams.get("price_min") || ""

    const [products, setProducts] = useState<IProductItemProps[]>([]);
    const [page, setPage] = useState(1);
    const [sortType, setSortType] = useState<"date" | "price" | "">("")
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);

    const limit = 10;

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        const fetchProducts = async () => {
            setLoading(true);
            try {
                const queryParams = new URLSearchParams({
                    offset: `${(page - 1) * limit}`,
                    limit: `${limit}`,
                })

                if (search) queryParams.set("title", search);
                if (category) queryParams.set("categoryId", category);
                if (minPrice && maxPrice) {
                    queryParams.set("price_min", minPrice);
                    queryParams.set("price_max", maxPrice);
                }

                const { data } = await axios.get(
                    `https://api.escuelajs.co/api/v1/products?${queryParams.toString()}`,
                    { signal }
                );
                setProducts(data);
                setHasMore(data.length === limit);
            } catch (error) {
                if (!axios.isCancel(error)) {
                    console.error("Error fetching products:", error);
                    setHasMore(false);
                }
            }
            setLoading(false);
        };

        fetchProducts();

        return () => controller.abort();
    }, [page, search, category, maxPrice, minPrice]);

    const sortedProducts = [...products].sort((a, b) => {
        if (sortType === "price") return a.price - b.price;
        if (sortType === "date") return new Date(b.creationAt).getTime() - new Date(a.creationAt).getTime();
        return 0; // Default (no sorting)
    });

    return (
        <div>
            <SortingFiltering onSort={(type) => setSortType(type)} />
            <h1 className="text-2xl md:text-3xl font-bold mb-5">Products</h1>

            {loading ? (
                <Loading />
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                        {sortedProducts.length > 0 ? (
                            sortedProducts.map((product) => (
                                <Link key={product.id} href={`/products/${product.id}`} className="block">
                                    <ProductItem {...product} />
                                </Link>
                            ))
                        ) : (
                            <p className="text-center text-gray-500 col-span-4">No products found.</p>
                        )}
                    </div>

                    <div className="flex justify-center items-center gap-4 mt-5">
                        <button
                            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                            disabled={page === 1}
                            className={`px-4 py-2 rounded-md transition ${page === 1
                                ? "bg-gray-300 cursor-not-allowed text-gray-600"
                                : "bg-gray-500 hover:bg-gray-600 text-white"
                                }`}
                        >
                            Previous
                        </button>
                        <span className="font-medium">Page {page}</span>
                        <button
                            onClick={() => hasMore && setPage((prev) => prev + 1)}
                            disabled={!hasMore}
                            className={`px-4 py-2 rounded-md transition ${!hasMore
                                ? "bg-gray-300 cursor-not-allowed text-gray-600"
                                : "bg-orange-600 hover:bg-orange-700 text-white"
                                }`}
                        >
                            Next
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default ProductList;
