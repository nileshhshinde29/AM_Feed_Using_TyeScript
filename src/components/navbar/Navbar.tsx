import React from "react";
import "./Navbar.scss";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Logout } from "@mui/icons-material";
import Tooltip from "@mui/material/Tooltip";
import { Button,Menu,MenuItem } from "@mui/material";

export type NavbarProps = {
  /**
   * To be triggered on logout click
   */
  onLogout?: any;
  userInfo :any,
};

export const Navbar = ({ onLogout }: NavbarProps) => {
const userInfo = JSON.parse(localStorage.getItem('currentUser') || '')



// mui Dropdown *******************************************************************************************
  
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
//********************************************************************************************************** */

  return (
    <AppBar position="static" color="secondary" sx={{minHeight:"70px", justifyContent:"center"}}>
      <Toolbar variant="dense">
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          variant="h6"
          color="inherit"
          component="div"
          style={{ flex: 1 }}
        >
          MUI Template
        </Typography>
        <div>
          <Button
            id="basic-button"
            sx={{ color:"white"}}
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            {userInfo.firstname}{" "}{userInfo.lastname}
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleClose}>Edit Profile</MenuItem>
            <MenuItem onClick={handleClose}>Edit Password</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>
        </div>

        <Tooltip title="Logout">
          <Button variant="text" style={{ color: "#fff" }} onClick={onLogout}>
            <Logout />
          </Button>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
};
