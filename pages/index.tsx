import type { NextPage } from 'next'
import { ProductList, ShopLayout } from '../components';
import { Box, Typography } from '@mui/material';
import { useProducts } from '../hooks';

const HomePage: NextPage = () => {

  const { products, isLoading } = useProducts('/products');

  return (
    <ShopLayout
      title='Teslo Shop - Home'
      pageDescription='Find the best product from Tesla'
      robots='index, follow'
    >
      <Box mb={ 3 }>
        <Typography variant='h1' component='h1'>Shop</Typography>
        <Typography variant='h2'>All Products</Typography>
      </Box>
      {
        isLoading
          ? <h1>Loading</h1>
          : <ProductList products={ products } />
      }
    </ShopLayout>
  );
};

export default HomePage;
