import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import axios from 'axios';

const AddClientPage = () => {
    const { handleSubmit, register, reset } = useForm();
    const [industries, setIndustries] = useState([]);

    useEffect(() => {
        fetchIndustries();
    }, []);

    const fetchIndustries = async () => {
        try {
            const response = await axios.get('/api/Industries');
            setIndustries(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const onSubmit = async (data) => {
        try {
            const response = await axios.post('/api/clients', data);
            console.log(response.data); // Handle the response as needed
            reset(); // Reset the form after successful submission
        } catch (error) {
            console.error(error);
        }
    };

    return (
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h6" component="h2">
                        Add Client
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <InputLabel id="industry-label">Industry</InputLabel>
                                    <Select
                                        labelId="industry-label"
                                        id="industry"
                                        {...register('industryId')}
                                    >
                                        {industries.map((i) => (
                                            <MenuItem key={i.id} value={i.id}>
                                                {i.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Client Name"
                                    {...register('name')}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Website"
                                    {...register('website')}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Representative"
                                    {...register('representative')}
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
    );
};

export default AddClientPage;
