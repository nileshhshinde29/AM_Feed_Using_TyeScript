import React, { useState } from "react";
import "./Navbar.scss";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Add, LockResetOutlined, Logout, ManageAccountsOutlined } from "@mui/icons-material";
import Tooltip from "@mui/material/Tooltip";
import { Avatar, Button, Grid, Menu, MenuItem, Stack } from "@mui/material";
import Amicon from "../../Images/amicon.png";
import HomeIcon from "@mui/icons-material/Home";
import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import BookmarkOutlinedIcon from "@mui/icons-material/BookmarkOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import image from "../../Images/Computer.jpg"
import Box from '@mui/material/Box';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import AddPost from "./AddPost/AddPost"
import history from "../../routes/history";
import EditProfile from '../navbar/EditProfile'
import { authenticationService } from "../../utils/auth.service";
import ChangePassword from './ChangePassword'
import { baseURL } from '../../utils/constants/urls'

export type NavbarProps = {
  /**
   * To be triggered on logout click
   */
  onLogout?: any;
  userInfo: any;
  
};

 


export const Navbar = ({ onLogout }: NavbarProps) => {
  const userInfo = JSON.parse(localStorage.getItem("currentUser")!) || "";
  const [openAddPost, setOpenAddPost] = useState(false)
  const [openModal, setModal] = useState({
    edit: false,
  changePassword:false})

  // mui Dropdown *********************************************************************************************

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  //********************************************************************************************************** */

  const [stateForIcon, setStateForIcon] = useState("")


  const [initialValues, setInitialValue] = React.useState({
    name: '',
    email: '',
    bio: '',
    gender: '',
    DOB: null,
    mobile: '',
    image:''
  })

  const selfFetching = () => {
    authenticationService.loadCurrentUser()
      .then((res: any) =>
      {
        localStorage.setItem("currentUser", JSON.stringify(res));
        setInitialValue({ ...initialValues, image: res.image, name: res.firstname + " " + res.lastname, email: res.email, DOB: res.DOB, bio: res.bio, gender: res.gender, mobile: res.mobile })
}      ).catch(e => console.log(e))

  }

  React.useEffect(() => {
    selfFetching()
    
  },[])

  return (
    <AppBar
      position="fixed"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow:'initial',

        color: "black",
        minHeight: "60px",
        // minWidth: "100%",

        backgroundColor: "#FFFFFF",
        // justifyContent: "center",
        marginBottom: "20px",
      }}
    >
      <AddPost openAddPost={openAddPost} setOpenAddPost={setOpenAddPost} />
      <Toolbar
        variant="dense"
        sx={{
          width: "70%",
          minWidth: "400px",
          display: "flex",

          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Stack flexDirection={"row"} alignItems="center">
          <img src={Amicon} alt="logo" />

          <Typography sx={{ marginLeft: "5px" }}> {" LIFE @AM"}</Typography>
        </Stack>
        
        <Stack flexDirection={"row"} alignItems="center">
          <IconButton sx={{ color: "black" }} href='/home' onClick={() => setStateForIcon("home")}>
            {stateForIcon==="home" ? <HomeIcon/> :<HomeOutlinedIcon/> }
          </IconButton>
          <IconButton sx={{ color: "black" }} onClick={() => {setStateForIcon("add") ; setOpenAddPost(!openAddPost)}}>
            {stateForIcon==="add" ? <AddAPhotoIcon/> :<AddAPhotoOutlinedIcon/>}
          </IconButton>
          <IconButton sx={{ color: "black" }} href='/savepost'  onClick={() => { setStateForIcon("bookmark"); /* history.push('/savepost')  */}}>
            
            {stateForIcon === "bookmark" ? <BookmarkOutlinedIcon /> : <BookmarkBorderOutlinedIcon />}
            
          </IconButton>

         
          <React.Fragment>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}  >
              
              <Tooltip title="Account settings">
                <Button
                  onClick={handleClick}
                  size="small"
                  sx={{ ml: 2 ,color:"black"}}
                  aria-controls={open ? 'account-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                >
                  <Avatar src={`http://${baseURL}/${initialValues.image}`} sx={{ height: "25px", width: "25px", marginRight: '10px' } } />
                  {userInfo.firstname} {userInfo.lastname}
                </Button>
                
              </Tooltip>
            </Box>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  borderRadius:"10px",
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                  mt: 1.5,
                  '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                   
                    ml: -0.5,
                    mr: 1,
                  },
                  '&:before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) translateX(-400%)   rotate(45deg)',
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top'   }}
              anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
            >
             
              <MenuItem onClick={()=> setModal({...openModal ,edit:!openModal.edit})} >
                <ListItemIcon>
                  <ManageAccountsOutlined /> 
                </ListItemIcon >
                Edit profile
              </MenuItem >
              <MenuItem onClick={() => setModal({ changePassword: !openModal.changePassword, edit: false})}>
                <ListItemIcon>
                  <LockResetOutlined />
                </ListItemIcon>
                Change password
                
              </MenuItem>
              <Divider />
              
              <MenuItem onClick={onLogout}>
                <ListItemIcon>
                  <Logout fontSize="small"  />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </React.Fragment>
          <EditProfile open={openModal.edit} initialValues={initialValues} selfFetching={selfFetching} closed={setModal} handleClose={handleClose} />
          <ChangePassword open={openModal.changePassword} setModal={setModal} />
        </Stack>
       
      </Toolbar>
    </AppBar>
  );
};
