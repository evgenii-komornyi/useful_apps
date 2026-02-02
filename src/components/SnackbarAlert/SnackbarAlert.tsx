import { FC, SyntheticEvent } from 'react';
import {
    Alert, Box,
    Button,
    IconButton,
    Snackbar,
    SnackbarCloseReason,
    useMediaQuery,
    useTheme
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
    variant = 'filled',
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
                        <Box
                            style={{
                                display: 'flex',
                                flexDirection: matches ? 'row' : 'column',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}
                        >
                            <Box>
                                {hasConfirm && (
                                    <Button
                                        color="secondary"
                                        variant="contained"
                                        size="small"
                                        onClick={onClick}
                                    >
                                        Confirm
                                    </Button>
                                )}
                            </Box>
                            <Box>
                                {hasAddToExisting && (
                                    <Button
                                        startIcon={<Icon icon={faCalendarPlus} color="black" />}
                                        sx={{
                                            ml: 1,
                                            mr: 1,
                                        }}
                                        color="success"
                                        id="addToExisting"
                                        size="small"
                                        variant="contained"
                                        onClick={onClick}
                                    >
                                        Add to existing
                                    </Button>
                                )}
                            </Box>
                            <Box>
                                {hasReplace && (
                                    <Button
                                        startIcon={<Icon icon={faCalendarXmark} color="black" />}
                                        size="small"
                                        variant="contained"
                                        id="replace"
                                        color="warning"
                                        sx={{
                                            ml: 1,
                                            mr: 1,
                                        }}
                                        onClick={onClick}
                                    >
                                        Replace
                                    </Button>
                                )}
                            </Box>
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                sx={{ p: 0.5 }}
                                onClick={handleClose}
                            >
                                <Close />
                            </IconButton>
                        </Box>
                    )
                }
            >
                {message}
            </Alert>
        </Snackbar>
    );
};
