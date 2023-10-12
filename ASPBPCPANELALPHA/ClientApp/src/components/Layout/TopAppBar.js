import React from 'react';
import { styled } from '@mui/system';
import { AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import {Link} from "react-router-dom";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
    backgroundColor: '#F5F5F5', // Main color for the top app bar
    boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)',
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
    marginRight: theme.spacing(2),
}));

const TopAppBar = () => {
    return (
        // <StyledAppBar position="fixed">
        //     <Toolbar>
        //         <StyledIconButton edge="start" color="inherit" aria-label="menu">
        //             <MenuIcon />
        //         </StyledIconButton>
        //         <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: '#2D4059', textAlign: 'right' }}>
        //             MEETINGS' PANEL
        //         </Typography>
        //         {/* Add additional components or menu items here */}
        //     </Toolbar>
        // </StyledAppBar>
        <div className="page-top clearfix ng-isolate-scope position-relative" style={{zIndex: 9999}}>
            <Link to="/" className="al-logo clearfix">
                BP<span>Panel</span></Link>
            <a href="" className="collapse-menu-link ion-navicon" 
               ></a>
            <div className="question-section">Have questions?{' '}
                <a href="mailto:dararah06@gmail.com">dararah06@gmail.com</a>
            </div></div>
    );
};

export default TopAppBar;
