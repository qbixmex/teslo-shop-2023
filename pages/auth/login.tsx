import { useState, useContext } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { Box, Button, Chip, Grid, Link, TextField, Typography } from '@mui/material';
import ErrorIcon from '@mui/icons-material/ErrorOutline';
import { useForm } from 'react-hook-form';
import { AuthLayout } from '../../components';
import styles from './login_register.module.css';
import { validations } from '../../utils';
import { AuthContext } from '../../context';

type FormData = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const router = useRouter();
  const { loginUser } = useContext(AuthContext);
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [showError, setShowError] = useState(false);

  const onLoginUser = async ({ email, password }: FormData) => {
    setShowError(false);

    const isValidLogin = await loginUser(email, password);

    if (!isValidLogin) {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return;
    }
    
    // TODO: Navigate to previous user screen or home page
    router.replace('/');
  };

  return (
    <AuthLayout
      title="Teslo Shop - Login"
      pageDescription="Login with your credentials"
    >
      <form onSubmit={ handleSubmit(onLoginUser) } noValidate>
        <Box className={styles.box}>
          <Typography component="h1" className={styles.title}>Login Session</Typography>

          <Box
            sx={{
              display: showError ? 'flex' : 'none',
              justifyContent: 'center'
            }}
          >
            <Chip
              label={`User not found check "email" or "password"`}
              color="error"
              icon={ <ErrorIcon /> }
              sx={{ mb: 3 }}
            />
          </Box>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField 
                type="email"
                label="Email" 
                variant="filled"
                autoComplete='off'
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
                autoComplete='off'
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
                disabled={ showError ? true : false }
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
