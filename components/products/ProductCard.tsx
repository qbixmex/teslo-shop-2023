import { FC } from 'react';
import { CardActionArea, CardMedia, Grid } from '@mui/material';
import { IProduct } from '../../interfaces';

type Props = { product: IProduct }

export const ProductCard: FC<Props> = ({ product }) => {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
      <CardActionArea>
        <CardMedia
          component="img"
          image={`products/${product.images[0]}`}
          alt={product.title}
        />
      </CardActionArea>
    </Grid>
  );
};
