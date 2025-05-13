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

export interface Props {
    profitItem: Profit;
    date: BudgetDate;
}

export const ProfitItem: FC<Props> = ({
    profitItem: { id, profitDay, title, amount, editable },
    date,
}) => {
    return (
        <ProfitItemContainer>
            <ProfitItemCurrencyContainer>
                <BudgetInfoLine
                    id={id}
                    day={profitDay}
                    title={title}
                    date={date}
                    amount={+amount}
                    editable={editable}
                    type={ProfitExpenseType.Profit}
                />
            </ProfitItemCurrencyContainer>
        </ProfitItemContainer>
    );
};
