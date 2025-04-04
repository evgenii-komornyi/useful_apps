import { FC } from 'react';
import { Grid2 as Grid } from '@mui/material';
import { Header } from './components/header';
import { FinanceApplicationContentContainer } from './styles/FinanceApp.ts';
import { FinanceSettings } from './components/finance-settings';
import { FinanceCards } from './components/finance-cards';

export const FinanceApp: FC = () => {
    return (
        <FinanceApplicationContentContainer container spacing={2}>
            <Grid size={{ xs: 12 }}>
                <Header />
            </Grid>
            <Grid size={{ xs: 12 }}>
                <FinanceCards />
            </Grid>
            <FinanceSettings />
        </FinanceApplicationContentContainer>
    );
};
