import React, { useEffect, useState } from 'react';
import { Grid } from "@mui/material";
import axios from 'axios';
import ClientCard from "./ClientCard";

function HomeClientsCard(props) {
    const [clients, setClients] = useState([]);

    useEffect(() => {
        fetchClientsWithTodayMeetings();
    }, []);

    const fetchClientsWithTodayMeetings = async () => {
        try {
            const today = new Date().toISOString().split('T')[0]; // Get today's date in the format "YYYY-MM-DD"
            const response = await axios.get(`/api/Meetings/Clients/ThisMonth`);
            setClients(response.data);
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ margin: '0 !important', gap: '28px' }}>
            {clients.map((client) => (
                <Grid key={client.id} item={true} xs={5}>
                    <ClientCard client={client} />
                </Grid>
            ))}
        </Grid>
    );
}

export default HomeClientsCard;
