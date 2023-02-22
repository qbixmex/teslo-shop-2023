import type { NextPage } from 'next'
import { ShopLayout } from '../components';
import { Box, CardActionArea, CardMedia, Grid, Typography } from '@mui/material';
import { initialData } from '../database/products';

const Home: NextPage = () => {
  return (
    <ShopLayout
      title='Teslo Shop - Home'
      pageDescription='Find the best product from Tesla'
      robots='index, follow'
    >
      <Box mb={ 3 }>
        <Typography variant='h1' component='h1'>Shop</Typography>
        <Typography variant='h2'>All Products</Typography>
      </Box>

      <Grid container spacing={ 4 }>
        { initialData.products.map(product => (
          <Grid item key={ product.slug }
            xs={ 12 } sm={ 6 } md={ 4 } lg={ 3 } xl={ 2 }
          >
            <CardActionArea>
              <CardMedia
                component='img'
                image={`products/${product.images[0]}`}
                alt={ product.title }
              />
            </CardActionArea>
          </Grid>
        )) }
      </Grid>
    </ShopLayout>
  )
};

export default Home
