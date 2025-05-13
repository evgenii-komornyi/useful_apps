import { FC } from 'react';
import { Container } from '@mui/material';
import { FinanceApp } from '../../components/FinanceApp';

export const Finance: FC = () => {
    return (
        <Container maxWidth="xl" sx={{ mt: 2 }}>
            <FinanceApp />
        </Container>
    );
};
