import { Typography } from '@mui/material'
import type { NextPage } from 'next'
import Head from 'next/head'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Teslo Shop</title>
        <meta name="description" content="Excellent products with Teslo Shop" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Typography
          variant='h1'
          sx={{ textAlign: 'center', mt: 2 }}
        >Teslo Shop</Typography>
      </main>
    </>
  )
}

export default Home
