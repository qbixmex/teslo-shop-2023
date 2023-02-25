import { useRouter } from 'next/router';
import { Box, Typography } from '@mui/material';
import { FullScreenLoading, ProductList } from '../../components';
import { ShopLayout } from '../../components/layouts/ShopLayout';
import { useProducts } from '../../hooks';

const SearchPage = () => {
  const { asPath } = useRouter();
  const { products, isLoading } = useProducts(asPath);

  return (
    <ShopLayout
      title='xxxx Products'
      pageDescription='xxxx products results'
      robots='noindex, nofollow'
    >
      <Box mb={ 3 }>
        <Typography variant='h1' component='h1'>Search Product</Typography>
        <Typography variant='h2'>ABC Products</Typography>
      </Box>
      {
        isLoading
          ? <FullScreenLoading />
          : <ProductList products={ products } />
      }
    </ShopLayout>
  );
};

export default SearchPage;