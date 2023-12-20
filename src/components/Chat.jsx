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
const userToken = localStorage.getItem("token");

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
      <AppBar position="static" sx={{ height: "8vh", bgcolor: "#0A0A1B" }}>
        <Toolbar>
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
          display: { xs: "none", md: "flex" },
          padding: "1vh",
          flexDirection: "row",
          bgcolor: "#21213E",
          height: "80vh",
        }}
      >
        <Box
          sx={{
            height: "80vh",
            width: "15%",
            color: "gold",
            padding: "1vh",
            display: { xs: "none", md: "flex" },
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
            height: "80vh",
            width: "15%",
            color: "gold",
            padding: "1vh",
            display: { xs: "none", md: "flex" },
          }}
        >
          <Rooms socket={socket} rooms={roomList} room={handleRoom}></Rooms>
        </Box>
        <Box
          sx={{
            color: "gold",
            md: "flex",
            padding: "1vh",
            width: "100vw",
            height: "80vh",
          }}
        >
          <Box
            sx={{
              border: "2px gold solid",
              borderRadius: "7px",
            }}
          >
            <ChatBody
              bigScreen={true}
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

      {!changeScreen && (
        <Box
          sx={{
            display: { xs: "flex", md: "none" },
            // padding: "1vh",
            flexDirection: "row",
            bgcolor: "#21213E",
            height: "80vh",
          }}
        >
          <Box
            sx={{
              color: "gold",
              md: "flex",
              // padding: "1vh",
              width: "100vw",
              height: "80vh",
            }}
          >
            <Box>
              <ChatBody
                gitScreen={false}
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
      )}

      {changeScreen && (
        <Box
          sx={{
            display: { xs: "flex", md: "none" },
            flexDirection: "row",
            justifyContent: "center",
            bgcolor: "#21213E",
          }}
        >
          <Box
            borderRight={"2px #F6C927 solid"}
            sx={{
              color: "gold",
              width: "50vw",
              // padding: "1vh",
              display: { xs: "flex", md: "none" },
              justifyContent: "right",
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
              width: "50vw",
              // padding: "1vh",
              display: "flex",
            }}
          >
            <Rooms socket={socket} rooms={roomList} room={handleRoom}></Rooms>
          </Box>
        </Box>
      )}
    </Box>
  );
}
