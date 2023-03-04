import { GetServerSideProps, NextPage } from 'next'
import { getSession } from 'next-auth/react';
import NextLink from 'next/link';

import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Chip, Grid, Typography, Link } from '@mui/material';
import CreditCardOffIcon from '@mui/icons-material/CreditCardOffOutlined';
import CreditScoreIcon from '@mui/icons-material/CreditScoreOutlined';

import { getOrderByUserId } from '../../database/dbOrders';
import { ShopLayout } from '../../components';
import styles from './history.module.css';
import { IOrder } from '../../interfaces';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 100 },
  {
    field: 'paid',
    headerName: 'Paid',
    description: 'Show information if order was placed',
    width: 120,
    renderCell: (params) => {
      return (
        params.row.paid
          ? <Chip color="success" label="Paid" variant="outlined" icon={<CreditScoreIcon />} />
          : <Chip color="error" label="Not Paid" variant="outlined" icon={<CreditCardOffIcon />} />
      );
    }
  },
  {
    field: 'order',
    headerName: 'Show Order',
    description: 'Show information if order was placed',
    width: 120,
    renderCell: (params) => (
      <NextLink href={`/orders/${params.row.orderId}`} passHref legacyBehavior>
        <Link className={styles.link}>Show Order</Link>
      </NextLink>
    ),
    sortable: false,
  },
  { field: 'firstName', headerName: 'First Name', width: 120 },
  { field: 'lastName', headerName: 'Last Name', width: 170 },
  { field: 'orderNumber', headerName: 'Order Number', width: 250 },
];

type Props = {
  orders: IOrder[];
};

const HistoryPage: NextPage<Props> = ({ orders }) => {

  const rows = orders.map((order, index) => {
    return {
      id: index + 1,
      orderId: order._id,
      paid: order.isPaid,
      firstName: order.shippingAddress.firstName,
      lastName: order.shippingAddress.lastName,
      orderNumber: order._id,
    };
  });

  return (
    <ShopLayout
      title="Teslo Shop - Order History"
      pageDescription="Order Costumer History"
      robots="noindex, nofollow"
    >
      <Typography
        component="h1"
        className={styles.title}
      >Order History</Typography>

      <Grid container className="fadeIn">
        <Grid item xs={12} className={styles.item}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
          />
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {

  const session: any = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: '/auth/login?page=/orders/history',
        permanent: false,
      }
    };
  }

  const orders = await getOrderByUserId(session.user.id);
  
  return {
    props: {
      orders
    }
  }
}

export default HistoryPage;