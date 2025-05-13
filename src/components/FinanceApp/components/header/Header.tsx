import { FC, useState } from 'react';
import { CurrentDateTime } from './components/current-date-time';

import {
    Container,
    AppBar,
    Toolbar as MUIToolbar,
    IconButton,
    Drawer,
} from '@mui/material';
import { Menu } from '@mui/icons-material';
import { Navigation } from './components/navigation';

export const Header: FC = () => {
    const [open, setOpen] = useState(false);

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <MUIToolbar
                    disableGutters
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}
                >
                    <IconButton onClick={toggleDrawer(true)}>
                        <Menu />
                    </IconButton>
                    <Drawer open={open} onClose={toggleDrawer(false)}>
                        <Navigation toggleDrawer={toggleDrawer(false)} />
                    </Drawer>
                    <CurrentDateTime />
                </MUIToolbar>
            </Container>
        </AppBar>
    );
};
