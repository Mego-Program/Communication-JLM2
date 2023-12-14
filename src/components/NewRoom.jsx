import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function FormDialog(props) {
    const socket = props.socket;
    const modelRoom = Object.keys(props.modelRoom);
    const [open, setOpen] = React.useState(false);
    const [roomData,setRoomData] = React.useState({})

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleFillRoom = (event) =>{
        const label = event.target.name;
        const value = event.target.value;
        setRoomData((prevRoomData) => ({ ...prevRoomData, [label]: value }));
    }

    const handleNewRoom = () => {
        console.log("get to server",roomData);
        socket.emit("createRoom", (roomData), (response) => {
            console.log(response.status);
            setRoomData({})
        });
    };

    return (
        <React.Fragment>
            <Button
                sx={{ width: "12vh", marginTop: "20px" }}
                variant="outlined"
                onClick={handleClickOpen}>
                Oepn New Room
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Welcome</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        In order to open a new room you must fill in the following details.
                    </DialogContentText>

                    {modelRoom.map((object, index) => (
                        <TextField
                            index={index}
                            key={index}
                            autoFocus
                            margin="dense"
                            className="openRoom"
                            id={modelRoom[index]}
                            label={modelRoom[index]}
                            name={modelRoom[index]}
                            variant="standard"
                            onChange={handleFillRoom}
                        />
                    ))}
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
