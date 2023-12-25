import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import { Box } from "@mui/material";
import Tooltip from '@mui/material/Tooltip';



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
    sx={{ margin: '2px', padding: '2px' }}
    overlap="circular"
    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    variant={true ? "dot" : "standart"}
  >
    <Avatar />
  </StyledBadge>;
}

export default function ImageAvatars(props) {

  return (
    <Stack

      margin={"1vh"}
      height={"70vh"}
      width={"100%"}
      padding={"1vh"}
      display={"flex"}
      flexDirection={"column"}
      alignItems={"end"}
      spacing={0.5}
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
      {props.users.filter((object) => object.userName !== props.username).map((object, index) => (
        <Box
          key={index}
          sx={{ width: "100%", borderBottom: "1px gold solid", color:object.userName === props.signMessageTo ?"tomato": "gold" }}
        >
          <Tooltip title={object.userName}>
            <StyledBadge
              username={object.userName}
              sx={{ width: "100%", justifyContent: "right", fontSize: "75%", overflow: "hidden", textAlign: "center", textJustify: "auto", alignItems: "center", height: "56px" }}
              onClick={() => props.messageTo(object)}
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant={object.status === "connect" ? "dot" : "standart"}
            >{object.firstName} {object.lastName}
              <Avatar 
                src={object.img}
                sx={{ marginLeft: "2vh", border:object.userName === props.signMessageTo ? "2px tomato solid" : "2px gold solid", bgcolor: object.userName === props.signMessageTo ? "tomato" : "block" }}>
              </Avatar>
            </StyledBadge>
          </Tooltip>
        </Box>
      ))}
    </Stack>
  );
}
