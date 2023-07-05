import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {useEffect, useState} from "react";
import axios from "axios";

const columns = [
    { id: 'client', label: 'Client', minWidth: 170 },
    { id: 'representative', label: 'Representative', minWidth: 170 },
    { id: 'company', label: 'Company', minWidth: 170 },
    { id: 'phone', label: 'Phone', minWidth: 170 },
    { id: 'iranTime', label: 'Iran Time', minWidth: 100 },
];

function createData(client, representative, company, phone, iranTime, ) {
    return { client,representative, company, phone, iranTime };
}


export default function StickyHeadTable() {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        fetchMeetings();
    }, []);
    const fetchMeetings = async () => {
        try {
            const response = await axios.get('/api/Meetings/Today');
            const todayMeetings = response.data;
            const updatedRows = todayMeetings.map((meeting) =>
                createData(
                    meeting.Client.Name,
                    meeting.Representative,
                    meeting.Company.Name,
                    meeting.Company.Phone,
                    meeting.IranTime
                )
            );
            setRows(updatedRows);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.format && typeof value === 'number'
                                                        ? column.format(value)
                                                        : value}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
           
        </Paper>
    );
}