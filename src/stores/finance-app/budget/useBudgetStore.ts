import {create} from 'zustand';
import {devtools, persist} from 'zustand/middleware';
import {Budget, BudgetDate, Expense, IBudgetState, Profit} from "../../../utils/common.ts";
import {getCurrentMonth} from "../../../utils/checkers/date.ts";
import {updateBudgetItems} from "../../../utils/arrays/arrays.ts";

export const useBudgetStore = create<IBudgetState>()(
    devtools(persist((set, get) => ({
        budget: [],

        setBudget: (newBudget: Budget[]) => {
            set({
                budget: newBudget,
            });
        },

        setUpdatedSettings: <T extends Profit | Expense>(
            newUpdatedSettings: T[],
            itemType: 'profit' | 'expenses'
        ) => {
            const currentMonth = getCurrentMonth();
            const updatedBudgets = updateBudgetItems(
                get().budget,
                currentMonth,
                newUpdatedSettings,
                itemType
            );
            set({ budget: updatedBudgets });
        },

        addAdditionalItemToBudget: <T extends Profit | Expense>(
            newItem: T,
            itemType: 'profit' | 'expenses',
            budgetDate?: BudgetDate,
        ) => {
            if (!budgetDate) {
                console.error("Budget date is required to add an item.");
                return;
            }

            set((state) => ({
                budget: state.budget.map((budgetItem) =>
                    budgetItem.month === budgetDate.month && budgetItem.year === budgetDate.year
                        ? { ...budgetItem, [itemType]: [...budgetItem[itemType], newItem] }
                        : budgetItem
                ),
            }));
        }
    }), {name: "userBudget"}))
);