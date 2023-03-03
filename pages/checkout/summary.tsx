import { useContext, useState, useEffect, useRef } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { Box, Button, Card, CardContent, Chip, Divider, Grid, Link, Typography } from '@mui/material';

import { CartContext } from '../../context/cart/CartContext';
import { CartList, OrderSummary } from '../../components';
import { ShopLayout } from '../../components/layouts/ShopLayout';
import styles from './summary.module.css';
import { countries } from '../../utils';

const SummaryPage = () => {
  const router = useRouter();
  const mount = useRef(true);
  const {
    shippingAddress: address,
    cartSummary: { numberOfItems },
    createOrder,
  } = useContext(CartContext);
  const [ isPosting, setIsPosting ] = useState(false);
  const [ errorMessage, setErrorMessage ] = useState<string|null>();

  useEffect(() => {
    if (mount.current) {
      if (!Cookies.get('address')) {
        router.push('/checkout/address');
      }
    }
    return () => {
      mount.current = false;
    };
  }, [ router ]);

  const onCreateOrder = async () => {
    setIsPosting(true);
    const { hasError, orderId, message } = await createOrder();
    if (hasError) {
      setIsPosting(false);
      setErrorMessage(message);
      return;
    }
    if (orderId) {
      router.replace(`/orders/${ orderId }`);
      return;
    }
  };

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

              <Box sx={{ display: 'flex', flexDirection: 'column', mt: 3 }}>
                <Button
                  className="circular-btn"
                  color="secondary"
                  fullWidth
                  onClick={ onCreateOrder }
                  disabled={ isPosting }
                >Confirm</Button>

                <Chip
                  color="error"
                  label={ errorMessage }
                  className={ styles['error-message'] }
                  sx={{ display: errorMessage ? 'flex' : 'none' }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default SummaryPage;
