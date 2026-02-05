import { FC } from 'react';
import { Dropzone, FileMosaic, ExtFile } from '@files-ui/react';
import {
    Align,
    Direction, IAnamnesis,
    Justify,
} from '../../../../../../../../../../../../utils/common.ts';
import { MainBoxContainer } from '../../../../../../../../../../../../styles/Global.ts';
import { Button } from '@mui/material';
import { CloudDownloadOutlined } from '@mui/icons-material';
import { useAnamnesisStore } from '../../../../../../../../../../../../stores/medical-app/anamnesis/useAnamnesisStore.ts';
import { useFileImport } from '../../../../../../../../../../../../hooks/import/useFileImport.ts';
import { useSnackbarStore } from '../../../../../../../../../../../../stores/common/snackbar/useSnackbarStore.ts';

export const Import: FC = () => {
    const { setAnamnesis } = useAnamnesisStore(state => state);
    const { setIsOpened } = useSnackbarStore();

    const { files, updateFiles, removeFile, handleImport } = useFileImport<{
        anamnesis: IAnamnesis[];
    }>(data => {
        if (data.anamnesis) {
            setAnamnesis(data.anamnesis);
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
                Import anamnesis
            </Button>
        </MainBoxContainer>
    );
};
