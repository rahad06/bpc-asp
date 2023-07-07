import React, { useState } from "react";
import { read, utils, writeFile } from 'xlsx';
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import {MaterialReactTable} from "material-react-table";
import {IconButton, Tooltip} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import { DropzoneArea } from 'material-ui-dropzone';

const Import = () => {
    const [data, setData] = useState([]);

    const handleImport = ($event) => {
        console.log(event)
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
                            "Address",
                            "Comments",
                            "ContactName",
                            "Employees",
                            "Experience",
                            "Email",
                            "IranTime",
                            "MeetingDates",
                            "MeetingStatus",
                            "Mobile",
                            "NameOfTheCompany",
                            "Phone",
                            "Pusto",
                            "Salutation",
                            "SpainTime",
                            "WebPage",
                            "IdentificacionNacional",
                            "RegistroMercantil",
                            "№",
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
    

    return (
        <>
            <Stack spacing={2} direction="row">
                <input type="file" onChange={(e) => handleImport(e)} />
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

export default Import;
