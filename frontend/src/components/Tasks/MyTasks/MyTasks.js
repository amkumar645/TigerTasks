import ResponsiveAppBar from "../ResponsiveAppBar";
import React, {useState, useEffect} from 'react';
import { Navigate } from "react-router-dom";
import axios from "axios";
import { Box, Dialog, Typography } from "@mui/material";
import TaskAccordion from './TaskAccordion.js';
import { restURL } from "../../utils/constants";
import SuccessDialog from "../Dialogs/SuccessDialog";
import ErrorDialog from "../Dialogs/ErrorDialog";


const MyTasks = (user) => {
    const [redirect, setRedirect] = useState(false);
    const [createdTasks, setCreatedTasks] = useState([])
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

    const formSubmit = (data, id, taskData) => {
        newTask = {
            "title": data.title,
            "description": data.description, 
            "skills": data.skills, 
            "category": data.category,
            "price": parseFloat(data.price),
            "deadline": data.deadline,
            "email": user.user.email,
            "phone": data.phone,
            "createdby": user.user.netID,
            "flaggedby": taskData.flaggedby,
            "requestedby": taskData.requestedby,
        }
        changeTaskId = id;
        changeSingleTask();
    }
    
    //gets run at initial loadup
    useEffect(() => {
        if (user.user.name === "") {
            setRedirect(true);
        }
        getAllCreatedTasks();
    }, [])

    //refreshes the page
    if(refreshData){
        setRefreshData(false);
        getAllCreatedTasks();
    }

    return (
        <Box>
            { redirect ? (<Navigate push to="/login"/>) : null }
            <ResponsiveAppBar user={user}></ResponsiveAppBar>
            <Typography variant='h3' sx={{textAlign: 'center', my: 5, fontWeight:500, color:'#4cad50', fontFamily: 'Raleway'}}>
                Created Tasks
            </Typography>
            <Box sx={{ml: 5, mr: 5, mb: 3}}>
                {createdTasks != null && createdTasks.map((task, i) => (
                    <TaskAccordion key={task._id} taskData={task} deleteSingleTask={deleteSingleTask} user={user} formSubmit={formSubmit}/>
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

    // Get all the tasks created by user
    function getAllCreatedTasks(){
        var url = restURL + "/users/created/" + user.user.netID;
        axios.get(url, {
            responseType: 'json'
        }).then(response => {
            if(response.status === 200){
                setCreatedTasks(response.data)
            }
        })
    }

    // Delete Single Task
    function deleteSingleTask(id){
        var url = restURL + "/task/delete/" + id
        axios.delete(url, {
        }).then(response => {
            if(response.status === 200){
                setRefreshData(true);
                setOpenSuccessDialog(true);
            }
            else {
                setOpenErrorDialog(true);
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

export default MyTasks;