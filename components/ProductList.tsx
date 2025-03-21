"use client"
import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductItem, { IProductItemProps } from "./ProductItem";
import Link from "next/link";

const ProductList = () => {
    const [products, setProducts] = useState<IProductItemProps[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true)
    const limit = 10; // Number of items per page

    useEffect(() => {
        const fetchProducts = async () => {
            const controller = new AbortController();
            const signal = controller.signal;
            try {
                const { data } = await axios.get(`https://api.escuelajs.co/api/v1/products?offset=${(page - 1) * limit}&limit=${limit}`, { signal });
                setProducts(data);
                setHasMore(data.length === limit)
            } catch (error) {
                if (!axios.isCancel(error)) {
                    console.error("Error fetching products:", error);
                }
            }
            return () => controller.abort();
        };

        fetchProducts();
    }, [page]); // Re-fetch when page changes

    const handleNextPage = () => { if (hasMore) setPage(prev => prev + 1); }
    const handlePrevPage = () => setPage(prev => Math.max(prev - 1, 1));

    return (
        <div className="container py-5">
            <h1 className="bold-24 md:bold-32 mb-5">Products</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                {products.map((product) => (
                    <Link key={product.id} href={`/products/${product.id}`} className="block">
                        <ProductItem {...product} />
                    </Link>
                ))}
            </div>
            <div className="flex justify-center items-center gap-4 mt-5">
                <button
                    onClick={handlePrevPage}
                    disabled={page === 1}
                    className={`px-4 py-2 rounded ${page === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-gray-500 hover:bg-gray-600 text-white"}`}>
                    Previous
                </button>
                <span>Page {page}</span>
                <button
                    onClick={handleNextPage}
                    disabled={!hasMore}
                    className={`px-4 py-2 rounded ${!hasMore ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 text-white"}`}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default ProductList;
