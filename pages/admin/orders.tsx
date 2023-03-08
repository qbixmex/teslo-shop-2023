import { NextPage } from 'next';
import NextLink from 'next/link';
import useSWR from 'swr';

import { Chip, Grid, Link, Typography } from '@mui/material';
import ConfirmationIcon from '@mui/icons-material/ConfirmationNumberOutlined';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

import { AdminLayout } from '../../components';
import styles from './Orders.module.css';
import { IOrder, IUser } from '../../interfaces';
import { format } from '../../utils/currency';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'Order ID', width: 250 },
  { field: 'email', headerName: 'Email', width: 300 },
  { field: 'name', headerName: 'Full Name', width: 200 },
  {
    field: 'total',
    headerName: 'Total Amount',
    renderCell: (params) => (
      <Typography className={styles.total}>
        {params.row.total}
      </Typography>
    ),
  },
  {
    field: 'isPaid',
    headerName: 'Paid',
    renderCell: (params) => {
      return params.row.isPaid
        ? (<Chip variant="outlined" label="Paid" color="success" />)
        : (<Chip variant="outlined" label="Not Paid" color="error" />)
    }
  },
  {
    field: 'productsQty',
    headerName: 'Products Quantity',
    width: 150,
    align: 'center'
  },
  {
    field: 'order',
    description: 'Show information if order was placed',
    width: 120,
    renderCell: (params) => (
      <NextLink href={`/admin/orders/${params.row.id}`} passHref legacyBehavior>
        <Link className={styles.link}>Show Order</Link>
      </NextLink>
    ),
    sortable: false,
  },
  { field: 'createdAt', headerName: 'Created At', width: 200 },
];

const OrdersPage: NextPage = () => {
  const { data, error } = useSWR<IOrder[]>('/api/admin/orders');

  if (!data && !error) return (<></>);  

  const rows = data!.map(order => {
    return {
      id: order._id,
      email: (order.user as IUser).email,
      name: (order.user as IUser).name,
      total: format(order.total),
      isPaid: order.isPaid,
      productsQty: order.numberOfItems,
      createdAt: order.createdAt,
    };
  });

  return (
    <AdminLayout
      title="Orders"
      description="Orders Maintenance"
      subtitle="Orders Maintenance"
      icon={ <ConfirmationIcon /> }
    >
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
    </AdminLayout>
  );
};

export default OrdersPage;
