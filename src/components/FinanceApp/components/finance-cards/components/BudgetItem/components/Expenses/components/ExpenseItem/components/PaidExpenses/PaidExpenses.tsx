import { FC } from 'react';

import { Box, Typography } from '@mui/material';
import {
    BudgetDate,
    Expense,
} from '../../../../../../../../../../../../utils/common';
import { useFinanceSettingsStore } from '../../../../../../../../../../../../stores/finance-app/settings/useSettingsStore';
import { calculatePaidExpenses } from '../../../../../../../../../../../../utils/arrays/arrays';
import { formatCurrencyByLocation } from '../../../../../../../../../../../../utils/formatters/currency';

interface Props {
    expenses: Expense[];
    date: BudgetDate;
}

export const PaidExpenses: FC<Props> = ({ expenses, date }) => {
    const { user } = useFinanceSettingsStore(state => state);

    const paidExpenses: number = calculatePaidExpenses(expenses, date);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}
        >
            <Typography variant="body1">Paid</Typography>
            <Typography variant="body1">
                {formatCurrencyByLocation(
                    user.locale,
                    user.currency,
                    paidExpenses
                )}
            </Typography>
        </Box>
    );
};
