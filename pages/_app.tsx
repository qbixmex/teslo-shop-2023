import { SessionProvider } from 'next-auth/react';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { lightTheme } from '../themes';
import { SWRConfig } from 'swr';
import { CartProvider, UIProvider, AuthProvider } from '../context';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

const MyApp = ({ Component, pageProps : { session, ...pageProps } }: AppProps) =>  {
  return (
    <SessionProvider session={session}>
      <PayPalScriptProvider options={{
        'client-id': process.env.NEXT_PUBLIC_PAYPAL_CLIENT ?? '',
        currency: 'USD',
        intent: 'capture',
      }}>
        <SWRConfig value={{
          fetcher: async (resource, init) => {
            const response = await fetch(resource, init);
            const data = await response.json();
            return data;
          }
        }}>
          <AuthProvider>
            <CartProvider>
              <UIProvider>
                <ThemeProvider theme={ lightTheme }>
                  <CssBaseline />
                  <Component {...pageProps} />
                </ThemeProvider>
              </UIProvider>
            </CartProvider>
          </AuthProvider>
        </SWRConfig>
      </PayPalScriptProvider>
    </SessionProvider>
  );
};

export default MyApp;
