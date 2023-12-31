import React, {useMemo, useState, useEffect, useRef} from 'react';
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
import LocalConvenienceStoreIcon from '@mui/icons-material/LocalConvenienceStore';

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

    const tableContent = useRef()
    const [tableWidth, setTableWidth] = useState(null)
    useEffect(() => {
        setTableWidth(tableContent.current?.scrollWidth + 20)
    }, [data])
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
    const fetchAll = async () => {
        setIsLoading(true)
        setLoading(true)
        try {
            const response = await axios.get(`/api/Meetings/CompaniesByClient/${id}`)
            setData(response.data)
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
    const allMeetings = async () => {
        fetchAll().then(r => r)
    }
    const columns = useMemo(
        () => [
            {
                accessorKey: 'MeetingStatus',
                header: 'Meeting Status',
            },
            {
                accessorKey: 'CompanyName',
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
                accessorKey: 'Pusto',
                header: 'Pusto',
            },
            {
                accessorKey: 'Salutation',
                header: 'SALUTATION',
            },
            {
                accessorKey: 'Mobile',
                header: 'Mobile',
            },
            {
                accessorKey: 'Phone',
                header: 'Phone',
            },
            {
                accessorKey: 'Email',
                header: 'Email',
            },
            {
                accessorKey: 'WebPage',
                header: 'WebPage',
            },
            {
                accessorKey: 'Address',
                header: 'Address',
            },
            {
                accessorKey: 'Comments',
                header: 'Comments',
                size: 700
            },
            {
                accessorKey: 'Employees',
                header: 'Employees',
            },
            {
                accessorKey: 'Experience',
                header: 'Experience',
            },
            {
                accessorKey: 'RegistroMercantil',
                header: 'Registro Mercantil',
            },
            {
                accessorKey: 'IdentificacionNacional',
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
            'Meeting Dates',
            'Meeting Status',
            'interpreter',
            'Name Of The Company',
            'Spain Time',
            'Irán Time (+)1:30 HRS',
            'Contact Name',
            'Pusto',
            'Salutation',
            'Mobile',
            'Phone',
            'Email',
            'WebPage',
            'Address',
            'Comments',
            'Employees',
            'Experience',
            'Registro Mercantil',
            'Identificacion Nacional'
        ]];
        const wb = utils.book_new();
        const ws = utils.json_to_sheet([]);
        utils.sheet_add_aoa(ws, headings);
        utils.sheet_add_json(ws, data, {origin: 'A2', skipHeader: false});
        utils.book_append_sheet(wb, ws, 'Meetings');
        writeFile(wb, 'Meetings Report.xlsx');
    }


    return (
        <>
            <Stack spacing={2} direction="row">
                {loading ? null : (
                    <Button onClick={() => handleExport()}><GetAppIcon/></Button>
                )}
                <Button onClick={() => allMeetings()}><LocalConvenienceStoreIcon/></Button>
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
                <div className="table-container">
                    <div className="react-perfect-scrollbar-container"
                         style={{width: "100%", maxHeight: '70vh', overflow: 'auto'}}
                    >
                        <div ref={tableContent}>
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
                        </div>
                    </div>
                </div>
                
            )}
        </>
    );
};

export default ClientMeetings;
