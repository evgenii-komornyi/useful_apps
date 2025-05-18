import { Container } from '@mui/material';
import { FinanceApp } from '../../components/FinanceApp';
import { FC, useEffect } from 'react';
import { useTitleStore } from '../../stores/common/title/useTitleStore';

export const Finance: FC = () => {
    const setTitle = useTitleStore(state => state.setTitle);

    useEffect(() => {
        setTitle('Finance');
    }, [setTitle]);

    return (
        <Container maxWidth="xl" sx={{ mt: 2 }}>
            <FinanceApp />
        </Container>
    );
};
