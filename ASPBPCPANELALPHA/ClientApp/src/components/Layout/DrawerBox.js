import React from 'react';
import { styled } from '@mui/system';
import { Divider, Drawer, List, ListItem, ListItemText } from '@mui/material';
import OtherHousesIcon from '@mui/icons-material/OtherHouses';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import ApartmentIcon from '@mui/icons-material/Apartment';
import GroupsIcon from '@mui/icons-material/Groups';
import FactoryIcon from '@mui/icons-material/Factory';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import axios from "axios";
import usePanelStore from "../../Store/usePanelStore";

const drawerWidth = '20%';

const StyledDrawer = styled(Drawer)(({ theme }) => ({
    width: drawerWidth,
    flexShrink: 0,
    '& .MuiDrawer-paper': {
        width: drawerWidth,
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
        borderRight: '0',
        backgroundColor: '#2D4059',
    },
}));

const SideNav = styled('div')({
    padding: '16px',
    color: '#777777',
});

const NavItem = styled(ListItem)(({ theme }) => ({
    marginBottom: '10px',
    padding: '8px',
    borderRadius: '4px',
    color: "#F5F5F5",
    '&:hover': {
        backgroundColor: '#F5F5F5',
        cursor: 'pointer',
        color: '#2D4059'
    },
}));

const Icon = styled('span')({
    marginRight: '16px',
});

const DrawerBox = () => {
    const { setShowSignup, setShow, roles } = usePanelStore();
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

            setShow(false);
            setShowSignup(false);
        }
    };
    return (
        <StyledDrawer variant="permanent" className={"side-nav"}>
            <SideNav>
                <List>
                    <NavItem button component="a" href="/">
                        <Icon>
                            <OtherHousesIcon fontSize="large" />
                        </Icon>
                        <ListItemText primary="Home" />
                    </NavItem>
                    <Divider />
                    <NavItem button component="a" href="/clients">
                        <Icon>
                            <LocationCityIcon fontSize="large" />
                        </Icon>
                        <ListItemText primary="Clients" />
                    </NavItem>

                    <NavItem button component="a" href="/meetings">
                        <Icon>
                            <GroupsIcon fontSize="large" />
                        </Icon>
                        <ListItemText primary="Meetings" />
                    </NavItem>
                    <NavItem button component="a" href="/interpreters">
                        <Icon>
                            <PersonIcon fontSize="large" />
                        </Icon>
                        <ListItemText primary="Interepreters" />
                    </NavItem>
                    <Divider />

                    <NavItem button component="a" href="/companies">
                        <Icon>
                            <ApartmentIcon fontSize="large" />
                        </Icon>
                        <ListItemText primary="Companies" />
                    </NavItem>
                    <NavItem button component="a" href="/industries">
                        <Icon>
                            <FactoryIcon fontSize="large" />
                        </Icon>
                        <ListItemText primary="Industries" />
                    </NavItem>
                    <Divider />

                    <NavItem button component="a"  onClick={() => logout()}>
                        <Icon>
                            <LogoutIcon fontSize="large" />
                        </Icon>
                        <ListItemText primary="Logout" />
                    </NavItem>
                </List>
            </SideNav>
        </StyledDrawer>
    );
};

export default DrawerBox;
