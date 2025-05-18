import { FC, SyntheticEvent } from 'react';
import {
    Alert,
    Button,
    IconButton,
    Snackbar,
    SnackbarCloseReason,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import { useSnackbarStore } from '../../stores/common/snackbar/useSnackbarStore.ts';
import { Close } from '@mui/icons-material';
import { Icon } from '../Icon';
import {
    faCalendarPlus,
    faCalendarXmark,
} from '@fortawesome/free-regular-svg-icons';

interface Props {
    severity?: 'info' | 'success' | 'warning' | 'error';
    variant?: 'filled' | 'outlined';
    position?: {
        vertical: 'top' | 'bottom';
        horizontal: 'center' | 'right' | 'left';
    };
    autoHideDuration?: number;
    onClick?: () => void;
    message?: string;
    hasAction?: boolean;
    hasConfirm?: boolean;
    hasReplace?: boolean;
    hasAddToExisting?: boolean;
    type: string;
}

export const SnackbarAlert: FC<Props> = ({
    severity = 'success',
    variant = 'outlined',
    position = { vertical: 'top', horizontal: 'center' },
    autoHideDuration = undefined,
    onClick = undefined,
    message = 'Alert for Dragon.',
    hasAction = false,
    hasConfirm = false,
    hasReplace = false,
    hasAddToExisting = false,
    type,
}) => {
    const { setIsOpened, isOpened } = useSnackbarStore(state => state);
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('md'));
    const handleClose = (
        _: SyntheticEvent | Event,
        reason?: SnackbarCloseReason
    ) => {
        if (reason === 'clickaway') {
            return;
        }
        setIsOpened(false, type);
    };

    return (
        <Snackbar
            open={isOpened[type]}
            anchorOrigin={
                matches
                    ? position
                    : { vertical: 'bottom', horizontal: 'center' }
            }
            {...(autoHideDuration !== undefined ? { autoHideDuration } : {})}
            onClose={handleClose}
        >
            <Alert
                onClose={handleClose}
                severity={severity}
                variant={matches ? variant : 'filled'}
                sx={{ width: '100%' }}
                action={
                    hasAction && (
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: matches ? 'row' : 'column',
                                justifyContent: 'space-between',
                                height: 150,
                            }}
                        >
                            {hasConfirm && (
                                <Button
                                    color="secondary"
                                    size="small"
                                    onClick={onClick}
                                >
                                    Confirm
                                </Button>
                            )}
                            {hasAddToExisting && (
                                <Button
                                    startIcon={<Icon icon={faCalendarPlus} />}
                                    sx={{
                                        color: 'white',
                                        borderColor: 'white',
                                        ml: 1,
                                        mr: 1,
                                    }}
                                    id="addToExisting"
                                    size="small"
                                    variant="outlined"
                                    onClick={onClick}
                                >
                                    Add to existing
                                </Button>
                            )}
                            {hasReplace && (
                                <Button
                                    startIcon={<Icon icon={faCalendarXmark} />}
                                    size="small"
                                    variant="outlined"
                                    id="replace"
                                    sx={{
                                        color: 'white',
                                        borderColor: 'white',
                                        ml: 1,
                                        mr: 1,
                                    }}
                                    onClick={onClick}
                                >
                                    Replace
                                </Button>
                            )}
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                sx={{ p: 0.5 }}
                                onClick={handleClose}
                            >
                                <Close />
                            </IconButton>
                        </div>
                    )
                }
            >
                {message}
            </Alert>
        </Snackbar>
    );
};
