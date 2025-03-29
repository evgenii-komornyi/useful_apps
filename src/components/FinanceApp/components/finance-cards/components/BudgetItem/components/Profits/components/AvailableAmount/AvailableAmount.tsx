import { FC } from 'react';
import {
    BudgetDate,
    Expense,
    Profit,
} from '../../../../../../../../../../utils/common.ts';
import { useFinanceSettingsStore } from '../../../../../../../../../../stores/finance-app/settings/useSettingsStore.ts';
import { Typography } from '@mui/material';
import { formatCurrencyByLocation } from '../../../../../../../../../../utils/formatters/currency.ts';
import {
    calculateAvailableAmount,
    calculateExpenses,
} from '../../../../../../../../../../utils/arrays/arrays.ts';
import { BoxContainer } from './styles/AvailableAmount.tsx';

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
        <BoxContainer>
            <Typography variant="body1">Available</Typography>
            <Typography variant="body1">
                {formatCurrencyByLocation(
                    user.locale,
                    user.currency,
                    available
                )}
            </Typography>
        </BoxContainer>
    );
};
