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
            'Spanish Company Associated',
            'Agenda/Research Name',
            'Sub-Client Name',
            'Registro Mercantil',
            'Identificacion Nacional',
            'SALUTATION',
            'Contact Name',
            'Pusto',
            'Email',
            'WebPage',
            'PHONE',
            'MOBILE',
            'STAGE',
            'SECTOR',
            'TYPE OF COMPANY',
            'ADDRESS/CITY',
            'COUNTRY',
            'DESCRIPTION OF THE COMPANY',
            'Valoración de 1 a 5 (1 - TOP, 5 - LOW)',
            'If Research (Market Research). Conclussion',
            'Experience',
            'EMPLOYEES'
        ]];
        const wb = utils.book_new();
        const ws = utils.json_to_sheet([]);
        utils.sheet_add_aoa(ws, headings);
        utils.sheet_add_json(ws, data, {origin: 'A2', skipHeader: true});
        utils.book_append_sheet(wb, ws, 'CARRETILLASAMATE');
        writeFile(wb, `CARRETILLASAMATE- FINAL LIST OF COMPANIES - ESKZ PARS-${clientName}-IRAN - ${new Date().getFullYear()}.xlsx`);
    }

    const columns = useMemo(
        () => [
            {
                accessorKey: 'id',
                header: 'No'
            },
            {
                accessorKey: 'clientName',
                header: 'Spanish Company Associated',
            },
            {
                accessorKey: 'agenda',
                header: 'Agenda/Research Name',
            },
            {
                accessorKey: 'name',
                header: 'Sub-Client Name',
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
                accessorKey: 'salutation',
                header: 'SALUTATION',
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
                accessorKey: 'email',
                header: 'Email',
            },
            {
                accessorKey: 'webPage',
                header: 'WebPage',
            },
            {
                accessorKey: 'phone',
                header: 'PHONE',
            },
            {
                accessorKey: 'mobile',
                header: 'MOBILE',
            },
            {
                accessorKey: 'agendaStage',
                header: 'STAGE',
            },
            {
                accessorKey: 'industryName',
                header: 'SECTOR',
            },
            {
                accessorKey: 'type',
                header: 'TYPE OF COMPANY',
            },
            {
                accessorKey: 'city',
                header: 'ADDRESS/CITY',
            },
            {
                accessorKey: 'country',
                header: 'COUNTRY',
            },
            {
                accessorKey: 'description',
                header: 'DESCRIPTION OF THE COMPANY',
                size: 380
            },
            {
                accessorKey: 'rating',
                header: 'Valoración de 1 a 5 (1 - TOP, 5 - LOW)',
            },
            {
                accessorKey: 'research',
                header: 'If Research (Market Research). Conclussion',
            },
            {
                accessorKey: 'experience',
                header: 'Experience',
            },
            {
                accessorKey: 'employees',
                header: 'Employees',
            },
        ],
        []
    );
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleExportTable = async () => {
        setIsLoading(true)
        try {
            const response = await axios.post(
                `/api/Companies/export-table?clientId=${id}`,
                selectedOptions
            );
            let tableTempData= response?.data?.[0]?.companies?.map((c, i) => ({
                clientName: clientName,
                agenda: c.agenda?.name,
                id: c.id,
                name: c.name,
                registroMercantil: c.registroMercantil,
                identificacionNacional: c.identificacionNacional,
                salutation: c.salutation,
                contactName: c.contactName,
                pusto: c.pusto,
                email: c.email,
                webPage: c.webPage,
                phone: c.phone,
                mobile: c.mobile,
                agendaStage: c.agenda?.stage,
                industryName: c.industry?.name,
                type: c.type,
                city: c.city,
                country: c.country,
                description: c.description,
                rating: c.rating, 
                research: c.research,
                experience: c.experience,
                employees: c.employees
            }))
            setData(tableTempData);
        } catch (error) {
            console.error('Error fetching data:', error);
            // Handle error if needed
        } finally {
            setIsLoading(false)
        }
    };

    const handleAutocompleteChange = (newValue) => {
        console.log(newValue[0].map(v => v.id))
        setSelectedOptions(newValue[0].map(v => v.id));
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

export default ClientOffers;


