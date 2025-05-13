import {
    CardContainer,
    CardContentWrapper,
    CardDate,
    CardDateTitle,
    CardWrapper,
    MobileCardContainer,
    MobileCardContentWrapper,
    MobileCardDateTitle,
    MobileCardWrapper,
} from './styles/BudgetItem.ts';
import {
    formatDateByLocale,
    formatDateByLocaleOnMobiles,
} from '../../../../../../utils/formatters/dates.ts';
import {
    isToday,
    isTodayOrFuture,
} from '../../../../../../utils/checkers/date.ts';
import { FC } from 'react';
import {
    Divider,
    IconButton,
    Tooltip,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Budget, BudgetDate } from '../../../../../../utils/common.ts';
import { useFinanceSettingsStore } from '../../../../../../stores/finance-app/settings/useSettingsStore.ts';
import { Profits } from './components/Profits';
import { Expenses } from './components/Expenses';
import { MoneyPerDay } from './components/MoneyPerDay/MoneyPerDay.tsx';
import { Link } from 'react-router-dom';
import { DescriptionOutlined } from '@mui/icons-material';

interface Props {
    budgetItem: Budget;
    idx: number;
}

export const BudgetItem: FC<Props> = ({ budgetItem, idx }) => {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('md'));

    const { user } = useFinanceSettingsStore(state => state);
    const budgetDate: BudgetDate = {
        year: budgetItem.year,
        month: budgetItem.month,
    };

    return (
        <Grid size={{ lg: 12, md: 12, sm: 4, xs: 6 }}>
            {matches ? (
                <CardWrapper $month={budgetItem.month}>
                    <Link
                        to={`/finance/budget/${budgetItem.year}/${budgetItem.month}`}
                        style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                        <Tooltip title="Details">
                            <IconButton
                                sx={{
                                    position: 'absolute',
                                    right: 20,
                                    top: 10,
                                }}
                            >
                                <DescriptionOutlined />
                            </IconButton>
                        </Tooltip>
                    </Link>
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

                            {isTodayOrFuture(
                                budgetDate.month,
                                budgetDate.year
                            ) && (
                                <MoneyPerDay
                                    budgetItem={budgetItem}
                                    budgetDate={budgetDate}
                                />
                            )}
                        </CardContentWrapper>
                    </CardContainer>
                </CardWrapper>
            ) : (
                <Link
                    to={`/finance/budget/${budgetItem.year}/${budgetItem.month}`}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                >
                    <MobileCardWrapper $month={budgetItem.month}>
                        <MobileCardContainer
                            $isActive={isToday(
                                budgetItem.month,
                                budgetItem.year
                            )}
                            $month={budgetItem.month}
                        >
                            <MobileCardDateTitle variant="h6">
                                {formatDateByLocaleOnMobiles(
                                    user.locale,
                                    new Date(budgetItem.year, budgetItem.month)
                                )}
                            </MobileCardDateTitle>
                        </MobileCardContainer>
                    </MobileCardWrapper>
                </Link>
            )}
        </Grid>
    );
};
