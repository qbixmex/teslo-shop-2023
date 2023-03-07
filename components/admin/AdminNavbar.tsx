import { useContext } from 'react';
import NextLink from 'next/link';
import { AppBar, Button, Link, Toolbar, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { UIContext } from '../../context';

export const AdminNavbar = () => {

  const { toggleSideMenu } = useContext(UIContext);

  return (
    <AppBar>
      <Toolbar>
        <NextLink href='/' passHref legacyBehavior>
          <Link display='flex' alignItems='center'>
            <Typography variant='h6' component='span'>
              Teslo |
            </Typography>
            <Typography variant='h6' component='span' ml={ 0.5 }>
              Shop
            </Typography>
          </Link>
        </NextLink>

        <Box flex={ 1 } />

        <Button onClick={ toggleSideMenu }>Menu</Button>

      </Toolbar>
    </AppBar>
  );
};