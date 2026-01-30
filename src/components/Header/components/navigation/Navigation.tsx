import {
    Box,
    Collapse,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from '@mui/material';
import { FC, MouseEvent, ReactNode, useState } from 'react';
import { MenuLink } from '../../styles/Header.tsx';
import {
    BalanceOutlined,
    Close,
    ExpandLess,
    ExpandMore,
    SettingsOutlined,
    WidgetsOutlined,
} from '@mui/icons-material';

interface Props {
    toggleDrawer: (isOpen: boolean) => void;
}

interface MenuItem {
    id: string;
    title: string;
    icon: ReactNode;
    route: string;
    items?: MenuItem[];
}

const mainMenuItems: MenuItem[] = [
    {
        id: 'main-page',
        title: 'applications',
        icon: <WidgetsOutlined />,
        route: '/',
        items: [
            {
                id: 'finance-app',
                title: 'finance',
                icon: <BalanceOutlined />,
                route: '/finance',
            },
            {
                id: 'settings-page',
                title: 'settings',
                icon: <SettingsOutlined />,
                route: '/finance/settings',
            },
        ],
    },
];

export const Navigation: FC<Props> = ({ toggleDrawer }) => {
    const [open, setOpen] = useState<boolean>(false);

    const handleClick = () => {
        setOpen(prev => !prev);
    };

    const openClose = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        handleClick();
    };

    return (
        <Box sx={{ width: 250 }} role="presentation">
            <IconButton
                sx={{ position: 'absolute', right: 0 }}
                onClick={() => toggleDrawer(false)}
            >
                <Close />
            </IconButton>
            <List sx={{ mt: 5 }}>
                {mainMenuItems.map(({ id, title, icon, route, items }) => (
                    <ListItem
                        key={id}
                        disablePadding
                        sx={{ flexDirection: 'column' }}
                    >
                        <ListItemButton
                            sx={{ justifyContent: 'space-between' }}
                        >
                            <ListItemIcon>{icon}</ListItemIcon>
                            <MenuLink
                                to={route}
                                onClick={() => toggleDrawer(false)}
                            >
                                <ListItemText primary={title} />
                            </MenuLink>
                            {items && (
                                <IconButton onClick={openClose}>
                                    {open ? <ExpandLess /> : <ExpandMore />}
                                </IconButton>
                            )}
                        </ListItemButton>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                {items?.map(item => (
                                    <MenuLink
                                        key={item.id}
                                        to={item.route}
                                        onClick={() => toggleDrawer(false)}
                                    >
                                        <ListItem disablePadding>
                                            <ListItemButton sx={{ pl: 4 }}>
                                                <ListItemIcon>
                                                    {item.icon}
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary={item.title}
                                                />
                                            </ListItemButton>
                                        </ListItem>
                                    </MenuLink>
                                ))}
                            </List>
                        </Collapse>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};
