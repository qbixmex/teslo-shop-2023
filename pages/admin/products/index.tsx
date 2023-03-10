import { NextPage } from 'next';
import NextLink from 'next/link';
import useSWR from 'swr';

import { Box, Button, CardMedia, Grid, Link, Typography } from '@mui/material';
import CategoryIcon from '@mui/icons-material/CategoryOutlined';
import AddIcon from '@mui/icons-material/AddOutlined';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

import { AdminLayout } from '../../../components';
import { IProduct } from '../../../interfaces';
import { format } from '../../../utils/currency';
import styles from './Products.module.css';

const columns: GridColDef[] = [
  {
    field: 'image',
    headerName: 'Image',
    renderCell: (props) => {
      return (
        <a href={`/product/${props.row.slug}`} target="_blank" rel="noreferrer">
          <CardMedia
            component='img'
            className='fadeIn'
            image={`/products/${props.row.image}`}
            alt={props.row.title}
          />
        </a>
      );
    },
  },
  { field: 'title', headerName: 'Title', width: 300 },
  { field: 'gender', headerName: 'Gender' },
  { field: 'type', headerName: 'Type' },
  { field: 'inStock', headerName: 'Inventory', align: 'center' },
  {
    field: 'price',
    headerName: 'Price',
    renderCell: (params) => {
      return (
        <Typography className={styles.total}>
          {format(params.row.price)}
        </Typography>
      )
    }
  },
  { field: 'sizes', headerName: 'Sizes'},
  {
    field: 'edit',
    headerName: '',
    renderCell: (params) => (
      <Box sx={{ display: 'flex', gap: 1 }}>
        <NextLink href={`/admin/products/${params.row.slug}`} passHref legacyBehavior>
          <Link className={styles.edit}>Edit</Link>
        </NextLink>
      </Box>
    )
  },
];

const ProductsPage: NextPage = () => {
  const { data, error } = useSWR<IProduct[]>('/api/admin/products');

  if (!data && !error) return (<></>);  

  const rows = data!.map(product => {
    return {
      id: product._id,
      slug: product.slug,
      image: product.images[0],
      title: product.title,
      gender: product.gender,
      type: product.type,
      inStock: product.inStock,
      price: product.price,
      sizes: product.sizes.join(', '),
    };
  });

  return (
    <AdminLayout
      title={`Products (${data?.length})`}
      description="Products Maintenance"
      subtitle="Products Maintenance"
      icon={<CategoryIcon />}
    >
      <Box className={styles['box-button']}>
        <Button
          startIcon={<AddIcon />}
          color="secondary"
          href="/admin/products/new"
        >Create Product</Button>
      </Box>

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

export default ProductsPage;
