"use client"
import { navLinks } from '@/constant/Links'
import { useShoppingCartContext } from '@/context/ShopingCartContext'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

function Navbar() {

    const pathName = usePathname()
    const { cartTotalQty } = useShoppingCartContext()
    return (
        <nav className='py-4 shadow'>
            <div className='container mx-auto'>
                <ul className='flex gap-8'>
                    {
                        navLinks.map(item => (
                            <li key={item.href} className={`${pathName === item.href ? "text-sky-600" : ""}`}>
                                <Link href={item.href}>{item.title}</Link>
                            </li>
                        ))
                    }
                    <div>
                        <span className='bg-red-700 text-white rounded-full p-2 me-1'>{cartTotalQty}</span>
                        <Link href='/cart' className={`${pathName === '/cart' ? "text-sky-600" : ""}`}>Cart</Link>
                    </div>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar