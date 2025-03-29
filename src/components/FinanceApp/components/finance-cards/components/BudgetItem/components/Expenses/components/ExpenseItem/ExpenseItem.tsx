import { FC } from 'react';
import {
    BudgetDate,
    Expense,
    ProfitExpenseType,
} from '../../../../../../../../../../utils/common.ts';
import { BudgetInfoLine } from '../../../BudgetInfoLine';
import {
    ExpenseItemContainer,
    ExpenseItemCurrencyContainer,
} from './styles/ExpenseItem.ts';

interface Props {
    expenseItem: Expense;
    date: BudgetDate;
}

export const ExpenseItem: FC<Props> = ({ expenseItem, date }) => {
    return (
        <ExpenseItemContainer>
            <ExpenseItemCurrencyContainer>
                <BudgetInfoLine
                    id={expenseItem.id}
                    day={expenseItem.expenseDay}
                    title={expenseItem.title}
                    date={date}
                    amount={+expenseItem.amount}
                    editable={expenseItem.editable}
                    type={ProfitExpenseType.Expenses}
                />
            </ExpenseItemCurrencyContainer>
        </ExpenseItemContainer>
    );
};
