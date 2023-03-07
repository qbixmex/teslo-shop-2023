import { GetServerSideProps, NextPage } from 'next'
import { getSession } from 'next-auth/react';
import {
  Box, Card, CardContent, Chip,
  Divider, Grid, Typography
} from '@mui/material';
import CreditCardIcon from '@mui/icons-material/CreditCardOutlined';
import CreditScoreIcon from '@mui/icons-material/CreditScoreOutlined';

import { PayPalButtons } from '@paypal/react-paypal-js';
import { dbOrders } from '../../database';
import { IOrder, ISummary } from '../../interfaces';
import { ShopLayout, CartList, OrderSummary } from '../../components';
import styles from './order.module.css';

type Props = { order: IOrder };

const OrderPage: NextPage<Props> = ({ order }) => {

  const { orderItems, shippingAddress } = order;

  const summary: ISummary = {
    numberOfItems: order.numberOfItems,
    subtotal: order.subtotal,
    tax: order.tax,
    total: order.total,
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
                            description: 'T-Shirt',
                            amount: {
                              currency_code: 'USD',
                              value: String(order.total),
                            },
                          },
                        ],
                        application_context: {
                          shipping_preference: 'NO_SHIPPING'
                        }
                      });
                    }}
                    onApprove={(data, actions) => {
                      return actions.order!.capture().then((details) => {
                        console.log("Details", details);
                        const name = details.payer.name?.given_name;
                        console.log(`Order paid by: ${name}`);
                      });
                    }}
                    onError={(error) => console.error(error)}
                  />
                )}
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
