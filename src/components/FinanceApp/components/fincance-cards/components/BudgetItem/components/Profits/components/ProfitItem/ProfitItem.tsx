import {ReactElement} from "react";
import {BudgetDate, Profit} from "../../../../../../../../../../utils/common.ts";
import {ProfitItemContainer, ProfitItemCurrencyContainer} from "./styles/ProfitItem.ts";
import {BudgetInfoLine} from "./components/BudgetInfoLine";

interface Props {
    profitItem: Profit;
    date: BudgetDate;
}

export const ProfitItem = ({profitItem, date}: Props): ReactElement => {
    return (
        <ProfitItemContainer>
            <ProfitItemCurrencyContainer>
                <BudgetInfoLine day={profitItem.profitDay} title={profitItem.title} date={date} amount={+profitItem.amount} />
            </ProfitItemCurrencyContainer>
        </ProfitItemContainer>
    )
}