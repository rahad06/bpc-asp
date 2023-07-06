// import {useEffect, useState} from "react";
// import axios from "axios";
// import AppPrim from "../AppPrim";
// import Import from "../Import";
// import BatchCreateForm from "./BatchCreateForm";
//
//
// const rows = [
//     {
//         jobTitle: 'Head of Human Resources',
//         recruitmentDate: new Date(2020, 8, 12),
//         contract: 'full time',
//         id: 0,
//     },
//     {
//         jobTitle: 'Head of Sales',
//         recruitmentDate: new Date(2017, 3, 4),
//         contract: 'full time',
//         id: 1,
//     },
//     {
//         jobTitle: 'Sales Person',
//         recruitmentDate: new Date(2020, 11, 20),
//         contract: 'full time',
//         id: 2,
//     },
//     {
//         jobTitle: 'Sales Person',
//         recruitmentDate: new Date(2020, 10, 14),
//         contract: 'part time',
//         id: 3,
//     },
//     {
//         jobTitle: 'Sales Person',
//         recruitmentDate: new Date(2017, 10, 29),
//         contract: 'part time',
//         id: 4,
//     },
//     {
//         jobTitle: 'Sales Person',
//         recruitmentDate: new Date(2020, 7, 21),
//         contract: 'full time',
//         id: 5,
//     },
//     {
//         jobTitle: 'Sales Person',
//         recruitmentDate: new Date(2020, 7, 20),
//         contract: 'intern',
//         id: 6,
//     },
//     {
//         jobTitle: 'Sales Person',
//         recruitmentDate: new Date(2019, 6, 28),
//         contract: 'full time',
//         id: 7,
//     },
//     {
//         jobTitle: 'Head of Engineering',
//         recruitmentDate: new Date(2016, 3, 14),
//         contract: 'full time',
//         id: 8,
//     },
//     {
//         jobTitle: 'Tech lead front',
//         recruitmentDate: new Date(2016, 5, 17),
//         contract: 'full time',
//         id: 9,
//     },
//     {
//         jobTitle: 'Front-end developer',
//         recruitmentDate: new Date(2019, 11, 7),
//         contract: 'full time',
//         id: 10,
//     },
//     {
//         jobTitle: 'Tech lead devops',
//         recruitmentDate: new Date(2021, 7, 1),
//         contract: 'full time',
//         id: 11,
//     },
//     {
//         jobTitle: 'Tech lead back',
//         recruitmentDate: new Date(2017, 0, 12),
//         contract: 'full time',
//         id: 12,
//     },
//     {
//         jobTitle: 'Back-end developer',
//         recruitmentDate: new Date(2019, 2, 22),
//         contract: 'intern',
//         id: 13,
//     },
//     {
//         jobTitle: 'Back-end developer',
//         recruitmentDate: new Date(2018, 4, 19),
//         contract: 'part time',
//         id: 14,
//     },
// ];
//
// const columns = [
//     { field: 'jobTitle', headerName: 'Job Title', width: 200 },
//     {
//         field: 'recruitmentDate',
//         headerName: 'Recruitment Date',
//         type: 'date',
//         width: 150,
//     },
//     {
//         field: 'contract',
//         headerName: 'Contract Type',
//         type: 'singleSelect',
//         valueOptions: ['full time', 'part time', 'intern'],
//         width: 150,
//     },
// ];
//
// const MeetingsTable = ({clientId}) => {
//     const [meetings, setMeetings] = useState([]);
//
//     useEffect(() => {
//         // Fetch meetings data from the API using Axios
//         axios
//             .get(`/api/Meetings/Client/1`)
//             .then((response) => {
//                 setMeetings(response.data);
//                 console.log(response)
//             })
//             .catch((error) => {
//                 console.log(error);
//             });
//     }, [clientId]);
//
//     // const DataSet = [
//     //     {
//     //         columns: [
//     //             {title: "Meeting Id", style: {font: {sz: '18', bold: true}, width: {wpx: 125}}},
//     //             {title: "Meeting Date", style: {font: {sz: '18', bold: false}, width: {wpx: 125}}},
//     //             {title: "Meeting Status", style: {font: {sz: '18', bold: true}, width: {wpx: 125}}},
//     //         ],
//     //         data: meetings.map((data) => [
//     //             {value: data.MeetingId, style: {font: {sz: '14', bold: true}}},
//     //             {value: data.MeetingDate, style: {font: {sz: '14', bold: false}}},
//     //             {
//     //                 value: data.MeetingStatus.Status,
//     //                 style: {font: {sz: '14', bold: true}, fill: {patternType: "solid", fgColor: 'green'}}
//     //             }
//     //         ])
//     //     }
//     // ]
//     return (
//         <>
//             <Import/>
//             <BatchCreateForm/>
//             <AppPrim/>
//         </>
//     );
// };
//
// export default MeetingsTable;
import React, {useMemo, useState, useEffect} from 'react';
import {MaterialReactTable} from 'material-react-table';
import {IconButton, Tooltip} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import Delete from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import {useNavigate} from "react-router-dom";

const MeetingsTable = () => {
    const [columnFilters, setColumnFilters] = useState([]);
    const [globalFilter, setGlobalFilter] = useState("");
    const [sorting, setSorting] = useState([]);
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);


    const fetchData = async () => {
        setIsLoading(true);

        try {
            if (globalFilter !== "") {
                const response = await axios.get('/api/Meetings', {
                    params: {
                        start: pagination.pageIndex * pagination.pageSize,
                        size: pagination.pageSize,
                        searchQuery: globalFilter,
                    },
                });
                setData(response.data);
                setIsError(false);
            } else {
                const response = await axios.get('/api/Meetings', {
                    params: {
                        start: pagination.pageIndex * pagination.pageSize,
                        size: pagination.pageSize,
                    },
                });
                setData(response.data);
                setIsError(false);
            }

        } catch (error) {
            setIsError(true);
        }

        setIsLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, [pagination, globalFilter]);
    const navigate = useNavigate();

    const handleEdit = (meetingId) => {
        navigate(`/newMeeting/${meetingId}`);
    };
    const handleDelete = async (meetingId) => {
        try {
            await axios.delete(`/api/Meetings/${meetingId}`);
            console.log('Successfully deleted meeting:', meetingId);
            // Refresh the data after deletion
            fetchData();
        } catch (error) {
            console.error('Error deleting meeting:', error);
        }
    };

    const columns = useMemo(
        () => [
            {
                accessorKey: 'id',
                header: 'No'
            },
            {
                accessorKey: 'meetingStatus',
                header: 'Meeting Status',
            },
            {
                accessorKey: 'companyName',
                header: 'Name of the Company',
            },
            {
                accessorKey: 'spainTime',
                header: 'Spain Time',
            },
            {
                accessorKey: 'iranTime',
                header: 'Irán TIME (+)1:30 HRS',
            },
            {
                accessorKey: 'contactName',
                header: 'Contact Name',
            },
            {
                accessorKey: 'pusto',
                header: 'Pusto',
            },
            {
                accessorKey: 'salutation',
                header: 'SALUTATION',
            },
            {
                accessorKey: 'mobile',
                header: 'Mobile',
            },
            {
                accessorKey: 'phone',
                header: 'Phone',
            },
            {
                accessorKey: 'email',
                header: 'Email',
            },
            {
                accessorKey: 'webPage',
                header: 'WebPage',
            },
            {
                accessorKey: 'address',
                header: 'Address',
            },
            {
                accessorKey: 'comments',
                header: 'Comments',
            },
            {
                accessorKey: 'employees',
                header: 'Employees',
            },
            {
                accessorKey: 'experience',
                header: 'Experience',
            },
            {
                accessorKey: 'registroMercantil',
                header: 'Registro Mercantil',
            },
            {
                accessorKey: 'identificacionNacional',
                header: 'Identificacion Nacional',
            },
            {
                accessorKey: 'actions',
                header: 'Actions',
                Cell: ({row}) => (
                    <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                    <span style={{cursor: "pointer"}} onClick={() => handleEdit(row.original.id)}>
                        <EditIcon sx={{fontSize: '18px'}}/>
                    </span>
                        <span style={{cursor: "pointer"}} onClick={() => handleDelete(row.original.id)}>
                        <Delete sx={{fontSize: '18px'}}/>
                    </span>
                    </div>
                ),
            },
        ],
        []
    );

    return (
        <>
            <Stack spacing={2} direction="row">
                <Button variant="outlined" className={'btn-outlined-custom'} href={'/newMeeting'}>Add</Button>
            </Stack>
            <MaterialReactTable
                columns={columns}
                data={data}
                initialState={{showColumnFilters: false, columnVisibility: { id: false } }}
                manualPagination
                manualGlobalFilter
                muiToolbarAlertBannerProps={
                    isError
                        ? {
                            color: 'error',
                            children: 'Error loading data',
                        }
                        : undefined
                }
                onPaginationChange={setPagination}
                onGlobalFilterChange={setGlobalFilter}
                renderTopToolbarCustomActions={() => (
                    <Tooltip arrow title="Refresh Data">
                        <IconButton onClick={fetchData}>
                            <RefreshIcon/>
                        </IconButton>
                    </Tooltip>
                )}
                rowCount={data.length}
                state={{
                    isLoading,
                    pagination,
                    showAlertBanner: isError,
                    showProgressBars: false,
                    globalFilter,
                }}
            />
        </>
    );
};

export default MeetingsTable;
