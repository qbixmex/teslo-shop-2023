import NextLink from 'next/link';
import { ShopLayout } from '../../components/layouts/ShopLayout';
import { Box, Button, Card, CardContent, Divider, Grid, Link, Typography } from '@mui/material';
import { CartList, OrderSummary } from '../../components';
import styles from './summary.module.css';

const SummaryPage = () => {
  return (
    <ShopLayout
      title='Teslo Shop - Summary Order'
      pageDescription="Cart summary order resume"
      robots="noindex, nofollow"
    >
      <Typography variant='h1' component='h1'>Summary Order</Typography>

      <Grid container>
        <Grid item xs={12} sm={7} mb={2}>
          <CartList />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className='summary-card'>
            <CardContent>
              <Typography variant='h2'>Resume (3 items)</Typography>

              <Divider sx={{ my: 1 }} />

              <Box display="flex" justifyContent="space-between">
                <Typography variant='subtitle1'>Delivery Address</Typography>
                <NextLink href="/checkout/address" passHref>
                  <Link className={styles.link}>Edit</Link>
                </NextLink>
              </Box>

              <Typography>Bart Simpson</Typography>
              <Typography>742 Evergreen Terrace</Typography>
              <Typography>Springfield, 02360</Typography>
              <Typography>USA</Typography>
              <Typography>+1 1234567</Typography>

              <Divider sx={{ my: 2 }} />

              <Box display="flex" justifyContent="flex-end">
                <NextLink href="/cart" passHref>
                  <Link className={styles.link}>Edit</Link>
                </NextLink>
              </Box>

              <OrderSummary />

              <Box sx={{ mt: 3 }}>
                <Button
                  className="circular-btn"
                  color="secondary"
                  fullWidth
                >Confirm</Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default SummaryPage;
