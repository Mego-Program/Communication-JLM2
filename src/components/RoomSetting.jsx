import * as React from 'react';
// import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
// import DeleteIcon from '@mui/icons-material/Delete';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import FormDialog from "./NewRoom"

export default function GroupSizesColors(props) {
  const socket = props.socket

  // const [locked,setLocked] = React.useState(true)


  const [roomList,setRoomList] = React.useState([])

  React.useEffect(() => {
    setRoomList(props.roomList)

  }, [props.roomList,props.room]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        height:"100%",
      }}
    >
      <FormDialog userName={props.userName} socket={socket} roomList={roomList} sx={{ color: "gold", border: "1px gold solid" }} size={"small"} variant="outlined" startIcon={<AddOutlinedIcon />} key="one">new room</FormDialog>

     </Box>
  );
}
//      <Button onClick={handlechangeLockRoom} sx={{ /*display: props.room == "main room" ? "none" : "flex",*/ color: "gold", border: "1px gold solid" }} size={"small"} variant="outlined" startIcon={locked?<LockOutlinedIcon />:<LockOpenOutlinedIcon/>} key="two">Lock Room</Button>,
//      <Button sx={{/* display: props.room == "main room" ? "none" : "flex",*/ color: "gold", border: "1px gold solid" }} size={"small"} variant="outlined" startIcon={<DeleteIcon />} key="three"> Delete Room </Button>,  const handlechangeLockRoom = ()=>{
  //   const statusRoom = props.roomList.filter((object)=> object.roomName == props.room)[0].status
  //   setLocked(!locked)
  //   if (statusRoom=== "open"){
  //     socket.emit("lockRoom",props.room)
  //   }
  //   else{
  //     socket.emit("unLockRoom",props.room)
  //   }
  // }