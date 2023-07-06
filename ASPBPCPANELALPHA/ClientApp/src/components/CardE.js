import React, {useEffect, useState} from 'react';
import {FormControl, Grid, InputLabel, MenuItem, Select} from "@mui/material";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios";

function CardE(props) {
    const [meetingInfo, setMeetingInfo] = useState(null)
    const [popUp, setPopUp] = useState(false)

    const getMeetingSummary = async (id) => {
        const response = await axios.get(`/api/Meetings/${id}`);
        console.log(response.data)
        setMeetingInfo(response.data)
        setPopUp(true)
    }
    const handleStatusChange = async (e, i) => {
        console.log(e, i.meetingStatusId, meetingInfo)
        const res = axios.put(`/api/Meetings/UpdateMeetingStatus/${meetingInfo.MeetingId}?meetingStatusId=${i.meetingStatusId}`)
        console.log(res)
    }
    const bull = (
        <Box
            component="span"
            sx={{display: 'inline-block', mx: '2px', transform: 'scale(0.8)'}}
        >
            •
        </Box>
    );
    if (!props) return;
    if (popUp) return (
        <div className={'home-card-w-select'}>
            <Card sx={{minWidth: 80}}>
                <CardContent>
                    <div className={'close-icon'}>
                        <CloseIcon onClick={() => {
                            props.getWeekMeetings().then(() => {
                                setPopUp(false)
                            })
                        }}/>
                    </div>
                    <Typography variant="body1" component="p">
                        {meetingInfo.Client.Name}
                    </Typography>
                    <Typography variant="body1" component="p">
                        {meetingInfo.Company.Name}
                    </Typography>
                    <Grid container rowSpacing={1} columnSpacing={{xs: 1, sm: 2, md: 1}} sx={{margin: 0}}>
                        <FormControl fullWidth>
                            <InputLabel id="status-label">Status</InputLabel>
                            <Select
                                labelId="statu-label"
                                id="meetingStatus"
                            >
                                {props.statuses.map((i) => (
                                    <MenuItem key={`${i.meetingStatusId}-statusSelect`} value={i.meetingStatusId}
                                              onClick={(e) => handleStatusChange(e, i)}
                                    >
                                        {i.status}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                </CardContent>
            </Card>
        </div>
    )
    return (
        <Card sx={{minWidth: 80}}>
            <CardContent>
                <Typography variant="h6" component="div">
                    {props.day.dayOfWeek}
                </Typography>
                <Grid container rowSpacing={1} columnSpacing={{xs: 1, sm: 2, md: 1}} sx={{margin: 0}}>
                    {props.day.meetings.map((m) => (
                        <Grid key={m.meetingId} xs={12} sx={{padding: '4px 8px 0 0', position: 'relative'}}>
                            <Box sx={{textAlign: 'center', 
                                
                            }}>
                            <span style={{cursor: 'pointer'}}
                                  className={`meeting-card-time-span ${m.meetingStatusId === 1 ? "yellow-status" : "green-status"}`}
                                  onClick={() => getMeetingSummary(m.meetingId)}>
                            {m.iranTime}
                                </span>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </CardContent>
        </Card>
    );
}

export default CardE;
