import React, {useEffect, useMemo, useState} from "react";
import { read, utils, writeFile } from 'xlsx';
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import {MaterialReactTable} from "material-react-table";
import {FormControl, IconButton, Tooltip} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import EditIcon from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import axios from "axios";
import CustomSearchable from "./CustomSearchable";
import NewIndustry from "./Industries/NewIndustry";
import NewClient from "./Clients/NewClient";

const Import = () => {
    const [data, setData] = useState([]);

    const [industries, setIndustries] = useState(null)
    const [industryId, setIndustryId] = useState(null)
    const [industryName, setIndustryName] = useState(null)
    useEffect(() => {
        fetchIndustries();
    }, []);
    const fetchIndustries = async () => {
        try {
            const response = await axios.get('/api/Industries');
            setIndustries(response.data);
        } catch (error) {
            console.error(error);
        }
    };
    const handleImport = ($event) => {
        console.log($event)
        const files = $event.target.files;
        if (files.length) {
            const file = files[0];
            const reader = new FileReader();
            reader.onload = (event) => {
                const wb = read(event.target.result);
                const sheets = wb.SheetNames;
                console.log(wb)
                if (sheets.length) {
                    const rows = utils.sheet_to_json(wb.Sheets[sheets[0]], {
                        header: [
                            "№",
                            "Meeting",
                            "MeetingStatus",
                            "NameOfTheCompany",
                            "SpainTime",
                            "IranTime(+)1:30HRS",
                            "ContactName",
                            "Pusto",
                            "Salutation",
                            "Mobile",
                            "Phone",
                            "Email",
                            "WebPage",
                            "Address",
                            "Comments",
                            "Employees",
                            "Experience",
                            "RegistroMercantil",
                            "IdentificacionNacional",
                            "__rowNum__"
                        ]
                    })
                    setData(rows)
                    console.log(rows)
                }
            }
            reader.readAsArrayBuffer(file);
        }
    }
    const columns = useMemo(
        () => [
            {
                accessorKey: 'id',
                header: 'No'
            },
            {
                accessorKey: 'Meeting',
                header: 'Meeting'
            },
            {
                accessorKey: 'MeetingStatus',
                header: 'Meeting Status',
            },
            {
                accessorKey: 'NameOfTheCompany',
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
            // {
            //     accessorKey: 'actions',
            //     header: 'Actions',
            //     Cell: ({row}) => (
            //         <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
            //         <span style={{cursor: "pointer"}} onClick={() => handleEdit(row.original.meetingId)}>
            //             <EditIcon sx={{fontSize: '18px'}}/>
            //         </span>
            //             <span style={{cursor: "pointer"}} onClick={() => handleDelete(row)}>
            //             <Delete sx={{fontSize: '18px'}}/>
            //         </span>
            //         </div>
            //     ),
            // },
        ],
        []
    );

    return (
        <>
            <Stack spacing={2} direction="row">
                <input type="file" onChange={(e) => handleImport(e)} />
                <FormControl fullWidth>
                    <CustomSearchable
                        title={'Industry'}
                        data={industries} clickFn={setIndustryId} value={industryId}>
                        <NewIndustry/>
                    </CustomSearchable>
                    <CustomSearchable
                        title={'Client'}
                        data={industries} clickFn={setIndustryId} value={industryId}>
                        <NewClient/>
                    </CustomSearchable>
                </FormControl>
            </Stack>
            {data.length > 0 ? (
            <MaterialReactTable
                columns={columns}
                data={data}
                initialState={{showColumnFilters: false, columnVisibility: { id: false } }}
                manualPagination
                manualGlobalFilter
                // muiToolbarAlertBannerProps={
                //     isError
                //         ? {
                //             color: 'error',
                //             children: 'Error loading data',
                //         }
                //         : undefined
                // }
                // onPaginationChange={setPagination}
                // onGlobalFilterChange={setGlobalFilter}
                // renderTopToolbarCustomActions={() => (
                //     <Tooltip arrow title="Refresh Data">
                //         <IconButton onClick={fetchData}>
                //             <RefreshIcon/>
                //         </IconButton>
                //     </Tooltip>
                // )}
                rowCount={data.length}
                state={{
                    // isLoading,
                    // pagination,
                    // showAlertBanner: isError,
                    // showProgressBars: false,
                    // globalFilter,
                }}
            />
            ):null}
        </>
    );
};

export default Import;
