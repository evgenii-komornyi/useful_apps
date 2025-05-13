import { Container } from '@mui/material';
import { SettingTabs } from '../../components/FinanceApp/components/finance-settings/components/tabs';
import { FC, useEffect } from 'react';
import { useTitleStore } from '../../stores/common/title/useTitleStore';

export const FinanceSettings: FC = () => {
    const setTitle = useTitleStore(state => state.setTitle);

    useEffect(() => {
        setTitle('FinanceSettings');
    }, [setTitle]);

    return (
        <Container maxWidth="md" sx={{ mt: 2 }}>
            <SettingTabs />
        </Container>
    );
};
