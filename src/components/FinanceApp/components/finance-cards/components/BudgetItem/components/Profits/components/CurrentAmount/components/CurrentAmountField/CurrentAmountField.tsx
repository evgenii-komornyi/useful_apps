import { ChangeEvent, FC, KeyboardEvent, useEffect, useState } from 'react';
import { TextField } from '@mui/material';
import {
    BudgetDate,
    Expense,
    Profit,
    ProfitExpenseType,
} from '../../../../../../../../../../../../utils/common';
import { v4 as uuidv4 } from 'uuid';
import { useBudgetStore } from '../../../../../../../../../../../../stores/finance-app/budget/useBudgetStore';

interface Props {
    budgetDate: BudgetDate;
    currentAmount: number;
    profit: Profit[];
    expenses: Expense[];
    hideField: () => void;
}

export const CurrentAmountField: FC<Props> = ({
    budgetDate,
    currentAmount,
    profit,
    expenses,
    hideField,
}) => {
    const { addUnspecifiedMoneyFlowByType, removeUnspecifiedMoneyFlowByType } =
        useBudgetStore();
    const [newValue, setNewValue] = useState<string>('');
    const [error, setError] = useState<string>('');

    useEffect(() => {
        setNewValue(currentAmount.toFixed(2));
    }, []);

    const onChangeHandler = ({
        target: { value },
    }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setNewValue(value.replace(',', '.'));
    };

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>): void => {
        if (e.key === 'Enter') {
            if (!/^\d*\.?\d*$/.test(newValue)) {
                setError('Only integer and decimal!');
                return;
            }

            const date: Date = new Date();

            const inconsistency: number = currentAmount - +newValue;

            const savingProfit: Profit | undefined = profit.find(
                item => item.title === 'Saving'
            );
            const unknownExpense: Expense | undefined = expenses.find(
                item => item.title === 'Unknown'
            );

            const savingProfitValue: string | 0 = savingProfit?.amount || 0;
            const unknownExpenseValue: string | 0 = unknownExpense?.amount || 0;

            const resultingCorrection: number =
                +savingProfitValue - +unknownExpenseValue - inconsistency;

            if (resultingCorrection < 0) {
                const unknown: Expense = {
                    id: uuidv4(),
                    title: 'Unknown',
                    amount: Math.abs(resultingCorrection).toFixed(2),
                    editable: unknownExpense?.editable || false,
                    visualize: unknownExpense?.visualize || false,
                    type: ProfitExpenseType.Expenses,
                    expenseDay: date.getDate(),
                };

                addUnspecifiedMoneyFlowByType(
                    unknown,
                    ProfitExpenseType.Expenses,
                    budgetDate
                );

                if (resultingCorrection < 0) {
                    removeUnspecifiedMoneyFlowByType(
                        'Saving',
                        'profit',
                        budgetDate
                    );
                }
            } else {
                const saving: Profit = {
                    id: uuidv4(),
                    title: 'Saving',
                    amount: resultingCorrection.toFixed(2),
                    editable: savingProfit?.editable || false,
                    visualize: savingProfit?.visualize || false,
                    type: ProfitExpenseType.Profit,
                    profitDay: date.getDate(),
                };

                addUnspecifiedMoneyFlowByType(
                    saving,
                    ProfitExpenseType.Profit,
                    budgetDate
                );

                if (resultingCorrection > 0) {
                    removeUnspecifiedMoneyFlowByType(
                        'Unknown',
                        'expenses',
                        budgetDate
                    );
                }
            }

            if (resultingCorrection === 0) {
                removeUnspecifiedMoneyFlowByType(
                    'Unknown',
                    'expenses',
                    budgetDate
                );
                removeUnspecifiedMoneyFlowByType(
                    'Saving',
                    'profit',
                    budgetDate
                );
            }

            hideField();
            setError('');
        }

        if (e.key === 'Escape') hideField();
    };

    return (
        <TextField
            name="currentAmount"
            value={newValue}
            label="Current"
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
            onKeyDown={onKeyPressHandler}
        />
    );
};
