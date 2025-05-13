import { FC } from 'react';
import { Props } from './ExpenseItem';
import { ItemDetailsContainer } from '../../../../../../../../styles/FinanceApp';
import { ProfitExpenseType } from '../../../../../../../../../../utils/common';
import { BudgetInfoLine } from '../../../BudgetInfoLine';

export const ExpenseItemDetails: FC<Props> = ({
    expenseItem: { id, title, amount, expenseDay, editable },
    date,
}) => {
    return (
        <ItemDetailsContainer>
            <BudgetInfoLine
                id={id}
                day={expenseDay}
                title={title}
                date={date}
                amount={+amount}
                editable={editable}
                type={ProfitExpenseType.Expenses}
                isDetails
            />
        </ItemDetailsContainer>
    );
};
