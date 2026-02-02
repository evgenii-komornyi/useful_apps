import { BackupOutlined } from '@mui/icons-material';
import { Button } from '@mui/material';
import { FC } from 'react';
import { useAnamnesisStore } from '../../../../../../../../../../../../stores/medical-app/anamnesis/useAnamnesisStore.ts';
import { createLink } from '../../../../../../../../../../../../utils/common.ts';

export const Export: FC = () => {
    const {anamnesis} = useAnamnesisStore(state=>state);

    const handleExport = () => {
        createLink({ anamnesis }, 'medical_app');
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
            Export anamnesis data
        </Button>
    );
};
