"use client"
import React, { useState } from 'react';
import CartItem from '@/components/CartItem';
import { useShoppingCartContext } from '@/context/ShopingCartContext';

const Cart: React.FC = () => {
  const [discountCode, setDiscountCode] = useState<string>('');

  const { cartItems } = useShoppingCartContext()

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.qty, 0);
  const profit = totalPrice;  // For simplicity, assuming profit equals total price
  const finalPrice = discountCode ? totalPrice * 0.9 : totalPrice;  // 10% discount if code is applied

  const handleDiscountChange = (e: React.ChangeEvent<HTMLInputElement>) => setDiscountCode(e.target.value);

  return (
    <div className='container mx-auto py-5'>
      <h1 className='text-2xl font-bold mb-5'>Shopping Cart</h1>
      <div>
        {cartItems.map(item => (
          <CartItem key={item.id}{...item} />
        ))}
      </div>
      <div className='shadow-md border p-4 mt-5'>
        <h3>Total Price: <span>${totalPrice}</span></h3>
        <h3>Your Profit: <span>${profit}</span></h3>
        <h3>Final Price: <span>${finalPrice}</span></h3>

        <label htmlFor='discount-code' className='block mt-4 text-lg'>
          Discount Code
        </label>
        <input
          type="text"
          name="discount-code"
          id="discount-code"
          value={discountCode}
          onChange={handleDiscountChange}
          placeholder='Enter discount code'
          className='mt-2 me-2 p-2 border border-gray-300 rounded'
        />
        <button className='mt-3 px-4 py-2 rounded bg-blue-500 text-white'>
          Apply Discount
        </button>
      </div>
    </div>
  );
}

export default Cart;
