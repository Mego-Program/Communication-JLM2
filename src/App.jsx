import Chat from "./components/Chat";
import { Box, CssBaseline } from '@mui/material';

export default  function App(props) {

  console.log(props.sx)
  return (
    <Box sx={{ height:'100vh', overflow:'hidden'}}>
      <CssBaseline/>
      <Chat/>
    </Box>
  )
}