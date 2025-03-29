import { FC } from 'react';
import {
    Align,
    Direction,
    Expense,
    Justify,
    Profit,
} from '../../../../../../utils/common.ts';
import { Typography } from '@mui/material';
import { formatCurrencyByLocation } from '../../../../../../utils/formatters/currency.ts';
import { useFinanceSettingsStore } from '../../../../../../stores/finance-app/settings/useSettingsStore.ts';
import { MainBoxContainer } from '../../../../../../styles/Global.ts';

interface Props {
    array: Profit[] | Expense[];
}

export const TotalAmount: FC<Props> = ({ array }) => {
    const { user } = useFinanceSettingsStore(state => state);

    const total: number = array.reduce(
        (acc: number, item: Profit | Expense) => acc + Number(item.amount),
        0
    );

    return (
        <MainBoxContainer
            $direction={Direction.Row}
            $justifyContent={Justify.SpaceBetween}
            $alignItems={Align.Center}
        >
            <Typography variant="body1">Total</Typography>
            <Typography variant="body1">
                {formatCurrencyByLocation(user.locale, user.currency, total)}
            </Typography>
        </MainBoxContainer>
    );
};
