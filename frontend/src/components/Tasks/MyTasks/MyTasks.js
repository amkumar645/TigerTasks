import ResponsiveAppBar from "../ResponsiveAppBar";
import React, {useState, useEffect} from 'react';
import { Navigate } from "react-router-dom";
import axios from "axios";
import { Box, Typography } from "@mui/material";
import TaskAccordion from './TaskAccordion.js';
import FlaggedTaskAccordion from "./FlaggedTaskAccordion";



const MyTasks = (user) => {
    const [redirect, setRedirect] = useState(false);
    const [createdTasks, setCreatedTasks] = useState([])
    const [flaggedTasks, setFlaggedTasks] = useState([])
    const [refreshData, setRefreshData] = useState(false)
    const [changeTask, setChangeTask] = useState({"change": false, "id": 0})
    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    
    //gets run at initial loadup
    useEffect(() => {
        if (user.user.name === "") {
            setRedirect(true);
        }
        getAllCreatedTasks();
        getAllFlaggedTasks();
    }, [])

    //refreshes the page
    if(refreshData){
        setRefreshData(false);
        getAllCreatedTasks();
        getAllFlaggedTasks();
    }

    return (
        <>
            { redirect ? (<Navigate push to="/login"/>) : null }
            <ResponsiveAppBar user={user}></ResponsiveAppBar>
            <Typography variant='h3' sx={{textAlign: 'center', my: 5, fontWeight:500, color:'#4cad50', fontFamily: 'Raleway'}}>
                Created Tasks
            </Typography>
            <Box sx={{ml: 5, mr: 5}}>
                {createdTasks != null && createdTasks.map((task, i) => (
                    <TaskAccordion key={i} taskData={task} deleteSingleTask={deleteSingleTask} setChangeTask={setChangeTask} user={user}/>
                ))}
            </Box>
            
            <Typography variant='h3' sx={{textAlign: 'center', my: 5, fontWeight:500, color:'#4cad50', fontFamily: 'Raleway'}}>
                Flagged Tasks
            </Typography>
            <Box sx={{ml: 5, mr: 5, mb: 5}}>
                {flaggedTasks != null && flaggedTasks.map((task, i) => (
                    <FlaggedTaskAccordion key={i} taskData={task} deleteSingleTask={deleteSingleTask} setChangeTask={setChangeTask} user={user}/>
                ))}
            </Box>
            
        </>
    )

    // Get all the tasks created by user
    function getAllCreatedTasks(){
        var url = "http://localhost:8000/users/created/" + user.user.netID;
        axios.get(url, {
            responseType: 'json'
        }).then(response => {
            if(response.status === 200){
                setCreatedTasks(response.data)
            }
        })
    }

    // Get all the tasks
    function getAllFlaggedTasks(){
        var url = "http://localhost:8000/users/flagged/" + user.user.netID;
        axios.get(url, {
            responseType: 'json'
        }).then(response => {
            if(response.status === 200){
                setFlaggedTasks(response.data)
            }
        })
    }

    // Delete Single Task
    function deleteSingleTask(id){
        var url = "http://localhost:8000/task/delete/" + id
        axios.delete(url, {
        }).then(response => {
            if(response.status === 200){
                setRefreshData(true)
            }
        })
    }
}

export default MyTasks;