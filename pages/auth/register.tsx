import { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { Box, Button, Chip, Grid, Link, TextField, Typography } from '@mui/material';
import ErrorIcon from '@mui/icons-material/ErrorOutline';
import { useForm } from 'react-hook-form';
import { AuthLayout } from '../../components';
import styles from './login_register.module.css';
import { AuthContext } from '../../context';
import { tesloAPI } from '../../api';
import { validations } from '../../utils';

type FormData = {
  name: string;
  email: string;
  password: string;
};

const RegisterPage = () => {
  const router = useRouter();
  const { registerUser } = useContext(AuthContext);
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [ showError, setShowError ] = useState(false);
  const [ errorMessage, setErrorMessage ] = useState('');

  const onRegisterForm = async ({ name, email, password }: FormData) => {
    setShowError(false);

    const { hasError, message } = await registerUser(name, email, password);

    if (hasError) {
      setShowError(true);
      setErrorMessage(message!);
      setTimeout(() => setShowError(false), 3000);
      return;
    }

    const destination = router.query.page?.toString() || '/'; 
    router.replace(destination);
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
                autoComplete='off'
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
              <NextLink
                href={
                  router.query.page
                    ? `/auth/login?page=${router.query.page}`
                    : '/auth/login'
                }
                passHref
              >
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
