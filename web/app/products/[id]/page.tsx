'use client';

import React, { useState, useEffect } from 'react';
import { fetchProduct } from '../../lib/api';
import { Product } from '../../../../shared/types';
import { useParams, useRouter } from 'next/navigation';
import { Button, Text, Badge, Card, CardHeader, CardPreview, makeStyles } from '@fluentui/react-components';

const useStyles = makeStyles({
  container: {
    padding: '24px',
    maxWidth: '1000px',
    margin: '0 auto',
  },
  backButton: {
    marginBottom: '24px',
  },
  productCard: {
    padding: '32px',
    border: '1px solid #e0e0e0',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  },
  productGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '32px',
    alignItems: 'start',
  },
  productImage: {
    width: '100%',
    height: '400px',
    objectFit: 'cover',
    borderRadius: '8px',
    border: '1px solid #e0e0e0',
  },
  productName: {
    fontSize: '28px',
    marginBottom: '16px',
    display: 'block',
    fontWeight: '600',
  },
  productDescription: {
    fontSize: '16px',
    color: '#666',
    marginBottom: '24px',
    lineHeight: '1.6',
    display: 'block',
  },
  priceText: {
    fontSize: '24px',
    color: '#1976d2',
    display: 'block',
    marginBottom: '8px',
    fontWeight: '600',
  },
  stockBadge: {
    backgroundColor: '#4caf50',
    color: 'white',
    padding: '6px 12px',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '500',
  },
  outOfStockBadge: {
    backgroundColor: '#9e9e9e',
    color: 'white',
    padding: '6px 12px',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '500',
  },
  categoryText: {
    color: '#666',
    marginBottom: '8px',
    display: 'block',
  },
  buttonGroup: {
    display: 'flex',
    gap: '16px',
  },
  favoriteButton: {
    backgroundColor: '#ff6b6b',
    borderColor: '#ff6b6b',
  },
  normalFavoriteButton: {
    backgroundColor: '#1976d2',
    borderColor: '#1976d2',
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '400px',
  },
  errorContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '400px',
    gap: '16px',
  },
});

const ProductDetailPage: React.FC = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [favorite, setFavorite] = useState<boolean>(false);
  const { id } = useParams();
  const router = useRouter();
  const styles = useStyles();

  useEffect(() => {
    const loadProduct = async () => {
      if (id) {
        setLoading(true);
        try {
          const fetchedProduct = await fetchProduct(id as string);
          setProduct(fetchedProduct);
        } catch (error: any) {
          console.error('Failed to fetch product', error);
        } finally {
          setLoading(false);
        }
      }
    };

    loadProduct();
  }, [id]);

  const handleBackClick = () => {
    router.push('/products');
  };

  const handleFavoriteClick = () => {
    setFavorite(!favorite);
    console.log(`${favorite ? 'Removido de' : 'Agregado a'} favoritos:`, product?.name);
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <Text size={400}>Cargando producto...</Text>
      </div>
    );
  }

  if (!product) {
    return (
      <div className={styles.errorContainer}>
        <Text size={400}>Producto no encontrado</Text>
        <Button appearance="outline" onClick={handleBackClick}>
          Volver a productos
        </Button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Back Button */}
      <Button 
        appearance="subtle" 
        onClick={handleBackClick}
        className={styles.backButton}
      >
        ← Volver a productos
      </Button>

      <Card className={styles.productCard}>
        <div className={styles.productGrid}>
          {/* Product Image */}
          <div>
            <img 
              src={product.imageUrl} 
              alt={product.name} 
              className={styles.productImage}
            />
          </div>

          {/* Product Info */}
          <div>
            <Text className={styles.productName}>
              {product.name}
            </Text>

            <Text className={styles.productDescription}>
              {product.description}
            </Text>

            <div style={{ marginBottom: '24px' }}>
              <Text className={styles.priceText}>
                ${product.price.toFixed(2)}
              </Text>
              
              <Badge 
                appearance="filled"
                className={product.available ? styles.stockBadge : styles.outOfStockBadge}
              >
                {product.available ? 'En stock' : 'Sin stock'}
              </Badge>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <Text className={styles.categoryText}>
                Categoría: {product.category}
              </Text>
            </div>

            <div className={styles.buttonGroup}>
              <Button 
                appearance="primary"
                onClick={handleFavoriteClick}
                className={favorite ? styles.favoriteButton : styles.normalFavoriteButton}
              >
                {favorite ? '❤️ Quitar de favoritos' : '🤍 Agregar a favoritos'}
              </Button>
              
              {product.available && (
                <Button appearance="outline">
                  Comprar ahora
                </Button>
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProductDetailPage;