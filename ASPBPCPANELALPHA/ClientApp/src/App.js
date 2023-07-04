import React, {useEffect, useState} from 'react';
import './custom.css';
import AppHolder from "./components/AppHolder";
import Login from "./components/Login";

function App(props) {
    const [show, setShow] = useState(false)
    useEffect(() => {
        // Check if user is logged in based on the cached login status
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        setShow(isLoggedIn);
    }, [setShow]);
    if (show) {
        return <AppHolder/>
    } else {
        return (
            <Login/>
        )
    }
}

export default App;

