import { Box, Typography } from '@mui/material';
import { FullScreenLoading, ProductList, ShopLayout } from '../../components';
import { useProducts } from '../../hooks';

const MenPage = () => {

  const { products, isLoading } = useProducts('/products?gender=men');

  return (
    <ShopLayout
      title="Teslo Shop - Men Products"
      pageDescription="Excellent men products with the best prices"
      robots="index, follow"
    >
      <Box mb={ 3 }>
        <Typography variant='h1' component='h1'>Men</Typography>
        <Typography variant='h2'>All men products</Typography>
      </Box>
      {
        isLoading
          ? <FullScreenLoading />
          : <ProductList products={ products } />
      }
    </ShopLayout>
  );
};

export default MenPage;