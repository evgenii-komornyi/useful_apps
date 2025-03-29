import { FC } from 'react';
import {
    BudgetDate,
    Profit,
    ProfitExpenseType,
} from '../../../../../../../../../../utils/common.ts';
import {
    ProfitItemContainer,
    ProfitItemCurrencyContainer,
} from './styles/ProfitItem.ts';
import { BudgetInfoLine } from '../../../BudgetInfoLine';

interface Props {
    profitItem: Profit;
    date: BudgetDate;
}

export const ProfitItem: FC<Props> = ({ profitItem, date }) => {
    return (
        <ProfitItemContainer>
            <ProfitItemCurrencyContainer>
                <BudgetInfoLine
                    id={profitItem.id}
                    day={profitItem.profitDay}
                    title={profitItem.title}
                    date={date}
                    amount={+profitItem.amount}
                    editable={profitItem.editable}
                    type={ProfitExpenseType.Profit}
                />
            </ProfitItemCurrencyContainer>
        </ProfitItemContainer>
    );
};
