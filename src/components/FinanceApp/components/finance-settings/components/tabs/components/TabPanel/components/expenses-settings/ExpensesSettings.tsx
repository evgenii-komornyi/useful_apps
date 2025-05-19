import { ChangeEvent, FC, Fragment, useEffect, useState } from 'react';
import { Divider } from '@mui/material';
import { Moment } from 'moment';
import { useFinanceSettingsStore } from '../../../../../../../../../../stores/finance-app/settings/useSettingsStore.ts';
import { useSnackbarStore } from '../../../../../../../../../../stores/common/snackbar/useSnackbarStore.ts';
import {
    Expense,
    ProfitExpenseType,
} from '../../../../../../../../../../utils/common.ts';
import { useBudgetStore } from '../../../../../../../../../../stores/finance-app/budget/useBudgetStore.ts';
import { v4 as uuidv4 } from 'uuid';
import { Form } from '../Form/Form.tsx';
import { ChildWrapper, MainWrapper } from '../styles/TabPanel.tsx';
import { FormControl } from '../FormControl/FormControl.tsx';

export const ExpensesSettings: FC = () => {
    const { user, setExpense } = useFinanceSettingsStore(state => state);
    const { setUpdatedSettings } = useBudgetStore(state => state);
    const [expensesFields, setExpensesFields] = useState<Expense[]>([]);
    const [pendingRemoveId, setPendingRemoveId] = useState<string | null>(null);

    const { isOpened, setIsOpened } = useSnackbarStore(state => state);

    const handleAddBox = () => {
        setExpensesFields(prevExpensesFields => [
            ...prevExpensesFields,
            {
                id: uuidv4(),
                title: '',
                amount: '',
                editable: false,
                visualize: true,
                expenseDay: 1,
                type: ProfitExpenseType.Configurable,
            },
        ]);
    };

    const onChangeHandler = (
        id: string,
        from: boolean = true,
        date: Moment | null = null,
        event?: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ): void => {
        setExpensesFields(prevExpenseFields =>
            prevExpenseFields.map(expenseField => {
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
                        : { ...expenseField, validUntil: undefined };
                }
            })
        );
    };

    const toggleEditable = (
        id: string,
        { target }: ChangeEvent<HTMLInputElement>
    ): void => {
        setExpensesFields(prevExpenseFields =>
            prevExpenseFields.map(expenseField => {
                if (expenseField.id !== id) return expenseField;

                return { ...expenseField, editable: target.checked };
            })
        );
    };

    const toggleVisualize = (
        id: string,
        { target }: ChangeEvent<HTMLInputElement>
    ): void => {
        setExpensesFields(prevExpenseFields =>
            prevExpenseFields.map(expenseField => {
                if (expenseField.id !== id) return expenseField;

                return { ...expenseField, visualize: target.checked };
            })
        );
    };

    const removeFieldById = (fieldId: string): void => {
        setExpensesFields(prevFields =>
            prevFields.filter(field => field.id !== fieldId)
        );

        const updatedExpenses = expensesFields.filter(
            field => field.id !== fieldId
        );
        setExpense(updatedExpenses);
        setUpdatedSettings(updatedExpenses, ProfitExpenseType.Expenses);
    };

    const handleRemoveBox = (fieldId: string): void => {
        if (user.expenses.find(field => field.id === fieldId)) {
            setIsOpened(true, 'expenses');
            setPendingRemoveId(fieldId);
        } else {
            removeFieldById(fieldId);
        }
    };

    const removeExpenseById = (fieldId: string): void => {
        if (isOpened) {
            setIsOpened(false, 'expenses');
        }

        removeFieldById(fieldId);
    };

    useEffect(() => {
        setExpensesFields(user.expenses);
    }, [user.expenses]);

    const saveSettings = () => {
        if (
            expensesFields.some(
                field => field.title === '' || field.amount === ''
            )
        ) {
            expensesFields
                .filter(field => field.title === '' || field.amount === '')
                .forEach(field => {
                    removeFieldById(field.id);
                });
        }

        const expenseFieldsWithUniqueId: Expense[] = expensesFields.map(
            field => {
                field.id = uuidv4();

                return field;
            }
        );

        setExpense(expenseFieldsWithUniqueId);
        setUpdatedSettings(
            expenseFieldsWithUniqueId,
            ProfitExpenseType.Expenses
        );
    };

    return (
        <MainWrapper sx={{ gap: 5 }}>
            <ChildWrapper sx={{ gap: 2 }}>
                {expensesFields &&
                    expensesFields.map((field, index) => (
                        <Fragment key={field.id}>
                            <Form
                                field={field}
                                onChangeHandler={onChangeHandler}
                                toggleEditable={toggleEditable}
                                toggleVisualize={toggleVisualize}
                                handleRemoveBox={handleRemoveBox}
                                pendingRemoveId={pendingRemoveId}
                                removeFieldGroupById={removeExpenseById}
                                type={ProfitExpenseType.Expenses}
                            />
                            {index !== expensesFields.length - 1 && <Divider />}
                        </Fragment>
                    ))}
            </ChildWrapper>
            <FormControl
                type={ProfitExpenseType.Expenses}
                handleAddBox={handleAddBox}
                saveSettings={saveSettings}
            />
        </MainWrapper>
    );
};
