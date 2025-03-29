import { FC } from 'react';
import { Container } from '@mui/material';
import { Applications } from '../../components/Applications';

export const Main: FC = () => {
    return (
        <Container maxWidth="xl" sx={{ mt: 3 }}>
            <Applications />
        </Container>
    );
};
