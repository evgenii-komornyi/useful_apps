import {ChangeEvent, Fragment, ReactElement, useEffect, useState} from "react";
import {Box, Button, Divider, IconButton, TextField} from "@mui/material";
import {DatePicker} from "@mui/x-date-pickers";
import {Moment} from "moment";
import {AddCircleOutlineRounded, RemoveCircleOutline, StorageRounded} from "@mui/icons-material";
import {useFinanceSettingsStore} from "../../../../../../../../../../stores/finance-app/settings/useSettingsStore.ts";
import {useSnackbarStore} from "../../../../../../../../../../stores/common/snackbar/useSnackbarStore.ts";
import {SnackbarAlert} from "../../../../../../../../../SnackbarAlert";
import {Profit, ProfitExpenseType} from "../../../../../../../../../../utils/common.ts";
import moment from "moment/moment";
import {useBudgetStore} from "../../../../../../../../../../stores/finance-app/budget/useBudgetStore.ts";
import { v4 as uuidv4 } from 'uuid';


export const ProfitSettings = (): ReactElement => {
    const {user, setProfit} = useFinanceSettingsStore(state=>state);
    const {setUpdatedSettings} = useBudgetStore(state=>state);
    const [profitFields, setProfitFields] = useState<Profit[]>([]);
    const [pendingRemoveId, setPendingRemoveId] = useState<string | null>(null);

    const {isOpened, setIsOpened} = useSnackbarStore(state => state);

    const handleAddBox = () => {
        setProfitFields(prevProfitFields => [...prevProfitFields, {
            id: uuidv4(),
            title: '',
            amount: '',
            profitDay: 1,
            type: ProfitExpenseType.Configurable
        }])
    };

    const onChangeHandler = (id: string, event?: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, date: Moment | null = null, from: boolean = true): void => {
        setProfitFields((prevProfitFields) =>
            prevProfitFields.map((profitField) => {
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
                        : { ...profitField, validUntil: undefined }
                }
            })
        );
    };

    const removeFieldById = (fieldId: string): void => {
        setProfitFields(prevFields =>
            prevFields.filter((field) => field.id !== fieldId)
        );

        const updatedProfit: Profit[] = profitFields.filter((field) => field.id !== fieldId);
        setProfit(updatedProfit);
        setUpdatedSettings(updatedProfit, ProfitExpenseType.Profit);
    }

    const handleRemoveBox = (fieldId: string): void => {
        if (user.profit.find((field) => field.id === fieldId)) {
            setIsOpened(true, "profit");
            setPendingRemoveId(fieldId);
        } else {
            removeFieldById(fieldId);
        }
    };

    const removeProfitById = (fieldId: string): void => {
        if (isOpened)
        {
            setIsOpened(false, "profit");
        }

        removeFieldById(fieldId);
    };

    useEffect(() => {
        setProfitFields(user.profit);
    }, [user.profit]);

    const saveSettings = () => {
        if (profitFields.some((field) => field.title === '' || field.amount === '')) {
            profitFields
                .filter(field => field.title === '' || field.amount === '')
                .forEach(field => {
                    removeFieldById(field.id);
                });
        }

        const profitFieldsWithUniqueId: Profit[] = profitFields.map(field => {
            field.id = uuidv4()

            return field;
        })

        setProfit(profitFieldsWithUniqueId);
        setUpdatedSettings(profitFieldsWithUniqueId, ProfitExpenseType.Profit);
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
                {profitFields && profitFields.map((field, index) => (
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
                                        id="profitDay"
                                        name="profitDay"
                                        label="Profit Day"
                                        value={field.profitDay}
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
                                            onClick={() => removeProfitById(pendingRemoveId)}
                                            type="profit"
                                        />
                                }
                            </Box>
                        </Box>
                        { index !== profitFields.length - 1 && <Divider /> }
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
                    Save Profit
                </Button>
            </Box>
        </Box>
    )
}