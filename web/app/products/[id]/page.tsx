'use client';

import React, { useState, useEffect } from 'react';
import { fetchProduct } from '../../lib/api';
import { Product } from '../../../../shared/types';
import { useParams } from 'next/navigation';

const ProductDetailPage: React.FC = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const { id } = useParams();

  useEffect(() => {
    const loadProduct = async () => {
      if (id) {
        try {
          const fetchedProduct = await fetchProduct(id as string);
          setProduct(fetchedProduct);
        } catch (error: any) {
          console.error('Failed to fetch product', error);
        }
      }
    };

    loadProduct();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <img src={product.imageUrl} alt={product.name} style={{ maxWidth: '500px' }} />
      <p style={{ fontSize: '18px' }}>Price: ${product.price}</p>
      <p>Status: {product.isAvailable ? 'En stock' : 'Sin stock'}</p>
      <button>Agregar a favoritos</button>
    </div>
  );
};

export default ProductDetailPage;