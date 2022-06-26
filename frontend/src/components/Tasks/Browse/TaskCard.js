import React, {useState, useEffect} from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Box, Button, Chip, Dialog, Grid, IconButton } from '@mui/material';
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
import FlagIcon from '@mui/icons-material/Flag';
import CategoryChip from '../CategoryChip/CategoryChip';
import ViewDialog from '../MyTasks/Dialogs/ViewDialog';

const TaskCard = ({taskData, user, flagTask}) => {
    const [flagged, setFlagged] = useState(taskData.flaggedby.includes(user.user.netID));
    const [openViewDialog, setOpenViewDialog] = useState(false);

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
        <Card sx={{ maxWidth: 400, alignItems: 'center', backgroundColor: "#f5f5f5" }} variant="outlined">
            <Box sx={{textAlign:"right"}}>
                <IconButton
                        size="large"
                        onClick={() => flagThisTask(!flagged)}
                        sx={{color: "red"}}
                >
                    {!flagged && <FlagOutlinedIcon></FlagOutlinedIcon>}
                    {flagged && <FlagIcon></FlagIcon>}
                </IconButton>
            </Box>
            <CardContent sx={{textAlign: 'center'}}>
                <Typography variant="h4" component="div" sx={{ fontWeight: 600, mt:-1, mb: 1, textAlign:'center', fontFamily: 'Raleway'}}>
                    { taskData !== undefined && taskData.title}
                </Typography>
                <CategoryChip category={taskData.category}></CategoryChip>
                <hr></hr>
                { taskData.description.length <= 100 && <Typography variant="body1" sx={{ mt: 2, fontFamily: 'Raleway'}}>
                    { taskData !== undefined && taskData.description}
                </Typography>}
                { taskData.description.length > 100 && <Typography variant="body1" sx={{ mt: 2, fontFamily: 'Raleway'}}>
                    { taskData !== undefined && taskData.description.substring(0, 100)}...
                </Typography>}
                <hr></hr>
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
                <Button color="primary" size="small" sx={{ mt: 3 }} onClick={() => setOpenViewDialog(true)}>SEE MORE</Button>
            </CardContent>
        </Card>
        <Dialog open={openViewDialog} onClose={() => setOpenViewDialog(false)} fullWidth maxWidth="md">
            <ViewDialog taskData={taskData} closeViewDialog={setOpenViewDialog}></ViewDialog>
        </Dialog>
        </>
    );
}
export default TaskCard;