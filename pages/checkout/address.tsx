import { useContext } from 'react';
import { useRouter } from 'next/router';
import {
  Box, Button, FormControl, Grid,
  MenuItem, TextField, Typography
} from '@mui/material';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';

import { CartContext } from '../../context';
import { ShippingAddress } from '../../interfaces';
import { ShopLayout } from '../../components/layouts/ShopLayout';
import { countries } from '../../utils';

const initialData: ShippingAddress = {
  firstName: '',
  lastName: '',
  address: '',
  address2: '',
  zip: '',
  city: '',
  country: countries[4].code,
  phone: '',
};

const getAddressFromCookies = (): ShippingAddress => {
  if (Cookies.get('address')) {
    return JSON.parse(Cookies.get('address')!);
  }
  return initialData;
};

const AddressPage = () => {
  const router = useRouter();
  const { updateAddress, shippingAddress } = useContext(CartContext);
  const { register, handleSubmit, formState: { errors } } = useForm<ShippingAddress>({
    defaultValues: getAddressFromCookies(),
  });

  const onSubmitAddress = (data: ShippingAddress) => {
    updateAddress(data);
    router.push('/checkout/summary');
  };

  return (
    <ShopLayout
      title="Teslo Shop - Delivery Address"
      pageDescription="Costumer delivery address"
      robots="noindex, nofollow"
    >
      <Typography variant='h1' component="h1" mb={2}>Address</Typography>

      <form onSubmit={handleSubmit(onSubmitAddress)}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="First Name"
              variant="filled"
              fullWidth
              autoComplete='off'
              {
                ...register('firstName', {
                  required: 'Field is required!',
                  minLength: {
                    value: 3,
                    message: 'You must type at least 3 characters long!'
                  }
                })
              }
              error={ !!errors.firstName }
              helperText={ errors.firstName?.message }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Last Name"
              variant="filled"
              fullWidth
              autoComplete='off'
              {
                ...register('lastName', {
                  required: 'Field is required!',
                  minLength: {
                    value: 3,
                    message: 'You must type at least 3 characters long!'
                  }
                })
              }
              error={ !!errors.lastName }
              helperText={ errors.lastName?.message }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Address"
              variant="filled"
              fullWidth
              autoComplete='off'
              {
                ...register('address', {
                  required: 'Field is required!',
                  minLength: {
                    value: 8,
                    message: 'You must type at least 8 characters long!'
                  }
                })
              }
              error={ !!errors.address }
              helperText={ errors.address?.message }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Address 2 (optional)"
              variant="filled"
              fullWidth
              autoComplete='off'
              {
                ...register('address2', {
                  minLength: {
                    value: 8,
                    message: 'You must type at least 8 characters long!'
                  }
                })
              }
              error={ !!errors.address2 }
              helperText={ errors.address2?.message }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Postal Code"
              variant="filled"
              fullWidth
              autoComplete='off'
              {
                ...register('zip', {
                  required: 'Field is required!',
                  minLength: {
                    value: 4,
                    message: 'You must type at least 4 characters long!'
                  }
                })
              }
              error={ !!errors.zip }
              helperText={ errors.zip?.message }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="City"
              variant="filled"
              fullWidth
              autoComplete='off'
              {
                ...register('city', {
                  required: 'Field is required!',
                  minLength: {
                    value: 3,
                    message: 'You must type at least 3 characters long!'
                  }
                })
              }
              error={ !!errors.city }
              helperText={ errors.city?.message }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <TextField
                select
                variant="filled"
                label="Country"
                key={shippingAddress?.country ?? countries[4].code}
                defaultValue={ shippingAddress?.country ?? countries[4].code}
                {
                  ...register('country', {
                    required: 'Field is required!',
                  })
                }
                error={ !!errors.country }
                // helperText={ errors.city?.message }
              >
                {
                  countries.map(country => (
                    <MenuItem
                      key={country.code}
                      value={country.code}
                    >{ country.name }</MenuItem>
                  ))
                }
              </TextField>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Phone"
              variant="filled"
              fullWidth
              autoComplete='off'
              {
                ...register('phone', {
                  required: 'Field is required!',
                  minLength: {
                    value: 8,
                    message: 'You must type at least 8 characters long!'
                  }
                })
              }
              error={ !!errors.phone }
              helperText={ errors.phone?.message }
            />
          </Grid>        
        </Grid>
        <Box sx={{ mt: 5, display: 'flex', justifyContent: 'center' }}>
          <Button
            type='submit'
            color="secondary"
            className="circular-btn"
            size="large"
          >
            Review Order
          </Button>
        </Box>
      </form>
    </ShopLayout>
  );
};

export default AddressPage;
