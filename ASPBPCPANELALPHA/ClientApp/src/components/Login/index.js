import React from 'react';
import SignUpForm from "./SignUpForm";
import LoginForm from "./LoginForm";
import LogRoutes from "../../LogRoutes";
import {Grid} from "@mui/material";
import TopAppBar from "../Layout/TopAppBar";
import BoxLayout from "../Layout/BoxLayout";
import {Route, Routes} from "react-router-dom";
import AppRoutes from "../../AppRoutes";

function Index(props) {
    return (
       <LoginForm/>
)
;
}

export default Index;
