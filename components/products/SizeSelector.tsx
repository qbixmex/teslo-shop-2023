import { FC } from 'react';
import { Box } from '@mui/system';
import { ISize } from '../../interfaces';
import { Button } from '@mui/material';

type Props = {
  selectedSize?: ISize;
  sizes: ISize[];
};

export const SizeSelector: FC<Props> = ({ selectedSize, sizes }) => {
  return (
    <Box>
      {sizes.map(size => (
        <Button
          key={size}
          size='small'
          color={ (selectedSize === size) ? 'primary' : 'info' }
          sx={{ mx: 1 }}
        >{size}</Button>
      ))}
    </Box>
  );
};
