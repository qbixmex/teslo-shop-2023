import { useEffect, useRef } from 'react';
import { GetServerSideProps, NextPage } from 'next'
import { getSession } from 'next-auth/react';
import NextLink from 'next/link';

import {
  Box, Card, CardContent, Chip,
  Divider, Grid, Link, Typography
} from '@mui/material';
import CreditCardIcon from '@mui/icons-material/CreditCardOutlined';
import CreditScoreIcon from '@mui/icons-material/CreditScoreOutlined';

import { dbOrders } from '../../database';
import { IOrder } from '../../interfaces';
import { ShopLayout, CartList, OrderSummary } from '../../components';
import styles from './order.module.css';

type Props = {
  order: IOrder;
};

const OrderPage: NextPage<Props> = ({ order }) => {

  const mount = useRef(true);

  useEffect(() => {
    if (mount.current) {
      console.log({ order });
    }
    return () => {
      mount.current = false;
    }
  }, [ order ]);

  return (
    <ShopLayout
      title="Teslo Shop - Order 123456789 Resume"
      pageDescription="Order resume"
      robots="noindex, nofollow"
    >
      <Typography
        variant="h1"
        component="h1"
        className={styles.title}
      >Order: 123456789</Typography>

      { false ? (
          <Chip
            sx={{ my: 2 }}
            label="Payment Pending"
            variant="outlined"
            color="error"
            icon={<CreditCardIcon />}
          />
        ) : (
          <Chip
            sx={{ my: 2 }}
            label="Already Paid"
            variant="outlined"
            color="success"
            icon={<CreditScoreIcon />}
          />
        )
      }

      <Grid container>
        <Grid item xs={12} sm={7} mb={2}>
          <CartList />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className="summary-card">
            <CardContent>
              <Typography variant="h2">Resume (3 items)</Typography>

              <Divider sx={{ my: 1 }} />

              <Box display="flex" justifyContent="space-between">
                <Typography variant="subtitle1">Delivery Address</Typography>
                <NextLink href="/checkout/address" passHref legacyBehavior>
                  <Link className={styles.link}>Edit</Link>
                </NextLink>
              </Box>

              <Typography>Bart Simpson</Typography>
              <Typography>742 Evergreen Terrace</Typography>
              <Typography>Springfield, 02360</Typography>
              <Typography>USA</Typography>
              <Typography>+1 1234567</Typography>

              <Divider sx={{ my: 2 }} />

              <Box display="flex" justifyContent="flex-end">
                <NextLink href="/cart" passHref legacyBehavior>
                  <Link className={styles.link}>Edit</Link>
                </NextLink>
              </Box>

              <OrderSummary />

              <Box sx={{ mt: 3 }}>
                <Typography variant='h1' component='p'>Pay</Typography>
                <Chip
                  sx={{ my: 2 }}
                  label="Already Paid"
                  variant="outlined"
                  color="success"
                  icon={<CreditScoreIcon />}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {

  const { id = '' } = context.query;
  const session: any = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: `/auth/login?page=/orders/${ id }`,
        permanent: false,
      }
    };
  }

  const order = await dbOrders.getOrderById(id.toString());

  if ( !order || ( order!.user !== session.user.id ) ) {
    return {
      redirect: {
        destination: `/orders/history`,
        permanent: false,
      }
    };
  }

  return {
    props: {
      order
    }
  };
};

export default OrderPage;
