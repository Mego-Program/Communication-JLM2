import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
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
      height={"84vh"}
      width={"24vh"}
      padding={"2vh"}
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
        <StyledBadge
          key={index}
          nameid={object.nameID}
          sx={{ color: "gold" }}

          onDoubleClick={() => alert("hello")}
          onClick={() => props.messageTo(object)}
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          variant={object.status === "connect" ? "dot" : "standart"}
        >{object.userName}
          <Avatar alt={object.userName}
            sx={{ marginLeft: "2vh", border: "2px gold solid", bgcolor: object.nameID === props.signMessageTo ? "tomato" : "lightblue" }}>
          </Avatar>
        </StyledBadge>
      ))}
    </Stack>
  );
}
