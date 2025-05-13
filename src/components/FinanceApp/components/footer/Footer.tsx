import {
    ArrowBackIosOutlined,
    BalanceOutlined,
    SettingsOutlined,
    WidgetsOutlined,
} from '@mui/icons-material';
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import { ReactNode, useState } from 'react';
import { Link, NavigateFunction, useNavigate } from 'react-router-dom';
import { useTitleStore } from '../../../../stores/common/title/useTitleStore';

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
        title: 'Applications',
        icon: <WidgetsOutlined />,
        route: '/',
    },
    {
        id: 'finance-app',
        title: 'Finance',
        icon: <BalanceOutlined />,
        route: '/finance',
    },
];

export const Footer = () => {
    const [value, setValue] = useState<number>(0);
    const { title, setTitle } = useTitleStore(state => state);
    const navigate: NavigateFunction = useNavigate();

    return (
        <Paper
            sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
            elevation={3}
        >
            <BottomNavigation
                showLabels
                value={value}
                onChange={(_, newValue) => {
                    setValue(newValue);
                }}
            >
                {mainMenuItems.map(({ id, title, icon, route }) => (
                    <BottomNavigationAction
                        key={id}
                        label={title}
                        icon={icon}
                        component={Link}
                        to={route}
                    />
                ))}
                {['Finance', 'BudgetDetails'].includes(title) && (
                    <BottomNavigationAction
                        label="Settings"
                        icon={<SettingsOutlined />}
                        component={Link}
                        to="/finance/settings"
                    />
                )}
                {['FinanceSettings'].includes(title) && (
                    <BottomNavigationAction
                        label="Back"
                        icon={<ArrowBackIosOutlined />}
                        onClick={() => {
                            setTitle('Finance');
                            navigate(-1);
                        }}
                    />
                )}
            </BottomNavigation>
        </Paper>
    );
};
