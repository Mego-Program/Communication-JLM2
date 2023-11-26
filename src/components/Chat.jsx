import io from 'socket.io-client';
import {useEffect, useState} from "react";
import  Button from "@mui/material/Button";
import { Container, Input, TextField,Box } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import theme from './theme';
import ChatBody from './chat-body';

//const socket = io.connect("https://jlm-com-server-2.onrender.com/")
const socket = io.connect("http://localhost:3001")
const ariaLabel = { 'aria-label': 'description' };


export default function Chat() {
    const [room, setRoom] = useState('')
    const [username, setUsername] = useState('')
    const [roomList, setRoomList] = useState([<Button>{"Main Room"}</Button>])

    
    const joinRoom = (Event) => {
        if(room!==''){
            socket.emit("join_room", room)
            setRoomList([...roomList,<Button>{room}</Button>])
            console.log(room)
            Event.target.value =""        }
        else{
            console.log("name room is empty")
        }
    };


  return (<div>
            <Box bgcolor={theme.palette.chat.main} flexGrow= {1} height={'100vh'}>
                <Container >
                    <Grid2 container spacing={1}>
                        <Grid2 xs={2}>
                        <Input sx={{input: { color: '#ffffff' }, borderRadius:"7px", margin:'20px 0px 7px', width: "100%" , border: "2px #Ffffff solid",bgcolor: "#21213E"}} placeholder="user name" inputProps={ariaLabel}
                                onKeyDown={(Event)=>{if(Event.key==="Enter"){setUsername(Event.target.value)}}}
                                />
                            <Box marginTop={'2px'} border= {"2px #F6C927 dotted"} borderRadius={'7px'} bgcolor= {theme.palette.chat.navBar} height= {'85vh'}>
                                <Button bgcolor={theme.palette.white.main} onClick={joinRoom}>join room</Button>
                                <TextField
                                sx={{ input: { color: '#ffffff' } }}
                                    type="text"
                                    name='room number'
                                    placeholder = "room number"
                                    onChange={(Event) => {
                                        setRoom(Event.target.value)
                                    }} 

                                    onKeyDown={(Event)=>{if(Event.key==="Enter"){joinRoom(Event)}}}
                                />
                                 <Box>
                                   {roomList}
                                </Box>
                            </Box>
                        </Grid2>

                        <Grid2 marginTop={"11px"}xs={10}>
                        <ChatBody socket={socket} username={username} room={room}/>
                        </Grid2>
                        
                    </Grid2>
                </Container>
            </Box>
        </div>
    );
}
    