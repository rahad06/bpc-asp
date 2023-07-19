import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import usePanelStore from "../../Store/usePanelStore";
import SignUpForm from "./SignUpForm";

function LoginForm() {
    const {
        handleSubmit,
        register,
        formState: {errors},
    } = useForm();
    const {setShow, showSignup, setRoles} = usePanelStore()
    const [remember, setRemember] = useState(false)
    const onSubmit = (data) => {
        axios
            .post('/api/Users/SignIn', {
                userName: data.userName,
                password: data.password,
            })
            .then((response) => {
                console.log(response)
                localStorage.setItem('isLoggedIn', 'true');
                setRoles(response.data.roles)
                setShow(true)
            })
            .catch((error) => {
                console.error(error);
                setShow(false)
            });
    };

    if (showSignup) {
        return (
            <SignUpForm/>
        )
    }
    return (
        <>
            <Container component="main" maxWidth="sm">
                <Box
                    sx={{
                        boxShadow: 3,
                        borderRadius: 2,
                        px: 4,
                        py: 6,
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{mt: 1}}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="userName"
                            label="Username"
                            autoComplete="userName"
                            autoFocus
                            {...register('userName', {required: true})}
                            error={errors.userName}
                            helperText={errors.userName && 'Username is required'}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            {...register('password', {required: true})}
                            error={errors.password}
                            helperText={errors.password && 'Password is required'}
                        />
                        <Button type="submit" fullWidth variant="contained" sx={{mt: 3, mb: 2}}>
                            Sign In
                        </Button>
                        {/*<Button type="button"*/}
                        {/*        onClick={() => setShowSignup(true)}*/}
                        {/*        fullWidth variant="contained" sx={{mt: 3, mb: 2}}>*/}
                        {/*    Sign Up*/}
                        {/*</Button>*/}
                    </Box>
                </Box>
            </Container>
        </>
    );
}

export default LoginForm;
