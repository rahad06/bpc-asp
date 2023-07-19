import React, {useState, useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography} from '@mui/material';
import axios from 'axios';
import {useParams} from "react-router-dom";

const NewInterpreter = () => {
    const {id} = useParams()
    const {handleSubmit, register, reset} = useForm();

    const [name, setName] = useState("")
    useEffect(() => {
        if (id) {
            fetchInterpreter()
        }
    }, []);

    const fetchInterpreter = async () => {
        try {
            const response = await axios.get(`/api/Interpreters/${id}`);
            console.log(response.data)
            setName(response.data.name)
        } catch (error) {
            console.error(error);
        }
    }

    const onEdit = async () => {
        try {
            const res = axios.put(`/api/Interpreters/${id}`, {
                id: id,
                name: name,
            })
        } catch (err) {
            console.log(err)
        }
    }
    const onSubmit = async (data) => {
        console.log(data)
        
        try {
            const response = await axios.post('/api/Interpreters/Create', data);
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
                    Add Industry
                </Typography>
            </Grid>
            <Grid item xs={12}>
                {id ? (
                    <form onSubmit={handleSubmit(onEdit)}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Client Name"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button type="submit" variant="contained" color="primary">
                                    Submit
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                ) : (
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid container spacing={2}>
                           
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Name"
                                    {...register('name')}
                                    required
                                />
                            </Grid>
                           
                            <Grid item xs={12}>
                                <Button type="submit" variant="contained" color="primary">
                                    Submit
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                )}
            </Grid>
        </Grid>
    );
};

export default NewInterpreter;
