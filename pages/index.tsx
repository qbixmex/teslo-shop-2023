import type { NextPage } from 'next'
import { ShopLayout } from '../components';
import { Typography } from '@mui/material';

const Home: NextPage = () => {
  return (
    <ShopLayout
      title='Teslo Shop - Home'
      pageDescription='Find the best product from Tesla'
      robots='index, follow'
    >
      <Typography variant='h1' component='h1'>Shop</Typography>
      <Typography variant='h2'>All Products</Typography>
    </ShopLayout>
  )
};

export default Home
