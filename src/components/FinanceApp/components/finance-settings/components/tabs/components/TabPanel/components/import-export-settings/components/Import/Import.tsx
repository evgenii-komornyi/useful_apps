import { FC, useState } from 'react';
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

export const Import: FC = () => {
    const [files, setFiles] = useState<ExtFile[]>([]);

    const updateFiles = (incommingFiles: ExtFile[]) => {
        setFiles(incommingFiles);
    };

    const removeFile = (id: string | number | undefined) => {
        setFiles(files.filter((x: ExtFile) => x.id !== id));
    };

    const { importSettings } = useFinanceSettingsStore(state => state);
    const { setBudget } = useBudgetStore(state => state);

    const handleImportClick = () => {
        const file = files[0]?.file;
        if (!file) return;

        const reader = new FileReader();
        reader.onload = event => {
            try {
                const { user, budget }: { user: User; budget: Budget[] } =
                    JSON.parse(event.target?.result as string);
                if (user && budget) {
                    importSettings(user);
                    setBudget(budget);
                }
            } catch (err) {
                console.error('Invalid JSON:', err);
            }
        };
        reader.readAsText(file);
    };

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
                onClick={handleImportClick}
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
