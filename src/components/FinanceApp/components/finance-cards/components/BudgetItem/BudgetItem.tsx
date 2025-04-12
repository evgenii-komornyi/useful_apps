import {
    CardContainer,
    CardContentWrapper,
    CardDate,
    CardDateTitle,
    CardWrapper,
} from './styles/BudgetItem.ts';
import { formatDateByLocale } from '../../../../../../utils/formatters/dates.ts';
import { isToday } from '../../../../../../utils/checkers/date.ts';
import { FC } from 'react';
import { Box, Divider, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Budget, BudgetDate } from '../../../../../../utils/common.ts';
import { useFinanceSettingsStore } from '../../../../../../stores/finance-app/settings/useSettingsStore.ts';
import { Profits } from './components/Profits';
import { Expenses } from './components/Expenses';
import { calculateMoneyPerDay } from '../../../../../../utils/arrays/arrays.ts';
import { formatCurrencyByLocation } from '../../../../../../utils/formatters/currency.ts';

interface Props {
    budgetItem: Budget;
    idx: number;
}

export const BudgetItem: FC<Props> = ({ budgetItem, idx }) => {
    const { user } = useFinanceSettingsStore(state => state);
    const budgetDate: BudgetDate = {
        year: budgetItem.year,
        month: budgetItem.month,
    };

    return (
        <Grid size={{ lg: 12, md: 12, sm: 12, xs: 12 }}>
            <CardWrapper $month={budgetItem.month}>
                <CardDate>
                    <CardDateTitle>
                        {formatDateByLocale(
                            user.locale,
                            new Date(budgetItem.year, budgetItem.month)
                        )}
                    </CardDateTitle>
                </CardDate>
                <CardContainer
                    $isActive={isToday(budgetItem.month, budgetItem.year)}
                    $month={budgetItem.month}
                >
                    <CardContentWrapper>
                        <Divider />
                        <Profits
                            profit={budgetItem.profit}
                            expenses={budgetItem.expenses}
                            budgetDate={budgetDate}
                        />
                        <Divider />
                        <Expenses
                            expenses={budgetItem.expenses}
                            budgetDate={budgetDate}
                            idx={idx}
                        />

                        {isToday(budgetItem.month, budgetItem.year) && (
                            <Box sx={{ position: 'absolute', bottom: 20 }}>
                                <Typography variant="body1">
                                    Per day:{' '}
                                    {formatCurrencyByLocation(
                                        user.locale,
                                        user.currency,
                                        0.0
                                    )}
                                    /
                                    {formatCurrencyByLocation(
                                        user.locale,
                                        user.currency,
                                        +calculateMoneyPerDay(
                                            budgetItem.profit,
                                            budgetItem.expenses,
                                            budgetDate,
                                            budgetItem.daysInMonth
                                        ).toFixed(2)
                                    )}
                                </Typography>
                            </Box>
                        )}
                    </CardContentWrapper>
                </CardContainer>
            </CardWrapper>
        </Grid>
    );
};
