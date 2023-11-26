import React from 'react'
import { useState, useEffect } from 'react';
import { Input, Button, Box, TextField, Stack } from '@mui/material'
import { Send } from '@mui/icons-material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import theme from './theme';
import { animateScroll } from 'react-scroll';

function scrollToBottom() {
  animateScroll.scrollToBottom({
    containerId: "chat-box"
  });
}

const ariaLabel = { 'aria-label': 'description' };

export default function ChatBody({socket, username, room}) {
  const [message, setMessage] = useState ("");
  const [messageReceived, setMessageReceived] = useState([])
  const [scrollFlag, setscrollFlag] = useState(false)

  const sendMessage = async () => {
    if (message!=='' && username!==''){
        // console.log(message)
        console.log(messageReceived);
        const messageData = {
            room: room,
            aouter: username,
            message: message,
            time: 
            new Date(Date.now()).getHours() + ':' +
            new Date(Date.now()).getMinutes(), 
        } 
        await socket.emit('send_message', messageData)
        setscrollFlag(true)
        setMessageReceived((list) => [...list,messageData]);
        setMessage('')
        } 
    }
  
    useEffect(() => {
      socket.on("receive_message",(message) => {
        setMessageReceived((list) => [...list,message]);
      });
      return () => socket.off("receive_message")
    },[socket]);

   useEffect( () => {
    if (scrollFlag){
      scrollToBottom()
      setscrollFlag(false)
    } })
  return (
    <div>
     
      <div className='chat-body'>
      <Grid2 >
          <Box display="flex" justifyContent="center" alignItems={"center"} className='chat-header' border= {"2px #F6C927 solid"} borderRadius={'7px'} margin={'7px'} color={theme.palette.primary.main} bgcolor={ theme.palette.chat.navBar} height= {'10vh'} >
          {`${username} You are on live chat in room: ${room}`}
            
          </Box>

          <Box id="chat-box" sx={{color: "#ffffff" ,overflow: "auto",
          overflowY: "scroll" }}border= {"2px #F6C927 solid"} borderRadius={'7px'} margin={'7px'} bgcolor= {theme.palette.white} height= {'60vh' }
          >
              {messageReceived.map((message_content) => {
                if (message_content.aouter === username) {
                return (
                  <Box display='flex' justifyContent="right" margin={"10px 10px 10px 70px"}>
                  <Stack border={"2px gray solid"} borderRadius={"10px 20px 0px 20px "}>
                  <Box display={"flex"} flexDirection={"row"} justifyContent={"space-between"} fontSize='10px' padding='3px 15px 3px 3px' sx={{bgcolor: "blue", width:"100%"}} borderBottom={"2px gray solid"} borderRadius={"8px 17px 0px 0px"}>
                      <Box padding={"0px 25px 0px 0px"}>{message_content.aouter}</Box>
                      <Box bgcolor={"white"}>{message_content.time}</Box> 
                  </Box>
                    <Box id="content" padding="2px 10px" color={"#000000"} bgcolor={"#ffffff"} borderRadius={"0px 0px 0px 18px"}>
                      {message_content.message}</Box>
                    </Stack>
                </Box>)}
                else {
                  return (
                  
                    <Box display='flex'  margin={"10px 70px 10px 10px"}>
                  <Stack border={"2px gray solid"} borderRadius={"15px 7px 15px 0px"}>
                  <Box display={"flex"} flexDirection={"row"} justifyContent={"space-between"}fontSize='10px' padding='5px' sx={{bgcolor: "purple", width:"100%", borderRadius:"13px 5px 0px 0px"}} borderBottom={"2px gray solid"}>
                      <Box padding={"0px 25px 0px 0px"}>{message_content.aouter}</Box>
                      <Box >{message_content.time}</Box> 
                  </Box>
                    <Box padding={"0px 5px 0px 10px"} display={"flex"} color={"black"} bgcolor={"#ffffff"} borderRadius={"0px 0px 13px 0px"}>
                      {message_content.message}</Box>
                    </Stack>
                    </Box>
                  
                    )}  
                  }
              )}
          </Box>

          <Box border= {"2px #F6C927 solid"} borderRadius={'7px'} margin={'7px'} bgcolor={ theme.palette.chat.navBar} height= {'20vh' }>
            
          <Input sx={{ input: { color: '#ffffff' }, borderRadius:"7px" ,margin: '5px' , width: "98%" , border: "2px #Ffffff dotted"}} placeholder="message" inputProps={ariaLabel}
                value={message}
               onChange={(Event) => {
                  setMessage(Event.target.value)
                  }}
                  onKeyDown={(Event)=>{if(Event.key==="Enter"){sendMessage(Event)}}}
                  />
                  <Button sx={{color: '#ffffff'}} onClick={sendMessage} endIcon={<Send/>} >Send</Button>
            </Box>
        </Grid2>

      </div>
    </div>
  )
}
