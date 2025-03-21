// ProductItem.tsx
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
    createdAt: string;
    updatedAt: string;
  };
  createdAt: string;
  updatedAt: string;
}

const ProductItem: React.FC<IProductItemProps> = ({ images, title, price, category }) => {
  return (
    <div className="border rounded-lg shadow-lg p-4 hover:shadow-xl transition">
      <Image
        src={images[0]}
        alt={title}
        width={500}
        height={480}
        className="w-full h-auto object-cover rounded"
      />
      <div className="mt-3 flex flex-col gap-3">
        <h3 className="bold-18">{title}</h3>
        <p className="text-gray-800 bg-slate-400 rounded max-w-max px-4 py-2">{category.name}</p>
        <p className="text-gray-500">${price}</p>
      </div>
    </div>
  );
};

export default ProductItem;
