import { Container } from '@mui/material';
import { FC, useEffect } from 'react';
import { useTitleStore } from '../../stores/common/title/useTitleStore';
import { Visualization } from '../../components/FinanceApp/components/visualization';

export const DataVisualization: FC = () => {
    const setTitle = useTitleStore(state => state.setTitle);

    useEffect(() => {
        setTitle('DataVisualization');
    }, [setTitle]);

    return (
        <Container maxWidth="xl" sx={{ mt: 2 }}>
            <Visualization />
        </Container>
    );
};
