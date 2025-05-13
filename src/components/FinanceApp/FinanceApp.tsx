import { FC } from 'react';
import { Grid2 as Grid, useMediaQuery, useTheme } from '@mui/material';
import {
    ControlContainer,
    FinanceApplicationContentContainer,
    ToolbarContainer,
} from './styles/FinanceApp.ts';
import { FinanceSettings } from './components/finance-settings';
import { FinanceCards } from './components/finance-cards';
import { Toolbar } from './components/finance-cards/components/BudgetItem/components/Expenses/components/Toolbar/Toolbar.tsx';
import { GenerationMenu } from './components/header/components/generation-menu/GenerationMenu.tsx';

export const FinanceApp: FC = () => {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('md'));

    return (
        <FinanceApplicationContentContainer container spacing={2}>
            {matches && (
                <ToolbarContainer>
                    <Toolbar />
                    <ControlContainer>
                        <GenerationMenu />
                    </ControlContainer>
                </ToolbarContainer>
            )}
            <Grid size={{ xs: 12 }}>
                <FinanceCards />
            </Grid>
            <FinanceSettings />
        </FinanceApplicationContentContainer>
    );
};
