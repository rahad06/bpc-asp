import * as React from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import Autocomplete, {createFilterOptions} from '@mui/material/Autocomplete';
import {Box} from "@mui/material";
import {useEffect, useState} from "react";

const filter = createFilterOptions();

export default function CustomSearchable(props) {
    const [valueT, setValueT] = React.useState(null);
    const [open, toggleOpen] = React.useState(false);
    const [name, setName] = useState("")
    const handleClose = () => {
        toggleOpen(false);
    };

    if (!props) return;
    return (
        <React.Fragment>
            <Autocomplete
                value={props.value}
                onChange={(event, newValue) => {
                    if (typeof newValue === 'string') {
                        // timeout to avoid instant validation of the dialog's form.
                        setTimeout(() => {
                            toggleOpen(true);
                            // setDialogValue({
                            //     title: newValue,
                            //     year: '',
                            // });
                        });
                    } else if (newValue && newValue.inputValue) {
                        toggleOpen(true);
                        // setDialogValue({
                        //     title: newValue.inputValue,
                        //     year: '',
                        // });
                    } else {
                        console.log(newValue)
                        setValueT(newValue);
                        setName(newValue.name)
                        props.clickFn(newValue.id)
                    }
                }}
                filterOptions={(options, params) => {
                    const filtered = filter(options, params);

                    if (params.inputValue !== '') {
                        filtered.push({
                            inputValue: params.inputValue,
                            title: `Add "${params.inputValue}"`,
                        });
                    }

                    return filtered;
                }}
                id={props.title}
                options={props.data}
                getOptionLabel={(option) => {
                    if (typeof option === 'string') {
                        return option;
                    }
                    if (option.inputValue) {
                        return option.inputValue;
                    }
                    return option.name ?? name;
                }}
                selectOnFocus
                clearOnBlur
                handleHomeEndKeys
                renderOption={(props, option) => <li {...props}>{option.name}</li>}
                freeSolo
                renderInput={(params) => <TextField {...params} label={props.title}/>}
                className={props.className ?? ""}
            />
            <Dialog open={open} onClose={handleClose}>
                <Box sx={{padding: '10px'}}>
                    {props.children}
                </Box>
            </Dialog>
        </React.Fragment>
    );
}