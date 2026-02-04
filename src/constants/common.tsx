import {
    SentimentSatisfied,
    SentimentVeryDissatisfiedOutlined,
    SentimentVerySatisfied
} from '@mui/icons-material';
import { ReactElement } from 'react';

interface CustomIcon {
    [key: number]: {
        icon: ReactElement;
        label: string;
        color: "error" | "warning" | "success";
    }
}

export const CUSTOM_ICONS: CustomIcon = {
    3: {
        icon: <SentimentVeryDissatisfiedOutlined color="error" />,
        label: 'Strong',
        color: "error"
    },
    2: {
        icon: <SentimentSatisfied color="warning" />,
        label: 'Normal',
        color: "warning"
    },
    1: {
        icon: <SentimentVerySatisfied color="success" />,
        label: 'Mild',
        color: "success"
    },
} as const;