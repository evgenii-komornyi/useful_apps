import {
    Budget,
    BudgetDate,
    Expense,
    Profit,
    ProfitExpenseType,
} from '../common.ts';
import { isPaymentDay, parseDate } from '../checkers/date.ts';

export const updateItemAmount = (
    budgetItems: Budget[],
    id: string,
    itemType: 'profit' | 'expenses',
    newAmount: string,
    budgetDate: BudgetDate
): Budget[] => {
    return budgetItems.map((budgetItem: Budget) => {
        const itemsByType: (Profit | Expense)[] = budgetItem[itemType];

        if (!Array.isArray(itemsByType)) {
            return budgetItem;
        }

        const updatedItems = itemsByType.map(item =>
            item.id === id ? { ...item, amount: String(newAmount) } : item
        );

        return budgetItem.month === budgetDate.month &&
            budgetItem.year === budgetDate.year
            ? {
                  ...budgetItem,
                  [itemType]: updatedItems,
              }
            : budgetItem;
    });
};

export const updateBudgetItems = <T extends Profit | Expense>(
    budget: Budget[],
    currentMonth: number,
    newItems: T[],
    itemType: 'profit' | 'expenses'
): Budget[] => {
    return budget.map(budgetItem => {
        if (budgetItem.month === currentMonth) return budgetItem;

        const specificItems: T[] = newItems.filter(
            item => item.validFrom || item.validUntil
        );
        const itemsWithoutDates: T[] = newItems.filter(
            item => !item.validFrom && !item.validUntil
        );

        const validItemsForBudget: T[] = specificItems.filter(specificItem => {
            const validFromDate = parseDate(specificItem.validFrom);
            const validUntilDate = parseDate(specificItem.validUntil);

            return (
                (!validFromDate ||
                    validFromDate.getFullYear() < budgetItem.year ||
                    (validFromDate.getFullYear() === budgetItem.year &&
                        validFromDate.getMonth() <= budgetItem.month)) &&
                (!validUntilDate ||
                    validUntilDate.getFullYear() > budgetItem.year ||
                    (validUntilDate.getFullYear() === budgetItem.year &&
                        validUntilDate.getMonth() >= budgetItem.month))
            );
        });

        const additionalItems = budgetItem[itemType].filter(
            item => item.type === ProfitExpenseType.Additional
        );

        const updatedItems = [
            ...additionalItems,
            ...itemsWithoutDates,
            ...validItemsForBudget,
        ];

        return {
            ...budgetItem,
            [itemType]: updatedItems,
        };
    });
};

export const calculateAvailableAmount = (
    array: Profit[],
    budgetDate?: BudgetDate
): number => {
    return array.reduce((acc: number, item: Profit) => {
        if (!budgetDate) {
            return acc + Number(item.amount);
        } else {
            if (
                isPaymentDay(item.profitDay, budgetDate.month, budgetDate.year)
            ) {
                return acc + Number(item.amount);
            }
        }

        return acc;
    }, 0);
};

export const calculateExpenses = (array: Expense[]): number => {
    return array.reduce(
        (acc: number, item: Expense) => acc + Number(item.amount),
        0
    );
};

export const calculatePaidExpenses = (
    array: Expense[],
    date: BudgetDate
): number => {
    return array.reduce((acc: number, item: Expense) => {
        if (isPaymentDay(item.expenseDay, date.month, date.year)) {
            return acc + Number(item.amount);
        }

        return acc;
    }, 0);
};

export const calculateMoneyPerDay = (
    profit: Profit[],
    expenses: Expense[],
    date: BudgetDate,
    daysInMonth: number
): number => {
    const availableAmount: number = calculateAvailableAmount(profit, date);
    const futureExpenses: number = expenses.reduce(
        (acc: number, item: Expense) => acc + Number(item.amount),
        0
    );

    return (
        (availableAmount - futureExpenses) /
        (daysInMonth - new Date().getDate())
    );
};
