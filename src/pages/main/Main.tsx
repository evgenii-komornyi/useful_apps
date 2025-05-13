import { FC, useEffect } from 'react';
import { Container } from '@mui/material';
import { Applications } from '../../components/Applications';
import { useTitleStore } from '../../stores/common/title/useTitleStore';

export const Main: FC = () => {
    const setTitle = useTitleStore(state => state.setTitle);

    useEffect(() => {
        setTitle('Main');
    }, [setTitle]);

    return (
        <Container maxWidth="xl" sx={{ mt: 2 }}>
            <Applications />
        </Container>
    );
};
