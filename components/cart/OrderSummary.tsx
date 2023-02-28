import { useContext } from 'react';
import { Grid, Typography } from '@mui/material';
import styles from './OrderSummary.module.css';
import { CartContext } from '../../context';
import { currency } from '../../utils';

export const OrderSummary = () => {
  const { cartSummary } = useContext(CartContext);

  return (
    <Grid container>
      <Grid item xs={6}>
        <Typography>Quantity</Typography>
      </Grid>
      <Grid item xs={6} className={styles['row-alignment']}>
        <Typography className={styles.items}>
          { cartSummary.numberOfItems } item{ cartSummary.numberOfItems > 1 ? 's' : '' }
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>Subtotal</Typography>
      </Grid>
      <Grid item xs={6} className={styles['row-alignment']}>
        <Typography className={styles.price}>
          { currency.format(cartSummary.subtotal) }
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>Taxes ({Number(process.env.NEXT_PUBLIC_TAX_RATE )* 100}%)</Typography>
      </Grid>
      <Grid item xs={6} className={styles['row-alignment']}>
        <Typography className={styles.price}>
          { currency.format(cartSummary.tax) }
        </Typography>
      </Grid>
      <Grid item xs={6} mt={2}>
        <Typography>Total</Typography>
      </Grid>
      <Grid item xs={6} className={styles['row-alignment']} mt={2}>
        <Typography className={styles.total}>
          { currency.format(cartSummary.total) }
        </Typography>
      </Grid>
    </Grid>
  );
};