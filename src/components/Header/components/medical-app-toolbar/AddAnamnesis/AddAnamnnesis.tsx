import { FC } from 'react';
import { useAnamnesisStore } from '../../../../../stores/medical-app/anamnesis/useAnamnesisStore.ts';
import { IAnamnesis } from '../../../../../utils/common.ts';
import { v4 as uuid } from 'uuid';
import { AddCircleOutlineOutlined } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';

const now: Date = new Date();

export const AddAnamnesis: FC = () => {
    const { anamnesis, addAnamnesis } = useAnamnesisStore(state => state);

    const addNewAnamnesis = () => {
        const newAnamnesis: IAnamnesis = {
            id: uuid(),
            month: now.getMonth(),
            year: now.getFullYear(),
            symptoms: []
        }
        addAnamnesis(newAnamnesis)
    }

    const disabled: boolean = anamnesis.some(item =>
        item.month === now.getMonth() && item.year === now.getFullYear()
    );

    return (
        <Tooltip title={disabled ? '' : 'Add Anamnesis'}>
            <span>
                <IconButton
                    onClick={addNewAnamnesis}
                    disabled={disabled}
                >
                    <AddCircleOutlineOutlined />
                </IconButton>
            </span>
        </Tooltip>
    );
}