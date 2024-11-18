import {ReactElement} from "react";
import {BudgetDate, Expense} from "../../../../../../../../../../utils/common.ts";
import {BudgetInfoLine} from "../../../Profits/components/ProfitItem/components/BudgetInfoLine";
import {ExpenseItemContainer, ExpenseItemCurrencyContainer} from "./styles/ExpenseItem.ts";

interface Props {
    expenseItem: Expense;
    date: BudgetDate;
}

export const ExpenseItem = ({expenseItem, date}: Props): ReactElement => {
    return (
        <ExpenseItemContainer>
            <ExpenseItemCurrencyContainer>
                <BudgetInfoLine day={expenseItem.expenseDay} title={expenseItem.title} date={date} amount={+expenseItem.amount} />
            </ExpenseItemCurrencyContainer>
        </ExpenseItemContainer>
    )
}