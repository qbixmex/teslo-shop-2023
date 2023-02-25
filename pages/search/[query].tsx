import { GetServerSideProps, NextPage } from 'next';
import { Box, Typography } from '@mui/material';
import { ShopLayout } from '../../components/layouts/ShopLayout';
import { ProductList } from '../../components';
import { dbProducts } from '../../database';
import { IProduct } from '../../interfaces/products';

type Props = {
  products: IProduct[];
  foundProducts: boolean;
  query: string;
};

const SearchPage: NextPage<Props> = ({ products, foundProducts, query }) => {
  return (
    <ShopLayout
      title={`Teslo Shop - ${query} products`}
      pageDescription={`Teslo Shop - ${query} products results`}
      robots='noindex, nofollow'
    >
      <Box mb={ 3 }>
        <Typography variant='h1' component='h1' mb={2}>Search {query}</Typography>
        <Typography variant='h2' mb={1}>
        {
          foundProducts
            ? (
              <>
                Search Term:&nbsp;
                <span className="blue bold">&quot;{ query }&quot;</span>
              </>
            )
            : (
              <>
                There&apos;s no products with search term:&nbsp;
                <span className="blue bold">&quot;{ query }&quot;</span>
              </>
            )
        }
        </Typography>
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

  let products = await dbProducts.getProductsByTerm(query);
  const foundProducts = (products.length > 0);

  if (!foundProducts) products = await dbProducts.getAllProducts();

  return {
    props: {
      products,
      foundProducts,
      query,
    }
  }
}

export default SearchPage;
