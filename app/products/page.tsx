// Products.tsx
import ProductItem, { IProductItemProps } from '@/components/ProductItem';
import Link from 'next/link';
import React from 'react';

async function fetchProducts(): Promise<IProductItemProps[]> {
  try {
    const response = await fetch('https://api.escuelajs.co/api/v1/products');
    if (!response.ok) throw new Error('Failed to fetch products');
    return await response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

const Products: React.FC = async () => {
  const products = await fetchProducts();

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Products</h1>
      {products.length === 0 ? (
        <p className="text-red-500">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
                <Link key={product.id} href={`/products/${product.id}`} className="block">
                  <ProductItem {...product} />
                </Link>
              )
          )}
        </div>
      )}
    </div>
  );
};

export default Products;
