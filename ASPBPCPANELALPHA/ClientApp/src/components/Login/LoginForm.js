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
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const {setShow, showSignup, setRoles} = usePanelStore()
    const [remember, setRemember] = useState(false)
    const onSubmit = (e) => {
        e.preventDefault();
        axios
            .post('/api/Users/SignIn', {
                userName: userName,
                password: password,
            })
            .then((response) => {
                localStorage.setItem('isLoggedIn', 'true');
                setRoles(response.data.roles)
                setShow(true)
            })
            .catch((error) => {
                console.error(error);
                alert(error)
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
            <Box component="main" className={'auth-main'}>
                <Box
                    sx={{
                        boxShadow: 3,
                        color: '#fff',
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                    className={'auth-block'}
                >
                    <Typography component="h1" variant="h2"
                    sx={{color: '#fff'}}
                    >
                        Welcome to Belganic Pars Panel
                    </Typography>
                    <Typography component="h3" variant="h3"
                    sx={{color: '#fff'}}
                    >
                        Sign in
                    </Typography>
                    {/*<Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{mt: 1}}>*/}
                        <form className="form-horizontal"
                              onSubmit={onSubmit}
                        >
                            <div className="form-group">
                                <label htmlFor="inputEmail3" className="control-label">User Name</label>
                                <div className="">
                                    <input 
                                        value={userName}
                                        onChange={e => setUserName(e.target.value)}
                                        type="text" className="form-control" id="inputEmail3" placeholder="UserName"/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputPassword3" className="control-label">Password</label>
                                <div className="">
                                    <input
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        type="password" className="form-control" id="inputPassword3" placeholder="Password"/>
                                </div>
                            </div>
                            <div className="form-group">
                                <div>
                                    <button type="submit" className="btn btn-default btn-auth">Sign in</button>
                                </div>
                            </div>
                        </form>

                    {/*<TextField*/}
                    {/*    margin="normal"*/}
                    {/*    required*/}
                    {/*    fullWidth*/}
                    {/*    name="password"*/}
                    {/*    label="Password"*/}
                    {/*    type="password"*/}
                    {/*    autoComplete="current-password"*/}
                    {/*    {...register('password', {required: true})}*/}
                    {/*    error={errors.password}*/}
                    {/*    helperText={errors.password && 'Password is required'}*/}
                    {/*/>*/}
                    {/*<Button type="submit" fullWidth variant="contained" sx={{mt: 3, mb: 2}}>*/}
                    {/*    Sign In*/}
                    {/*</Button>*/}
                    {/*<Button type="button"*/}
                    {/*        onClick={() => setShowSignup(true)}*/}
                    {/*        fullWidth variant="contained" sx={{mt: 3, mb: 2}}>*/}
                    {/*    Sign Up*/}
                    {/*</Button>*/}
                    {/*</Box>*/}
                </Box>
            </Box>
        </>
    );
}

export default LoginForm;
