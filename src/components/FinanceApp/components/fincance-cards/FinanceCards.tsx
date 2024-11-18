import {Fragment, ReactElement} from "react";
import {FinanceApplicationContentContainer} from "../../styles/FinanceApp.ts";
import {useBudgetStore} from "../../../../stores/finance-app/budget/useBudgetStore.ts";

import {BudgetItem} from "./components/BudgetItem";
import {AdditionalItemModal} from "./components/AdditionalItemModal";

export const FinanceCards = (): ReactElement => {
    const {budget} = useBudgetStore(state => state);

    return (
        <FinanceApplicationContentContainer container spacing={2}>
            {budget.map((budgetItem, index) => (
                <Fragment key={index}>
                    <BudgetItem budgetItem={budgetItem} />
                </Fragment>
            ))}
            <AdditionalItemModal />
        </FinanceApplicationContentContainer>
    )
}