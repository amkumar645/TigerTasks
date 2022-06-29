import { Box, Button, DialogActions, DialogTitle, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import React from "react";
import { Controller, useForm } from "react-hook-form";

const EditDialog = ({closeEditDialog, formSubmit, taskData}) => {
    const { handleSubmit, reset, control } = useForm();

    const handleOnSubmit = (evt) => {
        formSubmit(evt, taskData._id, taskData);
        closeEditDialog(false);
    };

    return (
        <Box sx={{textAlign: 'center', ml: 3, mr: 3}} component="form" onSubmit={handleSubmit(handleOnSubmit)}>
            <DialogTitle sx={{ mb: 3, fontSize: '30px', fontFamily: 'Raleway', fontWeight: 600}}>
                Edit Task
            </DialogTitle>
            <Controller 
                control={control}
                name="title"
                defaultValue={taskData.title}
                rules={{
                    required: true,
                }}
                render={({ field }) => (
                    <TextField
                        {...field}
                        sx={{
                            width: '48%',
                            mr: '4%'
                        }}
                        variant="outlined"
                        label="Task Title*"
                    />
                )}
            />
            <Controller
                control={control}
                name="category"
                defaultValue={taskData.category}
                rules={{
                    required: true,
                }}
                render={({ field }) => (
                    <FormControl sx={{width: '48%', mb: 3}}>
                    <InputLabel>Category*</InputLabel>
                    <Select {...field}
                    variant="outlined"
                    label="Category*">
                        <MenuItem value="Art">Art</MenuItem>
                        <MenuItem value="Tech">Tech</MenuItem>
                        <MenuItem value="Food">Food</MenuItem>
                        <MenuItem value="Shopping">Shopping</MenuItem>
                        <MenuItem value="Transportation">Transportation</MenuItem>
                        <MenuItem value="Activity">Activity</MenuItem>
                        <MenuItem value="Tutoring">Tutoring</MenuItem>
                        <MenuItem value="Other">Other</MenuItem>
                    </Select>
                    </FormControl>   
                )}
            />
            <Controller 
                control={control}
                name="description"
                defaultValue={taskData.description}
                rules={{
                    required: true,
                }}
                render={({ field }) => (
                    <TextField
                        {...field}
                        variant="outlined"
                        label="Description*"
                        placeholder="Task description"
                        multiline
                        fullWidth
                        rows={4}
                        sx={{ mb: 3 }}
                    />
                )}
            />
            <Controller 
                control={control}
                name="skills"
                defaultValue={taskData.skills}
                render={({ field }) => (
                    <TextField
                        {...field}
                        sx={{
                            width: '48%',
                            mr: '4%',
                            mb: 3
                        }}
                        variant="outlined"
                        label="Skills Required"
                    />
                )}
            />
            <Controller 
                control={control}
                name="price"
                defaultValue={taskData.price}
                rules={{
                    required: true,
                }}
                render={({ field }) => (
                    <TextField
                        {...field}
                        sx={{
                            width: '48%',
                            mb: 3
                        }}
                        type="number"
                        variant="outlined"
                        label="Payment (in dollars)*"
                    />
                )}
            />
            <Controller 
                control={control}
                name="phone"
                defaultValue={taskData.phone}
                render={({ field }) => (
                    <TextField
                        {...field}
                        sx={{
                            width: '48%',
                            mr: '4%',
                            mb: 3
                        }}
                        rules={{
                            pattern: /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/
                        }}
                        type="text"
                        variant="outlined"
                        label="Contact Phone Number"
                    />
                )}
            />
            <Controller 
                control={control}
                name="deadline"
                defaultValue={taskData.deadline}
                render={({ field }) => (
                    <TextField
                        {...field}
                        sx={{
                            width: '48%',
                        }}
                        rules={{
                            pattern: /^(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)\d\d$./
                        }}
                        type="text"
                        variant="outlined"
                        label="Deadline (mm/dd/yy)"
                    />
                )}
            />
            <DialogActions sx={{textAlign: 'center'}}>
                <Grid container justify="center">    
                    <Grid item xs={12} sx={{mb: 3, mt: 3}}>
                        <Button sx={{mr: 3}} type="submit" color="success" variant="contained">Save</Button>
                        <Button color="error" variant="contained" onClick={() => closeEditDialog(false)}>Cancel</Button>
                    </Grid>
                </Grid>
            </DialogActions>
        </Box>
    );
    
}

export default EditDialog;