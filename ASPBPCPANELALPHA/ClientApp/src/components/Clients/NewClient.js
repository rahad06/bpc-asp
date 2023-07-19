import React, {useState, useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography} from '@mui/material';
import axios from 'axios';
import {useParams} from "react-router-dom";
import CustomSearchable from "../CustomSearchable";
import NewIndustry from "../Industries/NewIndustry";

const NewClient = () => {
    const {id} = useParams()
    const {handleSubmit, register, reset} = useForm();
    const [industries, setIndustries] = useState([]);

    const [clientName, setClientName] = useState("")
    const [website, setWebsite] = useState("")
    const [rep, setRep] = useState("")
    const [industryId, setIndustryId] = useState(null)
    useEffect(() => {
        fetchIndustries();
        if (id) {
            fetchClient()
        }
    }, []);

    const fetchClient = async () => {
        try {
            const response = await axios.get(`/api/Clients/${id}`);
            console.log(response.data)
            setClientName(response.data.name)
            setWebsite(response.data.website)
            setRep(response.data.representative)
            setIndustryId(response.data.industry.id)
        } catch (error) {
            console.error(error);
        }
    }
    const fetchIndustries = async () => {
        try {
            const response = await axios.get('/api/Industries');
            setIndustries(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const onEdit = async () => {
        try {
            const res = axios.put(`/api/Clients/${id}`, {
                id: id,
                name: clientName,
                website: website,
                representative: rep,
                industryId: industryId
            })
        } catch (err) {
            console.log(err)
        }
    }
    const onSubmit = async (data) => {
        console.log(data)
        if (data.industryId === "") {
            data = {
                name: data.name,
                representative: data.representative,
                website: data.website
            }
        } else {
            data = {
                name: data.name,
                representative: data.representative,
                website: data.website,
                industryId: parseInt(data.industryId)
            }
        }
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
                {id ? (
                    <form onSubmit={handleSubmit(onEdit)}>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <CustomSearchable
                                        title={'Industry'}
                                        data={industries} clickFn={setIndustryId} value={industryId}>
                                        <NewIndustry/>
                                    </CustomSearchable>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    label="Client Name"
                                    value={clientName}
                                    onChange={e => setClientName(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    label="Website"
                                    value={website}
                                    onChange={e => setWebsite(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    label="Representative"
                                    value={rep}
                                    onChange={e => setRep(e.target.value)}
                                />
                            </Grid>
                            {/* Add more form fields as needed */}
                            <Grid item xs={6}>
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
                                <FormControl fullWidth>
                                    <CustomSearchable
                                        title={'Industry'}
                                        data={industries} clickFn={setIndustryId} value={industryId}>
                                        <NewIndustry/>
                                    </CustomSearchable>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    label="Client Name"
                                    {...register('name')}
                                    required
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    label="Website"
                                    {...register('website')}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    label="Representative"
                                    {...register('representative')}
                                />
                            </Grid>
                            {/* Add more form fields as needed */}
                            <Grid item xs={6}>
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

export default NewClient;
