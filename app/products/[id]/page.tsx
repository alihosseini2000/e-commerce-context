// ProductSinglePage.tsx
import AddToCart from '@/components/AddToCart';
import { IProductItemProps } from '@/components/ProductItem';
import Image from 'next/image';
import React from 'react';

interface IProductProps {
  params: Promise<{ id: string }>;
}

async function fetchProduct(id: number): Promise<IProductItemProps | null> {
  try {
    const response = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`, { cache: 'force-cache' });
    if (!response.ok) throw new Error('Failed to fetch product');
    return await response.json();
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

const ProductSinglePage: React.FC<IProductProps> = async ({ params }) => {
  const { id } = await params;
  const product = await fetchProduct(Number(id));

  if (product) {
    return (
      <div className="container max-container padding-container p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <Image
            src={product.images[0]}
            alt={product.title}
            width={500}
            height={500}
            className="w-full md:w-1/2 h-auto object-cover rounded"
          />
          <div className='flex flex-col gap-4'>
            <h2 className="bold-20 sm:bold-24 md:bold-32">{product.title}</h2>
            <p className="text-gray-600 regular-14 sm:regular-16">{product.description}</p>
            <p className="bold-20 sm:bold-24 text-blue-600">${product.price}</p>
            <p className="text-gray-800 bg-gray-400 px-4 py-2 rounded regular-14 sm:regular-16 max-w-max">{product.category.name}</p>
            <AddToCart id={Number(id)} />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container flexCenter">
        <h1 className="font-bold text-3xl text-red-700">Product Not Found</h1>
      </div>
    );
  }
};

export default ProductSinglePage;
