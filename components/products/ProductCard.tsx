import { FC, useMemo, useState } from 'react';
import NextLink from 'next/link';
import { Card, CardActionArea, CardMedia, Chip, Grid, Link, Typography } from '@mui/material';
import { IProduct } from '../../interfaces';
import { Box } from '@mui/system';
import { currency } from '../../utils';

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
        <NextLink
          href={`/product/${product.slug}`}
          passHref prefetch={false}
          legacyBehavior
        >
          <Link>
            <CardActionArea>
              {
                (product.inStock === 0) && (
                  <Chip
                    color="primary"
                    label="Not Available"
                    sx={{ position: 'absolute', zIndex: 999, top: '10px', left: '10px' }}
                  />
                )
              }
              <CardMedia
                component="img"
                className={isHovered ? 'fadeIn' : ''}
                image={product.images[imageNumber]}
                alt={product.title}
                onLoad={() => setIsImageLoaded(true)}
              />
            </CardActionArea>
          </Link>
        </NextLink>
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
        >{ currency.format(product.price) }</Typography>
      </Box>
    </Grid>
  );
};
