import React, {useState} from 'react';
import { TextField, Button } from '@mui/material';
import axios from "axios";
import {useNavigate} from "react-router-dom";

function SignUpForm() {
    const [userName, setUserName] = useState("")
    const [pass, setPass] = useState("")
    const navigate = useNavigate();

    const submitForm = (e) => {
        // Handle form submission here (e.g., call the signup API)
        e.preventDefault()
        axios
            .post('/api/Users/SignUp', {
                username: userName,
                password: pass
            })
            .then((response) => {
                // Handle successful response
                navigate('/login')

            })
            .catch((error) => {
                // Handle error
                console.error(error);
            });

    };
    

    return (
        <form onSubmit={submitForm}>
            <TextField
                label="Username"
                value={userName}
                onChange={e => setUserName(e.target.value)}
                // helperText={errors.username ? 'Username is required' : ''}
            />

            <TextField
                label="Password"
                type="password"
                value={pass}
                onChange={e => setPass(e.target.value)}

                // error={errors.password}
                // helperText={errors.password ? 'Password is required' : ''}
            />

            <Button type="submit" variant="contained" color="primary">
                Sign Up
            </Button>
        </form>
    );
};

export default SignUpForm;
