import Box from "@mui/material/Box";
import {ReactElement, ReactNode} from "react";

interface TabPanelProps {
    children?: ReactNode;
    dir?: string;
    index: number;
    value: number;
}

export  const TabPanel = ({ children, value, index, ...other }: TabPanelProps): ReactElement => {
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`tabpanel-${index}`}
            aria-labelledby={`tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}
