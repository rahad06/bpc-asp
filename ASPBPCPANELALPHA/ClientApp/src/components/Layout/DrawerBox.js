import React from 'react';
import {styled} from '@mui/system';
import {Divider, Drawer, List, ListItem, ListItemText} from '@mui/material';
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

const StyledDrawer = styled(Drawer)(({theme}) => ({
    width: drawerWidth,
    flexShrink: 0,
    '& .MuiDrawer-paper': {
        width: drawerWidth,
        boxShadow: '0px 2px 4px rgba(116, 125, 140, 0.4) !important',
        borderRight: '0 !important',
        backgroundColor: '#202123'
    },
}));

const DrawerBox = () => {
    const {setShowSignup, setShow, roles} = usePanelStore()
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
    return (
        <StyledDrawer variant="permanent">
            <div className={'side-nav'}>
                {roles && roles.includes("Admin") ?
                    <List>
                        <ListItem button component="a" href="/" sx={{margin: 0}}>
                            <OtherHousesIcon fontSize="large"/>
                            <ListItemText primary="Home" sx={{fontSize: '20px'}}/>
                        </ListItem>
                        <Divider/>
                        <ListItem button component="a" href="/clients" sx={{margin: 0}}>
                            <LocationCityIcon fontSize="large"/>
                            <ListItemText primary="Clients" sx={{fontSize: '20px'}}/>
                        </ListItem>

                        <ListItem button component="a" href="/meetings" sx={{margin: 0}}>
                            <GroupsIcon fontSize="large"/>
                            <ListItemText primary="Meetings" sx={{fontSize: '20px'}}/>
                        </ListItem>
                        <ListItem button component="a" href="/intrepreters" sx={{margin: 0}}>
                            <PersonIcon fontSize="large"/>
                            <ListItemText primary="Interepreters" sx={{fontSize: '20px'}}/>
                        </ListItem>
                        <Divider/>

                        <ListItem button component="a" href="/companies" sx={{margin: 0}}>
                            <ApartmentIcon fontSize="large"/>
                            <ListItemText primary="Companies" sx={{fontSize: '20px'}}/>
                        </ListItem>
                        <ListItem button component="a" href="/industries" sx={{margin: 0}}>
                            <FactoryIcon fontSize="large"/>
                            <ListItemText primary="Industries" sx={{fontSize: '20px'}}/>
                        </ListItem>
                        <Divider/>

                        <ListItem button component="a" onClick={() => logout()} sx={{margin: 0}}>
                            <LogoutIcon fontSize="large"/>
                            <ListItemText primary="Logout" sx={{fontSize: '20px'}}/>
                        </ListItem>
                    </List>
                    :
                    <List>
                        <ListItem button component="a" href="/" sx={{margin: 0}}>
                            <OtherHousesIcon fontSize="large"/>
                            <ListItemText primary="Home" sx={{fontSize: '20px'}}/>
                        </ListItem>
                        <Divider/>
                        <ListItem button component="a" href="/intrepreters" sx={{margin: 0}}>
                            <PersonIcon fontSize="large"/>
                            <ListItemText primary="Interepreters" sx={{fontSize: '20px'}}/>
                        </ListItem>
                        <Divider/>

                        <ListItem button component="a" href="/companies" sx={{margin: 0}}>
                            <ApartmentIcon fontSize="large"/>
                            <ListItemText primary="Companies" sx={{fontSize: '20px'}}/>
                        </ListItem>
                        <ListItem button component="a" href="/industries" sx={{margin: 0}}>
                            <FactoryIcon fontSize="large"/>
                            <ListItemText primary="Industries" sx={{fontSize: '20px'}}/>
                        </ListItem>
                        <Divider/>

                        <ListItem button component="a" onClick={() => logout()} sx={{margin: 0}}>
                            <LogoutIcon fontSize="large"/>
                            <ListItemText primary="Logout" sx={{fontSize: '20px'}}/>
                        </ListItem>
                    </List>
                }
            </div>
        </StyledDrawer>
    );
};

export default DrawerBox;
