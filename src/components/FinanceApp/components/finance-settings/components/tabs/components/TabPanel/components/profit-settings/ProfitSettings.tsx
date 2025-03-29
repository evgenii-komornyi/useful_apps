import { ChangeEvent, Fragment, FC, useEffect, useState } from 'react';
import { Box, Button, Divider, IconButton } from '@mui/material';
import { Moment } from 'moment';
import { AddCircleOutlineRounded, StorageRounded } from '@mui/icons-material';
import { useFinanceSettingsStore } from '../../../../../../../../../../stores/finance-app/settings/useSettingsStore.ts';
import { useSnackbarStore } from '../../../../../../../../../../stores/common/snackbar/useSnackbarStore.ts';
import {
    Profit,
    ProfitExpenseType,
} from '../../../../../../../../../../utils/common.ts';
import { useBudgetStore } from '../../../../../../../../../../stores/finance-app/budget/useBudgetStore.ts';
import { v4 as uuidv4 } from 'uuid';
import { ChildWrapper, MainWrapper } from '../styles/TabPanel.tsx';
import { Form } from '../Form/Form.tsx';
import { FormControl } from '../FormControl/FormControl.tsx';

export const ProfitSettings: FC = () => {
    const { user, setProfit } = useFinanceSettingsStore(state => state);
    const { setUpdatedSettings } = useBudgetStore(state => state);
    const [profitFields, setProfitFields] = useState<Profit[]>([]);
    const [pendingRemoveId, setPendingRemoveId] = useState<string | null>(null);

    const { isOpened, setIsOpened } = useSnackbarStore(state => state);

    const handleAddBox = () => {
        setProfitFields(prevProfitFields => [
            ...prevProfitFields,
            {
                id: uuidv4(),
                title: '',
                amount: '',
                profitDay: 1,
                editable: false,
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
        setProfitFields(prevProfitFields =>
            prevProfitFields.map(profitField => {
                if (profitField.id !== id) return profitField;

                if (event) {
                    const { name, value } = event.target;
                    return { ...profitField, [name]: value };
                }

                if (date) {
                    const updatedDate = new Date(date.toString()).toISOString();
                    return from
                        ? { ...profitField, validFrom: updatedDate }
                        : { ...profitField, validUntil: updatedDate };
                } else {
                    return from
                        ? { ...profitField, validFrom: undefined }
                        : { ...profitField, validUntil: undefined };
                }
            })
        );
    };

    const toggleEditable = (
        id: string,
        { target }: ChangeEvent<HTMLInputElement>
    ): void => {
        setProfitFields(prevProfitFields =>
            prevProfitFields.map(profitField => {
                if (profitField.id !== id) return profitField;

                return { ...profitField, editable: target.checked };
            })
        );
    };

    const removeFieldById = (fieldId: string): void => {
        setProfitFields(prevFields =>
            prevFields.filter(field => field.id !== fieldId)
        );

        const updatedProfit: Profit[] = profitFields.filter(
            field => field.id !== fieldId
        );
        setProfit(updatedProfit);
        setUpdatedSettings(updatedProfit, ProfitExpenseType.Profit);
    };

    const handleRemoveBox = (fieldId: string): void => {
        if (user.profit.find(field => field.id === fieldId)) {
            setIsOpened(true, 'profit');
            setPendingRemoveId(fieldId);
        } else {
            removeFieldById(fieldId);
        }
    };

    const removeProfitById = (fieldId: string): void => {
        if (isOpened) {
            setIsOpened(false, 'profit');
        }

        removeFieldById(fieldId);
    };

    useEffect(() => {
        setProfitFields(user.profit);
    }, [user.profit]);

    const saveSettings = () => {
        if (
            profitFields.some(
                field => field.title === '' || field.amount === ''
            )
        ) {
            profitFields
                .filter(field => field.title === '' || field.amount === '')
                .forEach(field => {
                    removeFieldById(field.id);
                });
        }

        const profitFieldsWithUniqueId: Profit[] = profitFields.map(field => {
            field.id = uuidv4();

            return field;
        });

        setProfit(profitFieldsWithUniqueId);
        setUpdatedSettings(profitFieldsWithUniqueId, ProfitExpenseType.Profit);
    };

    return (
        <MainWrapper sx={{ gap: 5 }}>
            <ChildWrapper sx={{ gap: 2 }}>
                {profitFields &&
                    profitFields.map((field, index) => (
                        <Fragment key={field.id}>
                            <Form
                                field={field}
                                onChangeHandler={onChangeHandler}
                                toggleEditable={toggleEditable}
                                removeFieldGroupById={removeProfitById}
                                pendingRemoveId={pendingRemoveId}
                                handleRemoveBox={handleRemoveBox}
                                type={ProfitExpenseType.Profit}
                            />
                            {index !== profitFields.length - 1 && <Divider />}
                        </Fragment>
                    ))}
            </ChildWrapper>
            <FormControl
                type={ProfitExpenseType.Profit}
                handleAddBox={handleAddBox}
                saveSettings={saveSettings}
            />
        </MainWrapper>
    );
};
