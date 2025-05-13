import { Container } from '@mui/material';
import { SettingTabs } from '../../components/FinanceApp/components/finance-settings/components/tabs';

export const FinanceSettings = () => {
    return (
        <Container maxWidth="md" sx={{ mt: 2 }}>
            <SettingTabs />
        </Container>
    );
};
