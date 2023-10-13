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
import NewIndustry from "./NewIndustry";
import IndustryTable from "./IndustryTable";

const IndustriesTable = () => {
    const [columnFilters, setColumnFilters] = useState([]);
    const [globalFilter, setGlobalFilter] = useState("");
    const [sorting, setSorting] = useState([]);
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 1000,
    });
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);


    const fetchData = async () => {
        setIsLoading(true);

        try {
            if (globalFilter !== "") {
                const response = await axios.get('/api/Industries', {
                    params: {
                        start: pagination.pageIndex * pagination.pageSize,
                        size: pagination.pageSize,
                        searchQuery: globalFilter,
                    },
                });
                setData(response.data);
                setIsError(false);
            } else {
                const response = await axios.get('/api/Industries', {
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

    const handleEdit = (industryId) => {
        navigate(`/newIndustry/${industryId}`);
    };
    const handleDelete = async (industryId) => {
        try {
            await axios.delete(`/api/Industries/${industryId}`);
            console.log('Successfully deleted industry:', industryId);
            // Refresh the data after deletion
            fetchData();
        } catch (error) {
            console.error('Error deleting industry:', error);
        }
    };

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
                <div className={'d-flex align-items-center justify-content-between'}>
                    <h1 className="al-title ng-binding">
                        Industries
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
                        <IndustryTable
                            headers={columns}
                            data={data}
                        />
                    </div>
                </div>
          </>
    );
};

export default IndustriesTable;
