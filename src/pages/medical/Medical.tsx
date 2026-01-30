import { Container } from '@mui/material';
import { FC, useEffect } from 'react';
import { useTitleStore } from '../../stores/common/title/useTitleStore';
import { MedicalApp } from '../../components/MedicalApp';

export const Medical: FC = () => {
    const setTitle = useTitleStore(state => state.setTitle);

    useEffect(() => {
        setTitle('Medical');
    }, [setTitle]);

    return (
        <Container maxWidth="xl" sx={{ mt: 2 }}>
            <MedicalApp />
        </Container>
    );
};
