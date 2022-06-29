import ResponsiveAppBar from "../ResponsiveAppBar";
import React, {useState, useEffect} from 'react';
import { Navigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const Tutorial = (user) => {
    const [redirect, setRedirect] = useState(false);

    //gets run at initial loadup
    useEffect(() => {
        if (user.user.name === "") {
            setRedirect(true);
        }
    }, [])

    return (
        <Box sx={{ }}>
            { redirect ? (<Navigate push to="/login"/>) : null }
            <ResponsiveAppBar user={user}></ResponsiveAppBar>
            <Typography variant='h3' sx={{textAlign: 'center', my: 5, fontWeight:500, color:'#4cad50', fontFamily: 'Raleway'}}>
                How to use TigerTasks!
            </Typography>
            <Tabs>
                <TabList style={{ fontSize: '20px', fontFamily: 'Raleway', textAlign: 'center' }}>
                    <Tab>I'm looking to do tasks!</Tab>
                    <Tab>I want a task done!</Tab>
                    <Tab>General User</Tab>
                </TabList>
                <TabPanel>
                    <Typography sx={{mt: 5, ml: 10, mr: 10, fontWeight:500, fontFamily: 'Raleway', fontSize: '20px'}}>
                        1. Click on the "Browse Tasks" link in the navigation bar.
                    </Typography>
                    <Typography sx={{mt: 2, ml: 10, mr: 10, fontWeight:500, fontFamily: 'Raleway', fontSize: '20px'}}>
                        2. Browse through the available tasks. They're sorted by most 
                        recently created to least recently created. For any tasks with
                        long descriptions, you can press the SEE MORE button at the 
                        bottom of the task card to get a popup with the full task info.
                    </Typography>
                    <Typography sx={{mt: 2, ml: 10, mr: 10, fontWeight:500, fontFamily: 'Raleway', fontSize: '20px'}}>
                        3. Try out the different filtering methods! You can
                        filter by the title of the task (case-insensitive, so 
                        feel free not to capitalize), or filter by the 
                        category of the task. I'm working on adding more
                        filters and more categories, so contact me at 
                        amkumar@princeton.edu if you want to see anything 
                        specific.
                    </Typography>
                    <Typography sx={{mt: 2, ml: 10, mr: 10, fontWeight:500, fontFamily: 'Raleway', fontSize: '20px'}}>
                        4. If you like any tasks and want to remember them for later,
                        click on the flag on the top right to save it. You can see
                        all your flagged tasks by clicking on the "My Tasks" tab in 
                        the navigation bar and then scrolling down to the Flagged Tasks
                        section.
                    </Typography>
                    <Typography sx={{mt: 2, ml: 10, mr: 10, fontWeight:500, fontFamily: 'Raleway', fontSize: '20px'}}>
                        5. In the Wanted Tasks section, you can view all flagged tasks
                        in a larger popup or unflag the task. Note that you can also
                        unflag the task by clicking on the flag on the top right
                        in the "Browse Tasks" section. 
                    </Typography>
                    <Typography sx={{mt: 2, ml: 10, mr: 10, fontWeight:500, fontFamily: 'Raleway', fontSize: '20px'}}>
                        6. If you want to let the creator of a task know your interest,
                        you can request a task. To do this, press the SEE MORE button and 
                        scroll to the bottom of the card. Then, there is a REQUEST button.
                    </Typography>
                    <Typography sx={{mt: 2, ml: 10, mr: 10, fontWeight:500, fontFamily: 'Raleway', fontSize: '20px'}}>
                        7. In the Wanted Tasks section, you can view all requested task
                        in a larger popup or unflag the task. Note that you can also
                        unflag the task by clicking on the flag on the top right
                        in the "Browse Tasks" section. 
                    </Typography>
                    <Typography sx={{mt: 2, ml: 10, mr: 10, mb: 10, fontWeight:500, fontFamily: 'Raleway', fontSize: '20px'}}>
                        8. This website does not support payment for
                        task completion yet, so if you want to do a task for someone,
                        use the contact info shown with the task to set up payment. Good luck!
                    </Typography>
                </TabPanel>
                <TabPanel>
                    <Typography sx={{mt: 5, ml: 10, mr: 10, fontWeight:500, fontFamily: 'Raleway', fontSize: '20px'}}>
                        1. Click on the "Browse Tasks" link in the navigation bar.
                    </Typography>
                    <Typography sx={{mt: 2, ml: 10, mr: 10, fontWeight:500, fontFamily: 'Raleway', fontSize: '20px'}}>
                        2. Press the Add Task button in the top right.
                    </Typography>
                    <Typography sx={{mt: 2, ml: 10, mr: 10, fontWeight:500, fontFamily: 'Raleway', fontSize: '20px'}}>
                        3. In the Add Task form, fill out the 
                        fields with as much detail as possible. The starred 
                        fields are required to add the task, but the rest
                        will be useful for people to know what you want.
                        Your netID and email will automatically be added with
                        the task to ensure anyone wanting your task can contact
                        you. 
                    </Typography>
                    <Typography sx={{mt: 2, ml: 10, mr: 10, fontWeight:500, fontFamily: 'Raleway', fontSize: '20px'}}>
                        4. After creating your task, you can go to the "My Tasks" tab.
                        In the Created Tasks section, you can see all the tasks you've created
                        in the order you created them. 
                    </Typography>
                    <Typography sx={{mt: 2, ml: 10, mr: 10, fontWeight:500, fontFamily: 'Raleway', fontSize: '20px'}}>
                        5. For any of your created tasks, you can edit the task to change up
                        the details. You can change any of the details on a task, but I 
                        don't recommend overusing this. 
                    </Typography>
                    <Typography sx={{mt: 2, ml: 10, mr: 10, fontWeight:500, fontFamily: 'Raleway', fontSize: '20px'}}>
                        6. In addition, you can see all the requests to do your task 
                        by clicking on SEE REQUESTS. 
                    </Typography>
                    <Typography sx={{mt: 2, ml: 10, mr: 10, mb: 10, fontWeight:500, fontFamily: 'Raleway', fontSize: '20px'}}>
                        7. Once your task is completed or if you no longer wish to 
                        have the task be posted, you can delete the task. You will
                        have to confirm the deletion to make sure you don't delete tasks
                        by accident, but be careful, as once a task is deleted, it can 
                        never be recovered. Good luck!
                    </Typography>         
                </TabPanel>
                <TabPanel>
                    <Typography sx={{mt: 5, ml: 10, mr: 10, fontWeight:500, fontFamily: 'Raleway', fontSize: '20px'}}>
                        1. You've already logged in, so I assume you know how to do
                        that. Note that you can only log in with a valid
                        Princeton email, and everything is saved to your
                        specific account, so if you use a differet email,
                        all your data will be lost. 
                    </Typography>
                    <Typography sx={{mt: 2, ml: 10, mr: 10, fontWeight:500, fontFamily: 'Raleway', fontSize: '20px'}}>
                        2. Read the other tutorials based on what you want
                        done. 
                    </Typography>
                    <Typography sx={{mt: 2, ml: 10, mr: 10, fontWeight:500, fontFamily: 'Raleway', fontSize: '20px'}}>
                        3. If you want to logout, click on your
                        logo icon in the top right and there should be
                        a menu that says logout. 
                    </Typography>
                    <Typography sx={{mt: 2, ml: 10, mr: 10, mb: 10, fontWeight:500, fontFamily: 'Raleway', fontSize: '20px'}}>
                        4. To logout, you have to press the logout 
                        button, wait for the page to refresh quickly, and then
                        press it again. This will log you out of the website,
                        but not out of your google account. 
                    </Typography>             
                </TabPanel>
            </Tabs>
        </Box>
    )
}

export default Tutorial;