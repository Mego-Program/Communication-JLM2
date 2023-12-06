import React from "react";
import { useState, useEffect } from "react";
import { Input, Button, Box, TextField, Stack } from "@mui/material";
import { Send } from "@mui/icons-material";
import theme from "./theme";
import { animateScroll } from "react-scroll";

function scrollToBottom() {
  animateScroll.scrollToBottom({
    containerId: "chat-box",
  });
}

const ariaLabel = { "aria-label": "description" };

export default function ChatBody(props) {
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState([]);
  const [scrollFlag, setscrollFlag] = useState(false);

  const socket = props.socket
  const username = props.username


  const sendMessage = async () => {
    console.log(props.room)
    if (message.trim(" ") && username.trim(" ") && props.room !== '') {
      console.log(messageReceived[messageReceived.length-1]);
      const messageData = {
        room: props.room,
        aouter: username,
        message: message,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit("send_message", messageData);
      setscrollFlag(true);
      setMessageReceived((list) => [...list, messageData]);
      setMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (message) => {
      setMessageReceived((list) => [...list, message]);
    });

    socket.on("privte_message", (message) => {
      setMessageReceived((list) => [...list, message]);
    });

    return () => {
      socket.off("receive_message");
      socket.off("privte_message");
    };
  }, [socket]);

  useEffect(() => {
    if (scrollFlag) {
      scrollToBottom();
      setscrollFlag(false);
    }
  },[scrollFlag]);

  return (
    <div>
      <Box width="60vh" display={"flex"} flexDirection={"column"}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems={"center"}
          className="chat-header"
          border={"2px #F6C927 solid"}
          borderRadius={"7px"}
          margin={"7px"}
          color={theme.palette.primary.main}
          bgcolor={theme.palette.chat.navBar}
          height={"10vh"}
        >
          {`${username} You are on live chat in room: ${props.room}`}
        </Box>

        <Box
          id="chat-box"
          sx={{ color: "#ffffff", overflow: "auto",  "&::-webkit-scrollbar":{
            width:"10px"
          },"&::-webkit-scrollbar-track":{
            boxShadow: 'inset 0 0 5px silver;'
          },'&::-webkit-scrollbar-thumb':{
            background: "gold",
            borderRadius: "10px"  },
            "&::-webkit-scrollbar-thumb:hover": {
              background: "#b30000" 
            }
          }}
          border={"2px #F6C927 solid"}
          borderRadius={"7px"}
          margin={"7px"}
          bgcolor={theme.palette.white}
          height={"55vh"}
        >
          {messageReceived.filter((object)=>object.room === props.room).map((message_content,index) => {
            if (message_content.aouter === username) {
              return (
                <Box
                  key={index}
                  display="flex"
                  justifyContent="right"
                  margin={"10px 10px 10px 70px"}
                >
                  <Stack
                    border={"2px gray solid"}
                    borderRadius={"10px 20px 0px 20px "}
                  >
                    <Box
                      display={"flex"}
                      flexDirection={"row"}
                      justifyContent={"space-between"}
                      fontSize="10px"
                      padding="3px 15px 3px 3px"
                      sx={{ bgcolor: "blue", width: "100%" }}
                      borderBottom={"2px gray solid"}
                      borderRadius={"8px 17px 0px 0px"}
                    >
                      <Box padding={"0px 25px 0px 0px"}>{"Me"}</Box>
                      <Box bgcolor={"white"}>{message_content.time}</Box>
                    </Box>
                    <Box
                      id="content"
                      padding="2px 10px"
                      color={"#000000"}
                      bgcolor={"#ffffff"}
                      borderRadius={"0px 0px 0px 18px"}
                    >
                      {message_content.message}
                    </Box>
                  </Stack>
                </Box>
              );
            } else {
              return (
                <Box display="flex" margin={"10px 70px 10px 10px"}>
                  <Stack
                    border={"2px gray solid"}
                    borderRadius={"15px 7px 15px 0px"}
                  >
                    <Box
                      display={"flex"}
                      flexDirection={"row"}
                      justifyContent={"space-between"}
                      fontSize="10px"
                      padding="5px"
                      sx={{
                        bgcolor: "purple",
                        width: "100%",
                        borderRadius: "13px 5px 0px 0px",
                      }}
                      borderBottom={"2px gray solid"}
                    >
                      <Box padding={"0px 25px 0px 0px"}>
                        {message_content.aouter}
                      </Box>
                      <Box>{message_content.time}</Box>
                    </Box>
                    <Box
                      padding={"0px 5px 0px 10px"}
                      display={"flex"}
                      color={"black"}
                      bgcolor={"#ffffff"}
                      borderRadius={"0px 0px 13px 0px"}
                    >
                      {message_content.message}
                    </Box>
                  </Stack>
                </Box>
              );
            }
          })}
        </Box>

        <Box
          display={'flex'}
          flexDirection={'row'}
          border={"2px #F6C927 solid"}
          borderRadius={"7px"}
          margin={"7px"}
          bgcolor={theme.palette.chat.navBar}
          height={"10vh"}
        >
          <Input
            multiline={true}
            sx={{
              overflow:'auto',
              borderRadius: "7px",
              padding:'0 5px 0 20px',
              margin:'1px',
              width: "80%",
              "&::-webkit-scrollbar":{
              width:"5px"}
            }}
            disableUnderline={true}
            placeholder="message"
            inputProps={{ style:{ color: "#ffffff" }}}
            value={message}
            onChange={(Event) => {
              setMessage(Event.target.value);
            }}
            onKeyDown={(Event) => {
              if (Event.key === "Enter") {
                Event.preventDefault()
                sendMessage(Event);
              }
            }}
          />
          <Button
            sx={{ color: "#ffffff"}}
            onClick={sendMessage}
            endIcon={<Send />}
          />
          </Box>
      </Box>
    </div>
  );
}
