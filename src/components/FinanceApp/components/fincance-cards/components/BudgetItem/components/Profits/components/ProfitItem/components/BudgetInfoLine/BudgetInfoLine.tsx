import {Box, Chip, Tooltip, Typography} from "@mui/material";
import {BudgetDate} from "../../../../../../../../../../../../utils/common.ts";
import {ReactElement} from "react";
import {formatDateByLocale} from "../../../../../../../../../../../../utils/formatters/dates.ts";
import {
    useFinanceSettingsStore
} from "../../../../../../../../../../../../stores/finance-app/settings/useSettingsStore.ts";
import {formatCurrencyByLocation} from "../../../../../../../../../../../../utils/formatters/currency.ts";
import {isPaymentDay} from "../../../../../../../../../../../../utils/checkers/date.ts";
import {Check} from "@mui/icons-material";
import {replaceLongTextWithDots} from "../../../../../../../../../../../../utils/formatters/strings.ts";

interface Props {
    title: string;
    day: number;
    date: BudgetDate;
    amount: number;
}

export const BudgetInfoLine = ({ title, day, date, amount }: Props): ReactElement => {
    const {user} = useFinanceSettingsStore(state => state);

    return (
        <Box sx={{display: 'flex', flexDirection: 'row', alignItems: "center", justifyContent : 'space-between', width: '340px', borderBottom: '1px solid #ffffff', p: 1}}>
            <Check fontSize="small" color="success" sx={{opacity: isPaymentDay(day, date.month, date.year) ? 1 : 0 }} />
            { title.length > 10 ? (
                    <Tooltip title={title}>
                        <Typography variant="body2" fontWeight={700}>
                            {replaceLongTextWithDots(title)}
                        </Typography>
                    </Tooltip>
                ) : (
                <Typography variant="body2" fontWeight={700}>
                    {title}
                </Typography>
            )}
            <Tooltip title="Payment day">
                <Chip
                    variant="outlined"
                    sx={{mr: 15}}
                    color={isPaymentDay(day, date.month, date.year) ? "success" : "default"}
                    label={`${formatDateByLocale('en-GB', new Date(date.year, date.month, day), true, true, false)}`}
                />
            </Tooltip>
            <Typography variant="body2" fontWeight={700}>
                {formatCurrencyByLocation(user.locale, user.currency, amount)}
            </Typography>
        </Box>
    );
};