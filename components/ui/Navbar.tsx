import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import {
  AppBar, Badge, Button, IconButton,
  Input,
  InputAdornment,
  Link, Toolbar, Typography
} from '@mui/material';
import { Box } from '@mui/system';
import SearchIcon from '@mui/icons-material/SearchOutlined';
import ClearIcon from '@mui/icons-material/ClearOutlined';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCartOutlined';
import { UIContext, CartContext } from '../../context';

export const Navbar = () => {
  const { cartSummary: { numberOfItems } } = useContext(CartContext);
  const { route, push } = useRouter();
  const { toggleSideMenu } = useContext(UIContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const onSearchTerm = () => {
    if ( searchTerm.trim().length === 0) return;
    setSearchTerm('');
    push(`/search/${searchTerm}`);
  };

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

        <Box
          className="fadeIn"
          sx={{
            display: isSearchVisible
              ? 'none'
              : { xs: 'none', sm: 'block' }
          }}
        >
          <NextLink href='/category/men' passHref legacyBehavior>
            <Link>
              <Button
                color={(route === '/category/men') ? 'primary' : 'info'}
              >Men</Button>
            </Link>
          </NextLink>
          <NextLink href='/category/women' passHref legacyBehavior>
            <Link>
              <Button
                color={(route === '/category/women') ? 'primary' : 'info'}
              >Women</Button>
            </Link>
          </NextLink>
          <NextLink href='/category/kids' passHref legacyBehavior>
            <Link>
              <Button
                color={(route === '/category/kids') ? 'primary' : 'info'}
              >Kids</Button>
            </Link>
          </NextLink>
        </Box>

        <Box flex={ 1 } />

        {/* --------- Desktop --------- */}
        {
          isSearchVisible ? (
            <Input
              autoFocus
              type="text"
              placeholder="Search..."
              className="fadeIn"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={() => setIsSearchVisible(false) }>
                    <ClearIcon />
                  </IconButton>
                </InputAdornment>
              }
              value={searchTerm}
              onChange={({target}) => setSearchTerm(target.value)}
              onKeyPress={(e) => (e.key === 'Enter') ? onSearchTerm() : null}
            />
          ) : (
            <IconButton
              className="fadeIn"
              sx={{ display: { xs: 'none', sm: "block" } }}
              onClick={() => setIsSearchVisible(true) }
            >
              <SearchIcon />
            </IconButton>
          )
        }

        {/* --------- Mobile --------- */}
        <IconButton
          sx={{ display: { xs: 'block', sm: 'none' }}}
          onClick={ toggleSideMenu }
        >
          <SearchIcon />
        </IconButton>

        <NextLink href='/cart' passHref legacyBehavior>
          <Link>
            <IconButton>
              <Badge
                badgeContent={ numberOfItems > 9 ? '+9' : numberOfItems }
                color='secondary'
              >
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