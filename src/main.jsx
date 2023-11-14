import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import theme from './components/theme.js';
import Chat from './components/Chat.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <ThemeProvider theme={theme}>
      <CssBaseline/>
    {/* <App/> */}
    <Chat />
    </ThemeProvider>
  </React.StrictMode>,
)
