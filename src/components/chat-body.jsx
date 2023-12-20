import React from "react";
import { useState, useEffect } from "react";
import { Input, Button, Box, Stack, Tooltip } from "@mui/material";
import { Send } from "@mui/icons-material";
import theme from "./theme";
import { animateScroll } from "react-scroll";

function scrollToBottom() {
  animateScroll.scrollToBottom({
    containerId: "chat-box",
  });
}

function scrollTo(goTo) {
  const element = document.getElementById("chat-box");
  return element.scrollTop;
}

export default function ChatBody(props) {
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState([]);
  const [scrollFlag, setscrollFlag] = useState(false);
  const [replyFlag, setReplyFlag] = useState(false);
  const [writeName, setWriteName] = useState({});


  const socket = props.socket;
  const username = props.username;
//  const userToken = props.userToken;
//  const username = JWT.ecoded

  const socketWasCalled = React.useRef(false);

  useEffect(() => {
      if(socketWasCalled.current) return;
      socket.emit("upLoadOldmessages", username);

      socketWasCalled.current = true;
  }, []);

  const sendMessage = async () => {
    if (message.trim(" ") && username.trim(" ") && props.room !== "" || props.messageTo !=="") {
      const messageData = {
        to: props.messageTo,
        typeMessage: props.messageTo === "" ? "public" : "privte",
        room: props.room,
        aouter: username,
        message: message,
        time: new Date().toLocaleTimeString(),
        reply: replyFlag ? writeName : null,
      };
      setReplyFlag(false);
      await socket.emit("send_message", messageData);

      setMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (message) => {
      console.log(message);
      setMessageReceived((list) => [...list, message]);
      setscrollFlag(true);
    });

    socket.on("oldMessages", (data) => {
      data.map((object) => setMessageReceived((list) => [...list, object]));
    });

    socket.on("disconnect", () => {
      console.warn("disconnected from the server!");
    });

    return () => {
      socket.off("receive_message");
      socket.off("privte_message");
      socket.off("oldMessages");
      socket.off("disconnect");
    };
  }, [socket]);

  useEffect(() => {
    if (scrollFlag) {
      scrollToBottom();
      setscrollFlag(false);
    }
  }, [scrollFlag]);

  return (
    <div>
      <Box sx={{margin:"7px",border:"2px #F6C927 solid", borderRadius:"7px", display:"flex", flexDirection:"column"}}>
        <Box
          id="chat-box"
          color={"black"}
          height={"80vh"}
          sx={{
            borderRadius:"7px 7px 0px 0px",
            bgcolor:'#32324E',
            color: "#ffffff",
            overflow: "auto",
            "&::-webkit-scrollbar": {width: "10px"},
            "&::-webkit-scrollbar-track": {boxShadow: "inset 0 0 5px silver;"},
            "&::-webkit-scrollbar-thumb": {
              background: "gold",
              borderRadius: "10px",
            },
            "&::-webkit-scrollbar-thumb:hover": {background: "#b30000"},
          }}>
          {messageReceived
            .filter((object) => props.messageTo ===""?object.room === props.room && object.typeMessage==="public":(object.typeMessage==="privte" && (object.to===props.messageTo || object.aouterID === props.messageTo)))
            .map((message_content, index) => {
              if (message_content.aouter === username) {
                message_content.loc = scrollTo;
                return (
                  <Box 
                    onClick={() => {
                      setWriteName(message_content), setReplyFlag(true);
                    }}
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
                        <Box >{message_content.time}</Box>
                      </Box>
                      {message_content.reply !== null ? (
                        <Tooltip 
                          placement="left-start"
                          title={message_content.reply.message}
                        >
                          <Box
                            fontSize="10px"
                            id="reply"
                            padding="2px 10px"
                            color={"#FFFFFF"}
                            bgcolor={"#000000"}
                            borderBottom={"1px gray solid"}
                          >
                            reply to {message_content.reply.aouter}
                          </Box>
                        </Tooltip>
                      ) : (
                        <></>
                      )}
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
                  <Box
                    key={index}
                    onClick={() => {
                      setWriteName(message_content), setReplyFlag(true);
                    }}
                    display="flex"
                    margin={"10px 70px 10px 10px"}
                  >
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
                      {message_content.reply !== null ? (
                        <Tooltip
                          placement="right-start"
                          title={message_content.reply.message}
                        >
                          <Box
                            fontSize="10px"
                            id="reply"
                            padding="2px 10px"
                            color={"#FFFFFF"}
                            bgcolor={"#000000"}
                            borderBottom={"1px gray solid"}
                          >
                            reply to {message_content.reply.aouter}
                          </Box>
                        </Tooltip>
                      ) : (
                        <></>
                      )}
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
          display={"flex"}
          flexDirection={"row"}
          sx={{borderRadius:"0px 0px 7px 7px"}}
          bgcolor={theme.palette.chat.navBar}
          height={"10vh"}
        >
          <Input
            multiline={true}
            sx={{
              overflow: "auto",
              padding: "0 5px 0 20px",
              margin: "1px",
              width: "90%",
              "&::-webkit-scrollbar": {width: "5px"
              },
            }}
            disableUnderline={true}
            placeholder="message"
            inputProps={{ style: { color: "#ffffff" } }}
            value={message}
            onChange={(Event) => {
              setMessage(Event.target.value);
            }}
            onKeyDown={(Event) => {
              if (Event.key === "Enter") {
                Event.preventDefault();
                sendMessage(Event);
              }
            }}
          />
          <Button
            sx={{ color: "#ffffff" }}
            onClick={sendMessage}
            endIcon={<Send />}
          />
        </Box>
      </Box>
    </div>
  );
}
