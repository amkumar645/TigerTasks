import React, { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Button, Chip, Typography } from "@mui/material";


const TaskAccordion = ({taskData, deleteTask, setChangeTask, user}) => {
    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
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
                        <Button variant="contained" color="primary" size="small" sx={{ mb: 2, mr: 3}}>Edit</Button>
                        <Button variant="contained" color="error" size="small" sx={{ mb: 2}}>Delete</Button>
                    </Box>
                </AccordionDetails>
            </Accordion>
    )
}

export default TaskAccordion;