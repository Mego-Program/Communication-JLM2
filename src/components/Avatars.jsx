import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { Box, Container } from "@mui/material";
import { Button } from "react-scroll";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

export function ReAvatar(props) {
  return <StyledBadge
    sx={{margin:'2px', padding:'2px'}}
    overlap="circular"
    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    variant={true ? "dot" : "standart"}
  >
    <Avatar/>
  </StyledBadge>;
}

export default function ImageAvatars(props) {
  const socket = props.socket;

  const joinRoom = (object) => {
    socket.emit("join_room", object.roomID);
    props.room(object.roomID);
    console.log(object.roomID);
  };
  // const messageTo = (object) => {
  //   socket.emit("join_room", object.roomID);
  //   props.room(object.roomID)
  //   console.log(object.roomID)
  // }

  return (
    <Stack
      border={"2px #F6C927 solid"}
      margin={"1vh"}
      borderRadius={"7px"}
      height={"80vh"}
      width={"12vh"}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      spacing={1}
      sx={{
        color: "#ffffff",
        display: "flex",
        overflow: "auto",
        "&::-webkit-scrollbar": {
          width: "10px",
        },
        "&::-webkit-scrollbar-track": {
          boxShadow: "inset 0 0 5px silver;",
        },
        "&::-webkit-scrollbar-thumb": {
          background: "gold",
          borderRadius: "10px",
        },
        "&::-webkit-scrollbar-thumb:hover": {
          background: "#b30000",
        },
      }}
    >
      {" "}
      {props.className === "users"
        ? props.users.map((object) => (
            <StyledBadge
              key={object.nameID}
              onClick={() => messageTo(object)}
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant={object.status === "connect" ? "dot" : "standart"}
            >
              <Avatar alt={object.userName} />
            </StyledBadge>
          ))
        : props.rooms.map((object, index) => (
            <Button
              index={index}
              key={object.roomID}
              onClick={() => joinRoom(object)}
            >
              <Avatar alt={object.roomName} />
            </Button>
          ))}
      {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" /> */}
    </Stack>
  );
}
