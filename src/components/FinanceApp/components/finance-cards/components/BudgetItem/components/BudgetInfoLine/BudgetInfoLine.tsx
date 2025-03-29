import { Box, Chip, IconButton, Tooltip, Typography } from '@mui/material';
import {
    Align,
    BudgetDate,
    Direction,
    Justify,
} from '../../../../../../../../utils/common.ts';
import { FC, useState } from 'react';
import { formatDateByLocale } from '../../../../../../../../utils/formatters/dates.ts';
import { useFinanceSettingsStore } from '../../../../../../../../stores/finance-app/settings/useSettingsStore.ts';
import { formatCurrencyByLocation } from '../../../../../../../../utils/formatters/currency.ts';
import { isPaymentDay } from '../../../../../../../../utils/checkers/date.ts';
import { ChangeCircleOutlined } from '@mui/icons-material';
import { replaceLongTextWithDots } from '../../../../../../../../utils/formatters/strings.ts';
import { Field } from './components/Field/Field.tsx';
import { BoxContainer, CheckIcon } from './styles/BudgetInfoLine.tsx';
import { MainBoxContainer } from '../../../../../../../../styles/Global.ts';

interface Props {
    id: string;
    title: string;
    day: number;
    date: BudgetDate;
    amount: number;
    editable?: boolean;
    type: string;
}

export const BudgetInfoLine: FC<Props> = ({
    id,
    title,
    day,
    date,
    amount,
    type,
    editable = false,
}) => {
    const { user } = useFinanceSettingsStore(state => state);

    const [isFieldHide, setIsFieldHide] = useState<boolean>(true);

    const toggleFieldVisibility = (): void => {
        setIsFieldHide(prev => !prev);
    };

    return (
        <BoxContainer
            $justifyContent={Justify.SpaceBetween}
            $alignItems={Align.Center}
            $direction={Direction.Row}
            sx={{
                p: 1,
            }}
        >
            <Box sx={{ flex: 1 }}>
                <CheckIcon
                    fontSize="small"
                    color="success"
                    $isPaymentDay={isPaymentDay(day, date.month, date.year)}
                />
            </Box>
            <Box sx={{ flex: 2 }}>
                <Tooltip
                    title={title}
                    disableHoverListener={title.length <= 10}
                >
                    <Typography variant="body2" fontWeight={700}>
                        {title.length > 10
                            ? replaceLongTextWithDots(title)
                            : title}
                    </Typography>
                </Tooltip>
            </Box>
            <Box sx={{ flex: 0.6, justifySelf: 'center' }}>
                <Tooltip title="Payment day" placement="right">
                    <Chip
                        variant="outlined"
                        color={
                            isPaymentDay(day, date.month, date.year)
                                ? 'success'
                                : 'default'
                        }
                        label={`${formatDateByLocale(
                            user.locale,
                            new Date(date.year, date.month, day),
                            true,
                            true,
                            false
                        )}`}
                    />
                </Tooltip>
            </Box>
            <MainBoxContainer
                $direction={Direction.Row}
                $justifyContent={Justify.End}
                $alignItems={Align.Center}
                sx={{ flex: 3 }}
            >
                {editable && (
                    <Tooltip title="Add corrections" placement="bottom">
                        <IconButton onClick={toggleFieldVisibility}>
                            <ChangeCircleOutlined />
                        </IconButton>
                    </Tooltip>
                )}
                {isFieldHide ? (
                    <Typography variant="body2" fontWeight={700}>
                        {formatCurrencyByLocation(
                            user.locale,
                            user.currency,
                            amount
                        )}
                    </Typography>
                ) : (
                    <Field
                        id={id}
                        currentAmount={amount}
                        paymentDay={day}
                        budgetDate={date}
                        type={type}
                        hideField={() => setIsFieldHide(true)}
                    />
                )}
            </MainBoxContainer>
        </BoxContainer>
    );
};
