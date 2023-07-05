import React, {Component} from 'react';
import HomeCardHolder from "./Home/HomeCardHolder";
import {Grid} from "@mui/material";
import CardE from "./CardE";
import Container from "@mui/material/Container";
import HomeTodayMeetings from "./Home/HomeTodayMeetings";
import HomeClientsCard from "./Home/HomeClientsCard";

export class Home extends Component {
    static displayName = Home.name;

    render() {
        return (
            <>
                <HomeCardHolder/>
                <Container sx={{marginTop: 4}}>
                    <Grid container rowSpacing={1} columnSpacing={{xs: 1, sm: 2, md: 1}} sx={{margin: '0 !important', gap: '52px'}}>
                        <Grid xs={7}>
                            <HomeTodayMeetings/>
                        </Grid>
                        <Grid xs={4}>
                            <HomeClientsCard/>
                        </Grid>
                    </Grid>
                </Container>
            </>
        )
            ;
    }
}
