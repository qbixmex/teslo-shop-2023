import { Button, Chip, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { ShopLayout, ProductSlideShow, ItemCounter, SizeSelector } from '../../components';
import { initialData } from '../../database/products';
import { IProduct } from '../../interfaces';

const product = initialData.products.find(p => {
  return p.slug === 'women_chill_half_zip_cropped_hoodie';
}) as IProduct;

const ProductPage = () => {
  return (
    <ShopLayout
      title={`${product?.title} - Teslo Shop`}
      pageDescription="Product description"
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
              { product?.title }
            </Typography>

            <Typography
              variant="subtitle1"
              component="h2"
              color="green"
            >
              { `$ ${product?.price}.00` }
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
              <Typography variant='body2'>{ product?.description }</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default ProductPage;