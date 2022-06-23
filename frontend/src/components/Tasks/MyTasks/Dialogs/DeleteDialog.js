import { Button, DialogActions, DialogTitle, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";

const DeleteDialog = ({closeDeleteDialog, deleteSingleTask, id}) => {
    const deleteTask = () => {
        deleteSingleTask(id);
        closeDeleteDialog(false);
    }
    return (
        <Box sx={{textAlign: 'center', ml: 3, mr: 3, fontFamily: 'Raleway'}}>
            <DialogTitle sx={{ mb: 3, fontSize: '30px', fontFamily: 'Raleway', fontWeight: 600}}>
                Delete Task?
            </DialogTitle>
            <Typography sx={{ mb: 1, fontSize: '20px', fontFamily: 'Raleway', fontWeight: 500}}>
                Are you sure you want to delete this task?
            </Typography>
            <DialogActions>
                <Grid container justify="center">    
                    <Grid item xs={12} sx={{mb: 3, mt: 3}}>
                        <Button sx={{mr: 3}} color="error" variant="contained" onClick={() => deleteTask()}>Delete</Button>
                        <Button color="info" variant="contained" onClick={() => closeDeleteDialog(false)}>Cancel</Button>
                    </Grid>                
                </Grid>
            </DialogActions>
        </Box>

    );
}

export default DeleteDialog;
