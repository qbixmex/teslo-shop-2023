import { useState, useContext } from 'react';
import { NextPage, GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { Box, Button, Chip, Grid, Typography } from '@mui/material';
import { IProduct, ICartProduct, ISize } from '../../interfaces';
import { CartContext } from '../../context';
import { dbProducts } from '../../database';
import { ShopLayout, ProductSlideShow, ItemCounter, SizeSelector } from '../../components';

type Props = { product: IProduct };

const ProductPage: NextPage<Props> = ({ product }) => {

  const router = useRouter();

  const { addProductToCart } = useContext(CartContext);

  const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
    _id: product._id,
    image: product.images[0],
    price:product.price,
    size: undefined,
    slug: product.slug,
    title: product.title,
    gender: product.gender,
    quantity: 1,
  });

  const onSelectedSize = (size: ISize) => {
    setTempCartProduct(currentProduct => ({ ...currentProduct, size }));
  };

  const onUpdateQuantity = (quantity: number) => {
    setTempCartProduct(currentProduct => ({ ...currentProduct, quantity }));
  };

  const onAddProduct = () => {
    if (!tempCartProduct.size) return;
    addProductToCart(tempCartProduct);
    router.push('/cart');
  };

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
              <ItemCounter
                currentValue={tempCartProduct.quantity}
                updateQuantity={onUpdateQuantity}
                maxValue={ (product.inStock > 5) ? 5 : product.inStock }
              />

              {/* ------------ SIZES ------------  */}
              <Typography variant='subtitle2' mb={1}>Sizes</Typography>
              <SizeSelector
                selectedSize={tempCartProduct.size}
                sizes={product.sizes}
                onClick={onSelectedSize}
              />

            </Box>

            {/* ------------ ADD TO CART ------------  */}
            { (product.inStock !== 0)
              ? (
                <Button
                  color="secondary"
                  className='circular-btn'
                  onClick={onAddProduct}
                >
                  {
                    tempCartProduct.size
                      ? 'Add Cart'
                      : 'Select Size'
                  }
                </Button>
              ) : (
                <Chip
                  label="There's no available products"
                  color="error"
                  variant="outlined"
                />
              )
            }

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