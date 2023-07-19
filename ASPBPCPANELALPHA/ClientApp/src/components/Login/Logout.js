import React, {useEffect} from 'react';
import {Button} from "@mui/material";
import axios from "axios";
import UsePanelStore from "../../Store/usePanelStore";
import {useNavigate} from "react-router-dom";
import LoginForm from "./LoginForm";

function Logout(props) {
    const {setShow, setShowSignup} = UsePanelStore()
    const {navigate} = useNavigate()
    const logout = async () => {
        try {
            await axios.post('/api/Users/LogOut');
            console.log('User logged out successfully.');
            // Perform any additional actions after logout
        } catch (error) {
            console.error('Error occurred during logout:', error);
            // Handle the error accordingly
        } finally {
            localStorage.removeItem('isLoggedIn');

            setShow(false)
            setShowSignup(false)
        }
    };
    useEffect(()=>{
        logout().then(r => r)
    },[])
    return (
        <><LoginForm/></>
    );
}

export default Logout;