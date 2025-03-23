'use client';

import Link from 'next/link'
import React from 'react'
import LogOut from './LogOut';
import { useShoppingCartContext } from '@/context/ShopingCartContext';

function Sidebar({ closeSidebar }: { closeSidebar: () => void }) {
      const { cartTotalQty } = useShoppingCartContext();
  
  return (
    <div className='fixed inset-0 bg-gray-100 dark:bg-gray-950 dark:text-gray-100 opacity-90 flexCenter z-50'>
      <button onClick={closeSidebar} className="absolute top-4 right-4 bold-32">×</button>
      <ul className='flexCenter flex-col gap-4 text-lg'>
        <Link href={"/"} onClick={closeSidebar}><li>Home</li></Link>
        <Link href={"/products"} onClick={closeSidebar}><li>Products</li></Link>
        <Link href={"/dashboard"} onClick={closeSidebar}><li>Dashboard</li></Link>
        <div>
          <span className='bg-red-700 text-white rounded-full p-2 me-1'>{cartTotalQty}</span>
          <Link href='/cart'>Cart</Link>
        </div>
        <Link href={"/login"} onClick={closeSidebar}><li>Login</li></Link>
        <LogOut />
      </ul>
    </div>
  )
}

export default Sidebar;
