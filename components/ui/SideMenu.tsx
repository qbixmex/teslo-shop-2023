import {
  Box, Divider, Drawer, IconButton,
  Input, InputAdornment, List, ListItem,
  ListItemButton, ListItemIcon, ListItemText, ListSubheader
} from "@mui/material";
import AccountIcon from "@mui/icons-material/AccountCircleOutlined";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import CategoryIcon from "@mui/icons-material/CategoryOutlined";
import ConfirmationIcon from "@mui/icons-material/ConfirmationNumberOutlined";
import EscalatorWarningIcon from "@mui/icons-material/EscalatorWarningOutlined";
import FemaleIcon from "@mui/icons-material/FemaleOutlined";
import MaleIcon from "@mui/icons-material/MaleOutlined";
import LoginIcon from "@mui/icons-material/LoginOutlined";
import SearchIcon from "@mui/icons-material/SearchOutlined";
import VpnKeyIcon from "@mui/icons-material/VpnKeyOutlined";

export const SideMenu = () => {
  return (
    <Drawer
      open={false}
      anchor="right"
      sx={{ backdropFilter: "blur(4px)", transition: "all .5s easy-out" }}
    >
      <Box>
        <List>
          <ListItem>
            <Input
              type="text"
              placeholder="Search..."
              endAdornment={
                <InputAdornment position="end">
                  <IconButton aria-label="toggle password visibility">
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              }
            />
          </ListItem>

          <ListItemButton>
            <ListItemIcon>
              <AccountIcon />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItemButton>

          <ListItemButton>
            <ListItemIcon>
              <ConfirmationIcon />
            </ListItemIcon>
            <ListItemText primary="My Orders" />
          </ListItemButton>

          <ListItemButton sx={{ display: { xs: "", sm: "none" } }}>
            <ListItemIcon>
              <MaleIcon />
            </ListItemIcon>
            <ListItemText primary="Men" />
          </ListItemButton>

          <ListItemButton sx={{ display: { xs: "", sm: "none" } }}>
            <ListItemIcon>
              <FemaleIcon />
            </ListItemIcon>
            <ListItemText primary="Woman" />
          </ListItemButton>

          <ListItemButton sx={{ display: { xs: "", sm: "none" } }}>
            <ListItemIcon>
              <EscalatorWarningIcon />
            </ListItemIcon>
            <ListItemText primary="Kids" />
          </ListItemButton>

          <ListItemButton>
            <ListItemIcon>
              <VpnKeyIcon />
            </ListItemIcon>
            <ListItemText primary="Login" />
          </ListItemButton>

          <ListItemButton>
            <ListItemIcon>
              <LoginIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>

          {/* Admin */}
          <Divider />
          <ListSubheader>Admin Panel</ListSubheader>

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

          <ListItemButton>
            <ListItemIcon>
              <AdminPanelSettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Users" />
          </ListItemButton>
        </List>
      </Box>
    </Drawer>
  );
};
