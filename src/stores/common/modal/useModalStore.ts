import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import {BudgetDate} from "../../../utils/common.ts";

interface IModalState {
    isOpened: boolean;
    type: string;
    budgetDate?: BudgetDate;

    setIsOpened: (isOpened: boolean, type: string, budgetDate?: BudgetDate) => void;
}

export const useModalStore = create<IModalState>()(
    devtools(set => ({
        isOpened: false,
        type: "",
        budgetDate: undefined,

        setIsOpened: (isOpened: boolean, type: string, budgetDate?: BudgetDate) => {
            set({isOpened, type, budgetDate});
        }
    }))
);