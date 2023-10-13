import React, {useState, useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography} from '@mui/material';
import axios from 'axios';
import {useNavigate, useParams} from "react-router-dom";

const NewIndustry = () => {
    const {id} = useParams()
    const {handleSubmit, register, reset} = useForm();

    const [name, setName] = useState("")
    useEffect(() => {
        if (id) {
            fetchIndustry()
        }
    }, []);

    const fetchIndustry = async () => {
        try {
            const response = await axios.get(`/api/Industries/${id}`);
            console.log(response.data)
            setName(response.data.name)
        } catch (error) {
            console.error(error);
        }
    }
const navigate = useNavigate()
    const onEdit = async () => {
        try {
            const res = axios.put(`/api/Industries/${id}`, {
                id: id,
                name: name,
            })
            navigate('/industries')
        } catch (err) {
            console.log(err)
            alert(err)
        }
    }
    const onSubmit = async (data) => {
        
        try {
            const response = await axios.post('/api/Industries/Create', data);
            console.log(response.data); // Handle the response as needed
            reset(); // Reset the form after successful submission
            navigate('/industries')
        } catch (error) {
            console.error(error);
            alert(error)
        }
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <div>
                    <div className="panel with-scroll animated zoomIn">
                        <div className="panel-heading clearfix">
                            <h3 className="panel-title">Industry</h3>
                        </div>
                        <div className="panel-body">
                            <div
                                className="ng-scope">
                {id ? (
                    <form className="ng-pristine ng-valid ng-scope"  onSubmit={handleSubmit(onEdit)}>

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

                            </div>
                        </div>
                    </div>
                </div>
            </Grid>
        </Grid>
    );
};

export default NewIndustry;
