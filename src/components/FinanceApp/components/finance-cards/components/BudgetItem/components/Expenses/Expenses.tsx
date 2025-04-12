import { FC, Fragment } from 'react';
import {
    BudgetDate,
    Direction,
    Expense,
    Justify,
    Position,
    ProfitExpenseType,
    SortOrder,
} from '../../../../../../../../utils/common.ts';
import { ExpenseItem } from './components/ExpenseItem';
import { Divider, IconButton, Tooltip } from '@mui/material';
import { AddCircleOutlineRounded } from '@mui/icons-material';
import { ExpensesContainer } from './styles/Expenses.ts';
import { useModalStore } from '../../../../../../../../stores/common/modal/useModalStore.ts';
import { TotalAmount } from '../../../TotalAmount';
import { PaidExpenses } from './components/ExpenseItem/components/PaidExpenses/PaidExpenses.tsx';
import { Box, PositionedBox } from '../../../../../../../../styles/Global.ts';
import MUIBox from '@mui/material/Box';
import { Toolbar } from './components/Toolbar/Toolbar.tsx';
import { useFilterStore } from '../../../../../../../../stores/finance-app/filter/filterStore.ts';

interface Props {
    expenses: Expense[];
    budgetDate: BudgetDate;
    idx: number;
}

export const Expenses: FC<Props> = ({ expenses, budgetDate, idx }) => {
    const { setIsOpened } = useModalStore(state => state);
    const { searchValue, sortCategory, sortMethod, selectedCard } =
        useFilterStore(state => state);

    const shouldFilterAndSort =
        selectedCard === undefined || selectedCard === idx;

    const filteredAndSortedExpenses: Expense[] = shouldFilterAndSort
        ? expenses
              .filter(({ title }) =>
                  searchValue
                      ? title.toLowerCase().includes(searchValue.toLowerCase())
                      : true
              )
              .sort((a, b) => {
                  if (!sortCategory || sortMethod === SortOrder.None) return 0;

                  let valueA = a[sortCategory];
                  let valueB = b[sortCategory];

                  if (
                      sortCategory === 'expenseDay' ||
                      sortCategory === 'amount'
                  ) {
                      valueA = Number(valueA);
                      valueB = Number(valueB);
                  }

                  return typeof valueA === 'string' &&
                      typeof valueB === 'string'
                      ? sortMethod === SortOrder.Asc
                          ? valueA.localeCompare(valueB)
                          : valueB.localeCompare(valueA)
                      : typeof valueA === 'number' && typeof valueB === 'number'
                      ? sortMethod === SortOrder.Asc
                          ? valueA - valueB
                          : valueB - valueA
                      : 0;
              })
        : expenses;

    return (
        <Box $direction={Direction.Column} $justifyContent={Justify.Center}>
            <Toolbar idx={idx} />
            <ExpensesContainer>
                {expenses.length > 0 &&
                    filteredAndSortedExpenses.map(expenseItem => (
                        <Fragment key={expenseItem.id}>
                            <ExpenseItem
                                expenseItem={expenseItem}
                                date={budgetDate}
                            />
                        </Fragment>
                    ))}
            </ExpensesContainer>
            <Divider />
            <PositionedBox
                $position={Position.Relative}
                sx={{
                    mb: 1,
                }}
            >
                <PositionedBox
                    $position={Position.Absolute}
                    sx={{
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
                </PositionedBox>
            </PositionedBox>
            <Box
                $direction={Direction.Column}
                $justifyContent={Justify.Center}
                sx={{
                    m: 2,
                }}
            >
                <MUIBox sx={{ mb: 2 }}>
                    <MUIBox sx={{ mb: 1 }}>
                        <TotalAmount array={expenses} />
                    </MUIBox>
                    <Divider />
                    <MUIBox sx={{ mt: 1 }}>
                        <PaidExpenses expenses={expenses} date={budgetDate} />
                    </MUIBox>
                </MUIBox>
            </Box>
        </Box>
    );
};
