import { FC, ReactNode } from 'react';
import { Box } from '@mui/material';
import Head from 'next/head';
import styles from './AuthLayout.module.css';

type Props = {
  title: string;
  pageDescription: string;
  children: ReactNode;
};

export const AuthLayout: FC<Props> = ({ title, pageDescription, children }) => {
  return (
    <>
      <Head>
        <title>{ title }</title>
        <meta name="description" content={ pageDescription } />
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <main>
        <Box className={ styles.box }>{ children }</Box>
      </main>
    </>
  );
};