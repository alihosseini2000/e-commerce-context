import { IProductItemProps } from "@/components/ProductItem";

export async function fetchProductById(id: number): Promise<IProductItemProps | null> {
  try {
    const response = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`, { cache: 'force-cache' });
    if (!response.ok) throw new Error('Failed to fetch product');
    return await response.json();
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

export const fetchCategories = async () => {
    const res = await fetch(`https://api.escuelajs.co/api/v1/categories`);
    if (!res.ok) throw new Error("Failed to fetch categories");
    return res.json();
};

export const fetchProducts = async () => {
  const res = await fetch(`https://api.escuelajs.co/api/v1/products`);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
};
