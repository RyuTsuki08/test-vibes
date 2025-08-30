import express from 'express';
import productsData from './data/products.json';
import { Product } from './types';

const router = express.Router();

// Helper para filtrar, ordenar y paginar productos
function filterSortPaginateProducts(
  products: Product[],
  query: {
    search?: string;
    sort?: 'price' | 'name';
    order?: 'asc' | 'desc';
    page?: number;
    limit?: number;
    available?: boolean;
  }
): { data: Product[]; total: number; page: number; limit: number } {
  let filtered = products;

  // Filtrar por búsqueda en nombre o descripción (case insensitive)
  if (query.search) {
    const searchLower = query.search.toLowerCase();
    filtered = filtered.filter(
      p =>
        p.name.toLowerCase().includes(searchLower) ||
        p.description.toLowerCase().includes(searchLower)
    );
  }

  // Filtrar por disponibilidad si se especifica
  if (typeof query.available === 'boolean') {
    filtered = filtered.filter(p => p.available === query.available);
  }

  // Ordenar
  if (query.sort) {
    const orderMultiplier = query.order === 'desc' ? -1 : 1;
    filtered = filtered.sort((a, b) => {
      if (query.sort === 'price') {
        return (a.price - b.price) * orderMultiplier;
      } else if (query.sort === 'name') {
        return a.name.localeCompare(b.name) * orderMultiplier;
      }
      return 0;
    });
  }

  // Paginación
  const page = query.page && query.page > 0 ? query.page : 1;
  const limit = query.limit && query.limit > 0 ? query.limit : 10;
  const start = (page - 1) * limit;
  const end = start + limit;

  const paginated = filtered.slice(start, end);

  return {
    data: paginated,
    total: filtered.length,
    page,
    limit,
  };
}

// GET /api/products
router.get('/products', (req, res) => {
  // Parsear query params
  const {
    search,
    sort,
    order,
    page,
    limit,
    available,
  } = req.query;

  // Convertir tipos
  const pageNum = page ? parseInt(page as string, 10) : 1;
  const limitNum = limit ? parseInt(limit as string, 10) : 10;
  const availableBool =
    available === undefined
      ? undefined
      : available === 'true'
      ? true
      : false;

  // Validar sort y order
  const validSort = sort === 'price' || sort === 'name' ? (sort as 'price' | 'name') : undefined;
  const validOrder = order === 'asc' || order === 'desc' ? (order as 'asc' | 'desc') : 'asc';

  const result = filterSortPaginateProducts(productsData as Product[], {
    search: search as string | undefined,
    sort: validSort,
    order: validOrder,
    page: pageNum,
    limit: limitNum,
    available: availableBool,
  });

  res.json({
    total: result.total,
    page: result.page,
    limit: result.limit,
    data: result.data,
  });
});

// GET /api/products/:id
router.get('/products/:id', (req, res) => {
  const product = (productsData as Product[]).find(p => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ message: 'Producto no encontrado' });
  }
  res.json(product);
});

export default router;