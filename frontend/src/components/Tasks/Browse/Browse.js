import ResponsiveAppBar from "../ResponsiveAppBar";
import React, {useState, useEffect} from 'react';
import axios from "axios";
import TaskCard from "./TaskCard";
import { Box, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { Navigate } from "react-router-dom";

const Browse = (user) => {
    const [redirect, setRedirect] = useState(false);
    const [tasks, setTasks] = useState([])
    const [refreshData, setRefreshData] = useState(false)
    const [changeTask, setChangeTask] = useState({"change": false, "id": 0})
    const [addNewTask, setAddNewTask] = useState(false)
    const [filterTitle, setFilterTitle] = useState('')
    const [filterCategory, setFilterCategory] = useState('')
    const [newTask, setNewTask] = useState(
        {
            "title": "",
            "description": "", 
            "skills": "", 
            "category": "",
            "price": 0,
            "deadline": "",
            "email": "",
            "phone": "",
            "createdby": "",
            "flaggedby": []
        }
    )
    const changeFilterTitle = (event) => {
        setFilterTitle(event.target.value);
        if (event.target.value === "") {
            if (filterCategory === ""){
                getAllTasks();
            }
            else {
                getAllTasksByCategory(filterCategory);
            }
        }
        else {
            if (filterCategory === ""){
                getAllTasksByTitle(event.target.value);
            }
            else {
                getAllTasksByTitleAndCategory(event.target.value, filterCategory);
            }
        }
    };

    const changeFilterCategory = (event) => {
        setFilterCategory(event.target.value);
        if (event.target.value === "") {
            if (filterTitle === ""){
                getAllTasks();
            }
            else {
                getAllTasksByTitle(filterTitle);
            }
        }
        else {
            if (filterTitle === ""){
                getAllTasksByCategory(event.target.value);
            }
            else {
                getAllTasksByTitleAndCategory(filterTitle, event.target.value);
            }
        }
    };

    //gets run at initial loadup
    useEffect(() => {
        if (user.user.name === "") {
            setRedirect(true);
        }
        getAllTasks();
    }, [])
    //refreshes the page
    if(refreshData){
        setRefreshData(false);
        getAllTasks();
    }

    return (
        <>
            { redirect ? (<Navigate push to="/login"/>) : null }
            <ResponsiveAppBar user={user}></ResponsiveAppBar>
            <Typography variant='h3' sx={{textAlign: 'center', my: 5, fontWeight:500, color:'#4cad50', fontFamily: 'Raleway'}}>
                Available Tasks
            </Typography>
            <Box sx={{ textAlign: 'center', mb: 5}}>
                <TextField
                    id="search"
                    label="Search by task title name"
                    type="search"
                    variant="outlined"
                    onChange={changeFilterTitle}
                    sx={{width: '90%', mb: 3, fontFamily: 'Raleway'}}
                />
                <br></br>
                <FormControl sx={{width: '200px'}}>
                    <InputLabel id="demo-simple-select-label">Category</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={filterCategory}
                        label="Category"
                        onChange={changeFilterCategory}
                    >
                    <MenuItem value={""}>&nbsp;</MenuItem>
                    <MenuItem value={"Test"}>Test</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <Grid container spacing={2} sx={{ ml:'auto', mr: 'auto'}}>
                {tasks != null && tasks.map((task, i) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={i} >
                        <TaskCard taskData={task} deleteSingleTask={deleteSingleTask} setChangeTask={setChangeTask} user={user}/>
                    </Grid>
                ))}
            </Grid>
        </>
    );

    // Change a task
    function changeSingleTask(){
        changeTask.change = false;
        var url = "http://localhost:8000/task/update/" + changeTask.id;
        axios.put(url, newTask)
            .then(response => {
            if(response.status === 200){
                setRefreshData(true)
            }
        })
    }

    // Create a new task
    function addSingleTask(){
        setAddNewTask(false);
        var url = "http://localhost:8000/task/create";
        axios.post(url, {
            "title": newTask.title,
            "description": newTask.description, 
            "skills": newTask.skills, 
            "category": newTask.category,
            "price": newTask.price,
            "deadline": newTask.deadline,
            "email": newTask.email,
            "phone": newTask.phone,
            "createdby": newTask.createdby,
            "flaggedby": []
        }).then(response => {
            if(response.status === 200){
                setRefreshData(true)
            }
        })
    }

    // Get all the tasks
    function getAllTasks(){
        var url = "http://localhost:8000/tasks"
        axios.get(url, {
            responseType: 'json'
        }).then(response => {
            if(response.status === 200){
                setTasks(response.data)
            }
        })
    }

    // Get all the tasks filtered by category
    function getAllTasksByCategory(category){
        var url = "http://localhost:8000/tasks/category/" + category + "/"
        axios.get(url, {
            responseType: 'json'
        }).then(response => {
            if(response.status === 200){
                setTasks(response.data)
            }
        })
    }

     // Get all the tasks filtered by category
     function getAllTasksByTitle(filter){
        var url = "http://localhost:8000/tasks/title/" + filter + "/"
        axios.get(url, {
            responseType: 'json'
        }).then(response => {
            if(response.status === 200){
                setTasks(response.data)
            }
        })
    }

    // Get all the tasks filtered by category
    function getAllTasksByTitleAndCategory(filter, category){
        var url = "http://localhost:8000/tasks/search/" + category + "/" + filter;
        axios.get(url, {
            responseType: 'json'
        }).then(response => {
            if(response.status === 200){
                setTasks(response.data)
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

export default Browse;