import { ShopLayout } from '../components';
import { Box, Typography } from '@mui/material';
import styles from './404Page.module.css';

const Custom404Page = () => {
  return (
    <ShopLayout
      title='404 Not Found'
      pageDescription='This page was not found'
      robots='noindex, nofollow'
    >
      <Box
        className={ styles.content }
        sx={{ flexDirection: { xs: 'column', md: 'row' } }}
      >
        <Typography
          variant='h1'
          component='h1'
          fontWeight={ 700 }
          sx={{ fontSize: { xs: 60, md: 100 } }}
        >404</Typography>
        <Typography
          sx={{
            fontSize: { xs: 48, md: 80 }, mx: 2,
            display: { xs: 'none', md: 'block' },
            fontWeight: '300'
          }}
        >|</Typography>
        <Typography
          fontWeight={ 500 }
          sx={{ fontSize: { xs: 24, md: 32 } }}
        >
          Page Not Found
        </Typography>
      </Box>
    </ShopLayout>
  );
};

export default Custom404Page;