import { FC, useState } from 'react';
import { useFinanceSettingsStore } from '../../../../../../../../../../stores/finance-app/settings/useSettingsStore';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import { formatCurrencyByLocation } from '../../../../../../../../../../utils/formatters/currency';
import { ChangeCircleOutlined } from '@mui/icons-material';
import { CurrentAmountField } from './components/CurrentAmountField';
import {
    Align,
    BudgetDate,
    Direction,
    Expense,
    Justify,
    Profit,
} from '../../../../../../../../../../utils/common';
import { isToday } from '../../../../../../../../../../utils/checkers/date';
import { MainBoxContainer } from '../../../../../../../../../../styles/Global';

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
        <MainBoxContainer
            $direction={Direction.Row}
            $alignItems={Align.Center}
            $justifyContent={Justify.SpaceBetween}
        >
            <Typography variant="body1">Current</Typography>
            <MainBoxContainer
                $direction={Direction.Row}
                $alignItems={Align.Center}
                $justifyContent={Justify.SpaceBetween}
            >
                {isToday(budgetDate.month, budgetDate.year) && (
                    <Tooltip title="Add corrections" placement="bottom">
                        <IconButton onClick={toggleFieldVisibility}>
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
            </MainBoxContainer>
        </MainBoxContainer>
    );
};
