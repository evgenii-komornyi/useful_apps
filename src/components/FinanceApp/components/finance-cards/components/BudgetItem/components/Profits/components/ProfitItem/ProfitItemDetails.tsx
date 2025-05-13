import { FC } from 'react';
import { Props } from './ProfitItem';
import { ItemDetailsContainer } from '../../../../../../../../styles/FinanceApp';
import { ProfitExpenseType } from '../../../../../../../../../../utils/common';
import { BudgetInfoLine } from '../../../BudgetInfoLine';

export const ProfitItemDetails: FC<Props> = ({
    profitItem: { id, title, amount, profitDay, editable },
    date,
}) => {
    return (
        <ItemDetailsContainer>
            <BudgetInfoLine
                id={id}
                day={profitDay}
                title={title}
                date={date}
                amount={+amount}
                editable={editable}
                type={ProfitExpenseType.Profit}
                isDetails
            />
        </ItemDetailsContainer>
    );
};
