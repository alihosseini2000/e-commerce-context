import Image from 'next/image';
import React from 'react';

export interface IProductItemProps {
  id: number;
  title: string;
  slug: string;
  images: string[];
  price: number;
  description: string;
  category: {
    id: number;
    name: string;
    slug: string;
    image: string;
    creationAt: string;
    updatedAt: string;
  };
  creationAt: string;
  updatedAt: string;
}

const ProductItem: React.FC<IProductItemProps> = ({ images, title, price, category , creationAt }) => {
  return (
    <div className="border rounded-lg shadow-lg p-4 hover:shadow-xl transition transform hover:scale-105">
      <Image
        src={images[0]}
        alt={title}
        width={500}
        height={480}
        className="w-full h-auto object-cover rounded-md"
      />
      <div className="mt-3 flex flex-col gap-2 sm:gap-4">
        <h3 className="bold-20">{title}</h3>
        <p className="text-white bg-orange-600 rounded-md max-w-max px-3 py-1 regular-16">{category.name}</p>
        <p className="text-gray-600 dark:text-gray-400 regular-18">${price}</p>
      </div>
    </div>
  );
};

export default ProductItem;
