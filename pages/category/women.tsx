import { Box, Typography } from '@mui/material';
import { FullScreenLoading, ProductList, ShopLayout } from '../../components';
import { useProducts } from '../../hooks';

const WomenPage = () => {

  const { products, isLoading } = useProducts('/products?gender=women');

  return (
    <ShopLayout
      title="Teslo Shop - Women Products"
      pageDescription="Excellent women products with the best prices"
      robots="index, follow"
    >
      <Box mb={ 3 }>
        <Typography variant='h1' component='h1'>Women</Typography>
        <Typography variant='h2'>All women products</Typography>
      </Box>
      {
        isLoading
          ? <FullScreenLoading />
          : <ProductList products={ products } />
      }
    </ShopLayout>
  );
};

export default WomenPage;