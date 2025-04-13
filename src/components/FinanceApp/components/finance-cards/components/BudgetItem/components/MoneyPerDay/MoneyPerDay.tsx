import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import { formatCurrencyByLocation } from '../../../../../../../../utils/formatters/currency';
import { Budget, BudgetDate } from '../../../../../../../../utils/common';
import { FC, useState } from 'react';
import { useFinanceSettingsStore } from '../../../../../../../../stores/finance-app/settings/useSettingsStore';
import {
    calculateMoneyPerDay,
    calculateMoneyPerDayInFuture,
} from '../../../../../../../../utils/arrays/arrays';
import { ChangeCircleOutlined } from '@mui/icons-material';
import { Field } from './components/Field';
import { isNotEnoughMoney } from '../../../../../../../../utils/checkers/common';
import { isFuture } from '../../../../../../../../utils/checkers/date';

interface Props {
    budgetItem: Budget;
    budgetDate: BudgetDate;
}

export const MoneyPerDay: FC<Props> = ({ budgetItem, budgetDate }) => {
    const { user } = useFinanceSettingsStore(state => state);

    const calculatedMoneyPerDay: number = isFuture(
        budgetDate.month,
        budgetDate.year
    )
        ? calculateMoneyPerDayInFuture(
              budgetItem.profit,
              budgetItem.expenses,
              budgetItem.daysInMonth
          )
        : calculateMoneyPerDay(
              budgetItem.profit,
              budgetItem.expenses,
              budgetDate,
              budgetItem.daysInMonth
          );

    const getColor = (): string => {
        if (isNotEnoughMoney(budgetItem.moneyPerDay, calculatedMoneyPerDay)) {
            return '#ff7400';
        }

        return 'white';
    };

    const [isFieldHide, setIsFieldHide] = useState<boolean>(true);

    const toggleFieldVisibility = (): void => {
        setIsFieldHide(prev => !prev);
    };

    const availableMoney: string = formatCurrencyByLocation(
        user.locale,
        user.currency,
        calculatedMoneyPerDay
    );

    const dailyLimit: string = formatCurrencyByLocation(
        user.locale,
        user.currency,
        budgetItem.moneyPerDay
    );

    return (
        <Box
            sx={{
                position: 'absolute',
                bottom: 20,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}
        >
            <Tooltip title="Add amount" placement="top">
                <IconButton onClick={toggleFieldVisibility}>
                    <ChangeCircleOutlined />
                </IconButton>
            </Tooltip>
            {isFieldHide ? (
                <Typography variant="body1" sx={{ color: getColor() }}>
                    {availableMoney}/
                    {!budgetItem.moneyPerDay ? '-.--' : dailyLimit}
                </Typography>
            ) : (
                <Field
                    currentAmount={budgetItem.moneyPerDay}
                    budgetDate={budgetDate}
                    hideField={() => setIsFieldHide(true)}
                />
            )}
        </Box>
    );
};
