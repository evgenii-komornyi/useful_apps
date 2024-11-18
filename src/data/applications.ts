import {IApplication} from "../utils/common.ts";
import {faWallet} from "@fortawesome/free-solid-svg-icons";

export const applications: IApplication[] = [
    {
        id: 'finance_app-1',
        title: 'Finance App',
        link: 'finance',
        icon: faWallet,
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
]