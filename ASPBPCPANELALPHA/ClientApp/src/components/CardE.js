import React, {useEffect} from 'react';
import {Grid} from "@mui/material";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import axios from "axios";

function CardE(props) {
    const getMeetingSummary = async (id) => {
        const response = await axios.get(`/api/Meetings/${id}`);
        console.log(response)
    }
    const bull = (
        <Box
            component="span"
            sx={{display: 'inline-block', mx: '2px', transform: 'scale(0.8)'}}
        >
            •
        </Box>
    );
    return (
        <Card sx={{minWidth: 80}}>
            <CardContent>
                <Typography variant="h6" component="div">
                    {props.day.dayOfWeek}
                </Typography>
                <Grid container rowSpacing={1} columnSpacing={{xs: 1, sm: 2, md: 1}} sx={{margin: 0}}>
                    {props.day.meetings.map((m) => (
                        <Grid key={m.meetingId} xs={12} sx={{padding: '4px 8px 0 0'}}>
                            <Typography>
                            <span style={{cursor: 'pointer'}} onClick={()=> getMeetingSummary(m.meetingId)}>
                            {m.iranTime}
                                </span>
                            </Typography>
                        </Grid>
                    ))}
                </Grid>
            </CardContent>
        </Card>
    );
}

export default CardE;
