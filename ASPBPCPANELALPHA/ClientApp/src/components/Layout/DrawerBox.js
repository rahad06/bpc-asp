import React from 'react';
import { styled } from '@mui/system';
import {Divider, Drawer, List, ListItem, ListItemText} from '@mui/material';
import OtherHousesIcon from '@mui/icons-material/OtherHouses';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import ApartmentIcon from '@mui/icons-material/Apartment';
import GroupsIcon from '@mui/icons-material/Groups';
import FactoryIcon from '@mui/icons-material/Factory';
import PersonIcon from '@mui/icons-material/Person';
const drawerWidth = '20%';

const StyledDrawer = styled(Drawer)(({ theme }) => ({
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
    return (
        <StyledDrawer variant="permanent">
            <div className={'side-nav'}>
                <List>
                    <ListItem button component="a" href="/" sx={{margin: 0}}>
                        <OtherHousesIcon fontSize="large"/>
                        <ListItemText primary="Home" sx={{fontSize: '20px'}}/>
                    </ListItem>
                    <Divider/>
                    <ListItem button component="a" href="/clients" sx={{margin: 0}}>
                        <LocationCityIcon fontSize="large"/>
                        <ListItemText primary="Clients"  sx={{fontSize: '20px'}}/>
                    </ListItem>

                    <ListItem button component="a" href="/meetings" sx={{margin: 0}}>
                        <GroupsIcon fontSize="large"/>
                        <ListItemText primary="Meetings" sx={{fontSize: '20px'}} />
                    </ListItem>
                    <ListItem button component="a" href="/intrepreters" sx={{margin: 0}}>
                        <PersonIcon fontSize="large"/>
                        <ListItemText primary="Interepreters" sx={{fontSize: '20px'}} />
                    </ListItem>
                    <Divider/>

                    <ListItem button component="a" href="/companies" sx={{margin: 0}}>
                        <ApartmentIcon fontSize="large"/>
                        <ListItemText primary="Companies"  sx={{fontSize: '20px'}}/>
                    </ListItem>
                    <ListItem button component="a" href="/industries" sx={{margin: 0}}>
                        <FactoryIcon fontSize="large"/>
                        <ListItemText primary="Industries"  sx={{fontSize: '20px'}}/>
                    </ListItem>

                </List>
            </div>
        </StyledDrawer>
    );
};

export default DrawerBox;
