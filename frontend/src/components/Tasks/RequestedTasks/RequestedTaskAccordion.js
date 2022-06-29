import React, { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Button, Dialog, Typography } from "@mui/material";
import CategoryChip from '../CategoryChip/CategoryChip';
import ViewDialog from '../MyTasks/Dialogs/ViewDialog';


const RequestedTaskAccordion = ({taskData, user, flagTask, requestTask}) => {
    const [expanded, setExpanded] = useState(false);
    const [flagged, setFlagged] = useState(taskData.flaggedby.includes(user.user.netID));
    const [requested, setRequested] = useState(taskData.requestedby.includes(user.user.netID));
    const [openRequestDialog, setOpenRequestDialog] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    
    const flagThisTask = (flagging) => {
        setFlagged(!flagged);
        if (flagging) {
            const newFlaggedBy = taskData.flaggedby;
            newFlaggedBy.push(user.user.netID)
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
                "flaggedby": newFlaggedBy,
                "requestedby": taskData.requestedby
            }
            flagTask(data, taskData._id);
        }
        else {
            const newFlaggedBy = taskData.flaggedby;
            const index = newFlaggedBy.indexOf(user.user.netID);
            if (index > -1) {
                newFlaggedBy.splice(index, 1); // 2nd parameter means remove one item only
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
                "flaggedby": newFlaggedBy,
                "requestedby": taskData.requestedby
            }
            flagTask(data, taskData._id);
        }
    }

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
    }

    return (
        <>
        <Accordion sx={{backgroundColor: "#f5f5f5"}} expanded={expanded === 'panel1'} onChange={handleChange('panel1')} >
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
            >
                <Typography 
                sx={{ width: '33%', flexShrink: 0, fontFamily: 'Raleway', fontWeight:600 }}>
                    { taskData !== undefined && taskData.title}                   
                </Typography>
                <Box sx={{mr: '30%'}}>
                    <CategoryChip category={taskData.category}></CategoryChip>
                </Box>
                <Typography sx={{ fontFamily: 'Raleway', position: 'absolute', right: '1%', width: '33%' }}>
                    <b>Created By:&nbsp;</b> { taskData !== undefined && taskData.createdby}                   
                </Typography>
            </AccordionSummary>
            <hr></hr>
            <AccordionDetails>
                <Typography variant="body2" sx={{ mt: 2, fontFamily: 'Raleway'}}>
                    <b>Description:</b> { taskData !== undefined && taskData.description}
                </Typography>
                <Typography variant="body2" sx={{ mt: 2, fontFamily: 'Raleway'}}>
                <b>Price:</b> ${ taskData !== undefined && taskData.price}
                </Typography>
                <Typography variant="body2" sx={{ mt: 2, fontFamily: 'Raleway'}}>
                    <b>Skills Required:</b> { taskData !== undefined && taskData.skills}
                </Typography>
                <Typography variant="body2" sx={{ mt: 2, fontFamily: 'Raleway'}}>
                    <b>Deadline:</b> { taskData !== undefined && taskData.deadline}
                </Typography>
                <Typography variant="body2" sx={{ mt: 2, fontFamily: 'Raleway'}}>
                    <b>Created By:</b> { taskData !== undefined && taskData.createdby}
                </Typography>
                <Typography variant="body2" sx={{ mt: 2, fontFamily: 'Raleway'}}>
                    <b>Contact Email:</b> { taskData !== undefined && taskData.email}
                </Typography>
                <Typography variant="body2" sx={{ mt: 2, fontFamily: 'Raleway'}}>
                    <b>Contact Phone Number:</b> { taskData !== undefined && taskData.phone}
                </Typography>
                <Box sx={{textAlign: 'center', mt: 5}}>
                    <Button color="primary" size="large" sx={{ mb: 2 }} onClick={() => setOpenRequestDialog(true)}>View</Button>
                    {!flagged && <Button color="success" size="large" sx={{ mb: 2 }} onClick={() => flagThisTask(true)}>Flag</Button>}
                    {flagged && <Button color="success" size="large" sx={{ mb: 2 }} onClick={() => flagThisTask(false)}>Unflag</Button>}
                    <Button color="error" size="large" sx={{ mb: 2}} onClick={() => requestThisTask(false)}>Unrequest</Button>
                </Box>
            </AccordionDetails>
        </Accordion>
        <Dialog open={openRequestDialog} onClose={() => setOpenRequestDialog(false)} fullWidth maxWidth="md">
            <ViewDialog taskData={taskData} closeViewDialog={setOpenRequestDialog}></ViewDialog>
        </Dialog>
        </>
    )
}

export default RequestedTaskAccordion;