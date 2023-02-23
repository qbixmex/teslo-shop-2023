import { Grid, Typography } from '@mui/material';
import styles from './OrderSummary.module.css';

export const OrderSummary = () => {
  return (
    <Grid container>
      <Grid item xs={6}>
        <Typography>Quantity</Typography>
      </Grid>
      <Grid item xs={6} className={styles['row-alignment']}>
        <Typography className={styles.items}>3 items</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>Subtotal</Typography>
      </Grid>
      <Grid item xs={6} className={styles['row-alignment']}>
        <Typography className={styles.price}>$ 110.00</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>Taxes (15%)</Typography>
      </Grid>
      <Grid item xs={6} className={styles['row-alignment']}>
        <Typography className={styles.price}>$ 16.50</Typography>
      </Grid>
      <Grid item xs={6} mt={2}>
        <Typography>Total</Typography>
      </Grid>
      <Grid item xs={6} className={styles['row-alignment']} mt={2}>
        <Typography className={styles.total}>$ 126.50</Typography>
      </Grid>
    </Grid>
  );
};