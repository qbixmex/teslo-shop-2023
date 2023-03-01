import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { ShopLayout } from '../../components/layouts/ShopLayout';
import { Box, Button, Card, CardContent, Divider, Grid, Typography } from '@mui/material';
import { CartList, OrderSummary } from '../../components';
import { CartContext } from '../../context';

const CartPage = () => {
  const { isLoaded, cart } = useContext(CartContext);

  const router = useRouter();

  useEffect(() => {
    if (isLoaded && cart.length === 0 ) {
      router.replace('/cart/empty');
    }
  }, [isLoaded, cart, router]);

  if (!isLoaded || cart.length === 0) {
    return (<Box></Box>);
  }

  return (
    <ShopLayout
      title='Teslo Shop - Cart'
      pageDescription="Cart items resume"
      robots="noindex, nofollow"
    >
      <Typography variant='h1' component='h1'>Cart</Typography>

      <Grid container>
        <Grid item xs={12} sm={7} mb={2}>
          <CartList editable />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className='summary-card'>
            <CardContent>
              <Typography variant='h2'>Order</Typography>
              <Divider sx={{ my: 1 }} />

              <OrderSummary />

              <Box sx={{ mt: 3 }}>
                <Button
                  className="circular-btn"
                  color="secondary"
                  fullWidth
                  onClick={ () => router.push('/checkout/address') }
                >Checkout</Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default CartPage;