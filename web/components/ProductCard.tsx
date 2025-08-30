import React from 'react';
import { useRouter } from 'next/navigation';
import { Product } from '../../shared/types';
import { 
  Card, 
  CardHeader, 
  CardPreview, 
  Badge, 
  Text, 
  makeStyles,
  mergeClasses
} from '@fluentui/react-components';

const useStyles = makeStyles({
  card: {
    minWidth: '280px',
    maxWidth: '320px',
    transition: 'all 0.2s ease-in-out',
    cursor: 'pointer',
    ':hover': {
      transform: 'translateY(-4px)',
      boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
    },
  },
  cardPreview: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    cursor: 'pointer',
    transition: 'transform 0.2s ease-in-out',
    ':hover': {
      transform: 'scale(1.02)',
    },
  },
  priceText: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#212529',
    marginBottom: '8px',
  },
  productName: {
    fontSize: '16px',
    fontWeight: '500',
    color: '#212529',
    marginBottom: '4px',
    lineHeight: '1.4',
  },
  stockBadge: {
    marginTop: '8px',
  },
  inStock: {
    backgroundColor: '#d4edda',
    color: '#155724',
    borderColor: '#c3e6cb',
  },
  outOfStock: {
    backgroundColor: '#e9ecef',
    color: '#6c757d',
    borderColor: '#dee2e6',
  },
});

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const styles = useStyles();
  const router = useRouter();

  const handleImageClick = () => {
    router.push(`/products/${product.id}`);
  };

  const handleCardClick = () => {
    router.push(`/products/${product.id}`);
  };

  return (
    <Card className={styles.card} onClick={handleCardClick}>
      <CardPreview className={styles.cardPreview}>
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className={styles.image}
          onClick={handleImageClick}
        />
      </CardPreview>
      
      <CardHeader>
        <Text className={styles.productName}>
          {product.name}
        </Text>
      </CardHeader>
      
      <div style={{ padding: '16px' }}>
        <Text className={styles.priceText}>
          ${product.price.toFixed(2)}
        </Text>
        
        <Badge 
          appearance={product.available ? "filled" : "tint"}
          className={mergeClasses(
            styles.stockBadge,
            product.available ? styles.inStock : styles.outOfStock
          )}
        >
          {product.available ? 'En stock' : 'Sin stock'}
        </Badge>
      </div>
    </Card>
  );
};

export default ProductCard;