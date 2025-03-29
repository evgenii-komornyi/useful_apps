import { ChangeEvent, FC } from 'react';
import { Box, FormControlLabel, Switch, TextField } from '@mui/material';
import {
    Expense,
    Profit,
    ProfitExpenseType,
} from '../../../../../../../utils/common.ts';

interface Props {
    type: string;
    fields: Profit | Expense;
    onChangeHandler: (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    toggleEditable: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const AdditionalForm: FC<Props> = ({
    type,
    fields,
    onChangeHandler,
    toggleEditable,
}) => {
    return (
        <Box
            component="form"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }}
            noValidate
            autoComplete="off"
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    mt: 2,
                    gap: 2,
                    mb: 2,
                }}
            >
                <TextField
                    name="title"
                    label="Title"
                    size="small"
                    variant="outlined"
                    value={fields.title || ''}
                    onChange={onChangeHandler}
                />
                <TextField
                    name="amount"
                    label="Amount"
                    size="small"
                    variant="outlined"
                    value={fields.amount || ''}
                    onChange={onChangeHandler}
                />
                <TextField
                    id={
                        type === ProfitExpenseType.Profit
                            ? 'profitDay'
                            : 'expenseDay'
                    }
                    name={
                        type === ProfitExpenseType.Profit
                            ? 'profitDay'
                            : 'expenseDay'
                    }
                    size="small"
                    label={`${
                        type === ProfitExpenseType.Profit ? 'Profit' : 'Expense'
                    } Day`}
                    value={
                        type === ProfitExpenseType.Profit
                            ? (fields as Profit).profitDay || ''
                            : (fields as Expense).expenseDay || ''
                    }
                    onChange={onChangeHandler}
                />
                <FormControlLabel
                    control={
                        <Switch
                            checked={fields.editable || false}
                            onChange={toggleEditable}
                            color="success"
                            inputProps={{
                                'aria-label': 'editable',
                            }}
                        />
                    }
                    label={`${fields.editable ? 'Editable' : 'Read-only'}`}
                />
            </Box>
        </Box>
    );
};
