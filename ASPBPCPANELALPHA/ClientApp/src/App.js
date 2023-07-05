import React, {useEffect, useState} from 'react';
import './custom.css';
import AppHolder from "./components/AppHolder";
import Login from "./components/Login";
import UsePanelStore from "./Store/usePanelStore";

function App(props) {
    const {show, setShow} = UsePanelStore()
    useEffect(() => {
        // Check if user is logged in based on the cached login status
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        setShow(isLoggedIn);
    }, [localStorage]);
    if (show) {
        return <AppHolder/>
    } else {
        return (
            <Login/>
        )
    }
}

export default App;

