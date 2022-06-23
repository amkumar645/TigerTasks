import ResponsiveAppBar from "../ResponsiveAppBar";
import React, {useState, useEffect} from 'react';
import { Navigate } from "react-router-dom";
import axios from "axios";
import { Box, Typography } from "@mui/material";
import TaskAccordion from './TaskAccordion.js';
import FlaggedTaskAccordion from "./FlaggedTaskAccordion";
import { restURL } from "../../utils/constants";



const MyTasks = (user) => {
    const [redirect, setRedirect] = useState(false);
    const [createdTasks, setCreatedTasks] = useState([])
    const [flaggedTasks, setFlaggedTasks] = useState([])
    const [refreshData, setRefreshData] = useState(false)

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
        "flaggedby": []
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
            "flaggedby": data.flaggedby
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
                    <TaskAccordion key={i} taskData={task} deleteSingleTask={deleteSingleTask} user={user}/>
                ))}
            </Box>
            
            <Typography variant='h3' sx={{textAlign: 'center', my: 5, fontWeight:500, color:'#4cad50', fontFamily: 'Raleway'}}>
                Flagged Tasks
            </Typography>
            <Box sx={{ml: 5, mr: 5, mb: 5}}>
                {flaggedTasks != null && flaggedTasks.map((task, i) => (
                    <FlaggedTaskAccordion key={i} taskData={task} flagTask={flagTask} user={user}/>
                ))}
            </Box>

        </>
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

    // Get all the tasks
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

    // Delete Single Task
    function deleteSingleTask(id){
        var url = restURL + "/task/delete/" + id
        axios.delete(url, {
        }).then(response => {
            if(response.status === 200){
                setRefreshData(true)
            }
        })
    }


    // Change a task
    function changeSingleTask(){
        var url = restURL + "/task/update/" + changeTaskId;
        axios.put(url, newTask)
            .then(response => {
            if(response.status === 200){
                setRefreshData(true)
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
            "flaggedby": []
        };
        changeTaskId = 0;
    }
}

export default MyTasks;