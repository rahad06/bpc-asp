import React, {useEffect, useState} from 'react';
import {Route, Routes} from 'react-router-dom';
import AppRoutes from '../AppRoutes';
import LimitedRoutes from "../LimitedRoutes";
import BoxLayout from './Layout/BoxLayout';
import {Grid} from '@mui/material';
import DrawerBox from './Layout/DrawerBox';
import TopAppBar from './Layout/TopAppBar';
import usePanelStore from '../Store/usePanelStore';

function AppHolder(props) {
    const {setAuthenticated, roles} = usePanelStore();



    return (
        <>
            <Grid
                rowSpacing={1}
                columnSpacing={{xs: 1, sm: 2, md: 1}}
                sx={{
                    margin: '0 !important',
                    display: 'grid',
                    gridTemplateColumns: '2.5fr 14fr',
                    background: '#E6E6EC82',
                }}
            >
                <Grid item={true} xs={3}>
                    <DrawerBox/>
                </Grid>
                <Grid item={true} xs={7}>
                    <TopAppBar/>
                    <BoxLayout>
                        <Routes>
                            {
                                AppRoutes.map((route, index) => {
                                    return (<Route exact={route.path === "/"} key={index} element={route.element} path={route.path}/>)
                                })}
                        </Routes>
                    </BoxLayout>
                </Grid>
            </Grid>
        </>
    );
}

export default AppHolder;
