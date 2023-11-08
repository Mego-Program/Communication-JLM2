// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//      <div></div>
//     </>
//   )
// }

// export default App



import './app.css';
import io from 'socket.io-client';
import {useEffect, useState} from "react";

const socket = io.connect("http://localhost:3001")

export default  function App() {

  const [room, setRoom] = useState("");

  const [message, setMessage] = useState ("");
  const [messageReceived, setMassageReceived] = useState("");

  const joinRoom = () => {
    if(room !=="") {
      socket.emit("join_room", room);
    }
  };

  const sendMessage = () => {
  socket.emit("send_message", { message , room });
 };

 useEffect(() => {
  socket.on("receive_message", (data) => {
    setMassageReceived(data.message);
  });
},[socket]);
  return (
    <div className='App'>
      <input 
        // type="text"
        placeholder='Room Number...'
        onChange={(Event) => {
          setRoom(Event.target.value);
        }}
      />
      <button onClick={joinRoom}>Join Room</button>
      <input 
        // type="text" 
        placeholder='Message...'
        onChange={(Event) => {
          setMessage(Event.target.value);
        }} 
      />
      <button onClick={sendMessage}>Send Message</button>
      <h1>Message:</h1>
      {messageReceived}
    </div>
  );
}



