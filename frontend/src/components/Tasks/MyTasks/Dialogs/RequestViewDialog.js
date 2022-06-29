import React, {useState } from 'react';
import { Box, Button, DialogActions, DialogTitle, Grid, Typography } from "@mui/material"

const RequestViewDialog = ({closeViewDialog, taskData, user, requestTask}) => {
    const [requested, setRequested] = useState(taskData.requestedby.includes(user.user.netID));

    const requestThisTask = (requesting) => {
        setRequested(!requested);
        if (requesting) {
            const newRequestedBy = taskData.requestedby;
            newRequestedBy.push(user.user.netID)
            const data = {
                "title": taskData.title,
                "description": taskData.description, 
                "skills": taskData.skills, 
                "category": taskData.category,
                "price": taskData.price,
                "deadline": taskData.deadline,
                "email": taskData.email,
                "phone": taskData.phone,
                "createdby": taskData.createdby,
                "flaggedby": taskData.flaggedby,
                "requestedby": newRequestedBy
            }
            requestTask(data, taskData._id);
        }
        else {
            const newRequestedBy = taskData.requestedby;
            const index = newRequestedBy.indexOf(user.user.netID);
            if (index > -1) {
                newRequestedBy.splice(index, 1); // 2nd parameter means remove one item only
            }
            const data = {
                "title": taskData.title,
                "description": taskData.description, 
                "skills": taskData.skills, 
                "category": taskData.category,
                "price": taskData.price,
                "deadline": taskData.deadline,
                "email": taskData.email,
                "phone": taskData.phone,
                "createdby": taskData.createdby,
                "flaggedby": taskData.flaggedby,
                "requestedby": newRequestedBy
            }
            requestTask(data, taskData._id);
        }
        closeViewDialog(false);
    }

    return (
        <Box sx={{textAlign: 'center', ml: 3, mr: 3, fontFamily: 'Raleway'}}>
            <DialogTitle sx={{ mb: 3, fontSize: '30px', fontFamily: 'Raleway', fontWeight: 600}}>
                Task Details
            </DialogTitle>
            <Grid container spacing={2}>
                <Grid item xs={6} sx={{mb: 3 }}>
                    <Typography sx={{ mb: 1, fontSize: '20px', fontFamily: 'Raleway', fontWeight: 600}}><u>Task Title</u></Typography>
                    <Typography sx={{ fontSize: '20px', fontFamily: 'Raleway', fontWeight: 400}}>{taskData.title}</Typography>
                </Grid>
                <Grid item xs={6} sx={{mb: 3}}>
                    <Typography sx={{ mb: 1, fontSize: '20px', fontFamily: 'Raleway', fontWeight: 600}}><u>Task Category</u></Typography>
                    <Typography sx={{ fontSize: '20px', fontFamily: 'Raleway', fontWeight: 400}}>{taskData.category}</Typography>
                </Grid>
                <Grid item xs={12} sx={{mb: 3}}>
                    <Typography sx={{ mb: 1, fontSize: '20px', fontFamily: 'Raleway', fontWeight: 600}}><u>Task Description</u></Typography>
                    <Typography sx={{ fontSize: '20px', fontFamily: 'Raleway', fontWeight: 400}}>{taskData.description}</Typography>
                </Grid>
                <Grid item xs={6} sx={{mb: 3}}>
                    <Typography sx={{ mb: 1, fontSize: '20px', fontFamily: 'Raleway', fontWeight: 600}}><u>Skills Required</u></Typography>
                    <Typography sx={{ fontSize: '20px', fontFamily: 'Raleway', fontWeight: 400}}>{taskData.skills}</Typography>
                </Grid>
                <Grid item xs={6} sx={{mb: 3}}>
                    <Typography sx={{ mb: 1, fontSize: '20px', fontFamily: 'Raleway', fontWeight: 600}}><u>Payment</u></Typography>
                    <Typography sx={{ fontSize: '20px', fontFamily: 'Raleway', fontWeight: 400}}>${taskData.price}</Typography>
                </Grid>
                <Grid item xs={6} sx={{mb: 3}}>
                    <Typography sx={{ mb: 1, fontSize: '20px', fontFamily: 'Raleway', fontWeight: 600}}><u>Contact Email</u></Typography>
                    <Typography sx={{ fontSize: '20px', fontFamily: 'Raleway', fontWeight: 400}}>{taskData.email}</Typography>
                </Grid>
                <Grid item xs={6} sx={{mb: 3}}>
                    <Typography sx={{ mb: 1, fontSize: '20px', fontFamily: 'Raleway', fontWeight: 600}}><u>Contact Phone</u></Typography>
                    <Typography sx={{ fontSize: '20px', fontFamily: 'Raleway', fontWeight: 400}}>{taskData.phone}</Typography>
                </Grid>
                <Grid item xs={6} sx={{mb: 3}}>
                    <Typography sx={{ mb: 1, fontSize: '20px', fontFamily: 'Raleway', fontWeight: 600}}><u>Created By</u></Typography>
                    <Typography sx={{ fontSize: '20px', fontFamily: 'Raleway', fontWeight: 400}}>{taskData.createdby}</Typography>
                </Grid>
                <Grid item xs={6} sx={{mb: 3}}>
                    <Typography sx={{ mb: 1, fontSize: '20px', fontFamily: 'Raleway', fontWeight: 600}}><u>Deadline</u></Typography>
                    <Typography sx={{ fontSize: '20px', fontFamily: 'Raleway', fontWeight: 400}}>{taskData.deadline}</Typography>
                </Grid>
            </Grid>
            <DialogActions>
                <Grid container justify="center">    
                    <Grid item xs={12} sx={{mb: 3}}>
                        {!requested && <Button sx={{mr: 1}} color="primary" variant="contained" onClick={() => requestThisTask(!requested)}>Request</Button>}
                        {requested && <Button sx={{mr: 1}} color="primary" variant="outlined" onClick={() => requestThisTask(!requested)}>Unrequest</Button>}
                        <Button color="error" variant="contained" onClick={() => closeViewDialog(false)}>Close</Button>
                    </Grid>                
                </Grid>
            </DialogActions>
        </Box>

    );
}

export default RequestViewDialog;
