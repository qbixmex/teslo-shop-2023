import NextLink from 'next/link';
import { Box, Link, Typography } from '@mui/material';
import { ShopLayout } from '../../components';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import styles from './empty.module.css';

const EmptyCartPage = () => {
  return (
    <ShopLayout
      title='Teslo Shop - Empty Cart'
      pageDescription="There's no products on shopping cart"
      robots="noindex, nofollow"
    >
      <Box
        className={ styles.content }
        sx={{ flexDirection: { xs: 'column', lg: 'row' } }}
      >
        <RemoveShoppingCartIcon sx={{ fontSize: { xs: 60, lg: 100 } }} />
        <Typography
          sx={{
            fontSize: { xs: 48, lg: 80 }, mx: 2,
            display: { xs: 'none', lg: 'block' },
            fontWeight: '300'
          }}
        >|</Typography>
        <Box display='flex' flexDirection='column'>
          <Typography
            fontWeight={ 500 }
            sx={{ fontSize: { xs: 24, lg: 32 } }}
          >
            Shopping Cart Empty
          </Typography>
          <NextLink href='/' passHref legacyBehavior>
            <Link
              typography='p'
              fontSize={28}
              color='secondary'
              sx={{ textAlign: { xs: 'center', lg: 'left' } }}
            >
              Back
            </Link>
          </NextLink>
        </Box>
      </Box>
    </ShopLayout>
  );
};

export default EmptyCartPage;