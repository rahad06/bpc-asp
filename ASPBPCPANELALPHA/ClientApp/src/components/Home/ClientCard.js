import React from 'react';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {Grid} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

function ClientCard(props) {
    return (
        <Card sx={{ minWidth: 180 }}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Meeting
                </Typography>
                <Typography variant="h5" component="div">
                    14.03
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Today
                </Typography>
                <Grid container rowSpacing={1} columnSpacing={{xs: 1, sm: 2, md: 1}} sx={{margin: 0}}>
                    <Grid xs={6} sx={{padding: '0 16px'}}>
                        <Typography>
                            ALN - Khak
                        </Typography>
                    </Grid>
                    <Grid xs={6} sx={{padding: '0 16px', textAlign:'right'}} >
                        <MoreHorizIcon/>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}

export default ClientCard;
