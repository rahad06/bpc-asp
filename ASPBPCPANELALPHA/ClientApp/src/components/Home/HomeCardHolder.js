import React from 'react';
import CardE from "../CardE";
import {Grid} from "@mui/material";

function HomeCardHolder(props) {
    return (
        <>
            <Grid container rowSpacing={1} columnSpacing={{xs: 1, sm: 2, md: 1}} sx={{margin: 0}}>
                <Grid xs={3} sx={{padding: '0 16px'}}>
                    <CardE/>
                </Grid>    
                <Grid xs={3} sx={{padding: '0 16px'}}>
                    <CardE/>
                </Grid>    
                <Grid xs={3} sx={{padding: '0 16px'}}>
                    <CardE/>
                </Grid>    
                <Grid xs={3} sx={{padding: '0 16px'}}>
                    <CardE/>
                </Grid>    
            </Grid>
        </>
    );
}

export default HomeCardHolder;
