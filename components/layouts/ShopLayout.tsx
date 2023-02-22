import { FC, ReactNode } from 'react';
import Head from 'next/head';
import styles from './ShopLayout.module.css';
import { Navbar, SideMenu } from '../ui';

type Props = {
  title: string;
  pageDescription: string;
  imageFullUrl?: string;
  robots?:
    | 'index, follow'
    | 'noindex, follow'
    | 'index, nofollow'
    | 'noindex, nofollow';
  children: ReactNode;
};

export const ShopLayout: FC<Props> = (props) => {
  const {
    title,
    pageDescription,
    imageFullUrl,
    robots = 'index, follow',
    children
  } = props;

  return (
    <>
      <Head>

        <title>{ title }</title>
        <meta name="description" content={ pageDescription } />
        <meta name="robots" content={ robots } />

        <meta name="og:title" content={ title } />
        <meta name="og:description" content={ pageDescription } />

        { imageFullUrl && <meta name="og:image" content={ imageFullUrl } /> }

      </Head>

      <nav>
        <Navbar />
      </nav>

      <SideMenu />

      <main className={ styles.main }>
        { children }
      </main>

      {/* TODO: <Footer /> */}
    </>
  );
};