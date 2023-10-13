import React, {useState} from 'react';
import { styled } from '@mui/system';
import { Divider, Drawer, List, ListItem, ListItemText } from '@mui/material';
import OtherHousesIcon from '@mui/icons-material/OtherHouses';
import ApartmentIcon from '@mui/icons-material/Apartment';
import GroupsIcon from '@mui/icons-material/Groups';
import FactoryIcon from '@mui/icons-material/Factory';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import axios from "axios";
import usePanelStore from "../../Store/usePanelStore";
import {Link} from "react-router-dom";

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
    const path = window.location.pathname;
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
    const [routeNames, setRouteNames] = useState([
        {id: 1, name: 'Home', link: '/', component: <GroupsIcon/>},
        {id: 2, name: 'Clients', link: '/clients', component: <OtherHousesIcon/>},
        {id: 3, name: 'Companies', link: '/companies', component: <ApartmentIcon/>},
        {id: 4, name: 'Industries', link: '/industries', component: <FactoryIcon/>},
        {id: 6, name: 'Agendas', link: '/agendas', component: <LogoutIcon/>},
        {id: 7, name: 'Interpreters', link: '/interpreters', component: <PersonIcon/>},
        {id: 8, name: "Meetings", link: '/meetings', component: <GroupsIcon/>}
    ])
    return (
        <aside className="al-sidebar">
            <div className="slimScrollDiv" style={{position: 'relative', overflow: 'hidden', width: 'auto', height: '297px'}}>
                <ul className="al-sidebar-list"
                    style={{overflow: 'hidden', width: 'auto', height: '297px'}}>
                    {routeNames.map(r => (
                    <li key={`nav-route-${r.id}`}
                        className={`al-sidebar-list-item ng-scope ${!path || path.toLowerCase() === r.link.toLowerCase() ? 'selected' : ""}`}>
                        <Link
                        className="al-sidebar-list-link ng-scope" to={r.link}>
                            {r.component}
                            <span
                        className="ng-binding">{r.name}</span></Link>
                    </li>
                    ))}
                </ul>
            </div>
            <div className="sidebar-hover-elem show-hover-elem"
                style={{height: '42px'}}></div>
        </aside>
    );
};

export default DrawerBox;
