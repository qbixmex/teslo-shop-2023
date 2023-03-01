import { GetServerSideProps } from 'next'
import {
  Box, Button, FormControl, Grid,
  MenuItem, Select, TextField, Typography
} from '@mui/material';
import { ShopLayout } from '../../components/layouts/ShopLayout';
import { jwt } from '../../utils';

const AddressPage = () => {
  return (
    <ShopLayout
      title="Teslo Shop - Delivery Address"
      pageDescription="Costumer delivery address"
      robots="noindex, nofollow"
    >
      <Typography variant='h1' component="h1" mb={2}>Address</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField label="Name" variant="filled" fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Last Name" variant="filled" fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Address" variant="filled" fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Address 2 (optional)" variant="filled" fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Postal Code" variant="filled" fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="City" variant="filled" fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <Select
              variant="filled"
              label="Country"
              value={3}
            >
              <MenuItem value={1}>Canada</MenuItem>
              <MenuItem value={2}>USA</MenuItem>
              <MenuItem value={3}>Mexico</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Phone" variant="filled" fullWidth />
        </Grid>        
      </Grid>
      <Box sx={{ mt: 5, display: 'flex', justifyContent: 'center' }}>
        <Button color="secondary" className="circular-btn" size="large">
          Review Order
        </Button>
      </Box>
    </ShopLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { token = '' } = context.req.cookies;
  let isValidToken = false;

  try {
    await jwt.isValidToken(token);
    isValidToken = true;
  } catch (error) {
    isValidToken = false;
  }

  if (!isValidToken) {
    return {
      redirect: {
        destination: '/auth/login?page=/checkout/address',
        permanent: false,
      }
    }
  }

  return {
    props: {}
  }
}

export default AddressPage;