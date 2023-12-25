import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

export default function FormDialog(props) {
    const socket = props.socket;
    // const [roomList,setRoomList] = React.useState([])

    // React.useEffect(() => {
    //   setRoomList(props.roomList)

    // }, [props.roomList]);


    // const modelRoom = Object.keys(roomList[0]);
    const [open, setOpen] = React.useState(false);
    const [roomData, setRoomData] = React.useState({})

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleFillRoom = (event) => {
        const label = event.target.name;
        const value = event.target.value;
        setRoomData((prevRoomData) => ({ ...prevRoomData, [label]: value }));

    }

    const handleNewRoom = () => {

        const sendData = {}
        sendData.roomName = roomData.roomName,
        sendData.owner = props.userName,
        sendData.team = "all",
        sendData.status = "open"
        console.log("get to server", sendData);
        socket.emit("createRoom", (sendData), (response) => {
            alert(response.status)
            setRoomData({})
        });
    };

    return (
        <React.Fragment>
            <Button
                sx={{ color: "gold", border: "1px gold solid" }} size={"small"} variant="outlined" startIcon={<AddOutlinedIcon />} key="one"
                onClick={handleClickOpen}>
                New Room
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Welcome</DialogTitle>
                <DialogContent>



                    <TextField
                        index={2}
                        key={2}
                        autoFocus
                        margin="dense"
                        className="openRoom"
                        id="roomName"
                        label="enter room name..."
                        name="roomName"
                        variant="standard"
                        onChange={handleFillRoom}
                    />

                </DialogContent>
                <DialogActions>
                    <Button sx={{ bgcolor: "#31213E" }} onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button
                        sx={{ bgcolor: "#31213E" }}
                        onClick={() => {
                            handleClose(), handleNewRoom();
                        }}
                        type="submit"
                    >
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
