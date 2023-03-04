import { useContext } from 'react';
import { Grid, Typography } from '@mui/material';
import styles from './OrderSummary.module.css';
import { CartContext } from '../../context';
import { currency } from '../../utils';
import { ISummary } from '../../interfaces';

type Props = {
  summary?: ISummary
};

export const OrderSummary = ({ summary }: Props) => {

  const { cartSummary } = useContext(CartContext);
  const summaryValues = summary ? summary : cartSummary;

  return (
    <Grid container>
      <Grid item xs={6}>
        <Typography>Quantity</Typography>
      </Grid>
      <Grid item xs={6} className={styles['row-alignment']}>
        <Typography className={styles.items}>
          { summaryValues.numberOfItems } product{ summaryValues.numberOfItems > 1 ? 's' : '' }
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>Subtotal</Typography>
      </Grid>
      <Grid item xs={6} className={styles['row-alignment']}>
        <Typography className={styles.price}>
          { currency.format(summaryValues.subtotal) }
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>Taxes ({Number(process.env.NEXT_PUBLIC_TAX_RATE )* 100}%)</Typography>
      </Grid>
      <Grid item xs={6} className={styles['row-alignment']}>
        <Typography className={styles.price}>
          { currency.format(summaryValues.tax) }
        </Typography>
      </Grid>
      <Grid item xs={6} mt={2}>
        <Typography>Total</Typography>
      </Grid>
      <Grid item xs={6} className={styles['row-alignment']} mt={2}>
        <Typography className={styles.total}>
          { currency.format(summaryValues.total) }
        </Typography>
      </Grid>
    </Grid>
  );
};