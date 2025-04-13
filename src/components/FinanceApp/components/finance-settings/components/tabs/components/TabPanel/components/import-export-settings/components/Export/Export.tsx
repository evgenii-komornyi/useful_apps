import { BackupOutlined } from '@mui/icons-material';
import { Button } from '@mui/material';
import { FC } from 'react';
import { useFinanceSettingsStore } from '../../../../../../../../../../../../stores/finance-app/settings/useSettingsStore';
import { useBudgetStore } from '../../../../../../../../../../../../stores/finance-app/budget/useBudgetStore';

export const Export: FC = () => {
    const { user } = useFinanceSettingsStore(state => state);
    const { budget } = useBudgetStore(state => state);
    const handleExport = () => {
        const jsonString = JSON.stringify({ user, budget }, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = 'finance_app.json';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        URL.revokeObjectURL(url);
    };

    return (
        <Button
            color="primary"
            variant="outlined"
            sx={{
                margin: '0 auto',
                borderColor: 'white',
                color: 'white',
            }}
            endIcon={<BackupOutlined />}
            onClick={handleExport}
        >
            Export budget and settings
        </Button>
    );
};
