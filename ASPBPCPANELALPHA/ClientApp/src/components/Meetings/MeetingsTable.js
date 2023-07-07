
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
    const handleDelete = async (row) => {
        try {
            await axios.delete(`/api/Meetings/${row.original.meetingId}`);
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
                    <span style={{cursor: "pointer"}} onClick={() => handleEdit(row.original.meetingId)}>
                        <EditIcon sx={{fontSize: '18px'}}/>
                    </span>
                        <span style={{cursor: "pointer"}} onClick={() => handleDelete(row)}>
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
                <Button variant="outlined" className={'btn-outlined-custom'} href={'/import'}>Import</Button>
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
