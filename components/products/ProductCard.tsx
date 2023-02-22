import { FC, useMemo, useState } from 'react';
import { Card, CardActionArea, CardMedia, Grid, Typography } from '@mui/material';
import { IProduct } from '../../interfaces';
import { Box } from '@mui/system';

type Props = { product: IProduct }

export const ProductCard: FC<Props> = ({ product }) => {

  const [isHovered, setIsHovered] = useState(false);
  const imageNumber = useMemo(() => isHovered ? 1 : 0, [isHovered]);

  return (
    <Grid
      item xs={12} sm={6} md={4} lg={3} xl={2}
      onMouseEnter={ () => setIsHovered(true) }
      onMouseLeave={ () => setIsHovered(false) }
    >
      <Card className='fadeIn'>
        <CardActionArea>
          <CardMedia
            component="img"
            className={ isHovered ? 'fadeIn' : '' }
            image={`products/${product.images[imageNumber]}` }
            alt={product.title}
          />
        </CardActionArea>
      </Card>
      <Box sx={{ mt: 1 }} className='fadeIn'>
        <Typography fontWeight={700}>{ product.title }</Typography>
        <Typography fontWeight={500}>{ '$' + product.price }</Typography>
      </Box>
    </Grid>
  );
};
