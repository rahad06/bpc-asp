import React, {useMemo, useState, useEffect} from 'react';
import {MaterialReactTable} from 'material-react-table';
import {IconButton, Tooltip} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import Delete from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import {useNavigate, useParams} from "react-router-dom";
import TextField from "@mui/material/TextField";
import GetAppIcon from '@mui/icons-material/GetApp';
import {utils, writeFile} from "xlsx";

const ClientMeetings = () => {
    const {id} = useParams()
    const [first, setFirst] = useState(true)
    const [columnFilters, setColumnFilters] = useState([]);
    const [globalFilter, setGlobalFilter] = useState("");
    const [sorting, setSorting] = useState([]);
    const [loading, setLoading] = useState(true)
    const [dateFrom, setDateFrom] = useState("")
    const [dateTo, setDateTo] = useState("")
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const handleDateFrom = async (e) => {
        setDateFrom(e.target.value)
    }
    const handleDateTo = async (e) => {
        setDateTo(e.target.value)
    }
    const fetchData = async () => {
        setIsLoading(true);

        try {
            const response = await axios.post(`/api/Meetings/Client/${id}?fromDate=${dateFrom}&toDate=${dateTo}`,
                [1, 2, 3]
            )
            console.log(response.data)
            setData(response.data);
            setIsError(false);
        } catch (error) {
            setIsError(true);
        }
        setIsLoading(false);
        setLoading(false)
    }

    useEffect(() => {
        if (first) {
            setFirst(false)
            return
        }
        fetchData().then(r => r)
    }, [pagination, globalFilter]);
    const navigate = useNavigate();

    const handleEdit = (meetingId) => {
        navigate(`/newMeeting/${meetingId}`);
    };
    const handleDelete = async (row) => {
        try {
            await axios.delete(`/api/Meetings/${row.original.meetingId}`);
            fetchData().then(r => r)
        } catch (error) {
            console.error('Error deleting meeting:', error);
        }
    };
    const handleSearch = async () => {
        fetchData().then(r => r)
    }
    const columns = useMemo(
        () => [
            {
                accessorKey: 'meetingStatus',
                header: 'Meeting Status',
            },
            {
                accessorKey: 'companyName',
                header: 'Name of the Company',
            },
            {
                accessorKey: 'SpainTime',
                header: 'Spain Time',
            },
            {
                accessorKey: 'IranTime',
                header: 'Irán TIME (+)1:30 HRS',
            },
            {
                accessorKey: 'ContactName',
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

    const handleExport = () => {
        const headings = [[
            'No',
            'MEETING DATES',
            'NAME OF THE COMPANY',
            'SPAIN TIME'
        ]];
        const wb = utils.book_new();
        const ws = utils.json_to_sheet([]);
        utils.sheet_add_aoa(ws, headings);
        utils.sheet_add_json(ws, data, { origin: 'A2', skipHeader: true });
        utils.book_append_sheet(wb, ws, 'Meetings');
        writeFile(wb, 'Meetings Report.xlsx');
    }
    
    
    return (
        <>
            <Stack spacing={2} direction="row">
                {loading ? null : (
                    <Button onClick={() => handleExport()}><GetAppIcon/></Button>
                )}
                <TextField
                    id="startDate"
                    label="Start Date"
                    type="date"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={dateFrom}
                    onChange={(e) => handleDateFrom(e)}
                />
                <TextField
                    id="startDate"
                    label="Start Date"
                    type="date"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={dateTo}
                    onChange={(e) => handleDateTo(e)}
                />
                <Button onClick={() => {
                    handleSearch()
                }}>Search</Button>
            </Stack>
            {loading ? null : (
                <MaterialReactTable
                    columns={columns}
                    data={data}
                    initialState={{showColumnFilters: false}}
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
            )}
        </>
    );
};

export default ClientMeetings;
