import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

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
        <Box sx={{ margin:"1vh", flexGrow: 1, color:"white", display: 'flex', height: "79vh" }}>
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                sx={{ borderRight: 1,color:"white",bgcolor:'#21213E' ,borderColor: 'divider' }}>
                  {props.rooms.map((object, index) => (
                    <Tab
                        sx={{bgcolor:'#21213E',color:"gold"}}
                        index={index}
                        key={object.roomID} {...a11yProps(index)}
                        label={object.roomName}
                        onClick={() => joinRoom(object)}/>))}
            </Tabs>
        </Box>
    );
}