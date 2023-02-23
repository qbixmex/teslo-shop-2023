import NextLink from "next/link";
import {
  Box,
  Button,
  CardActionArea,
  CardMedia,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import { initialData } from "../../database/products";
import { ItemCounter } from "../ui";

const productsInCart = [
  initialData.products[4],
  initialData.products[44],
  initialData.products[32],
];

export const CartList = () => {
  return (
    <>
      {productsInCart.map(({ title, images, slug, price }) => (
        <Grid container key={slug} spacing={2} my={1}>
          <Grid item xs={3}>
            <NextLink href="/product/slug" passHref>
              <Link>
                <CardActionArea>
                  <CardMedia
                    image={`products/${images[0]}`}
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
                {title}
              </Typography>
              <Typography variant="body1">
                Size:&nbsp;
                <span className="blue">M</span>
              </Typography>
              <ItemCounter />
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
              color="green"
              fontWeight="bold"
            >$ {price}.00</Typography>
            <Button variant="outlined" color="error" sx={{ mt: 1 }}>
              remove
            </Button>
          </Grid>
        </Grid>
      ))}
    </>
  );
};
