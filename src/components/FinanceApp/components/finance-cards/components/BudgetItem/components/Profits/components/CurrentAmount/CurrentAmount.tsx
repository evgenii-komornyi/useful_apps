import { FC, useState } from 'react';
import { useFinanceSettingsStore } from '../../../../../../../../../../stores/finance-app/settings/useSettingsStore';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import { formatCurrencyByLocation } from '../../../../../../../../../../utils/formatters/currency';
import { ChangeCircleOutlined } from '@mui/icons-material';
import { CurrentAmountField } from './components/CurrentAmountField';
import {
    BudgetDate,
    Expense,
    Profit,
} from '../../../../../../../../../../utils/common';
import { isToday } from '../../../../../../../../../../utils/checkers/date';

interface Props {
    currentAmount: number;
    budgetDate: BudgetDate;
    profit: Profit[];
    expenses: Expense[];
}

export const CurrentAmount: FC<Props> = ({
    currentAmount,
    budgetDate,
    profit,
    expenses,
}) => {
    const { user } = useFinanceSettingsStore(state => state);

    const [isFieldHide, setIsFieldHide] = useState<boolean>(true);

    const toggleFieldVisibility = (): void => {
        setIsFieldHide(prev => !prev);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}
        >
            <Typography variant="body1">Current</Typography>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                {isToday(budgetDate.month, budgetDate.year) && (
                    <Tooltip title="Add corrections" placement="bottom">
                        <IconButton
                            onClick={toggleFieldVisibility}
                            sx={{ mr: 2 }}
                        >
                            <ChangeCircleOutlined />
                        </IconButton>
                    </Tooltip>
                )}
                {isFieldHide ? (
                    <Typography variant="body1">
                        {formatCurrencyByLocation(
                            user.locale,
                            user.currency,
                            currentAmount
                        )}
                    </Typography>
                ) : (
                    <CurrentAmountField
                        currentAmount={currentAmount}
                        budgetDate={budgetDate}
                        profit={profit}
                        expenses={expenses}
                        hideField={() => setIsFieldHide(true)}
                    />
                )}
            </Box>
        </Box>
    );
};
