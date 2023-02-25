import { FC, useMemo, useState } from 'react';
import NextLink from 'next/link';
import { Card, CardActionArea, CardMedia, Grid, Link, Typography } from '@mui/material';
import { IProduct } from '../../interfaces';
import { Box } from '@mui/system';

type Props = { product: IProduct }

export const ProductCard: FC<Props> = ({ product }) => {

  const [isHovered, setIsHovered] = useState(false);
  const imageNumber = useMemo(() => isHovered ? 1 : 0, [isHovered]);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <Grid
      item xs={12} sm={6} md={4} lg={3} xl={2}
      onMouseEnter={ () => setIsHovered(true) }
      onMouseLeave={ () => setIsHovered(false) }
    >
      <Card className='fadeIn'>
        <CardActionArea>
          <NextLink href={`/product/slug`} passHref>
            <Link>
              <CardMedia
                component="img"
                className={isHovered ? 'fadeIn' : ''}
                image={`/products/${product.images[imageNumber]}`}
                alt={product.title}
                onLoad={() => setIsImageLoaded(true)}
              />
            </Link>
          </NextLink>
        </CardActionArea>
      </Card>
      <Box className='fadeIn' sx={{
        display: isImageLoaded ? 'block' : 'none',
        mt: 1,
        px: 1,
      }}>
        <Typography fontWeight={700}>{product.title}</Typography>
        <Typography
          fontWeight={500}
          color={'green'}
        >{`$ ${product.price}.00`}</Typography>
      </Box>
    </Grid>
  );
};
