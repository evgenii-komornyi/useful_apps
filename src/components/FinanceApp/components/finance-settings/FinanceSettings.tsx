import {ReactElement} from "react";
import {Button, DialogTitle, DialogContent, DialogActions, IconButton} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import {useFinanceSettingsModalStore} from "../../../../stores/finance-app/modal/useFinanceSettingsModalStore.ts";
import {Modal} from "./styles/FinanceSettings.ts";
import {User} from "../../../../utils/common.ts";
import {SettingTabs} from "./components/tabs";

export type IUserState = User

export const FinanceSettings = ():ReactElement => {
    const {isOpened, closeModal} = useFinanceSettingsModalStore(state=>state);

    return (
        <Modal
            onClose={closeModal}
            aria-labelledby="settings"
            open={isOpened}
            fullWidth={true}
            maxWidth="md"
        >
            <DialogTitle sx={{ m: 0, p: 2 }} id="settings">
                Settings
            </DialogTitle>
            <IconButton
                aria-label="close"
                onClick={closeModal}
                sx={(theme) => ({
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: theme.palette.grey[500],
                })}
            >
                <CloseIcon />
            </IconButton>
            <DialogContent dividers>
                <SettingTabs />
            </DialogContent>
            <DialogActions>
                <Button variant="contained" onClick={closeModal}>Discard changes</Button>
            </DialogActions>
        </Modal>
    );
}