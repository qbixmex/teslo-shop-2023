import { useState } from 'react';
import { GetServerSideProps, NextPage } from 'next'
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import {
  Box, Card, CardContent, Chip,
  CircularProgress,
  Divider, Grid, Typography
} from '@mui/material';
import CreditCardIcon from '@mui/icons-material/CreditCardOutlined';
import CreditScoreIcon from '@mui/icons-material/CreditScoreOutlined';

import { PayPalButtons } from '@paypal/react-paypal-js';
import { dbOrders } from '../../database';
import { IOrder, ISummary } from '../../interfaces';
import { ShopLayout, CartList, OrderSummary } from '../../components';
import styles from './order.module.css';
import tesloAPI from '../../services/tesloAPI';

type Props = { order: IOrder };
  
type OrderResponseBody = {
  id: string;
  status:
    | "COMPLETED"
    | "SAVED"
    | "APPROVED"
    | "VOIDED"
    | "PAYER_ACTION_REQUIRED";
}

const OrderPage: NextPage<Props> = ({ order }) => {

  const router = useRouter();
  const [ isPaying, setIsPaying ] = useState(false);

  const { orderItems, shippingAddress } = order;

  const summary: ISummary = {
    numberOfItems: order.numberOfItems,
    subtotal: order.subtotal,
    tax: order.tax,
    total: order.total,
  };

  const onOrderCompleted = async (details: OrderResponseBody) => {
    if (details.status !== 'COMPLETED') {
      return alert('No payment was made on Paypal');
    }

    setIsPaying(true);

    try {
      await tesloAPI.post(`/orders/pay`, {
        transactionId: details.id,
        orderId: order._id,
      });
      router.reload();
    } catch (error) {
      setIsPaying(false);
      console.log(error);
      alert(error);
    }
  };

  return (
    <ShopLayout
      title="Teslo Shop - Order Resume"
      pageDescription="Order resume"
      robots="noindex, nofollow"
    >
      <Typography variant="h1" component="h1" className={styles.title}>
        Order: {order._id}
      </Typography>

      {order.isPaid ? (
        <Chip
          sx={{ my: 2 }}
          label="Already Paid"
          variant="outlined"
          color="success"
          icon={<CreditScoreIcon />}
        />
      ) : (
        <Chip
          sx={{ my: 2 }}
          label="Payment Pending"
          variant="outlined"
          color="error"
          icon={<CreditCardIcon />}
        />
      )}

      <Grid container className="fadeIn">
        <Grid item xs={12} sm={7} mb={2}>
          <CartList products={orderItems} />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className="summary-card">
            <CardContent>
              <Typography variant="h2">
                Resume&nbsp; ({order.numberOfItems} product
                {order.numberOfItems > 0 ? "s" : ""})
              </Typography>

              <Divider sx={{ my: 1 }} />

              <Box display="flex" justifyContent="space-between">
                <Typography variant="subtitle1">Delivery Address</Typography>
              </Box>

              <Typography>
                {shippingAddress.firstName} {shippingAddress.lastName}
              </Typography>
              <Typography>
                {shippingAddress.address}
                {shippingAddress.address2
                  ? `, ${shippingAddress.address2}`
                  : ""}
              </Typography>
              <Typography>
                {shippingAddress.city}, {shippingAddress.zip}
              </Typography>
              <Typography>{shippingAddress.country}</Typography>
              <Typography>{shippingAddress.phone}</Typography>

              <Divider sx={{ my: 2 }} />

              <OrderSummary summary={summary} />

              <Box sx={{ mt: 3, display: "flex", flexDirection: "column" }}>
                <Box display="flex" justifyContent="center" className="fadeIn">
                  <CircularProgress
                    color="secondary"
                    size={50}
                    thickness={5}
                    sx={{ display: isPaying ? 'flex' : 'none' }}
                  />
                </Box>
                <Box sx={{
                  display: isPaying ? 'none' : 'flex',
                  flex: 1,
                  flexDirection: 'column',
                }}>
                  {order.isPaid ? (
                    <Chip
                      sx={{ my: 2 }}
                      label="Already Paid"
                      variant="outlined"
                      color="success"
                      icon={<CreditScoreIcon />}
                    />
                  ) : (
                    <PayPalButtons
                      createOrder={(data, actions) => {
                        return actions.order.create({
                          purchase_units: [
                            {
                              amount: {
                                currency_code: 'USD',
                                value: String(order.total),
                              },
                            },
                          ],
                        });
                      }}
                      onApprove={async (data, actions) => {
                        const details = await actions.order!.capture()
                        onOrderCompleted(details);
                      }}
                    />
                  )}
                </Box>
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
