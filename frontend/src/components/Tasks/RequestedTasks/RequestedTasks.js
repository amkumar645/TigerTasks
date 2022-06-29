import ResponsiveAppBar from "../ResponsiveAppBar";
import React, {useState, useEffect} from 'react';
import { Navigate } from "react-router-dom";
import axios from "axios";
import { Box, Dialog, Typography } from "@mui/material";
import FlaggedTaskAccordion from "./FlaggedTaskAccordion";
import { restURL } from "../../utils/constants";
import SuccessDialog from "../Dialogs/SuccessDialog";
import ErrorDialog from "../Dialogs/ErrorDialog";
import RequestedTaskAccordion from "./RequestedTaskAccordion";


const RequestedTasks = (user) => {
    const [redirect, setRedirect] = useState(false);
    const [requestedTasks, setRequestedTasks] = useState([])
    const [flaggedTasks, setFlaggedTasks] = useState([])
    const [refreshData, setRefreshData] = useState(false)
    const [openSuccessDialog, setOpenSuccessDialog] = useState(false);
    const [openErrorDialog, setOpenErrorDialog] = useState(false);

    var newTask = {
        "title": "",
        "description": "", 
        "skills": "", 
        "category": "",
        "price": 0,
        "deadline": "",
        "email": user.user.email,
        "phone": "",
        "createdby": user.user.netID,
        "flaggedby": [],
        "requestedby": [],
    };
    var changeTaskId = 0;

    const flagTask = (data, id) => {
        newTask = {
            "title": data.title,
            "description": data.description, 
            "skills": data.skills, 
            "category": data.category,
            "price": data.price,
            "deadline": data.deadline,
            "email": data.email,
            "phone": data.phone,
            "createdby": data.createdby,
            "flaggedby": data.flaggedby,
            "requestedby": data.requestedby
        }
        changeTaskId = id;
        changeSingleTask();
    }

    const requestTask = (data, id) => {
        newTask = {
            "title": data.title,
            "description": data.description, 
            "skills": data.skills, 
            "category": data.category,
            "price": data.price,
            "deadline": data.deadline,
            "email": data.email,
            "phone": data.phone,
            "createdby": data.createdby,
            "flaggedby": data.flaggedby,
            "requestedby": data.requestedby
        }
        changeTaskId = id;
        changeSingleTask();
    }

    //gets run at initial loadup
    useEffect(() => {
        if (user.user.name === "") {
            setRedirect(true);
        }
        getAllRequestedTasks();
        getAllFlaggedTasks();
    }, [])

    //refreshes the page
    if(refreshData){
        setRefreshData(false);
        getAllRequestedTasks();
        getAllFlaggedTasks();
    }

    return (
        <Box>
            { redirect ? (<Navigate push to="/login"/>) : null }
            <ResponsiveAppBar user={user}></ResponsiveAppBar>
            <Typography variant='h3' sx={{textAlign: 'center', my: 5, fontWeight:500, color:'#4cad50', fontFamily: 'Raleway'}}>
                Requested Tasks
            </Typography>
            <Box sx={{ml: 5, mr: 5, mb: 5}}>
                {requestedTasks != null && requestedTasks.map((task, i) => (
                    <RequestedTaskAccordion key={task._id} taskData={task} flagTask={flagTask} requestTask={requestTask} user={user}/>
                ))}
            </Box>
            <Typography variant='h3' sx={{textAlign: 'center', my: 5, fontWeight:500, color:'#4cad50', fontFamily: 'Raleway'}}>
                Flagged Tasks
            </Typography>
            <Box sx={{ml: 5, mr: 5, mb: 5}}>
                {flaggedTasks != null && flaggedTasks.map((task, i) => (
                    <FlaggedTaskAccordion key={task._id} taskData={task} flagTask={flagTask} requestTask={requestTask} user={user}/>
                ))}
            </Box>
            <Dialog open={openSuccessDialog} onClose={() => setOpenSuccessDialog(false)} fullWidth maxWidth="sm">
                <SuccessDialog closeSuccessDialog={setOpenSuccessDialog} message={"The operation was successful!"}></SuccessDialog>
            </Dialog>
            <Dialog open={openErrorDialog} onClose={() => setOpenErrorDialog(false)} fullWidth maxWidth="sm">
                <ErrorDialog closeErrorDialog={setOpenErrorDialog} message={"There was an error. Please try again!"}></ErrorDialog>
            </Dialog>
        </Box>
    )

    // Get all the requested tasks
    function getAllRequestedTasks(){
        var url = restURL + "/users/requested/" + user.user.netID;
        axios.get(url, {
            responseType: 'json'
        }).then(response => {
            if(response.status === 200){
                setRequestedTasks(response.data)
            }
        })
    }

    // Get all the flagged tasks
    function getAllFlaggedTasks(){
        var url = restURL + "/users/flagged/" + user.user.netID;
        axios.get(url, {
            responseType: 'json'
        }).then(response => {
            if(response.status === 200){
                setFlaggedTasks(response.data)
            }
        })
    }

    // Change a task
    function changeSingleTask(){
        var url = restURL + "/task/update/" + changeTaskId;
        axios.put(url, newTask)
            .then(response => {
            if(response.status === 200){
                setRefreshData(true);
                setOpenSuccessDialog(true);
            }
            else {
                setOpenErrorDialog(true);
            }
        })
        newTask = {
            "title": "",
            "description": "", 
            "skills": "", 
            "category": "",
            "price": 0,
            "deadline": "",
            "email": user.user.email,
            "phone": "",
            "createdby": user.user.netID,
            "flaggedby": [],
            "requestedby": [],
        };
        changeTaskId = 0;
    }
}

export default RequestedTasks;