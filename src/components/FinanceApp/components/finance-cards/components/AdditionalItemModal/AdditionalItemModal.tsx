import { ChangeEvent, ReactElement, useState } from 'react';
import {
    Button,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Modal } from '../../../finance-settings/styles/FinanceSettings.ts';
import { useModalStore } from '../../../../../../stores/common/modal/useModalStore.ts';
import { withoutLastLetterIfTypeExpenses } from '../../../../../../utils/checkers/types.ts';
import { AdditionalForm } from './components/AdditionalForm.tsx';
import {
    Expense,
    Profit,
    ProfitExpenseType,
} from '../../../../../../utils/common.ts';
import { useBudgetStore } from '../../../../../../stores/finance-app/budget/useBudgetStore.ts';
import { v4 as uuid4 } from 'uuid';

export const AdditionalItemModal = (): ReactElement => {
    const { isOpened, type, budgetDate, setIsOpened } = useModalStore(
        state => state
    );

    const INITIAL_STATE: Profit | Expense =
        type === ProfitExpenseType.Profit
            ? {
                  id: uuid4(),
                  title: '',
                  amount: '',
                  profitDay: 1,
                  type: ProfitExpenseType.Additional,
              }
            : {
                  id: uuid4(),
                  title: '',
                  amount: '',
                  expenseDay: 1,
                  type: ProfitExpenseType.Additional,
              };

    const [fields, setFields] = useState<Profit | Expense>(INITIAL_STATE);

    const onChangeHandler = ({
        target: { name, value },
    }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFields(prevFields => ({
            ...prevFields,
            [name]: value,
        }));
    };

    const { addAdditionalItemToBudget } = useBudgetStore(state => state);

    const addItemHandler = () => {
        if (type === ProfitExpenseType.Profit) {
            addAdditionalItemToBudget(
                fields as Profit,
                ProfitExpenseType.Profit,
                budgetDate
            );
        } else {
            addAdditionalItemToBudget(
                fields as Expense,
                ProfitExpenseType.Expenses,
                budgetDate
            );
        }
        closeModal();
        setFields(INITIAL_STATE);
    };

    const closeModal = () => {
        setIsOpened(false, '', undefined);
    };

    return (
        <Modal
            onClose={closeModal}
            aria-labelledby="settings"
            aria-hidden={true}
            open={isOpened}
            fullWidth={true}
            maxWidth="md"
        >
            <DialogTitle sx={{ m: 0, p: 2 }} id="settings">
                Add new {withoutLastLetterIfTypeExpenses(type)}
            </DialogTitle>
            <IconButton
                aria-label="close"
                onClick={closeModal}
                sx={theme => ({
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: theme.palette.grey[500],
                })}
            >
                <CloseIcon />
            </IconButton>
            <DialogContent dividers>
                <AdditionalForm
                    type={type}
                    fields={fields}
                    onChangeHandler={onChangeHandler}
                />
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" onClick={addItemHandler}>
                    Add {withoutLastLetterIfTypeExpenses(type)}
                </Button>
                <Button variant="contained" onClick={closeModal}>
                    Discard changes
                </Button>
            </DialogActions>
        </Modal>
    );
};