import { Box, Button, DialogActions, DialogTitle, Divider, Grid, List, ListItem, ListItemText, Typography } from "@mui/material"

const RequestDialog = ({closeRequestDialog, taskData}) => {
    const requests = taskData.requestedby;
    return (
        <Box sx={{textAlign: 'center', ml: 3, mr: 3, fontFamily: 'Raleway'}}>
            <DialogTitle sx={{ mb: 3, fontSize: '30px', fontFamily: 'Raleway', fontWeight: 600}}>
                Current Requests
            </DialogTitle>
            <List sx={{width: '100%', backgroundColor: 'background.paper'}} 
            component="nav" aria-label="mailbox folders">
                {requests != null && requests.map((request, i) => (
                    <>
                    <Divider/>
                        <ListItem button>
                            <ListItemText><b>NetID:&nbsp;</b>{request}</ListItemText>
                            <ListItemText><b>Contact Email:&nbsp;</b>{request}@princeton.edu</ListItemText>
                        </ListItem>
                    <Divider/>
                    </>
                ))}
            </List>
            <DialogActions>
                <Grid container justify="center">    
                    <Grid item xs={12} sx={{mb: 3}}>
                        <Button color="error" variant="contained" onClick={() => closeRequestDialog(false)}>Close</Button>
                    </Grid>                
                </Grid>
            </DialogActions>
        </Box>

    );
}

export default RequestDialog;