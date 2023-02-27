import { useContext } from 'react';
import NextLink from 'next/link';
import {
  Box, Button, CardActionArea, CardMedia,
  Grid, Link, Typography,
} from '@mui/material';
import { CartContext } from '../../context';
import { ItemCounter } from "../ui";
import { ICartProduct } from '../../interfaces';

type Props = {
  editable?: boolean;
};

export const CartList = ({editable = false }: Props) => {
  const { cart } = useContext(CartContext);
  return (
    <>
      {cart.map((product) => (
        <Grid container key={product.slug} spacing={2} my={1}>
          <Grid item xs={3}>
            <NextLink href={`/product/${product.slug}`} passHref>
              <Link>
                <CardActionArea>
                  <CardMedia
                    image={`/products/${product.image}`}
                    component="img"
                    sx={{ borderRadius: "5px" }}
                  />
                </CardActionArea>
              </Link>
            </NextLink>
          </Grid>
          <Grid item xs={7}>
            <Box display="flex" flexDirection="column">
              <Typography variant="body1" fontWeight="500">
                {product.title}
              </Typography>
              <Typography variant="body1">
                Size:&nbsp;
                <span className="blue">M</span>
              </Typography>
              {
                editable
                  ? (
                      <ItemCounter
                        currentValue={product.quantity}
                        maxValue={10}
                        updateQuantity={ () => {} }
                      />
                    )
                  : (
                    <Typography variant="subtitle2">
                      {product.quantity} product{ product.quantity > 1 ? 's' : '' }
                    </Typography>
                  )
              }
            </Box>
          </Grid>
          <Grid
            item
            xs={2}
            display="flex"
            alignItems="center"
            flexDirection="column"
          >
            <Typography
              className="blue"
              fontWeight="600"
            >$ {product.price}</Typography>
            {
              editable && (
                <Button variant="outlined" color="error" sx={{ mt: 1 }}>
                  remove
                </Button>
              )
            }
          </Grid>
        </Grid>
      ))}
    </>
  );
};
