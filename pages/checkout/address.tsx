import { useState } from 'react';
import { useRouter } from 'next/router';
import {
  Box, Button, Chip, FormControl, Grid,
  MenuItem, Select, TextField, Typography
} from '@mui/material';
import ErrorIcon from '@mui/icons-material/ErrorOutline';
import { useForm } from 'react-hook-form';
import { ShopLayout } from '../../components/layouts/ShopLayout';
import { countries } from '../../utils';
import Cookies from 'js-cookie';

type FormData = {
  firstName: string;
  lastName: string;
  address: string;
  address2?: string;
  zip: string;
  city: string;
  country: string;
  phone: string;
};

const AddressPage = () => {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      firstName: 'Daniel',
      lastName: 'González',
      address: 'Santander #2479',
      address2: '',
      zip: '44220',
      city: 'Guadalajara',
      country: countries[4].code,
      phone: '3314689721',
    }
  });
  const [ showError, setShowError ] = useState(false);

  const onSubmitAddress = (data: FormData) => {
    Cookies.set('address', JSON.stringify(data));
    
    // const destination = router.query.page?.toString() || '/'; 
    router.push('/checkout/summary');
  };

  return (
    <ShopLayout
      title="Teslo Shop - Delivery Address"
      pageDescription="Costumer delivery address"
      robots="noindex, nofollow"
    >
      <Typography variant='h1' component="h1" mb={2}>Address</Typography>

      <Box
        sx={{
          display: showError ? 'flex' : 'none',
          justifyContent: 'center'
        }}
      >
        <Chip
          label={`There are errors in the form`}
          color="error"
          icon={ <ErrorIcon /> }
          sx={{ mb: 3 }}
        />
      </Box>

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
                defaultValue={countries[4].code}
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
