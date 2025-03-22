// ProductSinglePage.tsx
import AddToCart from '@/components/AddToCart';
import { fetchProductById } from '@/lib/api';
import Image from 'next/image';
import React from 'react';

interface IProductProps {
  params: Promise<{ id: string }>;
}

const ProductSinglePage: React.FC<IProductProps> = async ({ params }) => {
  const { id } = await params;
  const product = await fetchProductById(Number(id));

  if (product) {
    return (
      <div className="container max-container padding-container p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <Image
            src={product.images[0]}
            alt={product.title}
            width={500}
            height={500}
            className="w-full md:w-1/2 h-auto object-cover rounded-md"
          />
          <div className='flex flex-col gap-4'>
            <h2 className="bold-20 sm:bold-24 md:bold-32">{product.title}</h2>
            <p className="text-gray-600 dark:text-gray-400 regular-14 sm:regular-16">{product.description}</p>
            <p className="bold-20 sm:bold-24 text-blue-600">${product.price}</p>
            <p className="text-white bg-orange-600 px-4 py-2 rounded-md regular-14 sm:regular-16 max-w-max">{product.category.name}</p>
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
