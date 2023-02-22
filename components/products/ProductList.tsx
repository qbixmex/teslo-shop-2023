import { Grid } from '@mui/material';
import { IProduct } from '../../interfaces';
import { ProductCard } from '.';
 
type Props = { products: IProduct[] };

// TODO: Replace key={ product.slug } By: key={ product._id }

export const ProductList = ({ products }: Props) => {
  return (
    <Grid container spacing={4}>
      {products.map(product => (
        <ProductCard key={ product.slug } product={product} />
      ))}
    </Grid>
  );
};
