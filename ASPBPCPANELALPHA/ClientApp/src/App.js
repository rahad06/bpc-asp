import React, {useEffect, useState} from 'react';
import './custom.css';
import './components/styles.css';
import AppHolder from "./components/AppHolder";
import Login from "./components/Login";
import UsePanelStore from "./Store/usePanelStore";
import { QueryClient, QueryClientProvider} from "react-query";

function App(props) {
    const {show, setShow} = UsePanelStore()
    const queryClient = new QueryClient()
    useEffect(() => {
        // Check if user is logged in based on the cached login status
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        setShow(isLoggedIn);
    }, [localStorage]);
    if (show) {

        return (
            <QueryClientProvider client={queryClient}>
                <AppHolder/>
            </QueryClientProvider>
        )
    } else {
        return (
            <Login/>
        )
    }
}

export default App;

