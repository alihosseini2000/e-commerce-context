import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import AddToCart from './AddToCart';
import axios from 'axios';
import { IProductItemProps } from './ProductItem';


interface CartItemProps {
  id: number;
  qty: number;
}

const CartItem: React.FC<CartItemProps> = ({ id, qty }) => {

  const [data, setData] = useState({} as IProductItemProps)

  useEffect(() => {
    if (!id || isNaN(id)) {
      console.error("Invalid product ID:", id);
      return;
    }
  
    let isMounted = true;
  
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`https://api.escuelajs.co/api/v1/products/${id}`);
        if (isMounted) setData(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
  
    fetchProduct();
    return () => { isMounted = false };
  }, [id]);  


  return (
    <div className='grid grid-cols-12 bg-slate-200 mb-4 gap-8'>
      <Image
        className='col-span-2 object-cover'
        src={data.images[0]}
        alt={data.slug}
        width={240}
        height={144}
      />
      <div className='col-span-10 py-7'>
        <h2 className='text-xl font-bold'>{data.title}</h2>
        <p>Quantity: <span>{qty}</span></p>
        <p>Price: <span>${data.price}</span></p>
        <AddToCart {...data} />
      </div>
    </div>
  );
}

export default CartItem;
