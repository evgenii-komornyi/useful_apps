import {
    ArrowBackIosOutlined,
    BalanceOutlined, MedicalInformationOutlined,
    QueryStatsOutlined,
    SettingsOutlined,
    WidgetsOutlined
} from '@mui/icons-material';
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import { ReactNode, useState } from 'react';
import { Link, NavigateFunction, useNavigate } from 'react-router-dom';
import { useTitleStore } from '../../stores/common/title/useTitleStore.ts';
import {
    Criteria,
    financeCriteria,
    mainCriteria,
    medicalCriteria
} from '../../utils/criteria/criteria.ts';

interface MenuItem {
    id: string;
    title: string;
    icon: ReactNode;
    route: string;
    showCriteria: Criteria[];
}

const mainMenuItems: MenuItem[] = [
    {
        id: 'main-page',
        title: 'Applications',
        icon: <WidgetsOutlined />,
        route: '/',
        showCriteria: [...mainCriteria, ...financeCriteria, ...medicalCriteria]
    },
    {
        id: 'finance-app',
        title: 'Finance',
        icon: <BalanceOutlined />,
        route: '/finance',
        showCriteria: mainCriteria
    },
    {
        id: 'medical-app',
        title: 'Medical',
        icon: <MedicalInformationOutlined />,
        route: '/medical',
        showCriteria: mainCriteria
    },
] as const;

const ROUTE_BY_TITLE: { [key: string]: string }= {
    [Criteria.Finance]: '/finance/settings',
    [Criteria.Medical]: '/medical/settings',
} as const;

const TITLE_BY_ROUTE: { [key: string]: string } = {
    [Criteria.FinanceSettings]: 'Finance',
    [Criteria.MedicalSettings]: 'Medical',
} as const;

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
                {mainMenuItems.map(({ id, title: itemTitle, icon, route, showCriteria }) => (
                    showCriteria.includes(title as Criteria) && <BottomNavigationAction
                        key={id}
                        label={itemTitle}
                        icon={icon}
                        component={Link}
                        to={route}
                    />
                ))}
                {financeCriteria.includes(title as Criteria) && (
                    <BottomNavigationAction
                        label="Visualization"
                        icon={<QueryStatsOutlined />}
                        component={Link}
                        to="/finance/visualization"
                    />
                )}
                {[...financeCriteria, ...medicalCriteria].includes(title as Criteria) && (
                    <BottomNavigationAction
                        label="Settings"
                        icon={<SettingsOutlined />}
                        component={Link}
                        to={ROUTE_BY_TITLE[title]}
                    />
                )}
                {[Criteria.FinanceSettings, Criteria.DataVisualization, Criteria.MedicalSettings].includes(title as Criteria) && (
                    <BottomNavigationAction
                        label="Back"
                        icon={<ArrowBackIosOutlined />}
                        onClick={() => {
                            setTitle(TITLE_BY_ROUTE[title]);
                            navigate(-1);
                        }}
                    />
                )}
            </BottomNavigation>
        </Paper>
    );
};
