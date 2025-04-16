"use client"
import { navLinks } from '@/constant/Links'
import { useShoppingCartContext } from '@/context/ShopingCartContext'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'
import DarkModeToggle from './DarkModeToggle'
import { RxHamburgerMenu } from 'react-icons/rx'
import Image from 'next/image'
import Sidebar from './Sidebar';
import LogOut from './LogOut'

function Navbar() {
    const pathName = usePathname();
    const { cartTotalQty } = useShoppingCartContext();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <>
            <nav className='py-1 md:py-4 w-full shadow sticky top-0 bg-slate-100 dark:bg-slate-900 z-10'>
                <div className='container flexBetween gap-4'>
                    <Link href='/'>
                        <div className="flexCenter gap-2">
                            <Image src="/ECommerce.svg" alt="logo" width={60} height={60} />
                            <h1>ECommerce</h1>
                        </div>
                    </Link>
                    <ul className='lg:flexCenter hidden gap-8'>
                        {navLinks.map(item => (
                            <li key={item.href} className={`${pathName === item.href ? "text-orange-600" : ""}`}>
                                <Link href={item.href}>{item.title}</Link>
                            </li>
                        ))}
                        <div>
                            <span className='bg-red-700 text-white rounded-full p-2 me-1'>{cartTotalQty}</span>
                            <Link href='/cart' className={`${pathName === '/cart' ? "text-orange-600" : ""}`}>Cart</Link>
                        </div>
                        <LogOut />
                    </ul>
                    <div className="text-2xl flexCenter gap-4">
                        <DarkModeToggle />
                        <button aria-label="Toggle Sidebar" className='lg:hidden' onClick={() => setIsSidebarOpen(true)}>
                            <RxHamburgerMenu />
                        </button>
                    </div>
                </div>
            </nav>
            {isSidebarOpen && <Sidebar closeSidebar={() => setIsSidebarOpen(false)} />}
        </>
    );
}

export default Navbar;
