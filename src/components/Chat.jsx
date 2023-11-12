import io from 'socket.io-client';
import {useEffect, useState} from "react";
import  Button from "@mui/material/Button";
import { Container, Input } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import Box from "@mui/material/Box";
import { Send } from '@mui/icons-material';
//import Input from '@mui/material';

const socket = io.connect("http://localhost:3001")

export default function Chat() {
    const [room, setRomm] = useState('')//  צריך לקבל את רשימת החדרים הקיימת מהשרת
    //צריך לקבל את רשימת המשתתפים בחדר
    const [message, setMessage] = useState ("");//בכל שינוי בתיבת טקסט נשמר המידע במשתנה 
    const [messageReceived, setMessageReceived] = useState("");// ברגע שנלחץ על סנד המידע יועבר למשתנה מסג'רסיבד
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
            <Box sx={{ flexGrow: 1,height:'90vh'}}>
                <Container >
                    <Grid2 container spacing={0.2}>
                        <Grid2 xs={3}>
                            <Box sx={{ bgcolor: '#DDDDDD', height: '90vh' }}>
                                <Button onClick={joinRoom}>join room</Button>
                                <input
                                    type="text"
                                    name='room number'
                                    placeholder = "room number"
                                    onChange={(Event) => {
                                        setRomm(Event.target.value)
                                    }}
                                    onKeyDown={(Event)=>{if(Event.key==="Enter"){joinRoom(Event)}}}
                                >
                                </input>
                                 <Box>
                                   {roomList}
                                </Box>
                            </Box>
                        </Grid2>

                        <Grid2 xs={9}>
                            <Box  sx={{ bgcolor: '#AAAAAA', height: '10vh' }}>User
                            </Box>

                            <Box  sx={{ bgcolor: '#BBBBBB', height: '60vh' }}>
                                {messageReceived}                                
                            </Box>

                            <Box  sx={{ bgcolor: '#CCCCCC', height: '20vh' }}>
                                <input id='message' name= 'message' onChange={(Event) => {
                                    setMessage(Event.target.value)

                                }}/>
                                <Button onClick={sendMessage} endIcon={<Send/>} >Send</Button>
                            </Box>
                        </Grid2>
                    </Grid2>
                </Container>
            </Box>
        </div>
    );
}
    