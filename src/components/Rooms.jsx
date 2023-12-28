import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import ClearIcon from '@mui/icons-material/Clear';

export default function VerticalTabs(props) {
    const [value, setValue] = React.useState(0);

    const socket = props.socket;

    const joinRoom = (object) => {
        socket.emit("join_room", object.roomName);
        props.room(object.roomName);
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const deleteRoom = (event) => {

    }

    return (
        <Box sx={{ margin: "1vh", flexGrow: 1, color: "white", height: "100%" }}>
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                sx={{height:"100%",borderRight: 1, color: "white", bgcolor: '#21213E', borderColor: 'divider', justifyContent: "right" }}>
                {props.rooms.map((object, index) => (
                    // <Box key={index}>
                    //     <Box key={index} sx={{ display: 'flex', flexDirection: "row", justifyContent: "right", alignItems: "center" }}>
                    //         <Box sx={{ width: "70%", textAlign: "center", }}>
                                <Tab
                                    sx={{ fontSize: "80%", bgcolor: '#21213E', color: "gold", }}
                                    index={index}
                                    key={index}
                                    label={object.roomName} 

                                    onClick={() => joinRoom(object)} >
                                </Tab>
                    //         </Box>
                    //         <Box >
                    //             <ClearIcon />
                    //         </Box>
                    //     </Box>
                    // </Box>
                    ))
                    }
            </Tabs>
        </Box>
    );
}