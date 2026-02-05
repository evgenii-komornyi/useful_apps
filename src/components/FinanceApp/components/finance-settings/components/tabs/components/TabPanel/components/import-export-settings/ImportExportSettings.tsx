import { FC } from 'react';

import { Import } from './components/Import';
import { Export } from './components/Export';
import { Box, Divider } from '@mui/material';
import { SnackbarAlert } from '../../../../../../../../../SnackbarAlert';

export const ImportExportSettings: FC = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 3,
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignSelf: 'center',
                    width: '100%',
                }}
            >
                <Export />
            </Box>
            <Divider />
            <Import />
            <SnackbarAlert
                message='Your data was imported successfuly.'
                type='import'
                autoHideDuration={2000}
            />    
        </Box>
    );
};
