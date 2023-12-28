import Chat from "./components/Chat";
import { Box, CssBaseline } from '@mui/material';

export default  function App(props) {

  console.log(props.sx)
  return (
    <Box sx={{bgcolor:'red', height:'100%'}}>
      <CssBaseline/>
      <Chat/>
    </Box>
  )
}