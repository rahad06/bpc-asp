import React, {useState, useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography} from '@mui/material';
import axios from 'axios';
import {useParams} from "react-router-dom";

const NewAgenda = () => {
    const {id} = useParams()
    const {handleSubmit, register, reset} = useForm();

    const [name, setName] = useState("")
    const [stage, setStage] = useState("")
    useEffect(() => {
        if (id) {
            fetchAgenda()
        }
    }, []);

    const fetchAgenda = async () => {
        try {
            const response = await axios.get(`/api/Agendas/${id}`);
            console.log(response.data)
            setName(response.data.name)
            setStage(response.data.stage)
        } catch (error) {
            console.error(error);
        }
    }

    const onEdit = async () => {
        try {
            const res = axios.put(`/api/Agendas/${id}`, {
                id: id,
                name: name,
                stage: stage,
            })
        } catch (err) {
            console.log(err)
        }
    }
    const onSubmit = async (data) => {
        console.log(data)
        
        try {
            const response = await axios.post('/api/Agendas/Create', data);
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
                    Add Agenda
                </Typography>
            </Grid>
            <Grid item xs={12}>
                {id ? (
                    <form onSubmit={handleSubmit(onEdit)}>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    label="Agenda/Research Name"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    label="Stage"
                                    value={stage}
                                    onChange={e => setStage(e.target.value)}
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
                           
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    label="Name"
                                    {...register('name')}
                                    required
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    label="Stage"
                                    {...register('stage')}
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

export default NewAgenda;
