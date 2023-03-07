import { FC } from 'react';
import { Card, CardContent, Grid, Typography } from '@mui/material';
import styles from './SummaryTile.module.css';

type Props = {
  title: string | number;
  subTitle: string;
  icon: JSX.Element;
};

export const SummaryTile: FC<Props> = ({ title, subTitle, icon }) => {
  return (
    <Grid item xs={12} sm={4} md={3}>
      <Card className={ styles.Card }>
        <CardContent className={ styles.CardContentIcon }>
          { icon }
        </CardContent>
        <CardContent className={styles.CardContentInfo}>
          <Typography variant='h3'>{ title }</Typography>
          <Typography variant='caption'>{ subTitle }</Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};
