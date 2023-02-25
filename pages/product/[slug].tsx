import { NextPage, GetStaticPaths, GetStaticProps } from 'next';
import { Box, Button, Chip, Grid, Typography } from '@mui/material';
import { ShopLayout, ProductSlideShow, ItemCounter, SizeSelector } from '../../components';
import { IProduct } from '../../interfaces';
import { dbProducts } from '../../database';

type Props = { product: IProduct };

const ProductPage: NextPage<Props> = ({ product }) => {
  return (
    <ShopLayout
      title={`${product.title} - Teslo Shop`}
      pageDescription={`${product.description.slice(0, 160)} ...`}
      imageFullUrl={`http://localhost:3000/products/${product.images[0]}`}
      robots="index, follow"
    >
      <Grid container spacing={3}>
        {/* ------------ SLIDESHOW ------------  */}
        <Grid item xs={12} sm={7}>
          <ProductSlideShow images={ product.images } />
        </Grid>

        <Grid item xs={12} sm={5}>
          {/* ------------ TITLES ------------  */}
          <Box display="flex" flexDirection="column">
            <Typography variant="h1" component="h1">
              { product.title }
            </Typography>

            <Typography
              variant="subtitle1"
              component="h2"
              color="green"
            >
              { `$ ${product.price}.00` }
            </Typography>

            <Box sx={{ my: 2 }}>
              {/* ------------ QUANTITY ------------  */}
              <Typography variant='subtitle2' mb={1}>Quantity</Typography>
              <ItemCounter />
              {/* ------------ SIZES ------------  */}
              <Typography variant='subtitle2' mb={1}>Sizes</Typography>
              <SizeSelector
                // selectedSize={product.sizes[2]}
                sizes={ product.sizes }
              />
            </Box>

            {/* ------------ ADD TO CART ------------  */}
            { true && ( // TODO: Handle Logic to show this component
              <Button color="secondary" className='circular-btn'>
                Add Cart
              </Button>
            )}

            {/* ------------ NO PRODUCTS ------------  */}
            {
              false && ( // TODO: Handle Logic to show this component
                <Chip
                label="There's no available products"
                color="error"
                variant="outlined"
                sx={{ mt: 2 }}
              />
            )}

            <Box sx={{ mt: 3 }}>
              <Typography variant='subtitle2' mb={2}>Description</Typography>
              <Typography variant='body2'>{ product.description }</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = await dbProducts.getAllProductsSlugs();

  return {
    paths: slugs.map(({slug}) => ({ params: { slug }})),
    fallback: 'blocking',
  }
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug = '' } = params as { slug: string };
  const product = await dbProducts.getProductBySlug(slug);

  if (!product) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    };
  }

  return {
    props: { product },
    revalidate: 60 * 60 * 24
  }
};

export default ProductPage;