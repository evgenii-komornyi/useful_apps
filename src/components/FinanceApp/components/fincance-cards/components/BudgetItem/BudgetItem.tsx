import {
    CardContainer,
    CardContentWrapper,
    CardDate,
    CardDateTitle,
    CardWrapper
} from "./styles/BudgetItem.ts";
import {formatDateByLocale} from "../../../../../../utils/formatters/dates.ts";
import {isToday} from "../../../../../../utils/checkers/date.ts";
import {ReactElement} from "react";
import {Divider} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {Budget} from "../../../../../../utils/common.ts";
import {useFinanceSettingsStore} from "../../../../../../stores/finance-app/settings/useSettingsStore.ts";
import {Profits} from "./components/Profits";
import {Expenses} from "./components/Expenses";

interface Props {
    budgetItem: Budget;
}

export const BudgetItem = ({budgetItem}: Props ): ReactElement => {
    const {user} = useFinanceSettingsStore(state => state);

    return (
        <Grid size={{xs: 4}}>
            <CardWrapper $month={budgetItem.month}>
                <CardDate>
                    <CardDateTitle>
                        {formatDateByLocale(user.locale, new Date(budgetItem.year, budgetItem.month))}
                    </CardDateTitle>
                </CardDate>
                <CardContainer $isActive={isToday(budgetItem.month, budgetItem.year)} $month={budgetItem.month}>
                    <CardContentWrapper>
                        <Divider />
                        <Profits profit={budgetItem.profit} budgetDate={{year: budgetItem.year, month: budgetItem.month}} />
                        <Divider />
                        <Expenses expenses={budgetItem.expenses} budgetDate={{year: budgetItem.year, month: budgetItem.month}} />
                    </CardContentWrapper>
                </CardContainer>
            </CardWrapper>
        </Grid>
    );
}