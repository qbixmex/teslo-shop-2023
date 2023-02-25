import { useContext } from 'react';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import {
  AppBar, Badge, Button, IconButton,
  Link, Toolbar, Typography
} from '@mui/material';
import { Box } from '@mui/system';
import SearchIcon from '@mui/icons-material/SearchOutlined';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCartOutlined';
import { UIContext } from '../../context';

export const Navbar = () => {
  const { route } = useRouter();
  const { toggleSideMenu } = useContext(UIContext);

  return (
    <AppBar>
      <Toolbar>
        <NextLink href='/' passHref>
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

        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          <NextLink href='/category/men' passHref>
            <Link>
              <Button
                color={(route === '/category/men') ? 'primary' : 'info'}
              >Men</Button>
            </Link>
          </NextLink>
          <NextLink href='/category/women' passHref>
            <Link>
              <Button
                color={(route === '/category/women') ? 'primary' : 'info'}
              >Women</Button>
            </Link>
          </NextLink>
          <NextLink href='/category/kids' passHref>
            <Link>
              <Button
                color={(route === '/category/kids') ? 'primary' : 'info'}
              >Kids</Button>
            </Link>
          </NextLink>
        </Box>

        <Box flex={ 1 } />

        <IconButton>
          <SearchIcon />
        </IconButton>

        <NextLink href='/cart' passHref>
          <Link>
            <IconButton>
              <Badge badgeContent={ 2 } color='error'>
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Link>
        </NextLink>

        <Button onClick={ toggleSideMenu }>Menu</Button>
      </Toolbar>
    </AppBar>
  );
};