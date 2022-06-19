import { Typography } from '@mui/material';
import React, { useState } from 'react';
import { useGoogleLogout } from 'react-google-login';
import { Redirect } from 'react-router-dom';

const clientId = '498473668547-4u8geu2e9p94m6cqfeg6pbr6o1b7b7k7.apps.googleusercontent.com';

const GoogleOut = () => {

    const onLogoutSuccess = (res) => {
        
    }
    const onFailure = (res) => {
        console.log("Failed!");
    };
    const { signOut } = useGoogleLogout({
        clientId,
        onLogoutSuccess,
        onFailure,
    });
    return (
        <Typography onClick={signOut} sx={{fontFamily: "Raleway", color: 'black'}}>
            Logout
        </Typography>
    );
}

export default GoogleOut;