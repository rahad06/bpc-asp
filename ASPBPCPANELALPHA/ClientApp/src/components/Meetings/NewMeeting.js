import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

const AddMeetingPage = () => {
    const { handleSubmit, register, reset } = useForm();

    const onSubmit = async (data) => {
        console.log(data)
        try {
            const response = await axios.post('/api/Meetings', data);
            console.log(response.data); // Handle the response as needed
            reset(); // Reset the form after successful submission
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>

        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h6" component="h2">
                    Add Meeting
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel id="company-label">Company</InputLabel>
                                <Select
                                    labelId="company-label"
                                    id="company"
                                    {...register('companyId')}
                                >
                                    <MenuItem value={1}>Company 1</MenuItem>
                                    <MenuItem value={2}>Company 2</MenuItem>
                                    {/* Add more options as needed */}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel id="client-label">Client</InputLabel>
                                <Select
                                    labelId="client-label"
                                    id="client"
                                    {...register('clientId')}
                                >
                                    <MenuItem value={1}>Client 1</MenuItem>
                                    <MenuItem value={2}>Client 2</MenuItem>
                                    {/* Add more options as needed */}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel id="status-label">Meeting Status</InputLabel>
                                <Select
                                    labelId="status-label"
                                    id="status"
                                    {...register('meetingStatusId')}
                                >
                                    <MenuItem value={1}>Status 1</MenuItem>
                                    <MenuItem value={2}>Status 2</MenuItem>
                                    {/* Add more options as needed */}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="meetingDate"
                                label="Meeting Date"
                                type="date"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                {...register('meetingDate')}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="spain-time"
                                label="Spain Time"
                                type="time"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                {...register('spainTime')}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="iran-time"
                                label="Iran Time"
                                type="time"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                {...register('iranTime')}
                                fullWidth
                            />
                        </Grid>
                        {/* Add more form fields as needed */}
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="primary">
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Grid>
        </Grid>
        </LocalizationProvider>
    );
};

export default AddMeetingPage;
