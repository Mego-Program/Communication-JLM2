import io from "socket.io-client";
import { useState } from "react";
import Button from "@mui/material/Button";
import { Container, Input, TextField, Box, ButtonGroup } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import theme from "./theme";
import ChatBody from "./chat-body";
import ImageAvatars from "./Avatars";
import TempDB from './TempDB'

const socket = io.connect("https://jlm-com-server-2.onrender.com/");
//const socket = io.connect("http://localhost:3001")
const ariaLabel = { "aria-label": "description" };

export default function Chat() {
  const [room, setRoom] = useState("");
  const [username, setUsername] = useState("");
  const [showChat, setshowChat] = useState(false);
  //const [showrooms, setshowrooms] = useState(false)

  const enterChat = () => {
      setshowChat(true);
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
                  {/* <TextField
                    sx={{ input: { color: "#ffffff" }, width: "20vh" }}
                    type="text"
                    name="room number"
                    placeholder="room number"
                    onChange={(Event) => {
                      setRoom(Event.target.value);
                    }}
                    onKeyDown={(Event) => {
                      if (Event.key === "Enter") {
                        joinRoom(Event);
                      }
                    }}
                  /> */}
                  <Button bgcolor={theme.palette.white.main} onClick={enterChat}>
                    join room
                  </Button>
                  {/* <Box className="room_list">{roomList}</Box> */}
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
                    <ImageAvatars socket={socket} className="users" users={TempDB.userList}/>
                </Box>                
              </Grid2>
              <Grid2>
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  flexDirection={"column"}>
                    <ImageAvatars socket={socket} className="rooms" rooms={TempDB.roomList} room={getRoom}/>
                </Box>
              </Grid2>
              <Grid2>
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  flexDirection={"column"}>
                    <ChatBody socket={socket} username={username} room={room} />
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
                    <Button
                      sx={{ width: "12vh", marginTop: "20px" }}>
                        function 1
                    </Button>
                    <Button
                      sx={{ width: "12vh", marginTop: "20px" }}>
                        function 2
                    </Button>
                    <Button
                      sx={{ width: "12vh", marginTop: "20px" }}
                      onClick={() => {
                        setshowChat(false) && setRoom("");
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
