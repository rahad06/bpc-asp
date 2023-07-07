import * as React from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import {Box} from "@mui/material";

const filter = createFilterOptions();

export default function CustomSearchable(props) {
    const [value, setValue] = React.useState(null);
    const [open, toggleOpen] = React.useState(false);

    const handleClose = () => {
        toggleOpen(false);
    };


    if(!props) return;
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
                        setValue(newValue);
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
                    // e.g value selected with enter, right from the input
                    if (typeof option === 'string') {
                        return option;
                    }
                    if (option.inputValue) {
                        return option.inputValue;
                    }
                    return option.name;
                }}
                selectOnFocus
                clearOnBlur
                handleHomeEndKeys
                renderOption={(props, option) => <li {...props}>{option.name}</li>}
                freeSolo
                renderInput={(params) => <TextField {...params} label={props.title} />}
            />
            <Dialog open={open} onClose={handleClose}>
                <Box sx={{padding: '10px'}}>
                    {props.children}
                </Box>
            </Dialog>
        </React.Fragment>
    );
}