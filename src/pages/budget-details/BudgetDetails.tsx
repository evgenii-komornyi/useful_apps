import { Container } from '@mui/material';

import { Details } from '../../components/FinanceApp/components/finance-cards/components/BudgetDetails';

export const BudgetDetails = () => {
    return (
        <Container maxWidth="xl" sx={{ mt: 2 }}>
            <Details />
        </Container>
    );
};
