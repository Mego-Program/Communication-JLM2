import { createTheme } from '@mui/material/styles';
import { red} from '@mui/material/colors';


// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#F6C927',
    },
    secondary: {
      main: '#31213E',
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;