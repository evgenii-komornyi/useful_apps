import {ReactElement} from "react";
import {Profit} from "../../../../../../../../../../utils/common.ts";
import {Box, Typography} from "@mui/material";
import {formatCurrencyByLocation} from "../../../../../../../../../../utils/formatters/currency.ts";
import {useFinanceSettingsStore} from "../../../../../../../../../../stores/finance-app/settings/useSettingsStore.ts";

interface Props {
    profit: Profit[]
}

export const TotalAmount = ({profit}: Props): ReactElement => {
    const {user} = useFinanceSettingsStore(state => state);

    const total: number = profit.reduce((acc, profitItem: Profit) => acc + Number(profitItem.amount), 0);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="body1">
                Total
            </Typography>
            <Typography variant="body1">
                {formatCurrencyByLocation(user.locale, user.currency, total)}
            </Typography>
        </Box>
    )
}