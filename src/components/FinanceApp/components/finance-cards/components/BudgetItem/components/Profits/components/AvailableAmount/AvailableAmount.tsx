import { FC } from 'react';
import {
    BudgetDate,
    Expense,
    Profit,
} from '../../../../../../../../../../utils/common.ts';
import { useFinanceSettingsStore } from '../../../../../../../../../../stores/finance-app/settings/useSettingsStore.ts';
import { Box, Typography } from '@mui/material';
import { formatCurrencyByLocation } from '../../../../../../../../../../utils/formatters/currency.ts';
import {
    calculateAvailableAmount,
    calculateExpenses,
} from '../../../../../../../../../../utils/arrays/arrays.ts';

interface Props {
    profit: Profit[];
    expenses: Expense[];
    date: BudgetDate;
}

export const AvailableAmount: FC<Props> = ({ profit, expenses }) => {
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
