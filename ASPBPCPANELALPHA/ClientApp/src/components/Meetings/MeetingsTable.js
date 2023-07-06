import {useEffect, useState} from "react";
import axios from "axios";
import {Table, TableHead, TableRow, TableCell, TableBody} from '@mui/material';
import ReactExport from "react-data-export/src";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const MeetingsTable = ({clientId}) => {
    const [meetings, setMeetings] = useState([]);

    useEffect(() => {
        // Fetch meetings data from the API using Axios
        axios
            .get(`/api/Meetings/Client/1`)
            .then((response) => {
                setMeetings(response.data);
                console.log(response)
            })
            .catch((error) => {
                console.log(error);
            });
    }, [clientId]);

    const DataSet = [
        {
            columns: [
                {title: "Meeting Id", style: {font: {sz: '18', bold: true}, width: {wpx: 125}}},
                {title: "Meeting Date", style: {font: {sz: '18', bold: false}, width: {wpx: 125}}},
                {title: "Meeting Status", style: {font: {sz: '18', bold: true}, width: {wpx: 125}}},
            ],
            data: meetings.map((data) => [
                {value: data.MeetingId, style: {font: {sz: '14', bold: true}}},
                {value: data.MeetingDate, style: {font: {sz: '14', bold: false}}},
                {
                    value: data.MeetingStatus.Status,
                    style: {font: {sz: '14', bold: true}, fill: {patternType: "solid", fgColor: 'green'}}
                }
            ])
        }
    ]
    return (
        <>
            <ExcelFile filename={'test'} element={
                <>
                    <button>get excel</button>
                    <ExcelSheet dataSet={DataSet} name={'test sheet'}/>
                </>
            }>
            </ExcelFile>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Meeting ID</TableCell>
                        <TableCell>Meeting Date</TableCell>
                        <TableCell>Meeting Status</TableCell>
                        {/* Add more table headers */}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {meetings.map((meeting) => (
                        <TableRow key={meeting.MeetingId}>
                            <TableCell>{meeting.MeetingId}</TableCell>
                            <TableCell>{meeting.MeetingDate}</TableCell>
                            <TableCell>{meeting.MeetingStatus.Status}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    );
};

export default MeetingsTable;
