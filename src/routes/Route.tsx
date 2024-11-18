import { ReactElement, memo } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { Main } from '../pages/main';
import {Finance} from "../pages/finance";

interface IRoute {
    path: string;
    page: ReactElement;
}

const mainRoutes: IRoute[] = [
    { path: '/', page: <Main /> },
    { path: '/finance', page: <Finance /> },
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