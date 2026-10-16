import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import useTheme from '../../context/ThemeMode/useTheme';
//Import MUI Library
import { pink } from '@mui/material/colors';
import { Box, Menu, AppBar, Avatar, Button, Toolbar, Tooltip, MenuItem, Container, IconButton, Typography } from "../Lib/MuiComponents"
import {
  MenuIcon, LogoutIcon, Brightness4, Brightness7, SettingsIcon, CoPresentIcon, AdminPanelSettingsIcon,
  SummarizeIcon, AccountBoxIcon, PersonAddAltIcon, AccountBalanceWalletIcon, GroupAddIcon
} from "../Lib/MuiIcon"
//Component Exits
import AlertDialog from './DialogExit';
//auth user profile
import useAuth from "../../context/auth/useAuth"
//permissions
import { getRoleAccess } from "../../config/rolePermissions";

function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const access = getRoleAccess(user?.role);
  const { darkMode, toggleDarkMode } = useTheme();

  const [open, setopen] = useState(false)
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => { setAnchorElNav(event.currentTarget); };
  const handleOpenUserMenu = (event) => { setAnchorElUser(event.currentTarget); };
  const handleCloseNavMenu = () => { setAnchorElNav(null); };
  const handleCloseUserMenu = () => { setAnchorElUser(null); };

  const settings = [
    { id: 1, label: "Create User", path: "/dashboard/create", icon: <GroupAddIcon />, visible: access.createUser },
    { id: 2, label: "Mangements Users", path: '/dashboard/UsersManager', icon: <AdminPanelSettingsIcon />, visible: access.manageUsers },
    { id: 3, label: "MyAccount", path: '/dashboard/MyAccount', icon: <AccountBoxIcon />, visible: access.viewAccount },
    { id: 4, label: "MangeData", path: '/dashboard/MangeData', icon: <AccountBoxIcon />, visible: access.MangeData },
    { id: 5, label: 'Logout', /**path: '/?', */ icon: <LogoutIcon />, onClick: () => setopen(true), visible: access.logout },
  ]
  const pages = [
    { id: 1, label: "تسجيل حاله", path: "/dashboard/newpatient", icon: <PersonAddAltIcon />, visible: access.newpatient },
    { id: 2, label: "جلسات", path: "/dashboard/session", icon: <CoPresentIcon />, visible: access.session },
    { id: 3, label: "ماليات", path: "/dashboard/money", icon: <AccountBalanceWalletIcon />, visible: access.money },
    { id: 4, label: "استعلامات", path: "/dashboard/searsh", icon: <SummarizeIcon />, visible: access.searsh },
  ];
  return (
    <AppBar position="static" sx={{ background: (theme) => theme.palette.navbarBg, transition: "0.3s ease", }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AlertDialog
            open={open}
            onClose={() => setopen(false)}
            onConfirm={async () => {
              try {
                setopen(false);
                await logout();
                navigate('/');
              } catch (e) {
                console.error("Logout failed:", e);
              }
            }}

          />

          {/* Start Desktop View */}
          {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
          <Box component="img" src={'../../public/Elmanar.jpg'} alt="Logo"
            sx={{ display: { xs: 'none', md: 'flex', width: '50px', borderRadius: '50%' }, mr: 1 }} />
          <Typography variant="h6" noWrap component="a"
            sx={{
              mr: 2, display: { xs: 'none', md: 'flex' }, fontFamily: 'monospace',
              fontWeight: 700, /*letterSpacing: '.3rem',*/
              color: 'inherit', textDecoration: 'none',
            }}>Elmanar
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu id="menu-appbar" keepMounted
              sx={{ display: { xs: 'block', md: 'none' } }}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left', }}
              transformOrigin={{ vertical: 'top', horizontal: 'left', }}
              anchorEl={anchorElNav}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}>

              {pages
                .filter((item) => item.visible)
                .map((item) => (
                  <MenuItem key={item.id} onClick={handleCloseNavMenu}>
                    <Button
                      key={item.path}
                      component={Link}
                      to={item.path}
                      color="inherit"
                      sx={{ fontSize: "16px" }}
                      startIcon={item.icon}>
                      {item.label}
                    </Button>
                  </MenuItem>
                ))}

            </Menu>
          </Box>
          {/* End Desktop View */}

          {/* Start Phone View */}
          <Box component="img" src="../../public/Elmanar.jpg" alt="Logo"
            sx={{ display: { xs: 'flex', md: 'none', width: '50px', borderRadius: '50%' }, mr: 1 }} />

          <Typography variant="h5" noWrap component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2, display: { xs: 'flex', md: 'none' }, flexGrow: 1,
              fontFamily: 'monospace', fontWeight: 700,
              /*letterSpacing: '.3rem',*/ color: 'inherit', textDecoration: 'none',
            }}>
            Elmanar
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>

            {pages
              .filter((item) => item.visible)
              .map((item) => (
                <MenuItem key={item.path} onClick={handleCloseNavMenu}>
                  <Button
                    key={item.path}
                    component={Link}
                    to={item.path}
                    color="inherit"
                    sx={{ fontSize: "16px" }}
                    startIcon={item.icon}
                  >
                    {item.label}
                  </Button>
                </MenuItem>
              ))}
          </Box>
          {/* End Phone View */}

          {/* Start Setting View */}
          <Box sx={{ flexGrow: 0 }}>

            <Tooltip title="Open settings">

              <IconButton component="div" sx={{ p: 0, gap: 2, mr: 2 }}>
                <Avatar>
                  <IconButton onClick={toggleDarkMode}>
                    {darkMode ? <Brightness7 /> : <Brightness4 />}
                  </IconButton>
                  {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" /> */}
                </Avatar>
              </IconButton>

              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, gap: 2 }}>
                <Avatar sx={{ bgcolor: pink[500] }}>
                  <SettingsIcon />
                </Avatar>
              </IconButton>
            </Tooltip>

            <Menu sx={{ mt: '45px' }} id="menu-appbar" keepMounted
              anchorEl={anchorElUser}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
              anchorOrigin={{ vertical: 'top', horizontal: 'right', }}
              transformOrigin={{ vertical: 'top', horizontal: 'right', }}>

              {settings
                .filter((item) => item.visible)
                .map((setting) => (
                  <MenuItem key={setting.id} onClick={() => {
                    handleCloseUserMenu()
                    setting.onClick?.()
                  }}>

                    <Button
                      key={setting.path}
                      component={Link}
                      to={setting.path}
                      color="inherit"
                      sx={{ fontSize: "16px" }}
                      startIcon={setting.icon}
                      onClick={setting?.func}
                    >
                      {setting.label}
                    </Button>
                  </MenuItem>
                ))}
            </Menu>
          </Box>
          {/* End Setting View */}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
