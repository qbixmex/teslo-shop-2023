import { FC, ReactNode } from 'react';
import Head from 'next/head';

import { Box, Typography } from '@mui/material';

import { SideMenu } from '../ui';
import styles from './AdminLayout.module.css';
import { AdminNavbar } from '../admin';

type Props = {
  title: string;
  description: string;
  subtitle: string;
  icon?: JSX.Element;
  children: ReactNode;
};

export const AdminLayout: FC<Props> = (props) => {

  const { title, description, subtitle, icon, children } = props;

  return (
    <>
      <Head>
        <title>{ title }</title>
        <meta name="description" content={ description } />
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <nav>
        <AdminNavbar />
      </nav>

      <SideMenu />

      <main className={styles.main}>
        <Box className={styles.box}>
          <Typography variant="h1" component="h1">
            { icon }
            { title }
          </Typography>
          <Typography variant="h2">{ subtitle }</Typography>
        </Box>
        <Box className="fadeIn">
          {children}
        </Box>
      </main>
    </>
  );
};