import {ReactElement, SyntheticEvent} from "react";
import {Alert, Button, IconButton, Snackbar, SnackbarCloseReason} from "@mui/material";
import {useSnackbarStore} from "../../stores/common/snackbar/useSnackbarStore.ts";
import {Close} from "@mui/icons-material";
import {Icon} from "../Icon";
import {faCalendarPlus, faCalendarXmark} from "@fortawesome/free-regular-svg-icons";

interface IProps {
    severity?: "info" | "success" | "warning" | "error";
    variant?: "filled" | "outlined";
    position?: {vertical: "top" | "bottom", horizontal: "center" | "right" | "left";};
    autoHideDuration?: number;
    onClick?: () => void;
    message?: string;
    hasAction?: boolean;
    hasConfirm?: boolean;
    hasReplace?: boolean;
    hasAddToExisting?: boolean;
    type: string;
}

export const SnackbarAlert = (
    {
        severity = "success",
        variant = "outlined",
        position = { vertical: "top", horizontal: "center"},
        autoHideDuration = undefined,
        onClick = undefined,
        message = "Alert for Dragon.",
        hasAction = false,
        hasConfirm = false,
        hasReplace = false,
        hasAddToExisting = false,
        type
    }: IProps): ReactElement => {
    const {setIsOpened, isOpened} = useSnackbarStore(state => state);

    const handleClose = (
        _: SyntheticEvent | Event,
        reason?: SnackbarCloseReason,
    ) => {
        if (reason === 'clickaway') {
            return;
        }
        setIsOpened(false, type);
    };

    return (
        <Snackbar
            open={isOpened[type]}
            anchorOrigin={position}
            {...(autoHideDuration !== undefined ? { autoHideDuration } : {})}
            onClose={handleClose}
        >
            <Alert
                onClose={handleClose}
                severity={severity}
                variant={variant}
                sx={{ width: '100%' }}
                action={hasAction && (
                    <>
                        {hasConfirm &&
                            <Button color="secondary" size="small" onClick={onClick}>
                                Confirm
                            </Button>
                        }
                        {hasAddToExisting &&
                            <Button
                                startIcon={
                                    <Icon icon={faCalendarPlus} />
                                }
                                sx={{
                                    color: "white",
                                    borderColor: "white",
                                    ml: 1,
                                    mr: 1
                                }}
                                id="addToExisting"
                                size="small"
                                variant="outlined"
                                onClick={onClick}
                            >
                                Add to existing
                            </Button>
                        }
                        {hasReplace &&
                            <Button
                                startIcon={
                                    <Icon icon={faCalendarXmark} />
                                }
                                size="small"
                                variant="outlined"
                                id="replace"
                                sx={{
                                    color: "white",
                                    borderColor: "white",
                                    ml: 1,
                                    mr: 1
                                }}
                                onClick={onClick}
                            >
                                Replace
                            </Button>
                        }
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            sx={{ p: 0.5 }}
                            onClick={handleClose}
                        >
                            <Close />
                        </IconButton>
                    </>
                )}
            >
                {message}
            </Alert>
        </Snackbar>
    )
}