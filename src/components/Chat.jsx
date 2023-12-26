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
import GroupSizesColors from "./RoomSetting.jsx";

let socket;
let localStorageForMe;

if (process.env.NODE_ENV === "production") {
  socket = io.connect("https://jlm-com-server-2.onrender.com/")
  localStorageForMe = JSON.stringify(localStorage.getItem("userDetails"));
}
else {
  socket = io.connect("http://localhost:3001");
  localStorageForMe = { "_id": "6582effe8cbc3c4e7dc544bb", "firstName": "nissim", "lastName": "amsallem", "userName": "nissim amsallem", "password": "hbgfcuyguihughvghvjhb", "email": "nissimamsallem@gmail.com", "img": "https://lh3.googleusercontent.com/a/ACg8ocKATfTMFDPA-hw0egXzaE98_mVN_g1YLnDE8AzjytQETgI=s96-c", "__v": 0 }
}
console.log("token from local storage:", localStorageForMe)

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

  const [room, setRoom] = useState("main room");
  const [statusRoom, setStatusRoom] = useState("open")
  const username = localStorageForMe.userName;

  const handleRoom = (selectRoom) => {
    setRoom(selectRoom);
  };

  const handleMessageTo = (props) => {
    if (messageTo == props.userName) {
      setMessageTo("");
    } else {
      setMessageTo(props.userName);
    }
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        maxWidth: "100%",
        height: "100%",
        bgcolor: "#21213E",
      }}
    >
      <AppBar position="static" sx={{ height: "8%", bgcolor: "#0A0A1B", padding: "1h" }}>
        <Toolbar sx={{ padding: "2h" }}>
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
        }}
      >
        <Box sx={{
          display: "flex",
          flexDirection: "column",
          padding: !changeScreen ? "none" : { md: "1vh", xs: "none" },
          width: !changeScreen ? { md: "30%", xs: "none" } : { md: "30%", xs: "100%" },

        }}>
          <Box sx={{
            display: "flex",
            flexDirection: "row",
            height: "80%"
          }}>
            <Box
              sx={{
                borderRight: "2px #F6C927 solid",
                width: !changeScreen ? "50%" : { md: "50%", xs: "50vw" },
                color: "gold",
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
                color: "gold",
                padding: "1vh",
                margin: "1vh",
                display: !changeScreen ? { xs: "none", md: "flex" } : "flex",
              }}
            >
              <Rooms socket={socket} rooms={roomList} room={handleRoom}></Rooms>
            </Box>
          </Box>

          <Box sx={{ justifyContent: "center", display: !changeScreen ? { xs: "none", md: "flex" } : "flex", }}
          >
            <GroupSizesColors userName={localStorageForMe.userName} socket={socket} roomList={roomList} room={room} statusRoom={statusRoom}></GroupSizesColors>
          </Box>
        </Box>
        <Box
          sx={{
            color: "gold",
            padding: { md: "1vh", xs: "0vh" },
            width: "100%",
            height: "80%",
            display: !changeScreen ? "block" : { md: "block", xs: "none" },
          }}
        >
          <Box
            sx={{
              border: { md: "0.25vh gold solid", xs: "none" },
              borderRadius: { md: "1vh", xs: "none" },

            }}
          >
            <ChatBody
              bigScreen={!changeScreen}
              socket={socket}
              users={userList}
              messageTo={messageTo}

              username={username}
              room={room}
              statusRoom={statusRoom}
              localStorageForMe={localStorageForMe}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
