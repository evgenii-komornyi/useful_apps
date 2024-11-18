import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import {Expense, IFinanceSettingsState, Profit, User} from "../../../utils/common.ts";

const initialState: User = {
    currency: 'EUR',
    locale: 'en',
    profit: [],
    expenses: []
};

export const useFinanceSettingsStore = create<IFinanceSettingsState>()(
    devtools(persist(set => ({
        user: initialState,

        setCurrency: (newCurrency: string)=> {
            set(state => ({
                user: {...state.user, currency: newCurrency }
            }));
        },

        setLocale: (newLocale: string)=> {
            set(state => ({
                user: {...state.user, locale: newLocale }
            }));
        },

        setProfit: (newProfit: Profit[]) => {
            set(state => ({
                user: {...state.user, profit: newProfit }
            }));
        },

        setExpense: (newExpense: Expense[]) => {
            set(state => ({
                user: {...state.user, expenses: newExpense}
            }));
        }
    }), {name: "userFinanceSettings"}))
);