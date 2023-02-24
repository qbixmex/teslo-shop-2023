import { Box, Button, Grid, Link, TextField, Typography } from '@mui/material';
import NextLink from 'next/link';
import { AuthLayout } from '../../components';
import styles from './login_register.module.css';

const LoginPage = () => {
  return (
    <AuthLayout
      title="Teslo Shop - Login"
      pageDescription="Login with your credentials"
    >
      <Box className={styles.box}>
        <Typography component="h1" className={styles.title}>Login Session</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField label="Email" variant="filled" fullWidth />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Password" type="password" variant="filled" fullWidth />
          </Grid>
          <Grid item xs={12}>
            <Button
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
    </AuthLayout>
  );
};

export default LoginPage;
