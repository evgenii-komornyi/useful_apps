import {ChangeEvent, Fragment, ReactElement, useEffect, useState} from "react";
import {Box, Button, Divider, IconButton, TextField} from "@mui/material";
import {DatePicker} from "@mui/x-date-pickers";
import {Moment} from "moment";
import {AddCircleOutlineRounded, RemoveCircleOutline, StorageRounded} from "@mui/icons-material";
import {useFinanceSettingsStore} from "../../../../../../../../../../stores/finance-app/settings/useSettingsStore.ts";
import {useSnackbarStore} from "../../../../../../../../../../stores/common/snackbar/useSnackbarStore.ts";
import {SnackbarAlert} from "../../../../../../../../../SnackbarAlert";
import {Expense, ProfitExpenseType} from "../../../../../../../../../../utils/common.ts";
import moment from "moment/moment";
import {useBudgetStore} from "../../../../../../../../../../stores/finance-app/budget/useBudgetStore.ts";
import { v4 as uuidv4 } from 'uuid';


export const ExpensesSettings = (): ReactElement => {
    const {user, setExpense} = useFinanceSettingsStore(state=>state);
    const {setUpdatedSettings} = useBudgetStore(state=>state);
    const [expensesFields, setExpensesFields] = useState<Expense[]>([]);
    const [pendingRemoveId, setPendingRemoveId] = useState<string | null>(null);

    const {isOpened, setIsOpened} = useSnackbarStore(state => state);

    const handleAddBox = () => {
        setExpensesFields(prevExpensesFields => [...prevExpensesFields, {
            id: uuidv4(),
            title: '',
            amount: '',
            expenseDay: 1,
            type: ProfitExpenseType.Configurable
        }])
    };

    const onChangeHandler = (id: string, event?: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, date: Moment | null = null, from: boolean = true): void => {
        setExpensesFields((prevExpenseFields) =>
            prevExpenseFields.map((expenseField) => {
                if (expenseField.id !== id) return expenseField;

                if (event) {
                    const { name, value } = event.target;
                    return { ...expenseField, [name]: value };
                }

                if (date) {
                    const updatedDate = new Date(date.toString()).toISOString();
                    return from
                        ? { ...expenseField, validFrom: updatedDate }
                        : { ...expenseField, validUntil: updatedDate };
                } else {
                    return from
                        ? { ...expenseField, validFrom: undefined }
                        : { ...expenseField, validUntil: undefined }
                }
            })
        );
    };

    const removeFieldById = (fieldId: string): void => {
        setExpensesFields(prevFields =>
            prevFields.filter((field) => field.id !== fieldId)
        );

        const updatedExpenses = expensesFields.filter((field) => field.id !== fieldId);
        setExpense(updatedExpenses);
        setUpdatedSettings(updatedExpenses, ProfitExpenseType.Expenses);
    }

    const handleRemoveBox = (fieldId: string): void => {
        if (user.expenses.find((field) => field.id === fieldId)) {
            setIsOpened(true, "expenses");
            setPendingRemoveId(fieldId);
        } else {
            removeFieldById(fieldId);
        }
    };

    const removeExpenseById = (fieldId: string): void => {
        if (isOpened)
        {
            setIsOpened(false, "expenses");
        }

        removeFieldById(fieldId);
    };

    useEffect(() => {
        setExpensesFields(user.expenses);
    }, [user.expenses]);

    const saveSettings = () => {
        if (expensesFields.some((field) => field.title === '' || field.amount === '')) {
            expensesFields
                .filter(field => field.title === '' || field.amount === '')
                .forEach(field => {
                    removeFieldById(field.id);
                });
        }

        const expenseFieldsWithUniqueId: Expense[] = expensesFields.map(field => {
            field.id = uuidv4()

            return field;
        })

        setExpense(expenseFieldsWithUniqueId);
        setUpdatedSettings(expenseFieldsWithUniqueId, ProfitExpenseType.Expenses);
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 5,
                position: 'relative'
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                }}
            >
                {expensesFields && expensesFields.map((field, index) => (
                    <Fragment key={field.id}>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                mb: 2
                            }}
                        >
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
                                    }}
                                >
                                    <TextField
                                        name="title"
                                        label="Title"
                                        variant="outlined"
                                        value={field.title}
                                        onChange={(e) => onChangeHandler(field.id, e)}
                                        sx={{
                                            flexGrow: 1,
                                            minWidth: '30ch',
                                        }}
                                    />
                                    <TextField
                                        name="amount"
                                        label="Amount"
                                        variant="outlined"
                                        value={field.amount}
                                        onChange={(e) => onChangeHandler(field.id, e)}
                                        sx={{
                                            flexGrow: 1,
                                            minWidth: '30ch',
                                        }}
                                    />
                                    <TextField
                                        id="expenseDay"
                                        name="expenseDay"
                                        label="Expense Day"
                                        value={field.expenseDay}
                                        onChange={(e) => onChangeHandler(field.id, e)}
                                        sx={{
                                            flexGrow: 1,
                                            minWidth: '15ch',
                                        }}
                                    />
                                </Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        mt: 2,
                                        gap: 2,
                                    }}
                                >
                                    <DatePicker
                                        label="Valid From"
                                        value={field.validFrom ? moment(field.validFrom) : null}
                                        slotProps={{
                                            field: { clearable: true },
                                        }}
                                        onChange={(newValue) => onChangeHandler(field.id, undefined, newValue)}
                                        sx={{
                                            flexGrow: 1,
                                            minWidth: '38.5ch'
                                        }}
                                    />
                                    <DatePicker
                                        label="Valid Until"
                                        value={field.validUntil ? moment(field.validUntil) : null}
                                        slotProps={{
                                            field: { clearable: true },
                                        }}
                                        onChange={(newValue) => onChangeHandler(field.id, undefined, newValue, false)}
                                        sx={{
                                            flexGrow: 1,
                                            minWidth: '38.5ch'
                                        }}
                                    />
                                </Box>
                            </Box>
                            <Box
                                sx={{
                                    mt: 8,
                                    pl: 1
                                }}
                            >
                                <IconButton
                                    aria-label="remove profit"
                                    onClick={() => handleRemoveBox(field.id)}
                                >
                                    <RemoveCircleOutline />
                                </IconButton>
                                {
                                    pendingRemoveId !== null &&
                                        <SnackbarAlert
                                            variant="outlined"
                                            severity="warning"
                                            message="Do you really want to remove this fields?"
                                            hasAction
                                            hasConfirm
                                            onClick={() => removeExpenseById(pendingRemoveId)}
                                            type="expenses"
                                        />
                                }
                            </Box>
                        </Box>
                        { index !== expensesFields.length - 1 && <Divider /> }
                    </Fragment>
                ))}
            </Box>
            <Box sx={{ position: 'absolute', bottom: 50, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <IconButton onClick={handleAddBox}>
                    <AddCircleOutlineRounded />
                </IconButton>
            </Box>
            <Divider />
            <Box
                sx={{
                    display: 'flex',
                    alignSelf: 'center',
                    width: '100%',
                }}
            >
                <Button
                    variant="outlined"
                    size="small"
                    fullWidth
                    sx={{
                        margin: '0 auto',
                        borderColor: 'white',
                        color: 'white'}}
                    startIcon={<StorageRounded />}
                    onClick={saveSettings}
                >
                    Save Expenses
                </Button>
            </Box>
        </Box>
    )
}