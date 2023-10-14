// import React from 'react'
// import './Admin.css'
// import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
// import { styled } from '@mui/material/styles';
// import LanguageIcon from '@mui/icons-material/Language';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import AddIcon from '@mui/icons-material/Add';
// import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
// import PermIdentityIcon from '@mui/icons-material/PermIdentity';
// import ViewListIcon from '@mui/icons-material/ViewList';
// import Stack from '@mui/material/Stack';
// import Box from '@mui/material/Box';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import Divider from '@mui/material/Divider';
// import IconButton from '@mui/material/IconButton';
// import Tooltip from '@mui/material/Tooltip';
// import PersonAdd from '@mui/icons-material/PersonAdd';
// import Settings from '@mui/icons-material/Settings';
// import Logout from '@mui/icons-material/Logout';
// import { useNavigate } from "react-router-dom";
// import Home from '../pages/home/Home';
// import Sidebar from './sidebar/Sidebar';

// const Buttons = styled(Button)({
//   boxShadow: 'none',
//   textTransform: 'none',
//   fontSize: 14,
//   color: 'orange',
//   padding: '6px 12px',
//   border: '1px solid',
//   lineHeight: 1.5,
//   // backgroundColor: '#0063cc',
//   borderColor: 'orange',
//   fontFamily: [
//     '-apple-system',
//     'BlinkMacSystemFont',
//     '"Segoe UI"',
//     'Roboto',
//     '"Helvetica Neue"',
//     'Arial',
//     'sans-serif',
//     '"Apple Color Emoji"',
//     '"Segoe UI Emoji"',
//     '"Segoe UI Symbol"',
//   ].join(','),
//   '&:hover': {
//     backgroundColor: 'orange',
//     borderColor: 'orange',
//     color: 'white',
//     boxShadow: 'none',

//   },
//   '&:active': {
//     boxShadow: 'none',
//     backgroundColor: '#0062cc',
//     borderColor: '#005cbf',
//   },
//   '&:focus': {
//     boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
//   },
// });

// export default function Admin() {

//   const [anchorEl, setAnchorEl] = React.useState(null);
//   const open = Boolean(anchorEl);
//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };
//   const handleClose = () => {
//     setAnchorEl(null);
//   };
//   const navigate = useNavigate();

//   return (
//     <div>
//     <div className='topbar'>
//       <div className='topbarwrapper'>
//         <div className='topLeft'>

//         </div>

//         <Stack direction="row" spacing={2} >

//           <Buttons className="boxStyling" variant="outlined"   >

//             Pos Invoice
//           </Buttons>

//           <Buttons className="boxStyling" variant="outlined" onClick={() =>
//             navigate('/orderlist')} >
//             Order list
//           </Buttons>
//           {/* <Buttons className="boxStyling" variant="outlined"  startIcon={<FormatListBulletedIcon />}>
//         Order list
//       </Buttons> */}
//           <Buttons className="boxStyling" variant="outlined" onClick={() =>
//             navigate('/kitchen')} >
//             Kitchen dashboard
//           </Buttons>
//           <Buttons className="boxStyling" variant="outlined" onClick={() =>
//             navigate('/counter')}>
//             Counter dashboard
//           </Buttons>
//         </Stack>

//         <div className='topRight'>
//           <div className="topbarIconContainer">
//             <NotificationsNoneIcon />
//             <span className="topIconBadge">2</span>
//           </div>
//           <div className="topbarIconContainer">
//             <LanguageIcon />
//             <span className="topIconBadge">2</span>
//           </div>

//           <React.Fragment>
//             <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
//               <Tooltip title="Account settings">
//                 <IconButton
//                   onClick={handleClick}
//                   size="small"
//                   sx={{ ml: 2 }}
//                   aria-controls={open ? 'account-menu' : undefined}
//                   aria-haspopup="true"
//                   aria-expanded={open ? 'true' : undefined}
//                 >
//                   <Avatar sx={{ width: 32, height: 32, color: 'white', backgroundColor: 'orange' }}>N</Avatar>
//                 </IconButton>
//               </Tooltip>
//             </Box>
//             <Menu
//               anchorEl={anchorEl}
//               id="account-menu"
//               open={open}
//               onClose={handleClose}
//               onClick={handleClose}
//               PaperProps={{
//                 elevation: 0,
//                 sx: {
//                   overflow: 'visible',
//                   filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
//                   mt: 1.5,
//                   '& .MuiAvatar-root': {
//                     width: 32,
//                     height: 32,
//                     ml: -0.5,
//                     mr: 1,
//                   },
//                   '&:before': {
//                     content: '""',
//                     display: 'block',
//                     position: 'absolute',
//                     top: 0,
//                     right: 14,
//                     width: 10,
//                     height: 10,
//                     bgcolor: 'background.paper',
//                     transform: 'translateY(-50%) rotate(45deg)',
//                     zIndex: 0,
//                   },
//                 },
//               }}
//               transformOrigin={{ horizontal: 'right', vertical: 'top' }}
//               anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
//             >
//               <MenuItem onClick={handleClose}>
//                 <Avatar /> Profile
//               </MenuItem>
//               <MenuItem onClick={handleClose}>
//                 <Avatar /> My account
//               </MenuItem>
//               <Divider />
//               <MenuItem onClick={handleClose}>
//                 <ListItemIcon>
//                   <PersonAdd fontSize="small" />
//                 </ListItemIcon>
//                 Add another account
//               </MenuItem>
//               <MenuItem onClick={handleClose}>
//                 <ListItemIcon>
//                   <Settings fontSize="small" />
//                 </ListItemIcon>
//                 Settings
//               </MenuItem>
//               <MenuItem onClick={handleClose}>
//                 <ListItemIcon>
//                   <Logout fontSize="small" />
//                 </ListItemIcon>
//                 Logout
//               </MenuItem>
//             </Menu>
//           </React.Fragment>
//         </div>

//       </div>

//     </div>
//     <div className='container'>

// <Sidebar />
// <Home />

// </div>

//     </div>
//   )
// }

import LanguageIcon from "@mui/icons-material/Language";
import Logout from "@mui/icons-material/Logout";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import Settings from "@mui/icons-material/Settings";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Home from "../pages/home/Home";
import { useAuth } from "../providers/auth_provider";
import { adminById } from "../services/admin_services";
import { logout } from "../services/auth_services";
import { restaurantByOwner } from "../services/restaurant_services";
import "./Admin.css";
import Sidebar from "./sidebar/Sidebar";

const Buttons = styled(Button)({
  boxShadow: "none",
  textTransform: "none",
  fontSize: 14,
  color: "orange",
  padding: "6px 12px",
  border: "1px solid",
  lineHeight: 1.5,
  borderColor: "orange",
  fontFamily: [
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    "sans-serif",
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(","),
  "&:hover": {
    backgroundColor: "orange",
    borderColor: "orange",
    color: "white",
    boxShadow: "none",
  },
  "&:active": {
    boxShadow: "none",
    backgroundColor: "#0062cc",
    borderColor: "#005cbf",
  },
  "&:focus": {
    boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
  },
});

export default function Admin() {
  const {restaurant } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate("/profile");
    handleClose();
  };

  const handleSettingsClick = () => {
    handleClose();
  };

  const handleLogoutClick = async () => {
    const { error } = await logout();
    if (error) {
      console.log(error);
    } else {
      navigate("/");
    }
    handleClose();
  };

  return (
    <div>
      <div className="topbar">
        <div className="topbarwrapper">
          <div className="topLeft"></div>

          <Stack direction="row" spacing={2}>
            <Buttons
              className="boxStyling"
              variant="outlined"
              onClick={() => navigate("/posinvoicetopbar")}
            >
              Pos Invoice
            </Buttons>
            <Buttons
              className="boxStyling"
              variant="outlined"
              onClick={() => navigate("/orderlist")}
            >
              Order list
            </Buttons>
            <Buttons
              className="boxStyling"
              variant="outlined"
              onClick={() => navigate("/kitchen")}
            >
              Kitchen dashboard
            </Buttons>
            <Buttons
              className="boxStyling"
              variant="outlined"
              onClick={() => navigate("/counter")}
            >
              Counter dashboard
            </Buttons>
          </Stack>

          <div className="topRight">
            <div className="topbarIconContainer">
              <NotificationsNoneIcon />
              <span className="topIconBadge">2</span>
            </div>
            <div className="topbarIconContainer">
              <LanguageIcon />
              <span className="topIconBadge">2</span>
            </div>
            <React.Fragment>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <Tooltip title="Account settings">
                  <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={open ? "account-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                  >
                    <Avatar
                      sx={{
                        width: 32,
                        height: 32,
                        color: "white",
                        backgroundColor: "orange",
                      }}
                    >
                      {restaurant?.name.charAt(0).toUpperCase()}
                    </Avatar>
                  </IconButton>
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
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&:before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem onClick={handleProfileClick}>
                  <Avatar onClick={() => navigate("/profile")} /> Profile
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleSettingsClick}>
                  <ListItemIcon>
                    <Settings fontSize="small" />
                  </ListItemIcon>
                  Settings
                </MenuItem>
                <MenuItem onClick={handleLogoutClick}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </React.Fragment>
          </div>
        </div>
      </div>
      <div className="container">
        <Sidebar />
        <Home />
      </div>
    </div>
  );
}
