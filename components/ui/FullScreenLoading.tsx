import { Box, CircularProgress, Typography } from '@mui/material';
import styles from './FullScreenLoading.module.css';

export const FullScreenLoading = () => {
  return (
    <Box className={ styles.content }>
      <CircularProgress
        className={styles.progress}
        thickness={6}
        size={70}
      />
    </Box>
  );
};