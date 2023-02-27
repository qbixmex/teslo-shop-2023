import { Box } from '@mui/system';
import { IconButton, Typography } from '@mui/material';
import RemoveIcon from '@mui/icons-material/RemoveCircleOutline';
import AddIcon from '@mui/icons-material/AddCircleOutline';

type Props = {
  currentValue: number;
  maxValue: number;
  // Methods
  updateQuantity: (value: number) => void;
};

export const ItemCounter = ({
  currentValue,
  maxValue,
  updateQuantity
}: Props) => {

  const addOrRemove = (value: number) => {
    if (value === -1) {
      if (currentValue === 1) return;
      return updateQuantity(currentValue -1);
    }

    if (currentValue >= maxValue) return;

    updateQuantity(currentValue + 1);
  };

  return (
    <Box display='flex' alignItems='center'>
      <IconButton onClick={ () => addOrRemove(-1) }>
        <RemoveIcon />
      </IconButton>
      <Typography sx={{ width: 40, textAlign: 'center' }}>
        {currentValue}
      </Typography>
      <IconButton onClick={ () => addOrRemove(+1) }>
        <AddIcon />
      </IconButton>
    </Box>
  );
};
