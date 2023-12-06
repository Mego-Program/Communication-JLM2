import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { Box } from "@mui/material";
import { Button } from "react-scroll";

export default function ImageAvatars(props) {

    
    const socket = props.socket
    
    const newJoinRoom = (object) => {
        socket.emit("join_room", object.roomID);
        props.room(object.roomID)
        console.log(object.roomID)
    }
    

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
      > {props.className === "users"?
            props.users.map((object)=>
                <Avatar alt={object.userName} key={object.nameID}/>):
            
            props.rooms.map((object,index) => 
                <Button index={index} key={object.roomID} onClick={()=>newJoinRoom(object)}>
                    <Avatar alt={object.roomName}/>
                </Button>)}
        {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" /> */}

      </Stack>
  );
}
