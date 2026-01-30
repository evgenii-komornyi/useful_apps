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
    1: {
        icon: <SentimentVeryDissatisfiedOutlined color="error" />,
        label: 'Very Dissatisfied',
        color: "error"
    },
    2: {
        icon: <SentimentDissatisfied color="error" />,
        label: 'Dissatisfied',
        color: "error"
    },
    3: {
        icon: <SentimentSatisfied color="warning" />,
        label: 'Neutral',
        color: "warning"
    },
    4: {
        icon: <SentimentSatisfiedAlt color="success" />,
        label: 'Satisfied',
        color: "success"
    },
    5: {
        icon: <SentimentVerySatisfied color="success" />,
        label: 'Very Satisfied',
        color: "success"
    },
} as const;