import { Box, Button, DialogActions, DialogTitle, Grid, Typography } from "@mui/material"

const ViewDialog = ({closeViewDialog, taskData}) => {
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
                        <Button color="error" variant="contained" onClick={() => closeViewDialog(false)}>Close</Button>
                    </Grid>                
                </Grid>
            </DialogActions>
        </Box>

    );
}

export default ViewDialog;
