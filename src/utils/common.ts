import { ReactNode } from 'react';

export interface IApplication {
    id: string;
    title: string;
    link: string;
    icon: ReactNode;
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
    visualize: boolean;
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
    visualize: boolean;
    validFrom?: string;
    validUntil?: string;
    type: ProfitExpenseType;
}

export interface User {
    currency: string;
    locale: string;
    moneyPerDay: number;
    profit: Profit[];
    expenses: Expense[];
}

export interface IFinanceSettingsState {
    user: User;

    importSettings: (user: User) => void;
    setCurrency: (newCurrency: string) => void;
    setLocale: (newLocale: string) => void;
    setMoneyPerDay: (newMoneyPerDay: number) => void;
    setProfit: (newProfit: Profit[]) => void;
    setExpense: (newExpense: Expense[]) => void;
}

export interface Budget {
    year: number;
    month: number;
    daysInMonth: number;
    moneyPerDay: number;
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
    updateMoneyPerDay: (newAmount: number, budgetDate: BudgetDate) => void;
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

export interface SymptomDate {
    year: number;
    month: number;
    day: number;
}

export enum SymptomType {
    Headache = 'Headache',
    AcidIndigestion = 'Acid Indigestion',
}

export interface ISymptom {
    title: SymptomType;
    date: SymptomDate;
    painRate?: 1 | 2 | 3 | 4| 5;
    food?: string[];
}

export interface IAnamnesis {
    id: string;
    month: number;
    year: number;
    symptoms: ISymptom[];
}

export interface IAnamnesisState {
    anamnesis: IAnamnesis[];

    setAnamnesis: (newAnamnesis: IAnamnesis[]) => void;
    addAnamnesis: (newAnamnesis: IAnamnesis) => void;
    removeAnamnesis: (anamnesisToRemove: string) => void;

    addSymptom: (anamnesisId: string, newSymptom: ISymptom) => void;
    removeSymptom: (anamnesisId: string, symptomToRemove: ISymptom) => void;
}