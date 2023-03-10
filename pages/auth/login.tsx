import { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next'
import { signIn, getSession, getProviders } from 'next-auth/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import {
  Box, Button, Chip, Divider, Grid,
  Link, TextField, Typography
} from '@mui/material';
import ErrorIcon from '@mui/icons-material/ErrorOutline';

import { AuthLayout } from '../../components';
import { validations } from '../../utils';

type FormData = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [ showError, setShowError ] = useState(false);
  const [ providers, setProviders ] = useState<any>({});

  useEffect(() => {
    getProviders().then(provider => {
      setProviders(provider);
    });
  }, []);

  const onLoginUser = async ({ email, password }: FormData) => {
    setShowError(false);
    await signIn('credentials', { email, password });
  };

  return (
    <AuthLayout
      title="Teslo Shop - Login"
      pageDescription="Login with your credentials"
    >
      <form onSubmit={ handleSubmit(onLoginUser) } noValidate>
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
          >Login Session</Typography>

          <Box
            sx={{
              display: showError ? 'flex' : 'none',
              justifyContent: 'center'
            }}
          >
            <Chip
              label={'Invalid Credentials'}
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
            <Grid item xs={12} sx={{
              display: 'flex',
              justifyContent: 'flex-end',              
            }}>
              <NextLink
                href={
                  router.query.page
                    ? `/auth/register?page=${router.query.page}`
                    : '/auth/register'
                }
                passHref
                legacyBehavior
              >
                <Link
                  sx={{
                    color: 'var(--blue)',
                    '&:hover': { textDecoration: 'underline' }
                  }}
                >Create an account</Link>
              </NextLink>
            </Grid>

            <Grid item xs={12} sx={{
              display: 'flex',
              flexDirection: 'column',
            }}>
              <Divider sx={{
                width: '100%',
                marginBottom: '1rem',
              }} />
              {
                Object.values(providers).map((provider: any) => {
                  if (provider.id !== 'credentials') {
                    return (
                      <Button
                        key={provider.id}
                        sx={{ mb: 1 }}
                        variant="outlined"
                        color="primary"
                        fullWidth
                        onClick={ () => signIn(provider.id) }
                      >
                        { provider.name }
                      </Button>
                    )
                  }
                })
              }
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

export default LoginPage;
