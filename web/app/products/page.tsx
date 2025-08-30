'use client';

import React, { useState, useEffect } from 'react';
import { fetchProducts } from '../lib/api';
import ProductCard from '../../components/ProductCard';
import Header from '../../components/Header';
import { Product } from '../../../shared/types';
import { 
  Input, 
  Select, 
  Button, 
  Text, 
  Divider, 
  Card, 
  CardHeader, 
  Badge,
  Spinner,
  makeStyles,
  mergeClasses
} from '@fluentui/react-components';

const useStyles = makeStyles({
  container: {
    padding: '24px',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  title: {
    fontSize: '20px',
    fontWeight: '600',
    marginBottom: '24px',
    display: 'block',
    color: '#212529',
  },
  controlsCard: {
    marginBottom: '32px',
    backgroundColor: '#f8f9fa',
    borderColor: '#ced4da',
  },
  controlsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '16px',
  },
  controlGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  controlLabel: {
    fontSize: '12px',
    fontWeight: '500',
    color: '#6c757d',
  },
  resultsInfo: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
    padding: '16px',
    backgroundColor: '#e3f2fd',
    borderRadius: '6px',
    borderColor: '#bbdefb',
    borderWidth: '1px',
    borderStyle: 'solid',
  },
  loadingText: {
    color: '#0056b3',
  },
  productGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '24px',
    marginBottom: '32px',
  },
  emptyState: {
    textAlign: 'center',
    padding: '32px',
    color: '#adb5bd',
  },
  paginationCard: {
    backgroundColor: '#f8f9fa',
    borderColor: '#ced4da',
  },
  paginationContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '16px',
  },
  pageInfo: {
    minWidth: '100px',
    textAlign: 'center',
  },
});

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [search, setSearch] = useState<string>('');
  const [sort, setSort] = useState<string>('');
  const [order, setOrder] = useState<string>('asc');
  const [available, setAvailable] = useState<boolean | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  const styles = useStyles();

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        const result = await fetchProducts(search, sort, order, page, limit, available);
        setProducts(result.data);
        setTotal(result.total);
      } catch (error: any) {
        console.error('Failed to fetch products', error);
      } finally {
        setLoading(false);
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

  const handleSearchClick = () => {
    // Focus en el input de búsqueda
    const searchInput = document.querySelector('input[placeholder="Buscar productos..."]') as HTMLInputElement;
    if (searchInput) {
      searchInput.focus();
    }
  };

  const handleHeaderSearch = (query: string) => {
    setSearch(query);
    setPage(1); // Reset page on search
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <>
      <Header 
        onSearchClick={handleSearchClick}
        onSearch={handleHeaderSearch}
      />
      
      <div className={styles.container}>
        <Text className={styles.title}>
          Productos
        </Text>

        {/* Controls Section */}
        <Card className={styles.controlsCard}>
          <CardHeader>
            <Text size={400} weight="semibold">Filtros y Ordenamiento</Text>
          </CardHeader>
          <div style={{ padding: '16px' }}>
            <div className={styles.controlsGrid}>
              {/* Search Input */}
              <div className={styles.controlGroup}>
                <Text className={styles.controlLabel}>Buscar</Text>
                <Input
                  type="text"
                  placeholder="Buscar productos..."
                  value={search}
                  onChange={handleSearchChange}
                  appearance="outline"
                />
              </div>

              {/* Sort Select */}
              <div className={styles.controlGroup}>
                <Text className={styles.controlLabel}>Ordenar por</Text>
                <Select 
                  value={sort} 
                  onChange={handleSortChange}
                  appearance="outline"
                >
                  <option value="">Sin ordenar</option>
                  <option value="price">Precio</option>
                  <option value="name">Nombre</option>
                </Select>
              </div>

              {/* Order Select */}
              <div className={styles.controlGroup}>
                <Text className={styles.controlLabel}>Orden</Text>
                <Select 
                  value={order} 
                  onChange={handleOrderChange}
                  appearance="outline"
                >
                  <option value="asc">Ascendente</option>
                  <option value="desc">Descendente</option>
                </Select>
              </div>

              {/* Available Filter */}
              <div className={styles.controlGroup}>
                <Text className={styles.controlLabel}>Disponibilidad</Text>
                <Select 
                  value={available === undefined ? '' : available.toString()} 
                  onChange={handleAvailableChange}
                  appearance="outline"
                >
                  <option value="">Todos</option>
                  <option value="true">Disponible</option>
                  <option value="false">No disponible</option>
                </Select>
              </div>
            </div>
          </div>
        </Card>

        {/* Results Info */}
        <Card className={styles.resultsInfo}>
          <div style={{ padding: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
              <Text size={300}>
                Mostrando {products.length} de {total} productos
              </Text>
              {loading && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Spinner size="tiny" />
                  <Text size={300} className={styles.loadingText}>
                    Cargando...
                  </Text>
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Product Grid */}
        {loading ? (
          <div className={styles.emptyState}>
            <Spinner size="large" />
            <Text size={400} style={{ marginTop: '16px' }}>
              Cargando productos...
            </Text>
          </div>
        ) : products.length === 0 ? (
          <div className={styles.emptyState}>
            <Text size={400}>No se encontraron productos</Text>
          </div>
        ) : (
          <div className={styles.productGrid}>
            {products.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
              />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <Card className={styles.paginationCard}>
            <div style={{ padding: '16px' }}>
              <div className={styles.paginationContainer}>
                <Button 
                  appearance="outline"
                  onClick={() => handlePageChange(page - 1)} 
                  disabled={page === 1}
                >
                  Anterior
                </Button>
                
                <Text size={300} className={styles.pageInfo}>
                  Página {page} de {totalPages}
                </Text>
                
                <Button 
                  appearance="outline"
                  onClick={() => handlePageChange(page + 1)} 
                  disabled={page >= totalPages}
                >
                  Siguiente
                </Button>
              </div>
            </div>
          </Card>
        )}
      </div>
    </>
  );
};

export default ProductsPage;