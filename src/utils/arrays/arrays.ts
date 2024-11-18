import {Budget, Expense, Profit, ProfitExpenseType} from "../common.ts";
import {parseDate} from "../checkers/date.ts";

export const updateBudgetItems = <T extends Profit | Expense>(
    budget: Budget[],
    currentMonth: number,
    newItems: T[],
    itemType: 'profit' | 'expenses',
): Budget[] => {
    return budget.map(budgetItem => {
        if (budgetItem.month === currentMonth) return budgetItem;

        const specificItems: T[] = newItems.filter(item => item.validFrom || item.validUntil);
        const itemsWithoutDates: T[] = newItems.filter(item => !item.validFrom && !item.validUntil);

        const validItemsForBudget: T[] = specificItems.filter(specificItem => {
            const validFromDate = parseDate(specificItem.validFrom);
            const validUntilDate = parseDate(specificItem.validUntil);

            return (
                (!validFromDate ||
                    validFromDate.getFullYear() < budgetItem.year ||
                    (validFromDate.getFullYear() === budgetItem.year && validFromDate.getMonth() <= budgetItem.month)) &&
                (!validUntilDate ||
                    validUntilDate.getFullYear() > budgetItem.year ||
                    (validUntilDate.getFullYear() === budgetItem.year && validUntilDate.getMonth() >= budgetItem.month))
            );
        });

        const additionalItems = budgetItem[itemType].filter(
            item => item.type === ProfitExpenseType.Additional
        );

        const updatedItems = [...additionalItems, ...itemsWithoutDates, ...validItemsForBudget];

        return {
            ...budgetItem,
            [itemType]: updatedItems
        };
    });
};