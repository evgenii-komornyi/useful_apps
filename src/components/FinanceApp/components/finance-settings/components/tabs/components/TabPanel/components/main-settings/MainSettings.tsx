import { ChangeEvent, FC, useEffect, useState } from 'react';
import { useFinanceSettingsStore } from '../../../../../../../../../../stores/finance-app/settings/useSettingsStore.ts';
import { Box, Button, Divider, MenuItem, TextField } from '@mui/material';
import { currencies } from '../../../../../../../../../../data/settings.ts';
import { StorageRounded } from '@mui/icons-material';
import { IUserState } from '../../../../../../FinanceSettings.tsx';

type UserState = Omit<IUserState, 'profit' | 'expenses'>;

export const MainSettings: FC = () => {
    const { user, setCurrency, setLocale, setMoneyPerDay } =
        useFinanceSettingsStore(state => state);

    const [fields, setFields] = useState<UserState>({
        currency: 'EUR',
        locale: 'en',
        moneyPerDay: 0,
    });

    useEffect(() => {
        if (Object.keys(user).length !== 0) {
            setFields({
                currency: user.currency,
                locale: user.locale,
                moneyPerDay: user.moneyPerDay,
            });
        }
    }, []);

    const onChangeHandler = ({
        target: { name, value },
    }: ChangeEvent<HTMLInputElement>): void => {
        setFields(prevState => ({ ...prevState, [name]: value }));
    };

    const saveSettings = () => {
        setCurrency(fields.currency);
        setLocale(fields.locale);
        setMoneyPerDay(fields.moneyPerDay);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 3,
            }}
        >
            <Box
                component="form"
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    mt: 2,
                    gap: 2,
                    position: 'relative',
                }}
                noValidate
                autoComplete="off"
            >
                <TextField
                    id="currency"
                    name="currency"
                    select
                    label="Currency"
                    variant="standard"
                    value={fields.currency}
                    onChange={onChangeHandler}
                    sx={{ width: '100%' }}
                >
                    {currencies.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}, {option.value}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    id="locale"
                    name="locale"
                    select
                    label="Locale"
                    variant="standard"
                    value={fields.locale}
                    onChange={onChangeHandler}
                    sx={{ width: '100%' }}
                >
                    {navigator.languages.map(option => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </TextField>
            </Box>
            <Box>
                <TextField
                    name="moneyPerDay"
                    label="Money Per Day"
                    variant="outlined"
                    size="small"
                    value={fields.moneyPerDay}
                    onChange={onChangeHandler}
                    sx={{ width: '100%' }}
                />
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
                    color="success"
                    fullWidth
                    sx={{
                        margin: '0 auto',
                        borderColor: 'white',
                        color: 'white',
                    }}
                    startIcon={<StorageRounded />}
                    onClick={saveSettings}
                >
                    Save Settings
                </Button>
            </Box>
        </Box>
    );
};
