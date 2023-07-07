import React, {useEffect, useState} from 'react';
import { format } from 'date-fns';
import {
    Button,
    Grid,
    Typography,
} from '@mui/material';

import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import AsyncSelect from 'react-select/async';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {useParams} from "react-router-dom";
import {useForm} from "react-hook-form";

const NewMeeting = () => {
    const {id} = useParams()
    
    const [companies, setCompanies] = useState([]);
    const [clients, setClients] = useState([]);
    const [statuses, setStatuses] = useState([]);
    const [companyId, setCompanyId] = useState(null);
    const [statusId, setStatusId] = useState(null);
    const [statusName, setStatusName] = useState('');
    const [clientId, setClientId] = useState(null);
    const [meetingDate, setMeetingDate] = useState('');
    const [spainTime, setSpainTime] = useState('');
    const [iranTime, setIranTime] = useState('');
    const {reset, handleSubmit} = useForm()
    useEffect(() => {
        // Fetch the companies, clients, and statuses from the API
        const fetchData = async () => {
            try {
                const [companiesResponse, clientsResponse, statusesResponse] = await Promise.all([
                    axios.get('/api/Companies'),
                    axios.get('/api/Clients'),
                    axios.get('/api/MeetingStatuses'),
                ]);

                setCompanies(companiesResponse.data);
                setClients(clientsResponse.data);
                setStatuses(statusesResponse.data);
            } catch (error) {
                console.error(error);
            }
            if(id) {
                const meetingData = await axios.get(`/api/Meetings/${id}`)
                let data = meetingData.data
                const formattedMeetingDate = format(new Date(data.MeetingDate), 'yyyy-MM-dd');
                setClientId(data.ClientId)
                setCompanyId(data.CompanyId)
                setStatusId(data.MeetingStatusId)
                setMeetingDate(formattedMeetingDate)
                setSpainTime(data.SpainTime)
                setIranTime(data.IranTime)
            }
        };
        fetchData();
    }, []);
    const loadCompaniesOptions = async (inputValue) => {
        try {
            const response = await axios.get('/api/Companies', {
                params: { searchQuery: inputValue },
            });
            setCompanyId(response?.data[0].id);

            return response?.data;
        } catch (error) {
            console.error(error);
            return [];
        }
    };

    const loadClientsOptions = async (inputValue) => {
        try {
            const response = await axios.get('/api/Clients', {
                params: { searchQuery: inputValue },
            });
            setClientId(response.data[0].id);
            return response.data;
        } catch (error) {
            console.error(error);
            return [];
        }
    };

    const handleStatusChange = (event, status) => {
        setStatusId(status.meetingStatusId)
        setStatusName(status.status)
    };

    const handleDate = (event) => {
        setMeetingDate(event.target.value);
    };

    const handleSpTime = (event) => {
        setSpainTime(event.target.value);
    };

    const handleIrTime = (event) => {
        setIranTime(event.target.value);
    };

    const onSubmit = async () => {
        let data;
        if(id) {
            data = {
                meetingId: parseInt(id),
                clientId,
                companyId,
                meetingDate,
                iranTime,
                spainTime,
                meetingStatusId: statusId
            }
            console.log(data)
            try {
                const res = await axios.put(`/api/Meetings/${id}`, {
                    meetingId: parseInt(id),
                    clientId,
                    companyId,
                    meetingDate,
                    iranTime,
                    spainTime,
                    meetingStatusId: statusId
                })
                console.log(res)
            } catch (err) {
                console.log(err)
            }
        } else {
            data = {
                clientId,
                companyId,
                meetingDate,
                iranTime,
                spainTime,
                meetingStatusId: statusId
            }
            try {
                const response = await axios.post('/api/Meetings', data);
                console.log(response.data); // Handle the response as needed
                reset(); // Reset the form after successful submission
            } catch (error) {
                console.error(error);
            }
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
                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <AsyncSelect
                                        id="company"
                                        placeholder="Company"
                                        options={companies}
                                        getOptionLabel={(option) => option.name}
                                        getOptionValue={(option) => option.id}
                                        loadOptions={loadCompaniesOptions}
                                        value={companies.find((company) => company.id === companyId)}
                                        
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <AsyncSelect
                                        id="client"
                                        placeholder="Client"
                                        options={clients}
                                        getOptionLabel={(option) => option.name}
                                        getOptionValue={(option) => option.id}
                                        loadOptions={loadClientsOptions}
                                        value={clients.find((client) => client.id === clientId)}

                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <Select
                                        labelId="status-id"
                                        id="status"
                                        label="Status"
                                        value={statusId}
                                    >
                                        {statuses.map((status) => (
                                            <MenuItem key={status.meetingStatusId} value={status.meetingStatusId}
                                            onClick={(e) => handleStatusChange(e, status)}>
                                                {status.status}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    id="meetingDate"
                                    label="Meeting Date"
                                    type="date"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    fullWidth
                                    value={meetingDate}
                                    onChange={(e) => handleDate(e)}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    id="spain-time"
                                    label="Spain Time"
                                    type="time"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    fullWidth
                                    value={spainTime}
                                    onChange={(e) => handleSpTime(e)}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    id="iran-time"
                                    label="Iran Time"
                                    type="time"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    fullWidth
                                    value={iranTime}
                                    onChange={(e) => handleIrTime(e)}
                                />
                            </Grid>
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

export default NewMeeting;
