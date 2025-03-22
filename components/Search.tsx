"use client"

import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { CiSearch } from 'react-icons/ci'

function Search() {

    const searchParams = useSearchParams()
    const router = useRouter()
    const [search, setSearch] = useState("")

    useEffect(() => {
        setSearch(searchParams.get("title") || ""); // مقدار اولیه را از URL بگیریم
    }, [searchParams]);

    const handleSearch = () => {
        const currentSearchParams = new URLSearchParams(searchParams.toString());
        if (search.trim()) {
            currentSearchParams.set("title", search);
        } else {
            currentSearchParams.delete("title");
        }
        currentSearchParams.set("page", "1"); // مقدار صفحه را روی 1 تنظیم کنیم
        router.push(`/products/?${currentSearchParams.toString()}`);
    };

    return (
        <div className='flexCenter'>
            <input
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                name="search"
                id="search"
                placeholder='Search'
                className='p-1.5 rounded-s-md border-2 focus:outline-none border-orange-600 dark:bg-slate-900' />
            <button
                onClick={handleSearch}
                type="button"
                className='bg-orange-600 text-white regular-24 rounded-e-md p-2'>
                <CiSearch />
            </button>
        </div>
    )
}

export default Search