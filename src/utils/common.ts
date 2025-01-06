import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

export interface IApplication {
    id: string;
    title: string;
    link: string;
    icon: IconDefinition;
}

export enum ProfitExpenseType {
    Additional = 'additional',
    Configurable = 'configurable',
    Profit = 'profit',
    Expenses = 'expenses',
}

export interface Profit {
    id: string;
    title: string;
    amount: string;
    profitDay: number;
    validFrom?: string;
    validUntil?: string;
    type: ProfitExpenseType;
}

export interface Expense {
    id: string;
    title: string;
    amount: string;
    expenseDay: number;
    validFrom?: string;
    validUntil?: string;
    type: ProfitExpenseType;
}

export interface User {
    currency: string;
    locale: string;
    profit: Profit[];
    expenses: Expense[];
}

export interface IFinanceSettingsState {
    user: User;

    setCurrency: (newCurrency: string) => void;
    setLocale: (newLocale: string) => void;
    setProfit: (newProfit: Profit[]) => void;
    setExpense: (newExpense: Expense[]) => void;
}

export interface Budget {
    year: number;
    month: number;
    daysInMonth: number;
    profit: Profit[];
    expenses: Expense[];
}

export interface IBudgetState {
    budget: Budget[];

    setBudget: (newBudget: Budget[]) => void;
    setUpdatedSettings: <T extends Profit | Expense>(
        newUpdatedSettings: T[],
        itemType: 'profit' | 'expenses'
    ) => void;
    addAdditionalItemToBudget: <T extends Profit | Expense>(
        newItem: T,
        itemType: 'profit' | 'expenses',
        budgetDate?: BudgetDate
    ) => void;
    addUnspecifiedMoneyFlowByType: <T extends Profit | Expense>(
        newItem: T,
        itemType: 'profit' | 'expenses',
        budgetDate: BudgetDate
    ) => void;
    removeUnspecifiedMoneyFlowByType: (
        itemToRemove: 'Saving' | 'Unknown',
        itemType: 'profit' | 'expenses',
        budgetDate: BudgetDate
    ) => void;
}

export interface ICurrency {
    value: string;
    label: string;
}

export enum Season {
    Winter = 'Winter',
    Spring = 'Spring',
    Summer = 'Summer',
    Autumn = 'Autumn',
}

export interface BudgetDate {
    year: number;
    month: number;
}
