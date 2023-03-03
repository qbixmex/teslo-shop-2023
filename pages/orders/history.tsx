import NextLink from 'next/link';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Chip, Grid, Typography, Link } from '@mui/material';
import { ShopLayout } from '../../components';
import CreditCardOffIcon from '@mui/icons-material/CreditCardOffOutlined';
import CreditScoreIcon from '@mui/icons-material/CreditScoreOutlined';
import styles from './history.module.css';

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
      <NextLink href={`/orders/${params.row.id}`} passHref legacyBehavior>
        <Link className={styles.link}>
          Show Order
        </Link>
      </NextLink>
    ),
    sortable: false,
  },
  { field: 'fullName', headerName: 'Full Name', width: 200 },
];

const rows = [
  { id: "x6PBfb4", paid: false, fullName: 'Home Simpson' },
  { id: "x3P9fb5", paid: true, fullName: 'Charles Montgomery Burns' },
  { id: "x8P7fbX", paid: false, fullName: 'Marge Simpson' },
  { id: "b9P9fb7", paid: true, fullName: 'Chief Gorgory' },
  { id: "mP5xb45", paid: false, fullName: 'Bart Simpson' },
  { id: "iY5O3b4", paid: false, fullName: 'Barney Gumble' },
  { id: "$6Po426", paid: true, fullName: 'Lisa Simpson' },
];

const HistoryPage = () => {
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

      <Grid container>
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

export default HistoryPage;