import { Box, Button, DialogActions, DialogTitle, Grid, Typography } from "@mui/material";

const SuccessDialog = ({closeErrorDialog, message}) => {
    return (
        <Box sx={{textAlign: 'center', ml: 3, mr: 3, fontFamily: 'Raleway'}}>
            <DialogTitle sx={{ mb: 3, fontSize: '30px', fontFamily: 'Raleway', fontWeight: 600, color: "red"}}>
                ERROR
            </DialogTitle>
            <Typography sx={{ mb: 1, fontSize: '20px', fontFamily: 'Raleway', fontWeight: 500}}>
                {message}
            </Typography>
            <DialogActions>
                <Grid container justify="center">    
                    <Grid item xs={12} sx={{mb: 3, mt: 3}}>
                        <Button color="error" variant="contained" onClick={() => closeErrorDialog(false)}>OK!</Button>
                    </Grid>                
                </Grid>
            </DialogActions>
        </Box>
    );
}

export default SuccessDialog;