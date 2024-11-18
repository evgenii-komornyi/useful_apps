import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface IFinanceSettingsModalState {
    isOpened: boolean;

    openModal: () => void;
    closeModal: () => void;
}

export const useFinanceSettingsModalStore = create<IFinanceSettingsModalState>()(
    devtools(set => ({
        isOpened: false,

        openModal: () => {
            set({ isOpened: true });
        },

        closeModal: () => {
            set({ isOpened: false });
        }
    }))
);