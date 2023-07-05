import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CardE from '../CardE';
import { Grid } from '@mui/material';

function HomeCardHolder(props) {
    const [weekMeetings, setWeekMeetings] = useState([]);
    const [clientsWithWeekMeetings, setClientsWithWeekMeetings] = useState([]);

    useEffect(() => {
        // Fetch Week's meetings
        axios
            .get('/api/Meetings/Week')
            .then((response) => {
                setWeekMeetings(response.data);
            })
            .catch((error) => {
                console.error(error);
            });

    }, []);

    return (
        <>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 1 }} sx={{ margin: 0, marginTop: 4 }}>
                {/* Render Week's meetings */}
                {weekMeetings.map((day, index) => (
                    <Grid key={`${day.dayOfWeek}-${index}`} xs={5/3} sx={{ padding: '0 16px' }}>
                        <CardE day={day} />
                    </Grid>
                ))}
            </Grid>
        </>
    );
}

export default HomeCardHolder;
