import { useState } from 'react';
import NextLink from 'next/link';
import { Box, Button, Chip, Grid, Link, TextField, Typography } from '@mui/material';
import ErrorIcon from '@mui/icons-material/ErrorOutline';
import { useForm } from 'react-hook-form';
import { AuthLayout } from '../../components';
import styles from './login_register.module.css';
import { tesloAPI } from '../../api';
import { validations } from '../../utils';

type FormData = {
  name: string;
  email: string;
  password: string;
};

const RegisterPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [ showError, setShowError ] = useState(false);

  const onRegisterForm = async ({ name, email, password }: FormData) => {
    setShowError(false);
    try {
      const { data } = await tesloAPI.post('/users/register', { name, email, password });
      const { token, user } = data;
      console.log({ token, user });
    } catch (error) {
      console.log('Error on credentials');
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
    }
  };

  return (
    <AuthLayout
      title="Teslo Shop - Register"
      pageDescription="Login with your credentials"
    >
      <form onSubmit={handleSubmit(onRegisterForm)} noValidate>
        <Box className={styles.box}>
          <Typography component="h1" className={styles.title}>Register Account</Typography>

          <Box
            sx={{
              display: showError ? 'flex' : 'none',
              justifyContent: 'center'
            }}
          >
            <Chip
              label={`User is already taken!`}
              color="error"
              icon={ <ErrorIcon /> }
              sx={{ mb: 3 }}
            />
          </Box>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Name" 
                variant="filled" 
                fullWidth
                {
                  ...register('name', {
                    required: 'Field is required!',
                    minLength: {
                      value: 2,
                      message: 'You must type at least 2 characters long!'
                    }
                  })
                }
                error={ !!errors.name }
                helperText={ errors.name?.message }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="email"
                label="Email"
                variant="filled"
                fullWidth
                {
                  ...register('email', {
                    required: 'Field is required!',
                    validate: (email) => validations.isEmail(email),
                  })
                }
                error={ !!errors.email }
                helperText={ errors.email?.message }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                type="password"
                variant="filled"
                fullWidth
                {
                  ...register('password', {
                    required: 'Field is required!',
                    minLength: {
                      value: 8,
                      message: 'You must type at least 8 characters long!'
                    }
                  })
                }
                error={ !!errors.password }
                helperText={ errors.password?.message }
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                color="secondary"
                className="circular-btn"
                size="large"
                fullWidth
                type='submit'
                disabled={ showError ? true : false }
              >
                Register
              </Button>
            </Grid>
            <Grid item xs={12} className={styles['register-link']}>
              <NextLink href="/auth/login" passHref>
                <Link>Do you already have an account ?</Link>
              </NextLink>
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  );
};

export default RegisterPage;
