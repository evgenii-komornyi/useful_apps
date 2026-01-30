import { BalanceOutlined, MedicalInformationOutlined } from '@mui/icons-material';
import { IApplication } from '../utils/common.ts';

export const applications: IApplication[] = [
    {
        id: 'finance_app-1',
        title: 'Finance App',
        link: 'finance',
        icon: <BalanceOutlined />,
    },
    {
        id: 'medical_app-2',
        title: 'Medical App',
        link: 'medical',
        icon: <MedicalInformationOutlined />,
    },
];
