import { ChangeEvent, FC, KeyboardEvent, useEffect, useState } from 'react';
import { TextField } from '@mui/material';
import {
    BudgetDate,
    ProfitExpenseType,
} from '../../../../../../../../../../utils/common';
import { useBudgetStore } from '../../../../../../../../../../stores/finance-app/budget/useBudgetStore';
import { isPaymentDay } from '../../../../../../../../../../utils/checkers/date';
import { useSnackbarStore } from '../../../../../../../../../../stores/common/snackbar/useSnackbarStore';

interface Props {
    id: string;
    currentAmount: number;
    paymentDay: number;
    type: string;
    budgetDate: BudgetDate;
    hideField: () => void;
}

export const Field: FC<Props> = ({
    id,
    currentAmount,
    paymentDay,
    type,
    budgetDate,
    hideField,
}) => {
    const [newValue, setNewValue] = useState<string>('');
    const [error, setError] = useState<string>('');

    const { setIsOpened } = useSnackbarStore();

    useEffect(() => {
        setNewValue(currentAmount.toFixed(2));
    }, []);

    const onChangeHandler = ({
        target: { value },
    }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setNewValue(value.replace(',', '.'));
    };

    const { updateItemAmountByType } = useBudgetStore(state => state);

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>): void => {
        if (e.key === 'Enter') {
            if (!/^\d*\.?\d*$/.test(newValue) || !newValue) {
                setError('Only integer and decimal!');
                return;
            }

            updateItemAmountByType(
                id,
                newValue,
                type === ProfitExpenseType.Profit
                    ? ProfitExpenseType.Profit
                    : ProfitExpenseType.Expenses,
                budgetDate
            );

            if (isPaymentDay(paymentDay, budgetDate.month, budgetDate.year)) {
                setIsOpened(true, 'changesDetection');
            }

            hideField();
            setError('');
        }

        if (e.key === 'Escape') {
            hideField();
        }
    };

    return (
        <TextField
            name={`${
                type === ProfitExpenseType.Expenses ? 'expense' : 'profit'
            }`}
            value={newValue}
            label={`${
                type === ProfitExpenseType.Expenses ? 'Expense' : 'Profit'
            }`}
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
            sx={{ width: 80 }}
            onChange={onChangeHandler}
            onKeyDown={onKeyDownHandler}
        />
    );
};
