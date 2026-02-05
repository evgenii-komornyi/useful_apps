import { useState } from 'react';
import { ExtFile } from '@files-ui/react';

export const useFileImport = <T,>(onImport: (data: T) => void) => {
    const [files, setFiles] = useState<ExtFile[]>([]);

    const updateFiles = (incommingFiles: ExtFile[]) => {
        setFiles(incommingFiles);
    };

    const removeFile = (id: string | number | undefined) => {
        setFiles(files.filter((x: ExtFile) => x.id !== id));
    };

    const handleImport = () => {
        const file = files[0]?.file;
        if (!file) return;

        const reader = new FileReader();
        reader.onload = event => {
            try {
                const data: T = JSON.parse(event.target?.result as string);
                onImport(data);
                setFiles([]);
            } catch (err) {
                console.error('Invalid JSON:', err);
            }
        };
        reader.readAsText(file);
    };

    return { files, updateFiles, removeFile, handleImport };
};
