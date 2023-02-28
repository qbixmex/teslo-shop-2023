import NextLink from 'next/link';
import { Box, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { AuthLayout } from '../../components';
import styles from './login_register.module.css';
import { validations } from '../../utils';
import tesloAPI from '../../api/tesloAPI';

type FormData = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onLoginUser = async ({ email, password }: FormData) => {
    try {
      const { data } = await tesloAPI.post('/users/login', { email, password });
      const { token, user } = data;
      console.log({ token, user });
    } catch (error) {
      console.log('Error on credentials');
    }
  };

  return (
    <AuthLayout
      title="Teslo Shop - Login"
      pageDescription="Login with your credentials"
    >
      <form onSubmit={ handleSubmit(onLoginUser) } noValidate>
        <Box className={styles.box}>
          <Typography component="h1" className={styles.title}>Login Session</Typography>
          <Grid container spacing={2}>
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
                type="submit"
                color="secondary"
                className="circular-btn"
                size="large"
                fullWidth
              >
                Login
              </Button>
            </Grid>
            <Grid item xs={12} className={styles['register-link']}>
              <NextLink href="/auth/register" passHref>
                <Link>Create an account</Link>
              </NextLink>
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
