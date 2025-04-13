import {
    CardContainer,
    CardContentWrapper,
    CardDate,
    CardDateTitle,
    CardWrapper,
} from './styles/BudgetItem.ts';
import { formatDateByLocale } from '../../../../../../utils/formatters/dates.ts';
import {
    isToday,
    isTodayOrFuture,
} from '../../../../../../utils/checkers/date.ts';
import { FC } from 'react';
import { Divider } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Budget, BudgetDate } from '../../../../../../utils/common.ts';
import { useFinanceSettingsStore } from '../../../../../../stores/finance-app/settings/useSettingsStore.ts';
import { Profits } from './components/Profits';
import { Expenses } from './components/Expenses';
import { MoneyPerDay } from './components/MoneyPerDay/MoneyPerDay.tsx';

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

                        {isTodayOrFuture(budgetDate.month, budgetDate.year) && (
                            <MoneyPerDay
                                budgetItem={budgetItem}
                                budgetDate={budgetDate}
                            />
                        )}
                    </CardContentWrapper>
                </CardContainer>
            </CardWrapper>
        </Grid>
    );
};
