import { Fragment, ReactElement } from 'react';
import {
    BudgetDate,
    Expense,
    ProfitExpenseType,
} from '../../../../../../../../utils/common.ts';
import { ExpenseItem } from './components/ExpenseItem';
import { Box, Divider, IconButton, Tooltip } from '@mui/material';
import { AddCircleOutlineRounded } from '@mui/icons-material';
import { ExpensesContainer } from './styles/Expenses.ts';
import { useModalStore } from '../../../../../../../../stores/common/modal/useModalStore.ts';
import { TotalAmount } from '../../../TotalAmount';
import { PaidExpenses } from './components/ExpenseItem/components/PaidExpenses/PaidExpenses.tsx';

interface Props {
    expenses: Expense[];
    budgetDate: BudgetDate;
}

export const Expenses = ({ expenses, budgetDate }: Props): ReactElement => {
    const { setIsOpened } = useModalStore(state => state);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
            }}
        >
            <ExpensesContainer>
                {expenses.length > 0 &&
                    expenses.map(expenseItem => (
                        <Fragment key={expenseItem.id}>
                            <ExpenseItem
                                expenseItem={expenseItem}
                                date={budgetDate}
                            />
                        </Fragment>
                    ))}
            </ExpensesContainer>
            <Divider />
            <Box
                sx={{
                    position: 'relative',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    mb: 4,
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'absolute',
                        bottom: -20,
                    }}
                >
                    <Tooltip title="Additional expense" placement="right">
                        <IconButton
                            onClick={() =>
                                setIsOpened(
                                    true,
                                    ProfitExpenseType.Expenses,
                                    budgetDate
                                )
                            }
                        >
                            <AddCircleOutlineRounded />
                        </IconButton>
                    </Tooltip>
                </Box>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    m: 2,
                }}
            >
                <Box sx={{ mb: 2 }}>
                    <Box sx={{ mb: 1 }}>
                        <TotalAmount array={expenses} />
                    </Box>
                    <Divider />
                    <Box sx={{ mt: 1 }}>
                        <PaidExpenses expenses={expenses} date={budgetDate} />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};
