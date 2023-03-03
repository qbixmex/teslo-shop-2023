import { useContext, useEffect } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { Box, Button, Card, CardContent, Divider, Grid, Link, Typography } from '@mui/material';

import { CartContext } from '../../context/cart/CartContext';
import { CartList, OrderSummary } from '../../components';
import { ShopLayout } from '../../components/layouts/ShopLayout';
import styles from './summary.module.css';
import { countries } from '../../utils';

const SummaryPage = () => {
  const router = useRouter();
  const { shippingAddress: address, cartSummary: { numberOfItems } } = useContext(CartContext);

  useEffect(() => {
    if (!Cookies.get('address')) {
      router.push('/checkout/address');
    }
  }, [ router ]);

  if (!address) {
    return <></>;
  }

  return (
    <ShopLayout
      title='Teslo Shop - Summary Order'
      pageDescription="Cart summary order resume"
      robots="noindex, nofollow"
    >
      <Typography variant='h1' component='h1'>Summary Order</Typography>

      <Grid container>
        <Grid item xs={12} sm={7} mb={2}>
          <CartList />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className='summary-card'>
            <CardContent>
              <Typography variant='h2'>Resume ({numberOfItems} product{ numberOfItems > 1 ? 's' : '' })</Typography>

              <Divider sx={{ my: 1 }} />

              <Box display="flex" justifyContent="space-between">
                <Typography variant='subtitle1'>Delivery Address</Typography>
                <NextLink href="/checkout/address" passHref legacyBehavior>
                  <Link className={styles.link}>Edit</Link>
                </NextLink>
              </Box>

              <Typography>{ `${address.firstName} ${address.lastName}` }</Typography>
              <Typography>{ address.address + (address.address2 ? `, ${address.address2}` : '') }</Typography>
              <Typography></Typography>
              <Typography>{ address.city }, { address.zip }</Typography>
              <Typography>{ countries.find(c => c.code === address.country)?.name }</Typography>
              <Typography>{ address.phone }</Typography>

              <Divider sx={{ my: 2 }} />

              <Box display="flex" justifyContent="flex-end">
                <NextLink href="/cart" passHref legacyBehavior>
                  <Link className={styles.link}>Edit</Link>
                </NextLink>
              </Box>

              <OrderSummary />

              <Box sx={{ mt: 3 }}>
                <Button
                  className="circular-btn"
                  color="secondary"
                  fullWidth
                >Confirm</Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default SummaryPage;
