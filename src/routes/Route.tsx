import { ReactElement, memo } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { Main } from '../pages/main';
import { Finance } from '../pages/finance';
import { FinanceSettings } from '../pages/finance-settings';
import { BudgetDetails } from '../pages/budget-details/BudgetDetails';
import { DataVisualization } from '../pages/data-visualization';

interface IRoute {
    path: string;
    page: ReactElement;
}

const mainRoutes: IRoute[] = [
    { path: '/', page: <Main /> },
    { path: '/finance', page: <Finance /> },
    { path: '/finance/settings', page: <FinanceSettings /> },
    { path: '/finance/budget/:year/:month', page: <BudgetDetails /> },
    { path: '/finance/visualization', page: <DataVisualization /> },
    { path: '*', page: <Navigate to="/" /> },
];

const NonMemoizedRoutes = (): ReactElement => {
    return (
        <Routes>
            {mainRoutes.map(({ path, page }, index) => (
                <Route key={index} path={path} element={page} />
            ))}
        </Routes>
    );
};

export const MainRoutes = memo(NonMemoizedRoutes);
