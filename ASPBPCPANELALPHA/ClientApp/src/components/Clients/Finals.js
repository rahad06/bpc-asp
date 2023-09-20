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

const ClientOffers = () => {
    const {id} = useParams()
    const [companyIds, setCompanyIds] = useState([]);
    const [clientName, setClientName] = useState("");
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
            const response = await axios.get('/api/Companies');
            setCompanyIds(response.data);
            const client = await axios.get(`/api/Clients/${id}`);
            console.log(client.data)
            setClientName(client.data?.name)
        } catch (error) {
            console.error(error);
        }

        setIsLoading(false);
    };

    useEffect(() => {
        fetchData().then(r => r)
    }, [])

    const handleExport = () => {
        const headings = [[
            'No',
            'RAZÓN SOCIAL (100)',
            'DESCRIPCIÓN (4000)',
            'TRATAMIENTO (15)',
            'NOMBRE (75)',
            'CARGO (100)',
            'EMAIL (100)',
            'WEB (200)',
            'TELÉFONO (15)',
            'MÓVIL (15)',
            'DIRECCION (255)',
            'PAÍS',
            'CIUDAD',
            'Escoger CIUDAD equivalente'
        ]];
        const wb = utils.book_new();
        const ws = utils.json_to_sheet([]);
        utils.sheet_add_aoa(ws, headings);
        utils.sheet_add_json(ws, data, {origin: 'A2', skipHeader: true});
        utils.book_append_sheet(wb, ws, 'CARRETILLASAMATE');
        writeFile(wb, `Empresas extranjeras para volcar-CARRETILLASAMATE-RAN-${clientName} - ${new Date().getFullYear()}.xlsx`);
    }

    const columns = useMemo(
        () => [
            {
                accessorKey: 'id',
                header: 'No'
            },
            {
                accessorKey: 'name',
                header: 'RAZÓN SOCIAL (100)',
            },
            {
                accessorKey: 'description',
                header: 'DESCRIPCIÓN (4000)',
                size: 380
            },
            {
                accessorKey: 'salutation',
                header: 'TRATAMIENTO (15)',
            },
            {
                accessorKey: 'contactName',
                header: 'NOMBRE (75)',
            },
            {
                accessorKey: 'pusto',
                header: 'CARGO (100)',
            },    {
                accessorKey: 'email',
                header: 'EMAIL (100)',
            },
            {
                accessorKey: 'webPage',
                header: 'WEB (200)',
            },
            {
                accessorKey: 'phone',
                header: 'TELÉFONO (15)',
            },
            {
                accessorKey: 'mobile',
                header: 'MÓVIL (15)',
            },
            {
                accessorKey: 'address',
                header: 'DIRECCION (255)',
            },
            {
                accessorKey: 'country',
                header: 'PAÍS',
            },
            {
                accessorKey: 'city',
                header: 'CIUDAD',
            },
            {
                accessorKey: 'eqCity',
                header: 'Escoger CIUDAD equivalente',
            },
        ],
        []
    );
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleExportTable = async () => {
        setIsLoading(true)
        try {
            const response = await axios.post(
                `/api/Companies/excel-table?clientId=${id}`,
                selectedOptions
            );
            let tableTempData= response?.data?.map((c, i) => ({
                id: c.id,
                name: c.name,
                description: c.description ?? "",
                salutation: c.salutation ?? "",
                contactName: c.contactName,
                pusto: c.pusto,
                email: c.email,
                webPage: c.webPage,
                phone: c.phone,
                mobile: c.mobile,
                address: c.address,
                country: c.country,
                city: c.city ?? "",
                eqCity: c.eqCity ?? "",
                }))
            setData(tableTempData);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false)
        }
    };

    const handleAutocompleteChange = (newValue) => {
        setSelectedOptions(newValue[0].map(v => v.id));
    };
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

export default ClientOffers;


