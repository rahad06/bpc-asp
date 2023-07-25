import React, {useEffect, useMemo, useRef, useState} from 'react';
import axios from 'axios';
import {useParams} from "react-router-dom";
import {Button, Grid, IconButton, Tooltip} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import {MaterialReactTable} from "material-react-table";
import GetAppIcon from "@mui/icons-material/GetApp";
import FormControl from "@mui/material/FormControl";
import CustomHooked from "../CustomHooked";
import NewCompany from "../Companies/NewCompany";
import {utils, writeFile} from "xlsx";

const Finals = () => {
    const {id} = useParams()
    const [companyIds, setCompanyIds] = useState([]);
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
                const response = await axios.get('/api/Companies', {
                    params: {
                        start: pagination.pageIndex * pagination.pageSize,
                        size: pagination.pageSize,
                        searchQuery: globalFilter,
                    },
                });
                setCompanyIds(response.data);
                setIsError(false);
            } else {
                const response = await axios.get('/api/Companies', {
                    params: {
                        start: pagination.pageIndex * pagination.pageSize,
                        size: pagination.pageSize,
                    },
                });
                setCompanyIds(response.data);
                setIsError(false);
            }

        } catch (error) {
            setIsError(true);
        }

        setIsLoading(false);
    };

    useEffect(() => {
        fetchData().then(r => r)
    },[])

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
        utils.sheet_add_json(ws, data, {origin: 'A2', skipHeader: true});
        utils.book_append_sheet(wb, ws, 'Meetings');
        writeFile(wb, 'Meetings Report.xlsx');
    }

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
        ],
        []
    );
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleExportTable = async () => {
        setIsLoading(true)
        try {
            let selectedIds = []
            selectedIds = [...selectedOptions[0].map((option) => option.id)];
            console.log(selectedIds)
            const response = await axios.post(
                `/api/Companies/export-final?clientId=${id}`,
                selectedIds
            );

            setData(response.data[0].companies);
        } catch (error) {
            console.error('Error fetching data:', error);
            // Handle error if needed
        } finally {
            setIsLoading(false)
        }
    };

    const handleAutocompleteChange = (newValue) => {
        setSelectedOptions(newValue);
    };
    const addToTable = async () => {

    }

    return (
        <>
            <Grid container spacing={0} sx={{justifyContent: 'start', alignItems: 'center'}}>
                <Grid item xs={0.2}>
                    <Button onClick={() => handleExport()}><GetAppIcon/></Button>
                </Grid>
                <Grid item xs={2}>
                    <FormControl fullWidth>
                        <CustomHooked
                            data={companyIds}
                            value={selectedOptions} onChange={handleAutocompleteChange}>
                            <NewCompany/>
                        </CustomHooked>
                    </FormControl>
                </Grid>
                <Grid item xs={1}>
                    <Button variant="outlined" className={'btn-outlined-custom'} onClick={() => handleExportTable()}
                            sx={{height: '32px'}}>Add</Button>
                </Grid>
            </Grid>
            <div className="table-container">
                <div className="react-perfect-scrollbar-container"
                     style={{width: "100%", maxHeight: '70vh', overflow: 'auto'}}
                >
                    <div ref={tableContent}>
                        <MaterialReactTable
                            options={{
                                rowStyle: {
                                    overflowWrap: 'break-word'
                                }
                            }}
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

export default Finals;


