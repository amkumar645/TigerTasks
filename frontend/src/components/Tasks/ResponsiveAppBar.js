import * as React from 'react';
import { AppBar } from '@mui/material';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
// import AdbIcon from '@mui/icons-material/Adb';
import { NavLink } from 'react-router-dom';
import Logo from '../../assets/TigerTasks.png';
import GoogleOut from '../Login/GoogleOut';

const ResponsiveAppBar = ({user}) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  var initials = "";
  if (user.user.name !== "") {
    const name = user.user.name.split(" ");
    initials = name[0].charAt(0) + name[1].charAt(0);
  }


  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" style={{ background: '#4caf50' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <img src={Logo} alt="TigerTasks" style={{height: '40px',               
            }}>
          </img>
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
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <MenuItem onClick={handleCloseNavMenu}>
                <NavLink exact="true" activeclassname="active" to="/" onClick={() => handleCloseNavMenu()} style={{textDecoration: 'none'}}>
                  <Typography textAlign="center" color="black" sx={{ fontFamily: 'Raleway' }}>Browse Tasks</Typography>
                </NavLink>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <NavLink exact="true" activeclassname="active" to="/mytasks" onClick={() => handleCloseNavMenu()} style={{textDecoration: 'none'}}>
                  <Typography textAlign="center" color="black" sx={{ fontFamily: 'Raleway' }}>My Tasks</Typography>
                </NavLink>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <NavLink exact="true" activeclassname="active" to="/wantedtasks" onClick={() => handleCloseNavMenu()} style={{textDecoration: 'none'}}>
                  <Typography textAlign="center" color="black" sx={{ fontFamily: 'Raleway' }}>Wanted Tasks</Typography>
                </NavLink>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <NavLink exact="true" activeclassname="active" to="/tutorial" onClick={() => handleCloseNavMenu()} style={{textDecoration: 'none'}}>
                  <Typography textAlign="center" color="black" sx={{ fontFamily: 'Raleway' }}>Tutorial</Typography>
                </NavLink>
              </MenuItem>
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <NavLink exact="true" activeclassname="active" to="/" onClick={() => handleCloseNavMenu()} style={{textDecoration: 'none'}}>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ mt: 2.3, mb: 1.7, color: 'white', display: 'block', mr: 3, ml: 5, fontFamily: 'Raleway', fontSize: '16px'}}
              >
                Browse Tasks
              </Button>
            </NavLink>
            <NavLink exact="true" activeclassname="active" to="/mytasks" onClick={() => handleCloseNavMenu()} style={{textDecoration: 'none'}}>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ mt: 2.3, color: 'white', display: 'block', mr: 3, fontFamily: 'Raleway', fontSize: '16px'}}
              >
                Created Tasks
              </Button>
            </NavLink>
            <NavLink exact="true" activeclassname="active" to="/wantedtasks" onClick={() => handleCloseNavMenu()} style={{textDecoration: 'none'}}>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ mt: 2.3, color: 'white', display: 'block', mr: 3, fontFamily: 'Raleway', fontSize: '16px'}}
              >
                Wanted Tasks
              </Button>
            </NavLink>
            <NavLink exact="true" activeclassname="active" to="/tutorial" onClick={() => handleCloseNavMenu()} style={{textDecoration: 'none'}}>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ mt: 2.3, color: 'white', display: 'block', mr: 3, fontFamily: 'Raleway', fontSize: '16px'}}
              >
                Tutorial
              </Button>
            </NavLink>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              {initials && <Avatar sx={{ bgcolor: "#357a38"}}>{initials}</Avatar>}
            </IconButton>
            <Menu
              sx={{ mt: '45px', fontFamily: 'Raleway' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleCloseUserMenu}>
                <NavLink exact="true" activeclassname="active" to="/login" style={{textDecoration: 'none'}}>
                  <GoogleOut></GoogleOut>
                </NavLink>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;