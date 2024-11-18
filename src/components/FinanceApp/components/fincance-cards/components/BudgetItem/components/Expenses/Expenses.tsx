import {Fragment, ReactElement} from "react";
import {BudgetDate, Expense, ProfitExpenseType} from "../../../../../../../../utils/common.ts";
import {ExpenseItem} from "./components/ExpenseItem";
import {Box, IconButton, Tooltip} from "@mui/material";
import {AddCircleOutlineRounded} from "@mui/icons-material";
import {ExpensesContainer} from "./styles/Expenses.ts";
import {useModalStore} from "../../../../../../../../stores/common/modal/useModalStore.ts";

interface Props {
    expenses: Expense[];
    budgetDate: BudgetDate;
}

export const Expenses = ({expenses, budgetDate}: Props): ReactElement => {
    const {setIsOpened} = useModalStore(state => state);

    return (
        <>
            <ExpensesContainer>
                {
                    expenses.length > 0 && (expenses.map(expenseItem => (
                        <Fragment key={expenseItem.id}>
                            <ExpenseItem expenseItem={expenseItem} date={budgetDate} />
                        </Fragment>
                    )))
                }
            </ExpensesContainer>
            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <Tooltip title="Additional expense" placement="right">
                    <IconButton onClick={() => setIsOpened(true, ProfitExpenseType.Expenses, budgetDate)}>
                        <AddCircleOutlineRounded />
                    </IconButton>
                </Tooltip>
            </Box>
        </>
    )
}
