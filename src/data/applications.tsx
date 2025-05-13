import { BalanceOutlined } from '@mui/icons-material';
import { IApplication } from '../utils/common.ts';

export const applications: IApplication[] = [
    {
        id: 'finance_app-1',
        title: 'Finance App',
        link: 'finance',
        icon: <BalanceOutlined />,
    },
    // {
    //     id: 'piggy_bank_app-2',
    //     title: 'Piggy Bank App',
    //     link: 'piggy_bank',
    //     icon: faPiggyBank,
    // },
    // {
    //     id: 'lastfm_app-3',
    //     title: 'LastFM App',
    //     link: 'lastfm',
    //     icon: faLastfm,
    // },
];
