import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";

import io from "socket.io-client";
import { useState, useEffect } from "react";
import ChatBody from "./chat-body";
import ImageAvatars from "./Avatars";
import Rooms from "./Rooms";


// const socket = io.connect("https://jlm-com-server-2.onrender.com/");
const socket = io.connect("http://localhost:3001");
const userToken = localStorage.getItem("userDetails");
console.log("token from local storage:", userToken)
console.log('z'.charCodeAt())
console.log('א'.charCodeAt())

export default function Chat() {
  const [roomList, setRoomList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [messageTo, setMessageTo] = useState("");
  const [changeScreen, setChangeScreen] = useState(false);

  const handleChangeScreen = () => {
    setChangeScreen(!changeScreen);
  };

  useEffect(() => {
    socket.on("roomList", (data) => {
      setRoomList(data);
    });
    socket.on("userList", (data) => {
      setUserList(data);
    });

    return () => {
      socket.off("roomList");
      socket.off("userList");
    };
  }, [socket]);

  const [room, setRoom] = useState("");
  const username = "nissim";

  const handleRoom = (selectRoom) => {
    setRoom(selectRoom);
  };

  const handleMessageTo = (props) => {
    if (messageTo == props.nameID) {
      setMessageTo("");
    } else {
      setMessageTo(props.nameID);
    }
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        maxWidth: "100%",
        height: "100vh",
        bgcolor: "#21213E",
      }}
    >
      <AppBar position="static" sx={{ height: "10vh", bgcolor: "#0A0A1B",padding:"1h" }}>
        <Toolbar sx={{ height: "10vh",padding:"2h"}}>
          <IconButton
            sx={{ display: { xs: "flex", md: "none" }, mr: 2, color: "gold" }}
            size="large"
            edge="start"
            aria-label="open drawer"
            onClick={handleChangeScreen}
          >
            <MenuIcon
              sx={
                !changeScreen
                  ? { transform: "rotate(0deg)" }
                  : { transform: "rotate(90deg)" }
              }
            />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block", color: "gold" } }}
          >
            Chat Live - JLM | {username}
          </Typography>

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={3} color="error">
                <NotificationsIcon sx={{ color: "gold" }} />
              </Badge>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          display: "flex",
          padding: { md: "1vh", xs: "0vh" },
          flexDirection: "row",
          bgcolor: "#21213E",
          height: "90vh",

        }}
      >
          <Box
            sx={{
              borderRight: "2px #F6C927 solid",
              height: "86vh",
              width: !changeScreen ? "15%" : { md: "15%", xs: "50vw" },
              color: "gold",
              padding: "1vh",
              margin: "1vh",
              display: !changeScreen ? { xs: "none", md: "flex" } : "flex",
            }}
          >
            <ImageAvatars
              messageTo={handleMessageTo}
              signMessageTo={messageTo}
              username={username}
              users={userList}
            />
          </Box>
          <Box
            sx={{
              height: "86vh",
              width: !changeScreen ? "17.65%" : { md: "17.65%", xs: "50vw" },
              color: "gold",
              padding: "1vh",
              margin: "1vh",
              display: !changeScreen ? { xs: "none", md: "flex" } : "flex",
            }}
          >
            <Rooms socket={socket} rooms={roomList} room={handleRoom}></Rooms>
          </Box>
        <Box
          sx={{
            color: "gold",
            padding: { md: "1vh", xs: "0vh" },
            width: "100%",
            height: "88vh",
            display: !changeScreen ? "block" : { md: "block", xs: "none" }
          }}
        >
          <Box
            sx={{
              border: { md: "0.25vh gold solid", xs: "none" },
              borderRadius: { md: "1vh", xs: "none" },
              height: "86vh",
            }}
          >
            <ChatBody
              bigScreen={!changeScreen}
              socket={socket}
              users={userList}
              messageTo={messageTo}
              userToken={userToken}
              username={username}
              room={room}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
