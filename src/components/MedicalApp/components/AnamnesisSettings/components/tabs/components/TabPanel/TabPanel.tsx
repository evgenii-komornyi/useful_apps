import Box from '@mui/material/Box';
import { FC, ReactNode } from 'react';

interface Props {
    children?: ReactNode;
    dir?: string;
    index: number;
    value: number;
}

export const TabPanel: FC<Props> = ({ children, value, index, ...other }) => {
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`tabpanel-${index}`}
            aria-labelledby={`tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
};
