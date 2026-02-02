import { FC } from 'react';
import {
    Align,
    Direction,
    Expense,
    Justify,
    Profit,
} from '../../../../../../utils/common.ts';
import { Chip, Typography } from '@mui/material';
import { formatCurrencyByLocation } from '../../../../../../utils/formatters/currency.ts';
import { useFinanceSettingsStore } from '../../../../../../stores/finance-app/settings/useSettingsStore.ts';
import { MainBoxContainer } from '../../../../../../styles/Global.ts';

interface Props {
    array: Profit[] | Expense[];
    isDetails?: boolean;
}

export const TotalAmount: FC<Props> = ({ array, isDetails = false }) => {
    const { user } = useFinanceSettingsStore(state => state);

    const total: number = array.reduce(
        (acc: number, item: Profit | Expense) => acc + Number(item.amount),
        0
    );

    const isExpense = array.length > 0 && Object.prototype.hasOwnProperty.call(
        array[0],
        'expenseDay'
    );

    const label = isDetails
        ? isExpense
            ? 'Expenses Amount'
            : 'Profit Amount'
        : 'Total';

    const price: string = formatCurrencyByLocation(
        user.locale,
        user.currency,
        total
    );

    return (
        <MainBoxContainer
            $direction={Direction.Row}
            $justifyContent={Justify.SpaceBetween}
            $alignItems={Align.Center}
            sx={{ height: 40 }}
        >
            {!isDetails ? (
                <>
                    <Typography variant="body1">{label}</Typography>
                    <Typography variant="body1">{price}</Typography>
                </>
            ) : (
                <>
                    <Chip variant="outlined" label={label} size="small" />
                    <Chip variant="outlined" label={price} size="small" />
                </>
            )}
        </MainBoxContainer>
    );
};
