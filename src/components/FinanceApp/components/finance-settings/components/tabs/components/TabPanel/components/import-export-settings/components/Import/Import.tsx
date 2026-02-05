import { FC } from 'react';
import { Dropzone, FileMosaic, ExtFile } from '@files-ui/react';
import {
    Align,
    Budget,
    Direction,
    Justify,
    User,
} from '../../../../../../../../../../../../utils/common';
import { MainBoxContainer } from '../../../../../../../../../../../../styles/Global';
import { Button } from '@mui/material';
import { CloudDownloadOutlined } from '@mui/icons-material';
import { useFinanceSettingsStore } from '../../../../../../../../../../../../stores/finance-app/settings/useSettingsStore';
import { useBudgetStore } from '../../../../../../../../../../../../stores/finance-app/budget/useBudgetStore';
import { useFileImport } from '../../../../../../../../../../../../hooks/import/useFileImport.ts';
import { useSnackbarStore } from '../../../../../../../../../../../../stores/common/snackbar/useSnackbarStore.ts';

export const Import: FC = () => {
    const { importSettings } = useFinanceSettingsStore(state => state);
    const { setBudget } = useBudgetStore(state => state);
    const { setIsOpened } = useSnackbarStore(state => state);

    const { files, updateFiles, removeFile, handleImport } = useFileImport<{
        user: User;
        budget: Budget[];
    }>(data => {
        if (data.user && data.budget) {
            importSettings(data.user);
            setBudget(data.budget);
            setIsOpened(true, 'import');
        }
    });

    return (
        <MainBoxContainer
            $direction={Direction.Column}
            $justifyContent={Justify.Center}
            $alignItems={Align.Center}
            sx={{ width: '100%' }}
        >
            <Dropzone
                onChange={updateFiles}
                value={files}
                accept="application/json"
                maxFiles={1}
            >
                {files.map((file: ExtFile) => (
                    <FileMosaic
                        key={file.id}
                        {...file}
                        onDelete={removeFile}
                        info={true}
                    />
                ))}
            </Dropzone>
            <Button
                color="primary"
                variant="outlined"
                onClick={handleImport}
                sx={{
                    margin: '0 auto',
                    mt: 3,
                    borderColor: 'white',
                    color: 'white',
                }}
                endIcon={<CloudDownloadOutlined />}
            >
                Import budget and settings
            </Button>
        </MainBoxContainer>
    );
};
