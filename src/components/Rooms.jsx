import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';



export default function VerticalTabs(props) {
    const [value, setValue] = React.useState(0);

    const socket = props.socket;

    const joinRoom = (object) => {
        socket.emit("join_room", object.roomID);
        props.room(object.roomID);
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ margin: "1vh", flexGrow: 1, color: "white", display: 'flex', height: "84vh" }}>
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                sx={{ borderRight: 1, color: "white", bgcolor: '#21213E', borderColor: 'divider' }}>
                {props.rooms.map((object, index) => (
                    <Tab
                        sx={{ bgcolor: '#21213E', color: "gold" }}
                        index={index}
                        key={object.roomID} 
                        label={object.roomName}
                        onClick={() => joinRoom(object)} />))}
            </Tabs>
        </Box>
    );
}