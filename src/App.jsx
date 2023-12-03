
import Chat from "./components/Chat";
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import theme from "./components/theme";


export default  function App() {
  return (
    <div>
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Chat/>
    
    </ThemeProvider>
  
    </div>
  )
    }