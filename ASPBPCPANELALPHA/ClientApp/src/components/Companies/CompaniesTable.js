/*
import React, {useMemo, useState, useEffect, useRef} from 'react';
import {MaterialReactTable} from 'material-react-table';
import {IconButton, Tooltip} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import Delete from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import {useNavigate} from "react-router-dom";
import Groups2Icon from "@mui/icons-material/Groups2";

const CompaniesTable = () => {
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

    const tableContent = useRef()
    const [tableWidth, setTableWidth] = useState(null)
    useEffect(() => {
        setTableWidth(tableContent.current?.scrollWidth + 20)
    }, [data])

    const fetchData = async () => {
        setIsLoading(true);

        try {
            if (globalFilter !== "") {
                const response = await axios.get('/api/Companies');
                setData(response.data);
                setIsError(false);
            } else {
                const response = await axios.get('/api/Companies');
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

    const handleEdit = (companyId) => {
        navigate(`/newCompany/${companyId}`);
    };
    const handleDelete = async (companyId) => {
        try {
            await axios.delete(`/api/Companies/${companyId}`);
            console.log('Successfully deleted company:', companyId);
            // Refresh the data after deletion
            fetchData();
        } catch (error) {
            console.error('Error deleting company:', error);
        }
    };
    const handleMeetings = (id) => {
        navigate(`/companyMeetings/${id}`);
    }
    const columns = useMemo(
        () => [
            {
                accessorKey: 'id',
                header: 'Id'
            },
            {
                accessorKey: 'name',
                header: 'Name',
            },
            {
                accessorKey: 'industry',
                header: 'industry',
            },
            {
                accessorKey: 'contactName',
                header: 'Contact Name',
            },
            {
                accessorKey: 'salutation',
                header: 'Salutation',
            },
            {
                accessorKey: 'contactName',
                header: 'Contact Name',
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
                size: 1000

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
                        <span style={{cursor: "pointer"}} onClick={() => handleMeetings(row.original.id)}>
                                <Groups2Icon sx={{fontSize: '18px'}}/>
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
                <Button variant="outlined" className={'btn-outlined-custom'} href={'/newCompany'}
                        sx={{height: '40px'}}>Add</Button>
            </Stack>
            <div className="table-container">
                <div className="react-perfect-scrollbar-container"
                     style={{width: "100%", maxHeight: '70vh', overflow: 'auto'}}
                >
                    <div ref={tableContent}>
                        <MaterialReactTable
                            columns={columns}
                            data={data}
                            initialState={{showColumnFilters: false, columnVisibility: {id: false}}}
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
        </>
    );
};

export default CompaniesTable;
*/
import React, {useMemo, useState, useEffect} from 'react';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import Delete from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import {useNavigate} from "react-router-dom";
import Groups2Icon from '@mui/icons-material/Groups2';
import {MeetingRoom, Webhook} from "@mui/icons-material";
import CompanyTable from "./CompanyTable";

const CompaniesTable = () => {
    const [columnFilters, setColumnFilters] = useState([]);
    const [globalFilter, setGlobalFilter] = useState("");
    const [sorting, setSorting] = useState([]);
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10000,
    });
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);


    const fetchData = async () => {
        setIsLoading(true);

        try {
            if (globalFilter !== "") {
                const response = await axios.get('/api/companies', {
                    params: {
                        start: pagination.pageIndex * pagination.pageSize,
                        size: pagination.pageSize,
                        searchQuery: globalFilter,
                    },
                });
                setData(response.data);
                setIsError(false);
            } else {
                const response = await axios.get('/api/companies', {
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

    const handleEdit = (clientId) => {
        navigate(`/newCompany/${clientId}`);
    };
    const handleDelete = async (clientId) => {
        try {
            await axios.delete(`/api/Companies/${clientId}`);
            console.log('Successfully deleted client:', clientId);
            // Refresh the data after deletion
            fetchData();
        } catch (error) {
            console.error('Error deleting client:', error);
        }
    };

    const handleMeetings = (id) => {
        navigate(`/clientMeetings/${id}`);
    }
    const columns = useMemo(
        () => [
            {
                accessorKey: 'id',
                header: 'Id'
            },
            {
                accessorKey: 'name',
                header: 'Name',
            },
            {
                accessorKey: 'industry',
                header: 'industry',
            },
            {
                accessorKey: 'contactName',
                header: 'Contact Name',
            },
            {
                accessorKey: 'salutation',
                header: 'Salutation',
            },
            {
                accessorKey: 'contactName',
                header: 'Contact Name',
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
                size: 1000

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
                    <span style={{cursor: "pointer"}} onClick={() => handleEdit(row.id)}>
                        <EditIcon sx={{fontSize: '18px'}}/>
                    </span>
                        <span style={{cursor: "pointer"}} onClick={() => handleDelete(row.id)}>
                        <Delete sx={{fontSize: '18px'}}/>
                    </span>
                        <span style={{cursor: "pointer"}} onClick={() => handleMeetings(row.id)}>
                                <Groups2Icon sx={{fontSize: '18px'}}/>
                            </span>
                    </div>
                ),
            },
        ],
        []
    );

    return (
        <>
            <div className={'d-flex align-items-center justify-content-between'}>
                <h1 className="al-title ng-binding">
                    Companies
                </h1>
                <ul className="breadcrumb al-breadcrumb"><li>
                    <a href="/">Home</a></li>
                    <li className="ng-binding">Companies</li></ul>
            </div>
            <div className="ng-scope mt-4">
                <div className=" shift-up ng-scope px-4">
                    <Stack spacing={2} direction="row">
                        <Button variant="outlined" className={'btn-outlined-custom'} href={'/newCompany'}>Add</Button>
                    </Stack>
                    <CompanyTable
                        headers={columns}
                        data={data}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                    />
                </div>
            </div>
        </>
    );
};

export default CompaniesTable;
