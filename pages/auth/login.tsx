import NextLink from 'next/link';
import { Box, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { AuthLayout } from '../../components';
import styles from './login_register.module.css';

type FormData = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onLoginUser = (data: FormData) => {
    console.table(data);
  };

  return (
    <AuthLayout
      title="Teslo Shop - Login"
      pageDescription="Login with your credentials"
    >
      <form onSubmit={ handleSubmit(onLoginUser) }>
        <Box className={styles.box}>
          <Typography component="h1" className={styles.title}>Login Session</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField 
                type="email"
                label="Email" 
                variant="filled" 
                fullWidth
                { ...register('email') }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                label="Password" 
                type="password" 
                variant="filled" 
                fullWidth
                { ...register('password') }
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
