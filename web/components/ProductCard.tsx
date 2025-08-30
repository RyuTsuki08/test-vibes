import React from 'react';
import { Product } from '../../shared/types';
import { Card, Image, Text, Label } from '@fluentui/react-components';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Card style={{ minWidth: '250px', border: '1px solid #ccc', borderRadius: '4px', overflow: 'hidden' }}>
      <Image src={product.image} alt={product.name} width={200} height={200} style={{ objectFit: 'cover' }} />
      <div style={{ padding: '10px' }}>
        <Text weight="semibold" style={{ fontSize: '16px' }}>{product.name}</Text>
        <Text style={{ fontSize: '14px' }}>Price: ${product.price}</Text>
        <Label appearance="subtle" style={{ backgroundColor: product.isAvailable ? 'green' : 'gray', color: 'white', padding: '2px 5px', borderRadius: '3px' }}>
          {product.isAvailable ? 'En stock' : 'Sin stock'}
        </Label>
      </div>
    </Card>
  );
};

export default ProductCard;