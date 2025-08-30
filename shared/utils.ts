import { Product } from './types';

/**
 * Obtiene los productos más baratos disponibles
 * @param products - Array de productos
 * @param top - Número de productos a devolver (default: 3)
 * @returns Array de productos más baratos disponibles
 */
export function getTopCheapestAvailable(products: Product[], top: number = 3): Product[] {
  return products
    .filter(product => product.available)
    .sort((a, b) => a.price - b.price)
    .slice(0, top);
}

/**
 * Calcula el precio promedio de productos disponibles
 * @param products - Array de productos
 * @returns Precio promedio o 0 si no hay productos disponibles
 */
export function getAveragePriceAvailable(products: Product[]): number {
  const availableProducts = products.filter(product => product.available);
  if (availableProducts.length === 0) return 0;
  
  const totalPrice = availableProducts.reduce((sum, product) => sum + product.price, 0);
  return Math.round((totalPrice / availableProducts.length) * 100) / 100;
}
