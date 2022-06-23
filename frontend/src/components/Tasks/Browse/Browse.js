import ResponsiveAppBar from "../ResponsiveAppBar";
import React, {useState, useEffect} from 'react';
import axios from "axios";
import TaskCard from "./TaskCard";
import { Box, Container, Button, Dialog, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { Navigate } from "react-router-dom";
import { restURL } from "../../utils/constants";
import AddDialog from "./AddDialog/AddDialog";

const Browse = (user) => {
    const [redirect, setRedirect] = useState(false);
    const [tasks, setTasks] = useState([])
    const [refreshData, setRefreshData] = useState(false)
    const [filterTitle, setFilterTitle] = useState('')
    const [filterCategory, setFilterCategory] = useState('')
    const [openDialog, setOpenDialog] = useState(false);
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

    const formSubmit = (data) => {
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
            "flaggedby": []
        }
        addSingleTask();
    }

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
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth maxWidth="lg">
                <AddDialog closeAddDialog={setOpenDialog} formSubmit={formSubmit}></AddDialog>
            </Dialog>
            <Typography variant='h3' sx={{textAlign: 'center', my: 5, fontWeight:500, color:'#4cad50', fontFamily: 'Raleway'}}>
                Available Tasks
            </Typography>
            <Box sx={{textAlign: 'right', mr: 5, mb: 2, mt: -2}}>
                <Button variant="contained" onClick={() => setOpenDialog(true)}>Add New Task +</Button>
            </Box>
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
                    <MenuItem value="">&nbsp;</MenuItem>
                    <MenuItem value="Art">Art</MenuItem>
                    <MenuItem value="Tech">Tech</MenuItem>
                    <MenuItem value="Food">Food</MenuItem>
                    <MenuItem value="Shopping">Shopping</MenuItem>
                    <MenuItem value="Transportation">Transportation</MenuItem>
                    <MenuItem value="Activity">Activity</MenuItem>
                    <MenuItem value="Tutoring">Tutoring</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <Box sx={{ ml:'auto', mr: 'auto', width: '90%', mb: 5}}>
            <Grid container spacing={2} sx={{ ml:'auto', mr: 'auto'}}>
                {tasks != null && tasks.reverse().map((task, i) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={i} >
                        <TaskCard taskData={task} flagTask={flagTask} user={user}/>
                    </Grid>
                ))}
            </Grid>
            </Box>
            
        </>
    );

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

    // Create a new task
    function addSingleTask(){
        var url = restURL + "/task/create";
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
    }

    // Get all the tasks
    function getAllTasks(){
        var url = restURL + "/tasks"
        axios.get(url, {
            responseType: 'json'
        }).then(response => {
            if(response.status === 200){
                setTasks(response.data.reverse())
            }
        })
    }

    // Get all the tasks filtered by category
    function getAllTasksByCategory(category){
        var url = restURL + "/tasks/category/" + category + "/"
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
        var url = restURL + "/tasks/title/" + filter + "/"
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
        var url = restURL + "/tasks/search/" + category + "/" + filter;
        axios.get(url, {
            responseType: 'json'
        }).then(response => {
            if(response.status === 200){
                setTasks(response.data)
            }
        })
    }
}

export default Browse;