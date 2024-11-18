import {ChangeEvent, ReactElement, useEffect, useState} from "react";
import {useFinanceSettingsStore} from "../../../../../../../../../../stores/finance-app/settings/useSettingsStore.ts";
import {Box, Button, Divider, MenuItem, TextField} from "@mui/material";
import {currencies} from "../../../../../../../../../../data/settings.ts";
import {StorageRounded} from "@mui/icons-material";
import {IUserState} from "../../../../../../FinanceSettings.tsx";

type UserState = Omit<IUserState, "profit" | "expenses">

export const MainSettings = (): ReactElement => {
    const {user, setCurrency, setLocale} = useFinanceSettingsStore(state=>state);

    const [fields, setFields] = useState<UserState>({
        currency: 'EUR',
        locale: 'en'
    });

    useEffect(() => {
        if (Object.keys(user).length !== 0) {
            setFields({
                currency: user.currency,
                locale: user.locale
            });
        }
    }, []);

    const onChangeHandler = ({ target: { name, value } }: ChangeEvent<HTMLInputElement>): void => {
        setFields((prevState) => ({...prevState, [name]: value}))
    }

    const saveSettings = () => {
        setCurrency(fields.currency);
        setLocale(fields.locale);
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 3
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
                    position: 'relative'
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
                    sx={{
                        flexGrow: 1,
                        minWidth: '25ch',
                    }}
                >
                    {currencies.map((option) => (
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
                    sx={{
                        flexGrow: 1,
                        minWidth: '25ch',
                    }}
                >
                    {navigator.languages.map((option) => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </TextField>
            </Box>
            <Divider />
            <Box
                sx={{
                    display: 'flex',
                    alignSelf: 'center',
                    width: '100%'
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
                    Save Settings
                </Button>
            </Box>
        </Box>
    )
}