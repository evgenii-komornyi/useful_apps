import { Container } from '@mui/material';

import { Details } from '../../components/FinanceApp/components/finance-cards/components/BudgetDetails';
import { FC, useEffect } from 'react';
import { useTitleStore } from '../../stores/common/title/useTitleStore';

export const BudgetDetails: FC = () => {
    const setTitle = useTitleStore(state => state.setTitle);

    useEffect(() => {
        setTitle('BudgetDetails');
    }, [setTitle]);
    return (
        <Container maxWidth="xl" sx={{ mt: 2 }}>
            <Details />
        </Container>
    );
};
