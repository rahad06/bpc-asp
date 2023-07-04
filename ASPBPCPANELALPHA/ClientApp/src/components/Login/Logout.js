import React from 'react';
import {Button} from "@mui/material";
import axios from "axios";
import UsePanelStore from "../../Store/usePanelStore";

function Logout(props) {
    const {setShow} = UsePanelStore()
    const logout = async () => {
        try {
            await axios.post('/api/Users/LogOut');
            console.log('User logged out successfully.');
            // Perform any additional actions after logout
        } catch (error) {
            console.error('Error occurred during logout:', error);
            // Handle the error accordingly
        } finally {
            setShow(false)
        }
    };
    return (
        <Button type="button" variant="contained" color="primary"
                onClick={() => logout()}>
            logout
        </Button>
    );
}

export default Logout;