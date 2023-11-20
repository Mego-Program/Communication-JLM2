import io from 'socket.io-client';
import {useEffect, useState} from "react";
import  Button from "@mui/material/Button";
import { Container, Input, TextField } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import Box from "@mui/material/Box";
import { Send } from '@mui/icons-material';
import theme from './theme';


const socket = io.connect("http://localhost:3001")
const ariaLabel = { 'aria-label': 'description' };
let messageList = ''

export default function Chat() {
    const [room, setRomm] = useState('')
    const [message, setMessage] = useState ("");
    const [messageReceived, setMessageReceived] = useState("");
    const [roomList, setRoomList] = useState([<Button>{"Main Room"}</Button>])

    
    const joinRoom = (Event) => {
        if(room!==''){
            socket.emit("join_room", room)
            setRoomList([...roomList,<Button>{room}</Button>])
            console.log(room)
            Event.target.value =""
            
        }
        else{
            console.log("name room is empty")
        }
    };

    const sendMessage = () => {
        console.log(message)
        socket.emit("send_message",  {message,room});

    };
  
   useEffect(() => {
        socket.on("receive_message",(message) => {
        setMessageReceived(message);
    });
  },[socket]);

  return (<div>
            <Box bgcolor={theme.palette.chat.main} flexGrow= {1} height={'100vh'}>
                <Container >
                    <Grid2 container spacing={1}>
                        <Grid2 xs={2}>
                            <Box marginTop={'25px'} border= {"2px #F6C927 dotted"} borderRadius={'7px'} bgcolor= {theme.palette.chat.navBar} height= {'90vh'}>
                                <Button bgcolor={theme.palette.white.main} onClick={joinRoom}>join room</Button>
                                <TextField
                                sx={{ input: { color: '#ffffff' } }}
                                    type="text"
                                    name='room number'
                                    placeholder = "room number"
                                    onChange={(Event) => {
                                        setRomm(Event.target.value)
                                    }} 

                                    onKeyDown={(Event)=>{if(Event.key==="Enter"){joinRoom(Event)}}}
                                />
                                 <Box>
                                   {roomList}
                                </Box>
                            </Box>
                        </Grid2>

                        <Grid2 marginTop={"13px"}xs={10}>
                            <Box border= {"2px #F6C927 solid"} borderRadius={'7px'} margin={'7px'} color={theme.palette.primary.main} bgcolor={ theme.palette.chat.navBar} height= {'10vh'} >User
                            </Box>

                            <Box sx={{color: "#ffffff"}}border= {"2px #F6C927 solid"} borderRadius={'7px'} margin={'7px'} bgcolor= {theme.palette.white} height= {'60vh' }>
                                {messageReceived}                                
                            </Box>

                            <Box border= {"2px #F6C927 solid"} borderRadius={'7px'} margin={'7px'} bgcolor={ theme.palette.chat.navBar} height= {'20vh' }>
                                <Input sx={{ input: { color: '#ffffff' }, borderRadius:"7px" ,margin: '5px' , width: "98%" , border: "2px #Ffffff dotted"}} placeholder="messege" inputProps={ariaLabel} onChange={(Event) => {
                                    setMessage(Event.target.value)
                                    }}/>
                                    <Button sx={{color: '#ffffff'}} onClick={sendMessage} endIcon={<Send/>} >Send</Button>
                            
                            </Box>
                        </Grid2>
                    </Grid2>
                </Container>
            </Box>
        </div>
    );
}
    