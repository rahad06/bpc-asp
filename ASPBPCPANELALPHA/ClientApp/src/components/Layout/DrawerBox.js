import React, {useState} from 'react';
import {
    Box,
    Button,
    Divider,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    SwipeableDrawer
} from "@mui/material";
import InboxIcon from '@mui/icons-material/Inbox';
import MailIcon from '@mui/icons-material/Mail';
import Logout from "../Login/Logout";

function DrawerBox(props) {
    const [open, setOpen] = useState(false)
    const toggleDrawer = (side, con) => {
        setOpen(con);
    }
    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
            onClick={() => toggleDrawer(anchor, false)}
            onKeyDown={() => toggleDrawer(anchor, false)}
        >
            <List>
                    <ListItem key={1} disablePadding>
                        <ListItemButton onClick={() => console.log(1)}>
                            <ListItemIcon>
                                <InboxIcon />
                            </ListItemIcon>
                            <ListItemText primary={1} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem key={2} disablePadding>
                        <Logout/>
                    </ListItem>
            </List>
            <Divider />
           
        </Box>
    );

    return (
        <>
            <Button onClick={() => toggleDrawer('left', true)}>{'left'}</Button>
            <SwipeableDrawer
                anchor={'left'}
                open={open}
                onClose={() => toggleDrawer('left', false)}
                onOpen={() => toggleDrawer('left', true)}
            >
                {list('left')}
            </SwipeableDrawer>
        </>
    );
}

export default DrawerBox;