import { useState, useContext } from 'react';
import { GetServerSideProps } from 'next';
import { getSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import NextLink from 'next/link';

import {
  Box, Button, Chip, Grid,
  Link, TextField, Typography
} from '@mui/material';
import ErrorIcon from '@mui/icons-material/ErrorOutline';
import { useForm } from 'react-hook-form';

import { AuthLayout } from '../../components';
import { AuthContext } from '../../context';
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

    await signIn('credentials', { email, password });
  };

  return (
    <AuthLayout
      title="Teslo Shop - Register"
      pageDescription="Login with your credentials"
    >
      <form onSubmit={handleSubmit(onRegisterForm)} noValidate>
        <Box sx={{ width: '380px', padding: '10px 20px' }}>
          <Typography
            component="h1"
            sx={{
              fontSize: '2.4rem',
              textAlign: 'center',
              fontWeight: '300',
              color: 'var(--gray)',
              marginBottom: '1rem',
            }}
          >Register Account</Typography>

          <Box
            sx={{
              display: showError ? 'flex' : 'none',
              justifyContent: 'center'
            }}
          >
            <Chip
              label={errorMessage}
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
            <Grid item xs={12}sx={{
              display: 'flex',
              justifyContent: 'flex-end',              
            }}>
              <NextLink
                href={
                  router.query.page
                    ? `/auth/login?page=${router.query.page}`
                    : '/auth/login'
                }
                passHref
                legacyBehavior                
              >
                <Link
                  sx={{
                    color: 'var(--blue)',
                    '&:hover': { textDecoration: 'underline' }
                  }}
                >Do you already have an account ?</Link>
              </NextLink>
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
  const session = await getSession({ req });

  const { page = '/' } = query;

  if (session) {
    return {
      redirect: {
        destination: page.toString(),
        permanent: false,
      }
    };
  }

  return {
    props: {}
  };
};

export default RegisterPage;
