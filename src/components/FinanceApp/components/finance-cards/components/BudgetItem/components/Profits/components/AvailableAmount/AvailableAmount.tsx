import { FC, useState } from 'react';
import {
    BudgetDate,
    Expense,
    Profit,
} from '../../../../../../../../../../utils/common.ts';
import { useFinanceSettingsStore } from '../../../../../../../../../../stores/finance-app/settings/useSettingsStore.ts';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import { formatCurrencyByLocation } from '../../../../../../../../../../utils/formatters/currency.ts';
import {
    calculateAvailableAmount,
    calculateExpenses,
} from '../../../../../../../../../../utils/arrays/arrays.ts';
import { isToday } from '../../../../../../../../../../utils/checkers/date.ts';
import { ChangeCircleOutlined } from '@mui/icons-material';
import { CurrentAmountField } from '../CurrentAmount/components/CurrentAmountField/CurrentAmountField.tsx';

interface Props {
    profit: Profit[];
    expenses: Expense[];
    date: BudgetDate;
}

export const AvailableAmount: FC<Props> = ({ profit, expenses, date }) => {
    const { user } = useFinanceSettingsStore(state => state);

    const available: number =
        calculateAvailableAmount(profit) - calculateExpenses(expenses);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}
        >
            <Typography variant="body1">Available</Typography>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Typography variant="body1">
                    {formatCurrencyByLocation(
                        user.locale,
                        user.currency,
                        available
                    )}
                </Typography>
            </Box>
        </Box>
    );
};
