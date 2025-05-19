import { useMemo } from 'react';
import { useBudgetStore } from '../../../../../../stores/finance-app/budget/useBudgetStore';
import { useFinanceSettingsStore } from '../../../../../../stores/finance-app/settings/useSettingsStore';
import { formatDateByLocale } from '../../../../../../utils/formatters/dates';
import { formatCurrencyByLocation } from '../../../../../../utils/formatters/currency';

interface ExpenseEntry {
    [key: string]: number | null | string;
}

interface UseExpenseDataReturn {
    dataSet: ExpenseEntry[];
    allExpenseKeys: string[];
    valueFormatter: (value: number | null) => string;
}

export const useExpenseData = (
    startMonth: number,
    startYear: number,
    endMonth: number,
    endYear: number,
    currency: string,
    locale: string
): UseExpenseDataReturn => {
    const { budget } = useBudgetStore(state => state);
    const { user } = useFinanceSettingsStore(state => state);

    const filteredBudget = useMemo(() => {
        const startDate = new Date(startYear, startMonth);
        const endDate = new Date(endYear, endMonth);
        return budget.filter(item => {
            const itemDate = new Date(item.year, item.month);
            return itemDate >= startDate && itemDate <= endDate;
        });
    }, [budget, startMonth, startYear, endMonth, endYear]);

    const { dataSet, allExpenseKeys } = useMemo(() => {
        const dataMap = new Map<string, ExpenseEntry>();
        const expenseKeySet = new Set<string>();

        filteredBudget.forEach(item => {
            const date = new Date(item.year, item.month);
            const monthLabel = formatDateByLocale(user.locale, date).split(
                ' '
            )[0];
            const entry = dataMap.get(monthLabel) || { month: monthLabel };

            item.expenses
                .filter(item => item.visualize)
                .forEach(exp => {
                    const key = exp.title.toLowerCase().replace(/\s+/g, '_');
                    const rawAmount =
                        typeof exp.amount === 'string'
                            ? parseFloat(exp.amount.replace(',', '.'))
                            : +exp.amount;

                    entry[key] =
                        !isNaN(rawAmount) && rawAmount > 0 ? rawAmount : null;
                    expenseKeySet.add(key);
                });

            dataMap.set(monthLabel, entry);
        });

        return {
            dataSet: Array.from(dataMap.values()),
            allExpenseKeys: Array.from(expenseKeySet),
        };
    }, [filteredBudget, user.locale]);

    const valueFormatter = (value: number | null): string =>
        value !== null ? formatCurrencyByLocation(locale, currency, value) : '';

    return {
        dataSet,
        allExpenseKeys,
        valueFormatter,
    };
};
