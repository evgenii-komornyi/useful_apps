import { FC, useState } from 'react';
import { useFinanceSettingsStore } from '../../../../../../../../../../stores/finance-app/settings/useSettingsStore';
import { Chip, IconButton, Tooltip, Typography } from '@mui/material';
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
    isDetails?: boolean;
}

export const CurrentAmount: FC<Props> = ({
    currentAmount,
    budgetDate,
    profit,
    expenses,
    isDetails = false,
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
            {!isDetails ? (
                <Typography variant="body1">Current</Typography>
            ) : (
                <Chip variant="outlined" size="small" label="Current" />
            )}
            <MainBoxContainer
                $direction={Direction.Row}
                $alignItems={Align.Center}
                $justifyContent={Justify.SpaceBetween}
            >
                {isToday(budgetDate.month, budgetDate.year) && !isDetails && (
                    <Tooltip title="Add corrections" placement="bottom">
                        <IconButton onClick={toggleFieldVisibility}>
                            <ChangeCircleOutlined />
                        </IconButton>
                    </Tooltip>
                )}
                {isFieldHide ? (
                    isDetails ? (
                        <Chip
                            variant="outlined"
                            icon={<ChangeCircleOutlined />}
                            size="small"
                            label={formatCurrencyByLocation(
                                user.locale,
                                user.currency,
                                currentAmount
                            )}
                            onClick={toggleFieldVisibility}
                        />
                    ) : (
                        <Typography variant="body1">
                            {formatCurrencyByLocation(
                                user.locale,
                                user.currency,
                                currentAmount
                            )}
                        </Typography>
                    )
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
