import io from "socket.io-client";
import { useState,useEffect } from "react";
import Button from "@mui/material/Button";
import { Container, Input, Box, ButtonGroup, Switch,FormControlLabel } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import theme from "./theme";
import ChatBody from "./chat-body";
import ImageAvatars from "./Avatars";
import FormDialog from "./NewRoom.jsx";


// const socket = io.connect("https://jlm-com-server-2.onrender.com/");
const socket = io.connect("http://localhost:3001")
const ariaLabel = { "aria-label": "description" };

export default function Chat() {
  const [roomList, setRoomList] = useState([])
  const [userList, setUserList] = useState([])
  const [saveData,setSaveData] = useState(false)

  useEffect(() => {
    socket.on("roomList",(data)=>{setRoomList(data)});
    socket.on("userList",(data) =>{setUserList(data)});
    
    
    return () =>{
      socket.off('roomList');
      socket.off('userList');
    }
  },[socket]);

  const [room, setRoom] = useState("");
  const [username, setUsername] = useState("");
  const [showChat, setShowChat] = useState(false);

  const enterChat = () => {
      setShowChat(true);
  };

  const getRoom = (selectRoom) =>{
    setRoom(selectRoom)
    console.log(selectRoom)
  }

  return (
    <div>
      <Box bgcolor={theme.palette.chat.main} flexGrow={1} height={"100vh"}>
        {!showChat ? (
          <Container>
            <Grid2
              height={"100vh"}
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Grid2>
                <Input
                  sx={{
                    input: { color: "#ffffff" },
                    borderRadius: "7px",
                    margin: "20px 0px 7px",
                    width: "100%",
                    border: "2px #Ffffff solid",
                    bgcolor: "#21213E",
                    padding: "0 0 0 100px ",
                  }}
                  disableUnderline={true}
                  placeholder="user name"
                  inputProps={ariaLabel}
                  onChange={(Event) => setUsername(Event.target.value)}
                />
                <Box
                  marginTop={"2px"}
                  border={"2px #F6C927 solid"}
                  borderRadius={"7px"}
                  bgcolor={theme.palette.chat.navBar}
                  height={"50vh"}
                  display={"flex"}
                  flexDirection={"column"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <Button bgcolor={theme.palette.white.main} onClick={enterChat}>
                    join room
                  </Button>
                </Box>
              </Grid2>
            </Grid2>
          </Container>
        ) : (
          <Container>
            <Grid2
              container spacing={0.0}
              height={"100vh"}
              display={"flex"}
              // flexDirection={"column"}
              justifyContent={"center"}
              alignItems={"center"}>
              <Grid2>
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  flexDirection={"column"}>
                    <ImageAvatars socket={socket} className="users" users={userList}/>
                </Box>                
              </Grid2>
              <Grid2>
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  flexDirection={"column"}>
                    <ImageAvatars socket={socket} className="rooms" rooms={roomList} room={getRoom}/>
                </Box>
              </Grid2>
              <Grid2>
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  flexDirection={"column"}>
                    <ChatBody socket={socket} users={userList} username={username} room={room} saveData={saveData}/>
                </Box>
              </Grid2>
              <Grid2
               display={"flex"}
               flexDirection={"column"}
               justifyContent={"center"}
               alignItems={"end"}
               height={"80vh"}>
                <ButtonGroup 
                        orientation="vertical"
                        aria-label="vertical outlined button group">
                    <FormControlLabel color={"gold"}  sx={{color:"gold"}} control={<Switch  onChange={()=>setSaveData(!saveData)} />} label={saveData?"Save messages":"No save messages"} />

                    <Button
                      sx={{ width: "12vh", marginTop: "20px" }}>
                        function 1
                    </Button>
                    <FormDialog modelRoom={roomList[0]} socket={socket}>Add New Room</FormDialog>

                    <Button 
                      sx={{ width: "12vh", marginTop: "20px" }}
                      onClick={() => {
                        setShowChat(false) && setRoom("");
                      }}>
                        Home page
                    </Button>
                  </ButtonGroup>
              </Grid2>
            </Grid2>
          </Container>
        )}
      </Box>
    </div>
  );
}
