import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useGoogleLogin } from 'react-google-login';
import { refreshTokenSetup } from './RefreshTokenSetup';
import { gapi } from 'gapi-script';
import {Navigate} from 'react-router-dom';


const clientId = '498473668547-4u8geu2e9p94m6cqfeg6pbr6o1b7b7k7.apps.googleusercontent.com';

const GoogleIn = ({setUser, setFailedLogin}) => {
    const [redirect, setRedirect] = useState(false);


    useEffect(() => {
        function start() {
          gapi.client.init({
            clientId: clientId,
            scope: 'email',
          });
        }
    
        gapi.load('client:auth2', start);
      }, []);

    const onSuccess = (res) => {
        // console.log("Login Success: ", res.profileObj);
        const email = res.profileObj.email.split('@');
        const netID = email[0];
        const org = email[1];
        const name= res.profileObj.name;
        if (org !== 'princeton.edu') {
            setFailedLogin(true);
            return;
        }
        const user = [name, netID, netID + '@' + org];
        setUser(user);
        setRedirect(true);
        refreshTokenSetup(res);
    };
    const onFailure = (res) => {
        alert("Login failed: ", res);
    };
    const { signIn } = useGoogleLogin({
        onSuccess,
        onFailure,
        clientId,
        isSignedIn: true,
        accessType: 'offline'
    });
    return (
        <>
        <Button onClick={signIn} variant="contained" sx={{marginTop: "50px", marginBottom: "50px", 
        height: '80px', width: '400px', fontSize: '25px', fontFamily: "Raleway"}}>
            Login to Get Started!
        </Button>
        { redirect ? (<Navigate push to="/"/>) : null }
        </>
        
    );
}

export default GoogleIn;