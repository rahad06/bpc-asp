import React from 'react';
import {Route, Routes} from "react-router-dom";
import AppRoutes from "../AppRoutes";
import {Layout} from "./Layout";
import BoxLayout from "./Layout/BoxLayout";
import {Grid} from "@mui/material";
import DrawerBox from "./Layout/DrawerBox";

function AppHolder(props) {
    return (
        <>
            <Grid rowSpacing={1} columnSpacing={{xs: 1, sm: 2, md: 1}}
                  sx={{margin: '0 !important', gap: '52px',     
                      display: 'grid',
                      gridTemplateColumns: '2fr 10fr',
                      background: '#f1f2f6'
            }}>
                <Grid xs={3}>
                    <DrawerBox/>
                </Grid>
                <Grid xs={7}>
                    <BoxLayout>
                        <Routes>
                            {AppRoutes.map((route, index) => {
                                const {element, ...rest} = route;
                                return <Route key={index} {...rest} element={element}/>;
                            })}
                        </Routes>
                    </BoxLayout>
                </Grid>
            </Grid>
        </>
    );
}

export default AppHolder;
