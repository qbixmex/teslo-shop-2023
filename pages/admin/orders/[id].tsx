import { useState } from 'react';
import { GetServerSideProps, NextPage } from 'next';

import {
  Box, Card, CardContent, Chip, CircularProgress,
  Divider, Grid, Typography
} from "@mui/material";
import ConfirmationIcon from "@mui/icons-material/ConfirmationNumberOutlined";
import CreditCardIcon from "@mui/icons-material/CreditCardOutlined";
import CreditScoreIcon from "@mui/icons-material/CreditScoreOutlined";

import { IOrder, ISummary } from "../../../interfaces";
import { AdminLayout, CartList, OrderSummary } from "../../../components";
import { dbOrders } from "../../../database";
import styles from "./Order.module.css";

type Props = { order: IOrder };

const OrdersPage: NextPage<Props> = ({ order }) => {

  const { orderItems, shippingAddress } = order;
  const [ isPaying ] = useState(false);

  const summary: ISummary = {
    numberOfItems: order.numberOfItems,
    subtotal: order.subtotal,
    tax: order.tax,
    total: order.total,
  };

  return (
    <AdminLayout
      title="Orders"
      description="Orders Maintenance"
      subtitle={`Orders ${order._id} Resume`}
      icon={<ConfirmationIcon />}
    >
      <Typography
        variant="h1"
        component="h1"
        className={styles.title}
      >Summary</Typography>

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
                  <Chip
                    sx={{ my: 2 }}
                    label="Payment Pending"
                    variant="outlined"
                    color="error"
                    icon={<CreditCardIcon />}
                  />
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id = "" } = context.query;

  const order = await dbOrders.getOrderById(id.toString());

  if (!order) {
    return {
      redirect: {
        destination: `/admin/orders`,
        permanent: false,
      },
    };
  }

  return {
    props: {
      order,
    },
  };
};

export default OrdersPage;
