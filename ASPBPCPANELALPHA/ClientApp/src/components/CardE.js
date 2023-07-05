import React from 'react';
import {Grid} from "@mui/material";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
function CardE(props) {
    const bull = (
        <Box
            component="span"
            sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
        >
            •
        </Box>
    );
    return (
        <Card sx={{ minWidth: 100 }}>
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

export default CardE;
