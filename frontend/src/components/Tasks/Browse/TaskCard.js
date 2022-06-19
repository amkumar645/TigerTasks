import React, {useState, useEffect} from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Box, Chip, IconButton } from '@mui/material';
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
import FlagIcon from '@mui/icons-material/Flag';

const TaskCard = ({taskData, deleteTask, setChangeTask}) => {
    const [flagged, setFlagged] = useState(false)


    return (
        <Card sx={{ maxWidth: 400, alignItems: 'center' }} variant="outlined">
            <Box sx={{textAlign:"right"}}>
                <IconButton
                        size="large"
                        onClick={() => setFlagged(!flagged)}
                        sx={{color: "red"}}
                >
                    {!flagged && <FlagOutlinedIcon></FlagOutlinedIcon>}
                    {flagged && <FlagIcon></FlagIcon>}
                </IconButton>
            </Box>
            <CardContent sx={{textAlign: 'center'}}>
                <Typography variant="h4" component="div" sx={{ fontWeight: 600, mt:-1, mb: 1, textAlign:'center'}}>
                    { taskData !== undefined && taskData.title}
                </Typography>
                <Chip label={taskData.category} color="primary" sx={{ mb: 1, fontSize: '16px'}}/>
                <hr></hr>
                <Typography variant="body1" sx={{ mt: 2}}>
                    { taskData !== undefined && taskData.description}
                </Typography>
                <hr></hr>
                <Typography variant="body2" sx={{ mt: 2}}>
                   <b>Price:</b> ${ taskData !== undefined && taskData.price}
                </Typography>
                <Typography variant="body2" sx={{ mt: 2}}>
                    <b>Skills Required:</b> { taskData !== undefined && taskData.skills}
                </Typography>
                <Typography variant="body2" sx={{ mt: 2}}>
                    <b>Deadline:</b> { taskData !== undefined && taskData.deadline}
                </Typography>
                <Typography variant="body2" sx={{ mt: 2}}>
                    <b>Created By:</b> { taskData !== undefined && taskData.createdby}
                </Typography>
                <Typography variant="body2" sx={{ mt: 2}}>
                    <b>Contact Email:</b> { taskData !== undefined && taskData.email}
                </Typography>
                <Typography variant="body2" sx={{ mt: 2}}>
                    <b>Contact Phone Number:</b> { taskData !== undefined && taskData.phone}
                </Typography>
            </CardContent>
            <CardActions sx={{display: 'inline'}}>
                {/* <Button variant="contained" size="small" sx={{backgroundColor: '#357a38', mb: 2}}>See More</Button>
                <Button variant="contained" size="small" sx={{backgroundColor: '#aa2e25', mb: 2}}>Flag</Button> */}
            </CardActions>
        </Card>
    );

    function changeTask(){
        setChangeTask({
            "change": true,
            "id": taskData._id
        })
    }
}
export default TaskCard;