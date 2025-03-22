"use client"
import Loading from "@/app/Loading";
import { fetchCategories } from "@/lib/api";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Search from "./Search";

interface ICategory {
  id: number;
  name: string;
  slug: string;
  image: string;
  creationAt: string;
  updatedAt: string;
}

const Filter = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    fetchCategories()
    .then((data) => {
      setCategories(data);
      setLoading(false); 
    })
    .catch((error) => {
      console.error(error);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container flex-col gap-3 mb-5 hidden sm:flex">
      <Search />
      <div className="flexCenter gap-4">
        {categories.map((category: ICategory) => {
          return (
            <Link key={category.id} href={`/products?category=${category.id}`} className="px-3 py-1 bg-orange-700 text-white rounded-md">
              {category.name}
            </Link>
          );
        })}
      </div>
      <div className="flexCenter gap-3">
        <div className="flexCenter flex-col border-2 border-orange-600 rounded-md">
          <label htmlFor="min_price" className="p-1">Min Price</label>
          <input
            onChange={(e) => setMinPrice(e.target.value)}
            className="text-center focus:outline-none p-1 dark:bg-slate-900"
            value={minPrice}
            type="number"
            name="min_price"
            id="min_price"
            placeholder="Min Price"
          />
        </div>
        -
        <div className="flexCenter flex-col border-2 border-orange-600 rounded-md">
          <label htmlFor="max_price" className="p-1">Max Price</label>
          <input
            onChange={(e) => setMaxPrice(e.target.value)}
            className="text-center focus:outline-none p-1 dark:bg-slate-900"
            value={maxPrice}
            type="number"
            name="max_price"
            id="max_price"
            placeholder="Max Price"
          />
        </div>
        <button
          onClick={() => {
            if (minPrice && maxPrice) {
              const params = new URLSearchParams(searchParams.toString());
              params.set("price_min", minPrice);
              params.set("price_max", maxPrice);
              router.push(`/products?${params.toString()}`);
            }
          }}
          disabled={!minPrice || !maxPrice}
          className="ml-2 px-5 py-6 bg-orange-600 text-white rounded-md"
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default Filter;
