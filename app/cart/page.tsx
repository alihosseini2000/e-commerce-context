"use client"
import React, { useEffect, useState } from 'react';
import CartItem from '@/components/CartItem';
import { useShoppingCartContext } from '@/context/ShopingCartContext';
import { IProductItemProps } from '@/components/ProductItem';
import axios from 'axios';
import { formatNumberWithCommas } from '@/utils/number';

const Cart: React.FC = () => {
  const [discountCode, setDiscountCode] = useState<string>('');
  const [data, setData] = useState<IProductItemProps[]>([])
  const [profit, setProfit] = useState<number>(0);

  const { cartItems } = useShoppingCartContext()

  useEffect(() => {

    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`https://api.escuelajs.co/api/v1/products`);
        setData(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, []);

  const totalPrice = cartItems.reduce((total, item) => {

    const selectedProduct = data.find((product) => product.id === item.id)

    return total + (selectedProduct?.price || 0) * item.qty
  }, 0)

  const finalPrice = totalPrice - profit

  const handleDiscountChange = (e: React.ChangeEvent<HTMLInputElement>) => setDiscountCode(e.target.value);
  const handleSubmitDiscount = () => {
    if (discountCode === "OFF10") {
      setProfit(totalPrice / 10)
      console.log("success");

    }
  }

  return (
    <div className='container mx-auto py-5'>
      <h1 className='text-2xl font-bold mb-5'>Shopping Cart</h1>
      <div>
        {cartItems.map(item => (
          <CartItem key={item.id}{...item} />
        ))}
      </div>
      <div className='shadow-md border p-4 mt-5'>

        <h3>Total Price: <span>${formatNumberWithCommas(totalPrice)}</span></h3>
        <h3>Your Profit: <span>${formatNumberWithCommas(profit)}</span></h3>
        <h3>Final Price: <span>${formatNumberWithCommas(finalPrice)}</span></h3>

        <label htmlFor='discount-code' className='block mt-4 text-lg'>
          Discount Code
        </label>
        <input
          type="text"
          name="discount-code"
          id="discount-code"
          value={discountCode}
          onChange={handleDiscountChange}
          placeholder='Enter discount code "OFF10"'
          className='mt-2 me-2 p-2 border border-gray-300 rounded'
        />
        <button onClick={handleSubmitDiscount} className='mt-3 px-4 py-2 rounded bg-blue-500 text-white'>
          Apply Discount
        </button>
      </div>
    </div>
  );
}

export default Cart;
