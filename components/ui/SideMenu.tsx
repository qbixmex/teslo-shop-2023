import { useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Box, Divider, Drawer, IconButton,
  Input, InputAdornment, List, ListItem,
  ListItemButton, ListItemIcon, ListItemText, ListSubheader
} from "@mui/material";
import AccountIcon from "@mui/icons-material/AccountCircleOutlined";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import DashboardIcon from "@mui/icons-material/DashboardOutlined";
import CategoryIcon from "@mui/icons-material/CategoryOutlined";
import ConfirmationIcon from "@mui/icons-material/ConfirmationNumberOutlined";
import EscalatorWarningIcon from "@mui/icons-material/EscalatorWarningOutlined";
import FemaleIcon from "@mui/icons-material/FemaleOutlined";
import MaleIcon from "@mui/icons-material/MaleOutlined";
import LoginIcon from "@mui/icons-material/LoginOutlined";
import SearchIcon from "@mui/icons-material/SearchOutlined";
import VpnKeyIcon from "@mui/icons-material/VpnKeyOutlined";
import { UIContext, AuthContext } from '../../context';

export const SideMenu = () => {

  const router = useRouter();
  const { isLoggedIn, user, logoutUser } = useContext(AuthContext);
  const { isMenuOpen, toggleSideMenu } = useContext(UIContext);
  const [searchTerm, setSearchTerm] = useState('');

  const onSearchTerm = () => {
    if ( searchTerm.trim().length === 0) return;
    setSearchTerm('');
    navigateTo(`/search/${searchTerm}`);
  };

  const navigateTo = (url: string) => {
    toggleSideMenu();
    router.push(url);
  };

  return (
    <Drawer
      open={ isMenuOpen }
      anchor="right"
      sx={{ backdropFilter: "blur(4px)", transition: "all .5s easy-out" }}
      onClose={ toggleSideMenu }
    >
      <Box>
        <List>
          <ListItem>
            <Input
              autoFocus
              type="text"
              placeholder="Search..."
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={onSearchTerm}>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              }
              value={searchTerm}
              onChange={({target}) => setSearchTerm(target.value)}
              onKeyPress={(e) => (e.key === 'Enter') ? onSearchTerm() : null}
            />
          </ListItem>

          {
            isLoggedIn && (
              <>
                <ListItemButton>
                  <ListItemIcon>
                    <AccountIcon />
                  </ListItemIcon>
                  <ListItemText primary="Profile" />
                </ListItemButton>

                <ListItemButton
                  onClick={ () => navigateTo('/orders/history') }
                >
                  <ListItemIcon>
                    <ConfirmationIcon />
                  </ListItemIcon>
                  <ListItemText primary="My Orders" />
                </ListItemButton>
              </>
            )
          }

          <ListItemButton
            sx={{ display: { xs: "", sm: "none" } }}
            onClick={ () => navigateTo('/category/men') }
          >
            <ListItemIcon>
              <MaleIcon />
            </ListItemIcon>
            <ListItemText primary="Men" />
          </ListItemButton>

          <ListItemButton
            sx={{ display: { xs: "", sm: "none" } }}
            onClick={ () => navigateTo('/category/women') }
          >
            <ListItemIcon>
              <FemaleIcon />
            </ListItemIcon>
            <ListItemText primary="Woman" />
          </ListItemButton>

          <ListItemButton
            sx={{ display: { xs: "", sm: "none" } }}
            onClick={ () => navigateTo('/category/kids') }
          >
            <ListItemIcon>
              <EscalatorWarningIcon />
            </ListItemIcon>
            <ListItemText primary="Kids" />
          </ListItemButton>

          {
            isLoggedIn ? (
              <ListItemButton onClick={logoutUser}>
                <ListItemIcon>
                  <LoginIcon />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItemButton>
            ) : (
              <ListItemButton
                onClick={ () => navigateTo(`/auth/login?page=${router.asPath}`) }
              >
                <ListItemIcon>
                  <VpnKeyIcon />
                </ListItemIcon>
                <ListItemText primary="Login" />
              </ListItemButton>
            )
          }

          {/* ----------------------- ADMIN ----------------------- */}
          {
            ((isLoggedIn) && (user?.role == 'admin')) && (
              <>
                <Divider />

                <ListSubheader>Admin Panel</ListSubheader>

                <ListItemButton onClick={ () => navigateTo('/admin') }>
                  <ListItemIcon>
                    <DashboardIcon />
                  </ListItemIcon>
                  <ListItemText primary="Dashboard" />
                </ListItemButton>

                <ListItemButton>
                  <ListItemIcon>
                    <CategoryIcon />
                  </ListItemIcon>
                  <ListItemText primary="Products" />
                </ListItemButton>

                <ListItemButton>
                  <ListItemIcon>
                    <ConfirmationIcon />
                  </ListItemIcon>
                  <ListItemText primary="Orders" />
                </ListItemButton>

                <ListItemButton onClick={ () => navigateTo('/admin/users') }>
                  <ListItemIcon>
                    <AdminPanelSettingsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Users" />
                </ListItemButton>
              </>
            )
          }
        </List>
      </Box>
    </Drawer>
  );
};
