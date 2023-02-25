import { Box, Typography } from '@mui/material';
import { FullScreenLoading, ProductList, ShopLayout } from '../../components';
import { useProducts } from '../../hooks';

const KidsPage = () => {

  const { products, isLoading } = useProducts('/products?gender=kid');

  return (
    <ShopLayout
      title="Teslo Shop - Kids Products"
      pageDescription="Excellent kids products with the best prices"
      robots="index, follow"
    >
      <Box mb={ 3 }>
        <Typography variant='h1' component='h1'>Shop</Typography>
        <Typography variant='h2'>All kids products</Typography>
      </Box>
      {
        isLoading
          ? <FullScreenLoading />
          : <ProductList products={ products } />
      }
    </ShopLayout>
  );
};

export default KidsPage;