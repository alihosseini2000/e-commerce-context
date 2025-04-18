import AddToCart from '@/components/AddToCart';
import ProductImageGallery from '@/components/ProductImageGallery';
import { fetchProductById } from '@/lib/api';
import React from 'react';

interface IProductProps {
  params: Promise<{ id: string }>;
}

const ProductSinglePage = async ({ params }: IProductProps) => {
  const { id } = await params;
  const product = await fetchProductById(Number(id));

  if (!product) {
    return (
      <div className="container flexCenter h-[50vh]">
        <h1 className="font-bold text-3xl text-red-700">Product Not Found</h1>
      </div>
    );
  }

  return (
    <div className="container max-container padding-container p-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Image Gallery */}
        <ProductImageGallery
          images={product.images}
          title={product.title}
          slug={product.slug}
        />

        {/* Information Product */}
        <div className="flex flex-col gap-4">
          <h2 className="bold-20 sm:bold-24 md:bold-32">{product.title}</h2>
          <p className="text-gray-600 dark:text-gray-400 regular-14 sm:regular-16">{product.description}</p>
          <p className="bold-20 sm:bold-24 text-blue-600">${product.price}</p>
          <p className="text-white bg-orange-600 px-4 py-2 rounded-md regular-14 sm:regular-16 max-w-max">
            {product.category.name}
          </p>
          <AddToCart id={product.id} />
        </div>
      </div>
    </div>
  );
};

export default ProductSinglePage;
