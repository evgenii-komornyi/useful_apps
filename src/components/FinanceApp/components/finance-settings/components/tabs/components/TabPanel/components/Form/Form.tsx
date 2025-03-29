import {
    Box,
    Button,
    FormControlLabel,
    Switch,
    TextField,
} from '@mui/material';
import { DatePickerContainer, FieldContainer } from './styles/Form';
import { ChangeEvent, FC } from 'react';
import {
    Expense,
    Profit,
    ProfitExpenseType,
} from '../../../../../../../../../../utils/common';
import moment, { Moment } from 'moment';
import { DatePicker } from '@mui/x-date-pickers';
import { RemoveCircleOutline } from '@mui/icons-material';
import { SnackbarAlert } from '../../../../../../../../../SnackbarAlert';

interface Props {
    field: Expense | Profit;
    onChangeHandler: (
        id: string,
        from: boolean,
        date: Moment | null,
        event?: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    toggleEditable: (id: string, e: ChangeEvent<HTMLInputElement>) => void;
    handleRemoveBox: (id: string) => void;
    pendingRemoveId: string | null;
    removeFieldGroupById: (id: string) => void;
    type: ProfitExpenseType;
}

export const Form: FC<Props> = ({
    field,
    onChangeHandler,
    toggleEditable,
    handleRemoveBox,
    pendingRemoveId,
    removeFieldGroupById,
    type,
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
            <FieldContainer
                sx={{
                    mt: 2,
                    gap: 2,
                }}
            >
                <TextField
                    name="title"
                    label="Title"
                    variant="outlined"
                    size="small"
                    value={field.title}
                    onChange={e => onChangeHandler(field.id, true, null, e)}
                />
                <TextField
                    name="amount"
                    label="Amount"
                    variant="outlined"
                    size="small"
                    value={field.amount}
                    onChange={e => onChangeHandler(field.id, true, null, e)}
                />
                <TextField
                    id={`${
                        type === ProfitExpenseType.Profit ? 'profit' : 'expense'
                    }Day`}
                    name={`${
                        type === ProfitExpenseType.Profit ? 'profit' : 'expense'
                    }Day`}
                    label={`${
                        type === ProfitExpenseType.Profit ? 'Profit' : 'Expense'
                    } Day`}
                    variant="outlined"
                    size="small"
                    value={
                        type === ProfitExpenseType.Profit
                            ? (field as Profit).profitDay
                            : (field as Expense).expenseDay
                    }
                    onChange={e => onChangeHandler(field.id, true, null, e)}
                />
                <DatePickerContainer sx={{ gap: 2 }}>
                    <DatePicker
                        label="Valid From"
                        value={field.validFrom ? moment(field.validFrom) : null}
                        slotProps={{
                            field: { clearable: true },
                        }}
                        onChange={newValue =>
                            onChangeHandler(field.id, true, newValue, undefined)
                        }
                    />
                    <DatePicker
                        label="Valid Until"
                        value={
                            field.validUntil ? moment(field.validUntil) : null
                        }
                        slotProps={{
                            field: { clearable: true },
                        }}
                        onChange={newValue =>
                            onChangeHandler(
                                field.id,
                                false,
                                newValue,
                                undefined
                            )
                        }
                    />
                </DatePickerContainer>
                <FormControlLabel
                    control={
                        <Switch
                            checked={field.editable || false}
                            onChange={e => toggleEditable(field.id, e)}
                            color="success"
                            inputProps={{
                                'aria-label': 'editable',
                            }}
                        />
                    }
                    label={`${field.editable ? 'Editable' : 'Read-only'}`}
                />
            </FieldContainer>
            <Button
                size="small"
                color="secondary"
                variant="outlined"
                aria-label={`Remove ${field.title}`}
                startIcon={<RemoveCircleOutline />}
                onClick={() => handleRemoveBox(field.id)}
                sx={{ mt: 2 }}
            >
                Remove {field.title}
            </Button>
            {pendingRemoveId !== null && (
                <SnackbarAlert
                    variant="outlined"
                    severity="warning"
                    message="Do you really want to remove this fields?"
                    hasAction
                    hasConfirm
                    onClick={() => removeFieldGroupById(pendingRemoveId)}
                    type={`${
                        type === ProfitExpenseType.Profit
                            ? ProfitExpenseType.Profit
                            : ProfitExpenseType.Expenses
                    }`}
                />
            )}
        </Box>
    );
};
