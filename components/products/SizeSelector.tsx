import { FC } from 'react';
import { Box } from '@mui/system';
import { ISize } from '../../interfaces';
import { Button } from '@mui/material';

type Props = {
  selectedSize?: ISize;
  sizes: ISize[];
  onClick: (size: ISize) => void;
};

export const SizeSelector: FC<Props> = ({ selectedSize, sizes, onClick }) => {
  
  return (
    <Box>
      {sizes.map(size => (
        <Button
          key={size}
          size='small'
          sx={{ mx: 1 }}
          color={ (selectedSize === size) ? 'primary' : 'info' }
          onClick={ () => onClick(size) }
        >{size}</Button>
      ))}
    </Box>
  );
};
