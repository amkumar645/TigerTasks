import React, { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Button, Dialog, Typography } from "@mui/material";
import DeleteDialog from './Dialogs/DeleteDialog';
import EditDialog from './Dialogs/EditDialog';
import CategoryChip from '../CategoryChip/CategoryChip';
import RequestDialog from './Dialogs/RequestDialog';


const TaskAccordion = ({taskData, deleteSingleTask, formSubmit}) => {
    const [expanded, setExpanded] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [openRequestDialog, setOpenRequestDialog] = useState(false);


    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

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
                    <b>Current Requests:&nbsp;</b> { taskData !== undefined && taskData.requestedby.length}                   
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
                    <Button color="primary" size="large" sx={{ mb: 2, mr: 3}} onClick={() => setOpenEditDialog(true)}>Edit</Button>
                    <Button color="success" size="large" sx={{ mb: 2, mr: 3}} onClick={() => setOpenRequestDialog(true)}>See Requests</Button>
                    <Button color="error" size="large" sx={{ mb: 2}} onClick={() => setOpenDeleteDialog(true)}>Delete</Button>
                </Box>
            </AccordionDetails>
        </Accordion>
        <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)} fullWidth maxWidth="sm">
            <DeleteDialog deleteSingleTask={deleteSingleTask} id={taskData._id} closeDeleteDialog={setOpenDeleteDialog}></DeleteDialog>
        </Dialog>
        <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)} fullWidth maxWidth="lg">
            <EditDialog closeEditDialog={setOpenEditDialog} formSubmit={formSubmit} taskData={taskData}></EditDialog>
        </Dialog>
        <Dialog open={openRequestDialog} onClose={() => setOpenRequestDialog(false)} fullWidth maxWidth="lg">
            <RequestDialog closeRequestDialog={setOpenRequestDialog} taskData={taskData}></RequestDialog>
        </Dialog>
        </>
    );
}

export default TaskAccordion;