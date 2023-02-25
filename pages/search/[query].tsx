import { GetServerSideProps, NextPage } from 'next';
import { Box, Typography } from '@mui/material';
import { ShopLayout } from '../../components/layouts/ShopLayout';
import { ProductList } from '../../components';
import { dbProducts } from '../../database';
import { IProduct } from '../../interfaces/products';

type Props = { products: IProduct[] };

const SearchPage: NextPage<Props> = ({ products }) => {
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
      <ProductList products={ products } />
    </ShopLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({params}) => {
  const { query = '' } = params as { query: string };

  if (query.length === 0) {
    return {
      redirect: {
        destination: '/',
        permanent: true,
      }
    };
  }

  let products = await dbProducts.getProductByTerm(query);

  // TODO: Return other products if no results were found

  return {
    props: { products }
  }
}

export default SearchPage;
