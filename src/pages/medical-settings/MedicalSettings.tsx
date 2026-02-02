import { Container } from '@mui/material';
import { SettingTabs } from '../../components/MedicalApp/components/AnamnesisSettings/components/tabs';
import { FC, useEffect } from 'react';
import { useTitleStore } from '../../stores/common/title/useTitleStore';

export const MedicalSettings: FC = () => {
    const setTitle = useTitleStore(state => state.setTitle);

    useEffect(() => {
        setTitle('MedicalSettings');
    }, [setTitle]);

    return (
        <Container maxWidth="md" sx={{ mt: 2 }}>
            <SettingTabs />
        </Container>
    );
};
