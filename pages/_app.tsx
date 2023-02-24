import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { lightTheme } from '../themes';
import { SWRConfig } from 'swr';

const MyApp = ({ Component, pageProps }: AppProps) =>  {
  return (
    <SWRConfig value={{
      fetcher: async (resource, init) => {
        const response = await fetch(resource, init);
        const data = await response.json();
        return data;
      }
    }}>
      <ThemeProvider theme={ lightTheme }>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </SWRConfig>
  );
};

export default MyApp;
