import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface IFinanceSettingsSnackbarState {
    isOpened: {
        [key: string]: boolean
    };

    setIsOpened: (isOpened: boolean, type: string) => void;
}

export const useSnackbarStore = create<IFinanceSettingsSnackbarState>()(
    devtools(set => ({
        isOpened: {
            budget: false,
            profit: false,
            expenses: false,
        },

        setIsOpened: (isOpened: boolean, type: string) => {
            set(state => ({
                isOpened: {
                    ...state.isOpened,
                    [type]: isOpened
                }
            }));
        }
    }))
);