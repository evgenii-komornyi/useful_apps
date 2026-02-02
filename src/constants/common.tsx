import {
    SentimentDissatisfied,
    SentimentSatisfied, SentimentSatisfiedAlt,
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
    5: {
        icon: <SentimentVeryDissatisfiedOutlined color="error" />,
        label: 'Very Dissatisfied',
        color: "error"
    },
    4: {
        icon: <SentimentDissatisfied color="error" />,
        label: 'Dissatisfied',
        color: "error"
    },
    3: {
        icon: <SentimentSatisfied color="warning" />,
        label: 'Neutral',
        color: "warning"
    },
    2: {
        icon: <SentimentSatisfiedAlt color="success" />,
        label: 'Satisfied',
        color: "success"
    },
    1: {
        icon: <SentimentVerySatisfied color="success" />,
        label: 'Very Satisfied',
        color: "success"
    },
} as const;