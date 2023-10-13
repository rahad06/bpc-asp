import React, {useState, useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography} from '@mui/material';
import axios from 'axios';
import {useNavigate, useParams} from "react-router-dom";
import CustomSearchable from "../CustomSearchable";
import NewIndustry from "../Industries/NewIndustry";
import NewAgenda from "../Agendas/NewAgenda";
import ClientForm from "./ClientForm";

const NewClient = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    const {handleSubmit, register, reset} = useForm();
    const [industries, setIndustries] = useState([]);

    const [clientName, setClientName] = useState("")
    const [website, setWebsite] = useState("")
    const [rep, setRep] = useState("")
    const [agenda, setAgenda] = useState("")
    const [agendas, setAgendas] = useState([])
    const [agendasL, setAgendasL] = useState([])
    const [industryId, setIndustryId] = useState(null)
    useEffect(() => {
        fetchIndustries();
        fetchAgendas();
        if (id) {
            fetchClient()
        }
    }, []);

    const fetchClient = async () => {
        try {
            const response = await axios.get(`/api/Clients/${id}`);
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

    const fetchAgendas = async () => {
        setAgendasL(true)
        try {
            const response = await axios.get('/api/Agendas');
            console.log(response.data)
            setAgendas(response.data);
        } catch (error) {
            console.error(error);
        }
        setAgendasL(false)
    };

    const onEdit = async () => {
        try {
            const res = axios.put(`/api/Clients/${id}`, {
                id: id,
                name: clientName,
                website: website,
                representative: rep,
                industryId: industryId,
                agendaId: agenda
            })
        } catch (err) {
            console.log(err)
        }
    }
    const onSubmit = async (data) => {
        console.log(data)
        if (!industryId) {
            data = {
                name: data.name,
                representative: data.representative,
                website: data.website,
                agendaId: agenda
            }
        } else {
            data = {
                name: data.name,
                representative: data.representative,
                website: data.website,
                industryId: industryId,
                agendaId: agenda
            }
        }
        try {
            const response = await axios.post('/api/clients', data);
            reset(); // Reset the form after successful submission
            navigate('/clients')
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Grid container item={true} spacing={2}>
            {/*<Grid item={true} xs={12}>*/}
            {/*    <Typography variant="h6" component="h2">*/}
            {/*        Add Client*/}
            {/*    </Typography>*/}
            {/*</Grid>*/}
            <Grid item={true} xs={12}>
                {id ? (
                    <form onSubmit={handleSubmit(onEdit)}>
                        <Grid container spacing={2}>
                            <Grid item={true} xs={6}>
                                <FormControl fullWidth>
                                    <CustomSearchable
                                        title={'Industry'}
                                        data={industries} clickFn={setIndustryId} value={industryId}>
                                        <NewIndustry/>
                                    </CustomSearchable>
                                </FormControl>
                            </Grid>
                            <Grid item={true} xs={6}>
                                <TextField
                                    fullWidth
                                    label="Client Name"
                                    value={clientName}
                                    onChange={e => setClientName(e.target.value)}
                                />
                            </Grid>
                            <Grid item={true} xs={6}>
                                <TextField
                                    fullWidth
                                    label="Website"
                                    value={website}
                                    onChange={e => setWebsite(e.target.value)}
                                />
                            </Grid>
                            <Grid item={true} xs={6}>
                                <TextField
                                    fullWidth
                                    label="Representative"
                                    value={rep}
                                    onChange={e => setRep(e.target.value)}
                                />
                            </Grid>
                            <Grid item={true} xs={6}>
                                {agendasL ? null : (
                                <FormControl fullWidth>
                                    <CustomSearchable
                                        title={'Agenda'}
                                        data={agendas} clickFn={setAgenda} value={agenda}>
                                        <NewAgenda/>
                                    </CustomSearchable>
                                </FormControl>
                                )}
                            </Grid>
                            <Grid item={true} xs={12}>
                                <Button type="submit" variant="contained" color="primary">
                                    Submit
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                ) : (
                    <>
                    <ClientForm
                    industries={industries}
                    setIndustryId={setIndustryId}
                    industryId={industryId}
                    register={register}
                    agendas={agendas}
                    agenda={agenda}
                    setAgenda={setAgenda}
                    handleSubmit={handleSubmit}
                    onEdit={onSubmit}
                    />
                    </>
                )}
            </Grid>
        </Grid>
    );
};

export default NewClient;
