import {ChangeEvent, ReactElement} from "react";
import {Box, TextField} from "@mui/material";
import {Expense, Profit, ProfitExpenseType} from "../../../../../../../utils/common.ts";

interface Props {
    type: string;
    fields: Profit | Expense;
    onChangeHandler: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export const AdditionalForm = ({type, fields, onChangeHandler}: Props): ReactElement => {
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
                    flexDirection: 'row',
                    mt: 2,
                    gap: 2,
                    mb: 2
                }}
            >
                <TextField
                    name="title"
                    label="Title"
                    variant="outlined"
                    value={fields.title || ""}
                    onChange={onChangeHandler}
                    sx={{
                        flexGrow: 1,
                        minWidth: '30ch',
                    }}
                />
                <TextField
                    name="amount"
                    label="Amount"
                    variant="outlined"
                    value={fields.amount || ""}
                    onChange={onChangeHandler}
                    sx={{
                        flexGrow: 1,
                        minWidth: '30ch',
                    }}
                />
                <TextField
                    id={type === ProfitExpenseType.Profit ? "profitDay" : "expenseDay"}
                    name={type === ProfitExpenseType.Profit ? "profitDay" : "expenseDay"}
                    label={`${type === ProfitExpenseType.Profit ? "Profit" : "Expense"} Day`}
                    value={
                        type === ProfitExpenseType.Profit
                            ? (fields as Profit).profitDay || ""
                            : (fields as Expense).expenseDay || ""
                    }
                    onChange={onChangeHandler}
                    sx={{
                        flexGrow: 1,
                        minWidth: '15ch',
                    }}
                />
            </Box>
        </Box>
    )
}