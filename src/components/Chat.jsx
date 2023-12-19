import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';


import io from "socket.io-client";
import { useState,useEffect } from "react";
import ChatBody from "./chat-body";
import ImageAvatars from "./Avatars";
import Rooms from "./Rooms"

// const socket = io.connect("https://jlm-com-server-2.onrender.com/");
const socket = io.connect("http://localhost:3001")
const userToken = localStorage.getItem('token')

export default function Chat() {

  const [roomList, setRoomList] = useState([])
  const [userList, setUserList] = useState([])
  const [messageTo, setMessageTo] = useState("");

  const [viewRoomList,setViewRoomList] = useState(false)

  const handleViewRoom = ()=>{
    setViewRoomList(true)
    setViewUserList(false)
  }
  
  const [viewUserList,setViewUserList] = useState(false)
  const handleViewUsers = ()=>{
    setViewRoomList(false)
    setViewUserList(true)
  }

  const handleViewMessages = ()=>{
    setViewRoomList(false)
    setViewUserList(false)
  }

  useEffect(() => {
    socket.on("roomList",(data)=>{setRoomList(data)});
    socket.on("userList",(data) =>{setUserList(data)});
        
    return () =>{
      socket.off('roomList');
      socket.off('userList');
    }
  },[socket]);

  const [room, setRoom] = useState("");
  const username ="nissim";

  const handleRoom = (selectRoom) =>{
    setRoom(selectRoom)
  }

  const handleMessageTo = (props)=>{
    if (messageTo == props.nameID){
      setMessageTo('')
    }
    else{
      setMessageTo(props.nameID)
    }
  }
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={()=> {handleMenuClose(),handleViewRoom()}}>ROOMS</MenuItem>
      <MenuItem onClick={()=> {handleMenuClose(),handleViewUsers()}}>USERS</MenuItem>
    </Menu>
  );
  
  return (
    <Box sx={{flexGrow: 1 }}>
      <AppBar position="static" sx={{bgcolor:'#0A0A1B'}}>
        <Toolbar>
          <IconButton
            sx={{ display: { xs: 'flex', md: 'none' }, mr: 2 ,color:"gold" }}
            size="large"
            edge="start"
            aria-label="open drawer"
            onClick={handleProfileMenuOpen}
          >
            <MenuIcon/>
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xxs: 'none', sm: 'block' } }}
          >
            Chat Live - JLM  | {username}
          </Typography>

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={3} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMenu}
  
    {!viewRoomList && !viewUserList && <Box sx={{display:'flex', flexDirection:"row",bgcolor:'#21213E'}}>
          <Box sx={{color:"gold", mr: 2, display: { xs: 'none', md: 'flex' } }}>
            <ImageAvatars messageTo={handleMessageTo} signMessageTo={messageTo} username={username} users={userList}/>
          </Box>
          <Box sx={{  color:"gold",mr: 2, display: { xs: 'none', md: 'flex' } }}> 
            <Rooms socket={socket} rooms={roomList} room={handleRoom}></Rooms>
          </Box>
          <Box sx={{ width:"80vh", color:"gold", mr: 2, md:"flex"}} >
            <ChatBody socket={socket} users={userList} messageTo={messageTo} userToken={userToken} username={username} room={room}/>
          </Box>
      </Box>}

      {viewRoomList || viewUserList && <Box onClick={handleViewMessages} sx={{display:'flex', flexDirection:"row",bgcolor:'#21213E'}}>
          {viewUserList && <Box sx={{color:"gold", mr: 2, display:'flex' }}>
            <ImageAvatars  messageTo={handleMessageTo} signMessageTo={messageTo} username={username} users={userList}/>
          </Box>}
          {viewRoomList && <Box sx={{  color:"gold",mr: 2, display:"flex" }}> 
            <Rooms socket={socket} rooms={roomList} room={handleRoom}></Rooms>
          </Box>}
      </Box>}
    </Box>
  );
}