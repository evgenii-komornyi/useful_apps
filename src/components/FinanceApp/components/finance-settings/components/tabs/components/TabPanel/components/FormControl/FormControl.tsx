import { FC } from 'react';
import { Divider, IconButton } from '@mui/material';
import {
    AddButtonContainer,
    SaveButton,
    SaveButtonContainer,
} from '../styles/TabPanel';
import { AddCircleOutlineRounded, StorageRounded } from '@mui/icons-material';
import { ProfitExpenseType } from '../../../../../../../../../../utils/common';

interface Props {
    type: ProfitExpenseType;
    handleAddBox: () => void;
    saveSettings: () => void;
}

export const FormControl: FC<Props> = ({
    type,
    handleAddBox,
    saveSettings,
}) => {
    return (
        <>
            <AddButtonContainer>
                <IconButton onClick={handleAddBox}>
                    <AddCircleOutlineRounded />
                </IconButton>
            </AddButtonContainer>
            <Divider />
            <SaveButtonContainer>
                <SaveButton
                    variant="outlined"
                    size="small"
                    fullWidth
                    color="success"
                    startIcon={<StorageRounded />}
                    onClick={saveSettings}
                >
                    Save {type}
                </SaveButton>
            </SaveButtonContainer>
        </>
    );
};
