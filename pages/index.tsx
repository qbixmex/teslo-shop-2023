import type { NextPage } from 'next'
import { ProductList, ShopLayout } from '../components';
import { Box, Typography } from '@mui/material';

import useSWR from 'swr';
import { IProduct } from '../interfaces';

const fetcher = async (...args: [key:string]): Promise<IProduct[]|undefined> => {
  const response = await fetch(...args);
  const data = await response.json() as IProduct[];
  return data;
};

const HomePage: NextPage = () => {

  const { data, error } = useSWR('/api/products', fetcher);

  if (error) return <p>Failed to load</p>;
  if (!data) return <p>Loading ...</p>;

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
      <ProductList products={ data } />
    </ShopLayout>
  );
};

export default HomePage;
