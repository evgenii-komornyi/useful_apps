import {
    Box,
    Divider,
    dividerClasses,
    Grid2 as Grid,
    Skeleton,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { Params, useParams } from 'react-router-dom';
import { useFinanceSettingsStore } from '../../../../../../stores/finance-app/settings/useSettingsStore';
import { useBudgetStore } from '../../../../../../stores/finance-app/budget/useBudgetStore';
import { Budget, BudgetDate } from '../../../../../../utils/common';
import { formatDateByLocale } from '../../../../../../utils/formatters/dates';
import { CardDate, CardDateTitle, CardWrapper } from './styles/Details';
import { TotalAmount } from '../TotalAmount';
import { CurrentAmount } from '../BudgetItem/components/Profits/components/CurrentAmount';
import {
    calculateAvailableAmount,
    calculatePaidExpenses,
} from '../../../../../../utils/arrays/arrays';
import { ProfitItemDetails } from '../BudgetItem/components/Profits/components/ProfitItem';
import { ExpenseItemDetails } from '../BudgetItem/components/Expenses/components/ExpenseItem';
import { MoneyPerDay } from '../BudgetItem/components/MoneyPerDay';

export const Details: FC = () => {
    const { month, year }: Readonly<Params<string>> = useParams();
    const { user } = useFinanceSettingsStore(state => state);
    const { budget } = useBudgetStore(state => state);
    const [foundBudget, setFoundBudget] = useState<Budget | undefined>(
        undefined
    );

    const budgetDate: BudgetDate = {
        year: foundBudget?.year || -1,
        month: foundBudget?.month || -1,
    };

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('md'));

    const [isLoaded, setIsLoaded] = useState<boolean>(false);

    useEffect(() => {
        if (month && year) {
            setFoundBudget(
                budget.find(
                    item => item.month === +month && item.year === +year
                )
            );
            setIsLoaded(true);
        }

        return () => {
            setIsLoaded(false);
            setFoundBudget(undefined);
        };
    }, [month, year, budget]);

    return isLoaded && foundBudget ? (
        <Grid container spacing={2}>
            <Grid size={12}>
                <CardWrapper $month={foundBudget.month}>
                    <CardDate>
                        <CardDateTitle>
                            {formatDateByLocale(
                                user.locale,
                                new Date(foundBudget.year, foundBudget.month)
                            )}
                        </CardDateTitle>
                    </CardDate>
                </CardWrapper>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
                <CardWrapper $month={foundBudget.month}>
                    <Box
                        sx={{
                            p: 1,
                        }}
                    >
                        <TotalAmount isDetails array={foundBudget.profit} />
                        <Divider />
                        <TotalAmount isDetails array={foundBudget.expenses} />
                        <Divider />
                        <Box sx={{ mt: 1, mb: 1 }}>
                            <CurrentAmount
                                isDetails
                                currentAmount={
                                    calculateAvailableAmount(
                                        foundBudget.profit,
                                        budgetDate
                                    ) -
                                    calculatePaidExpenses(
                                        foundBudget.expenses,
                                        budgetDate
                                    )
                                }
                                profit={foundBudget.profit}
                                expenses={foundBudget.expenses}
                                budgetDate={budgetDate}
                            />
                        </Box>
                        <Divider />
                        <Box sx={{ mt: 1 }}>
                            <MoneyPerDay
                                isDetails
                                budgetDate={budgetDate}
                                budgetItem={foundBudget}
                            />
                        </Box>
                    </Box>
                </CardWrapper>
            </Grid>
            <Grid size={{ xs: 12, md: 8 }}>
                <CardWrapper $month={foundBudget.month}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: matches ? 'row' : 'column',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            borderColor: 'divider',
                            color: 'text.secondary',
                            [`& .${dividerClasses.root}`]: {
                                mx: 0.5,
                            },
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                width: '100%',
                            }}
                        >
                            <Box sx={{ p: 1, m: 1 }}>
                                <Typography variant="h6">Profit</Typography>
                            </Box>
                            <Divider />
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    boxShadow:
                                        '0 0 5px rgba(255, 255, 255, 0.5)',
                                    borderRadius: '5px',
                                    p: 2,
                                    mr: 1,
                                    ml: 1,
                                    mb: 2,
                                    mt: 2,
                                }}
                            >
                                {foundBudget.profit.map((profit, index) => (
                                    <ProfitItemDetails
                                        profitItem={profit}
                                        date={budgetDate}
                                        key={index}
                                    />
                                ))}
                            </Box>
                        </Box>
                        {matches ? (
                            <Divider orientation="vertical" flexItem />
                        ) : (
                            <Divider />
                        )}
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                width: '100%',
                            }}
                        >
                            <Box sx={{ p: 1, m: 1 }}>
                                <Typography variant="h6">Expenses</Typography>
                            </Box>
                            <Divider />
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    boxShadow:
                                        '0 0 5px rgba(255, 255, 255, 0.5)',
                                    borderRadius: '5px',
                                    p: 2,
                                    mr: 1,
                                    ml: 1,
                                    mb: 2,
                                    mt: 2,
                                }}
                            >
                                {foundBudget.expenses.map((expense, index) => (
                                    <ExpenseItemDetails
                                        key={index}
                                        expenseItem={expense}
                                        date={budgetDate}
                                    />
                                ))}
                            </Box>
                        </Box>
                    </Box>
                </CardWrapper>
            </Grid>
        </Grid>
    ) : (
        <Skeleton variant="text" sx={{ width: 300 }} animation="wave" />
    );
};
