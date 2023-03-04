import { useContext } from 'react';
import NextLink from 'next/link';
import {
  Box, Button, CardActionArea, CardMedia,
  Grid, Link, Typography,
} from '@mui/material';
import { CartContext } from '../../context';
import { ItemCounter } from "../ui";
import { ICartProduct, IOrderItem } from '../../interfaces';
import { currency } from '../../utils';

type Props = {
  editable?: boolean;
  products?: IOrderItem[],
};

export const CartList = ({editable = false, products }: Props) => {
  const {
    cart,
    updateCartQuantity,
    removeCartProduct,
  } = useContext(CartContext);

  const onNewCartQuantityValue = (product: ICartProduct, newQuantityValue: number) => {
    product.quantity = newQuantityValue;
    updateCartQuantity(product);
  };

  const productsToShow = products ? products : cart;

  return (
    <>
      {productsToShow.map((product) => (
        <Grid container key={product._id + product.size } spacing={2} my={1}>
          <Grid item xs={3}>
            <NextLink href={`/product/${product.slug}`} passHref legacyBehavior>
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
                <span className="blue">{product.size}</span>
              </Typography>
              {
                editable
                  ? (
                      <ItemCounter
                        currentValue={product.quantity}
                        maxValue={10}
                        updateQuantity={ (newValue) => onNewCartQuantityValue(product as ICartProduct, newValue) }
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
            >{ currency.format(product.price) }</Typography>
            {
              editable && (
                <Button
                  variant="outlined"
                  color="error"
                  sx={{ mt: 1 }}
                  onClick={ () => removeCartProduct(product as ICartProduct) }
                >
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
