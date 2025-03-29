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
    editable: boolean;
    validFrom?: string;
    validUntil?: string;
    type: ProfitExpenseType;
}

export interface Expense {
    id: string;
    title: string;
    amount: string;
    expenseDay: number;
    editable: boolean;
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
    updateItemAmountByType: (
        itemId: string,
        newAmount: string,
        itemType: 'profit' | 'expenses',
        budgetDate: BudgetDate
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

export enum Direction {
    Row = 'row',
    Column = 'column',
}

export enum Align {
    Center = 'center',
}

export enum Justify {
    Center = 'center',
    SpaceBetween = 'space-between',
    SpaceAround = 'space-around',
    Start = 'flex-start',
    End = 'flex-end',
}

export enum Position {
    Absolute = 'absolute',
    Relative = 'relative',
}

export enum SortOrder {
    None = 0,
    Asc = 1,
    Desc = 2,
}

export type SortMethod = 'asc' | 'desc';
export type SortCategory = 'title' | 'amount' | 'expenseDay';

export interface IFilterState {
    searchValue?: string;
    sortCategory?: SortCategory;
    sortMethod?: SortOrder;
    selectedCard?: number;

    setSearchValue: (searchValue?: string) => void;
    setSortCategory: (sortCategory?: SortCategory) => void;
    setSortMethod: (sortMethod?: SortOrder) => void;
    selectCard: (selectedCard?: number) => void;
}

export type IconSize = 'small' | 'medium' | 'large';
