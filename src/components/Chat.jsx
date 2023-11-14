import Box from '@mui/material/Box';
import { Button, Container } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import Message from './Message';
export default function Chat() {
  return (<div>
            <Box sx={{ flexGrow: 1,height:'90vh'}}>
                <Container >
                    <Grid2 container spacing={0}>
                        <Grid2 xs={3}>
                            <Box  sx={{ bgcolor: '#DDDDDD', height: '90vh' }}>
                            </Box>
                        </Grid2>

                        <Grid2 xs={9}>
                            <Box  sx={{ bgcolor: '#AAAAAA', height: '10vh' }}>
                            </Box>

                            <Box id="boardMesseages" sx={{ bgcolor: '#BBBBBB', height: '60vh' }}>
                                <Message/>
                            </Box>

                            <Box  sx={{ bgcolor: '#CCCCCC', height: '20vh' }}>
                                <Button>Send</Button>
                            </Box>

                        </Grid2>
                    </Grid2>
                </Container>
            </Box>
        </div>
    );
}
    