'use client';

import React, { useState, useEffect } from 'react';
import { fetchProducts } from '../lib/api';
import ProductCard from '../../components/ProductCard';
import { Product } from '../../../shared/types';

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [search, setSearch] = useState<string>('');
  const [sort, setSort] = useState<string>('');
  const [order, setOrder] = useState<string>('asc');
  const [available, setAvailable] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const result = await fetchProducts(search, sort, order, page, limit, available);
        setProducts(result.data);
        setTotal(result.total);
      } catch (error: any) {
        console.error('Failed to fetch products', error);
      }
    };

    loadProducts();
  }, [search, sort, order, page, limit, available]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1); // Reset page on search
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(e.target.value);
  };

  const handleOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOrder(e.target.value);
  };

  const handleAvailableChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setAvailable(value === '' ? undefined : value === 'true');
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div>
      <h1>Products</h1>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={handleSearchChange}
      />

      {/* Sort Select */}
      <select value={sort} onChange={handleSortChange}>
        <option value="">Sort by</option>
        <option value="price">Price</option>
        <option value="name">Name</option>
      </select>

      {/* Order Select */}
      <select value={order} onChange={handleOrderChange}>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>

      {/* Available Filter */}
      <select value={available === undefined ? '' : available.toString()} onChange={handleAvailableChange}>
        <option value="">All</option>
        <option value="true">Available</option>
        <option value="false">Not Available</option>
      </select>

      {/* Product List */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Pagination */}
      <div>
        <button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
          Previous
        </button>
        <span>
          Page {page} of {Math.ceil(total / limit)}
        </span>
        <button onClick={() => handlePageChange(page + 1)} disabled={page >= Math.ceil(total / limit)}>
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductsPage;