import ResponsiveAppBar from "../ResponsiveAppBar";
import React, {useState, useEffect} from 'react';
import { Navigate } from "react-router-dom";


const MyTasks = (user) => {
    const [redirect, setRedirect] = useState(false);
    
    //gets run at initial loadup
    useEffect(() => {
        if (user.user.name === "") {
            setRedirect(true);
        }
    }, [])

    return (
        <>
            { redirect ? (<Navigate push to="/login"/>) : null }
            <ResponsiveAppBar user={user}></ResponsiveAppBar>
            <div>My Tasks</div>
        </>
    )
}

export default MyTasks;