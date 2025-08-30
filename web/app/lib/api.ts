import { Product } from '../../../shared/types';

const API_BASE_URL = 'http://localhost:4000/api'; // Replace with your API URL

export const fetchProducts = async (
  search?: string,
  sort?: string,
  order?: string,
  page?: number,
  limit?: number,
  available?: boolean
): Promise<{ data: Product[]; total: number; page: number; limit: number }> => {
  const url = new URL(`${API_BASE_URL}/products`);
  if (search) url.searchParams.append('search', search);
  if (sort) url.searchParams.append('sort', sort);
  if (order) url.searchParams.append('order', order);
  if (page) url.searchParams.append('page', String(page));
  if (limit) url.searchParams.append('limit', String(limit));
  if (available !== undefined) url.searchParams.append('available', String(available));

  const res = await fetch(url.toString());

  if (!res.ok) {
    throw new Error(`Failed to fetch products: ${res.status} ${res.statusText}`);
  }

  return res.json();
};

export const fetchProduct = async (id: string): Promise<Product> => {
  const res = await fetch(`${API_BASE_URL}/products/${id}`);

  if (!res.ok) {
    throw new Error(`Failed to fetch product: ${res.status} ${res.statusText}`);
  }

  return res.json();
};