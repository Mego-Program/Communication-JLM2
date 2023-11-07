import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

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

