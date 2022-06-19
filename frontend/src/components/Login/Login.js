import { Box, Button, Typography } from '@mui/material';
import Logo from '../../assets/TigerTasks.png';


const Login = () => {
    return (
        <Box sx={{
            minHeight: '100vh',
            backgroundImage: "linear-gradient(to bottom right, #4caf50,#357a38)",
            textAlign: "center",
        }}>
            <img src={Logo} alt="TigerTasks" style={{width: '60%', marginTop: "10%"}}></img>
            <Typography style={{ color: "white", fontFamily: "Raleway", 
            fontSize: '30px', marginLeft: '50px', marginRight: '50px',
            marginTop: "50px"}}>
                A place for Princeton students to find other Princeton students to help with tasks!
            </Typography>
            <Button variant="contained" sx={{marginTop: "50px", marginBottom: "50px", 
            height: '80px', width: '400px', fontSize: '25px', fontFamily: "Raleway"}}>
                Login to Get Started!
            </Button>
        </Box>

    )
}

export default Login;