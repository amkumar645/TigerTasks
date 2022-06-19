import { Alert, Box, IconButton, Typography } from '@mui/material';
import { useState } from 'react';
import Logo from '../../assets/TigerTasks.png';
import GoogleIn from './GoogleIn';
import CloseIcon from '@mui/icons-material/Close';

const Login = ({setUser}) => {
    const [failedLogin, setFailedLogin] = useState(false);
    return (
        <Box sx={{
            minHeight: '100vh',
            backgroundImage: "linear-gradient(to bottom right, #4caf50,#357a38)",
            textAlign: "center",
        }}>
            {failedLogin && 
            <>
                <IconButton
                    size="large"
                    onClick={() => setFailedLogin(false)}
                    sx={{position: "absolute", right: "3px"}}
                >
                    <CloseIcon></CloseIcon>
                </IconButton>
                <Alert severity="error">
                    You must be a Princeton student to access this website! Sorry!
                </Alert>
            </>
            }
            <img src={Logo} alt="TigerTasks" style={{width: '60%', marginTop: "10%"}}></img>
            <Typography style={{ color: "white", fontFamily: "Raleway", 
            fontSize: '30px', marginLeft: '50px', marginRight: '50px',
            marginTop: "50px"}}>
                A place for Princeton students to find other Princeton students to help with tasks!
            </Typography>
            <GoogleIn setUser={setUser} setFailedLogin={setFailedLogin}></GoogleIn>
        </Box>

    )
}

export default Login;