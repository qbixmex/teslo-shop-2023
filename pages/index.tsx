import type { NextPage } from 'next'
import { ProductList, ShopLayout } from '../components';
import { Box, Typography } from '@mui/material';
import { initialData } from '../database/products';

const Home: NextPage = () => {
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
      <ProductList products={ initialData.products as any } />
    </ShopLayout>
  )
};

export default Home;
