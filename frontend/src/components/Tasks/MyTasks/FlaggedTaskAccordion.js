import React, { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Button, Chip, Dialog, Typography } from "@mui/material";
import ViewDialog from './Dialogs/ViewDialog';


const FlaggedTaskAccordion = ({taskData, user, flagTask}) => {
    const [expanded, setExpanded] = useState(false);
    const [flagged, setFlagged] = useState(taskData.flaggedby.includes(user.user.netID));
    const [openFlagDialog, setOpenFlagDialog] = useState(false);

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
                "flaggedby": newFlaggedBy
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
                "flaggedby": newFlaggedBy
            }
            flagTask(data, taskData._id);
        }
    }

    return (
        <>
        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} >
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
            >
                <Typography 
                sx={{ width: '33%', flexShrink: 0, fontFamily: 'Raleway', fontWeight:600 }}>
                    { taskData !== undefined && taskData.title}                   
                </Typography>
                <Chip label={taskData.category} color="primary" 
                    sx={{ mr: '30%', mb: 1, fontSize: '16px', fontFamily: 'Raleway'}}/>
                <Typography sx={{ width: '33%', flexShrink: 0, fontFamily: 'Raleway' }}>
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
                    <Button variant="contained" color="primary" size="small" sx={{ mb: 2, mr: 3}} onClick={() => setOpenFlagDialog(true)}>View</Button>
                    {flagged && <Button variant="contained" color="error" size="small" sx={{ mb: 2}} onClick={() => flagThisTask(!flagged)}>Unflag</Button>}
                    {!flagged && <Button color="error" size="small" sx={{ mb: 2}} onClick={() => flagThisTask(!flagged)}>Flag</Button>}
                </Box>
            </AccordionDetails>
        </Accordion>
        <Dialog open={openFlagDialog} onClose={() => setOpenFlagDialog(false)} fullWidth maxWidth="md">
            <ViewDialog taskData={taskData} closeViewDialog={setOpenFlagDialog}></ViewDialog>
        </Dialog>
        </>
    )
}

export default FlaggedTaskAccordion;