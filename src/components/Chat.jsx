import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';


import io from "socket.io-client";
import { useState,useEffect } from "react";
import ChatBody from "./chat-body";
import ImageAvatars from "./Avatars";
import Rooms from "./Rooms"
import { Button } from 'react-scroll';

// const socket = io.connect("https://jlm-com-server-2.onrender.com/");
const socket = io.connect("http://localhost:3001")
const userToken = localStorage.getItem('token')

export default function Chat() {

  const [roomList, setRoomList] = useState([])
  const [userList, setUserList] = useState([])
  const [messageTo, setMessageTo] = useState("");

  const [changeScreen,setChangeScreen] = useState(false)

  const handleChangeScreen = ()=>{
    setChangeScreen(!changeScreen)
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
  
  return (
    <Box sx={{flexGrow: 1 }}>
      <AppBar position="static" sx={{bgcolor:'#0A0A1B'}}>
        <Toolbar>
          <IconButton
            sx={{ display: { xs: 'flex', md: 'none' }, mr: 2 ,color:"gold" }}
            size="large"
            edge="start"
            aria-label="open drawer"
        
            onClick={handleChangeScreen}>
     
            <MenuIcon/>
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
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

  
    {!changeScreen && <Box sx={{display:'flex', flexDirection:"row",bgcolor:'#21213E'}}>
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

      {changeScreen && <Box sx={{display:'flex', flexDirection:"row",bgcolor:'#21213E'}}>
           <Box sx={{color:"gold", mr: 2, display:'flex' }}>
            <ImageAvatars  messageTo={handleMessageTo} signMessageTo={messageTo} username={username} users={userList}/>
          </Box>
          <Box sx={{  color:"gold",mr: 2, display:"flex" }}> 
            <Rooms socket={socket} rooms={roomList} room={handleRoom}></Rooms>
          </Box>
      </Box>}
    </Box>
  );
}