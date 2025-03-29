import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import {
    Budget,
    BudgetDate,
    Expense,
    IBudgetState,
    Profit,
    ProfitExpenseType,
} from '../../../utils/common.ts';
import { getCurrentMonth } from '../../../utils/checkers/date.ts';
import {
    updateBudgetItems,
    updateItemAmount,
} from '../../../utils/arrays/arrays.ts';

export const useBudgetStore = create<IBudgetState>()(
    devtools(
        persist(
            (set, get) => ({
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

                updateItemAmountByType: (
                    itemId: string,
                    newAmount: string,
                    itemType: 'profit' | 'expenses',
                    budgetDate: BudgetDate
                ) => {
                    const updatedBudgets = updateItemAmount(
                        get().budget,
                        itemId,
                        itemType,
                        newAmount,
                        budgetDate
                    );
                    set({ budget: updatedBudgets });
                },

                addAdditionalItemToBudget: <T extends Profit | Expense>(
                    newItem: T,
                    itemType: 'profit' | 'expenses',
                    budgetDate?: BudgetDate
                ) => {
                    if (!budgetDate) {
                        console.error(
                            'Budget date is required to add an item.'
                        );
                        return;
                    }

                    set(state => ({
                        budget: state.budget.map(budgetItem =>
                            budgetItem.month === budgetDate.month &&
                            budgetItem.year === budgetDate.year
                                ? {
                                      ...budgetItem,
                                      [itemType]: [
                                          ...budgetItem[itemType],
                                          newItem,
                                      ],
                                  }
                                : budgetItem
                        ),
                    }));
                },

                addUnspecifiedMoneyFlowByType: <T extends Profit | Expense>(
                    newItem: T,
                    itemType: 'profit' | 'expenses',
                    budgetDate: BudgetDate
                ): void => {
                    set(state => ({
                        budget: state.budget.map(budgetItem =>
                            budgetItem.month === budgetDate.month &&
                            budgetItem.year === budgetDate.year
                                ? {
                                      ...budgetItem,
                                      [itemType]: budgetItem[itemType].some(
                                          item => item.title === newItem.title
                                      )
                                          ? budgetItem[itemType].map(item =>
                                                item.title === newItem.title
                                                    ? {
                                                          ...item,
                                                          amount: +newItem.amount,
                                                          [`${
                                                              itemType ===
                                                              ProfitExpenseType.Profit
                                                                  ? 'profit'
                                                                  : 'expense'
                                                          }Day`]:
                                                              itemType ===
                                                              ProfitExpenseType.Profit
                                                                  ? (
                                                                        newItem as Profit
                                                                    ).profitDay
                                                                  : (
                                                                        newItem as Expense
                                                                    )
                                                                        .expenseDay,
                                                      }
                                                    : item
                                            )
                                          : [...budgetItem[itemType], newItem],
                                  }
                                : budgetItem
                        ),
                    }));
                },

                removeUnspecifiedMoneyFlowByType: (
                    itemToRemove: 'Saving' | 'Unknown',
                    itemType: 'profit' | 'expenses',
                    budgetDate: BudgetDate
                ): void => {
                    set(state => ({
                        budget: state.budget.map(budgetItem =>
                            budgetItem.month === budgetDate.month &&
                            budgetItem.year === budgetDate.year
                                ? {
                                      ...budgetItem,
                                      [itemType]: budgetItem[itemType].filter(
                                          item => item.title !== itemToRemove
                                      ),
                                  }
                                : budgetItem
                        ),
                    }));
                },
            }),
            { name: 'userBudget' }
        )
    )
);
