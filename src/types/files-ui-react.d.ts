declare module '@files-ui/react' {
    import { ComponentType } from 'react';

    export interface ExtFile {
        id?: string | number;
        name?: string;
        size?: number;
        type?: string;
        file?: File;
        imageUrl?: string;
        valid?: boolean;
        errors?: string[];
        uploadStatus?: 'uploading' | 'success' | 'error' | undefined;
    }

    export const Dropzone: ComponentType<any>;
    export const FileMosaic: ComponentType<any>;
}
