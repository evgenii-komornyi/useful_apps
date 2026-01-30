import { FC } from 'react';
import { Grid2 as Grid } from '@mui/material';
import { FinanceApplicationContentContainer } from './styles/FinanceApp.ts';
import { FinanceCards } from './components/finance-cards';

export const FinanceApp: FC = () => {
    return (
        <FinanceApplicationContentContainer container spacing={2}>
            <Grid size={{ xs: 12 }}>
                <FinanceCards />
            </Grid>
        </FinanceApplicationContentContainer>
    );
};
