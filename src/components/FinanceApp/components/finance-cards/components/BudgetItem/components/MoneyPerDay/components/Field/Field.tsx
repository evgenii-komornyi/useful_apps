import { ChangeEvent, FC, KeyboardEvent, useEffect, useState } from 'react';
import { TextField } from '@mui/material';
import { BudgetDate } from '../../../../../../../../../../utils/common';
import { useBudgetStore } from '../../../../../../../../../../stores/finance-app/budget/useBudgetStore';

interface Props {
    currentAmount: number;
    budgetDate: BudgetDate;
    hideField: () => void;
}

export const Field: FC<Props> = ({ currentAmount, budgetDate, hideField }) => {
    const [newValue, setNewValue] = useState<string>('');
    const [error, setError] = useState<string>('');

    useEffect(() => {
        if (currentAmount) setNewValue(currentAmount.toFixed(2));
    }, [currentAmount]);

    const onChangeHandler = ({
        target: { value },
    }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setNewValue(value.replace(',', '.'));
    };

    const { updateMoneyPerDay } = useBudgetStore(state => state);

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>): void => {
        if (e.key === 'Enter') {
            if (!/^\d*\.?\d*$/.test(newValue) || !newValue) {
                setError('Only integer and decimal!');
                return;
            }

            updateMoneyPerDay(+newValue, budgetDate);
            hideField();
            setError('');
        }

        if (e.key === 'Escape') {
            hideField();
        }
    };

    return (
        <TextField
            name="moneyPerDay"
            value={newValue}
            label="Amount"
            size="small"
            autoFocus={true}
            variant="outlined"
            slotProps={{
                input: {
                    sx: {
                        fontSize: 14,
                        '&::placeholder': {
                            fontSize: 14,
                        },
                    },
                },
            }}
            helperText={error}
            sx={{ width: 200 }}
            onChange={onChangeHandler}
            onKeyDown={onKeyDownHandler}
        />
    );
};
