import React from 'react';
import {Layout} from "./Layout";
import {Route, Routes} from "react-router-dom";
import AppRoutes from "../AppRoutes";

function AppHolder(props) {
    return (
        <Layout>
            <Routes>
                {AppRoutes.map((route, index) => {
                    const { element, ...rest } = route;
                    return <Route key={index} {...rest} element={element} />;
                })}
            </Routes>
        </Layout>
    );
}

export default AppHolder;
