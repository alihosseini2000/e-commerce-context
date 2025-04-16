
import React from 'react';
import SwiperSliderImage from './SwiperSliderImage';

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

const ProductItem: React.FC<IProductItemProps> = ({ images, title, price, category }) => {
  return (
    <div className=" rounded-lg dark:shadow-gray-800 shadow-lg hover:shadow-xl transition transform hover:scale-105">
      <SwiperSliderImage images={images} />
      <div className="mt-3 p-4 flex flex-col gap-2 sm:gap-4">
        <h3 className="bold-20">{title}</h3>
        <p className="text-white bg-orange-600 rounded-md max-w-max px-3 py-1 regular-16">{category.name}</p>
        <p className="text-gray-600 dark:text-gray-400 regular-18">${price}</p>
      </div>
    </div>
  );
};

export default ProductItem;
