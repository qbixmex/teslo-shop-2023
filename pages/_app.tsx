import { SessionProvider } from 'next-auth/react';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { lightTheme } from '../themes';
import { SWRConfig } from 'swr';
import { CartProvider, UIProvider, AuthProvider } from '../context';

const MyApp = ({ Component, pageProps }: AppProps) =>  {
  return (
    <SessionProvider>    
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
    </SessionProvider>
  );
};

export default MyApp;
