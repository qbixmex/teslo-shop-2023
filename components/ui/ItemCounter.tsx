import { FC } from 'react';
import { Box } from '@mui/system';
import { IconButton, Typography } from '@mui/material';
import RemoveIcon from '@mui/icons-material/RemoveCircleOutline';
import AddIcon from '@mui/icons-material/AddCircleOutline';

type Props = {};

export const ItemCounter: FC<Props> = () => {
  return (
    <Box display='flex' alignItems='center'>
      <IconButton>
        <RemoveIcon />
      </IconButton>
      <Typography sx={{ width: 40, textAlign: 'center' }}>1</Typography>
      <IconButton>
        <AddIcon />
      </IconButton>
    </Box>
  );
};
