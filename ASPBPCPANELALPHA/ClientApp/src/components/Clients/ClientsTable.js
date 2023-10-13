import React, {useMemo, useState, useEffect} from 'react';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import Delete from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import {useNavigate} from "react-router-dom";
import Groups2Icon from '@mui/icons-material/Groups2';
import {MeetingRoom, Webhook} from "@mui/icons-material";
import ClientTable from "./ClientTable";

const ClientsTable = () => {
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
                const response = await axios.get('/api/clients', {
                    params: {
                        start: pagination.pageIndex * pagination.pageSize,
                        size: pagination.pageSize,
                        searchQuery: globalFilter,
                    },
                });
                setData(response.data);
                setIsError(false);
            } else {
                const response = await axios.get('/api/clients', {
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
        navigate(`/newClient/${clientId}`);
    };
    const handleOffers = (clientId) => {
        navigate(`/clientOffers/${clientId}`);
    };
    const handleFinals = (clientId) => {
        navigate(`/finals/${clientId}`);
    };
    const handleDelete = async (clientId) => {
        try {
            await axios.delete(`/api/Clients/${clientId}`);
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
                    accessorKey: 'website',
                    header: 'Website',
                },
                {
                    accessorKey: 'representative',
                    header: 'Representative',
                },
                {
                    accessorKey: 'industry.name',
                    header: 'Industry',
                },
                {
                    accessorKey: 'agenda.name',
                    header: 'Agenda/Research',
                    size: 320
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
                            <span style={{cursor: "pointer"}} onClick={() => handleOffers(row.original.id)}>
                                <Webhook sx={{fontSize: '18px'}}/>
                            </span>
                            <span style={{cursor: "pointer"}} onClick={() => handleFinals(row.original.id)}>
                                <MeetingRoom sx={{fontSize: '18px'}}/>
                            </span>
                        </div>
                    ),
                },
            ],
            []
        )
    ;

    return (
        <>
       <div className={'d-flex align-items-center justify-content-between'}>
            <h1 className="al-title ng-binding">
                Clients
            </h1>
           <ul className="breadcrumb al-breadcrumb"><li>
                <a href="/">Home</a></li>
                <li className="ng-binding">Clients</li></ul>
       </div>
    <div className="ng-scope mt-4">
        <div className=" shift-up ng-scope px-4">
        <Stack spacing={2} direction="row">
            <Button variant="outlined" className={'btn-outlined-custom'} href={'/newClient'}>Add</Button>
        </Stack>
            <ClientTable
                headers={columns}
                data={data}
            />
    </div>
    </div>
        </>
    );
};

export default ClientsTable;
