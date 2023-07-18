import React from 'react';
import SignUpForm from "./SignUpForm";
import LoginForm from "./LoginForm";
import LogRoutes from "../../LogRoutes";
import {Grid} from "@mui/material";
import TopAppBar from "../Layout/TopAppBar";
import BoxLayout from "../Layout/BoxLayout";
import {Route, Routes} from "react-router-dom";

function Index(props) {
    return (
        <Grid rowSpacing={1} columnSpacing={{xs: 1, sm: 2, md: 1}}
              sx={{
                  margin: '0 !important',
                  display: 'grid',
                  gridTemplateColumns: '2.5fr 14fr',
                  background: '#E6E6EC82'
              }}>
            <Grid xs={10}>
                <TopAppBar/>
                <BoxLayout>
                    <Routes>
                        {LogRoutes.map((route, index) => {
                            const {element, ...rest} = route;
                            return <Route key={index} {...rest} element={element}/>;
                        })}
                    </Routes>
                </BoxLayout>
            </Grid>
        </Grid>
    )
        ;
}

export default Index;
