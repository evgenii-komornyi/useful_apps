import {ReactElement} from "react";
import {BudgetDate, Profit} from "../../../../../../../../../../utils/common.ts";
import {useFinanceSettingsStore} from "../../../../../../../../../../stores/finance-app/settings/useSettingsStore.ts";
import {Box, Typography} from "@mui/material";
import {formatCurrencyByLocation} from "../../../../../../../../../../utils/formatters/currency.ts";
import {isPaymentDay} from "../../../../../../../../../../utils/checkers/date.ts";

interface Props {
    profit: Profit[];
    date: BudgetDate;
}

export const AvailableAmount = ({profit, date}: Props): ReactElement => {
    const {user} = useFinanceSettingsStore(state => state);

    const available: number = profit.reduce((acc, profitItem: Profit) => {
        if (isPaymentDay(profitItem.profitDay, date.month, date.year)) {
            return acc + Number(profitItem.amount);
        }

        return acc;
    }, 0);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="body1">
                Available
            </Typography>
            <Typography variant="body1">
                {formatCurrencyByLocation(user.locale, user.currency, available)}
            </Typography>
        </Box>
    )
}