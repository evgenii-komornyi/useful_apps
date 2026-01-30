export enum Criteria {
    Main = 'Main',
    Finance = 'Finance',
    Medical = 'Medical',
    BudgetDetails = 'BudgetDetails',
    DataVisualization = 'DataVisualization',
    FinanceSettings = 'FinanceSettings',
}

export const mainCriteria: Criteria[] = [
    Criteria.Main
] as const;

export const financeCriteria: Criteria[] = [
    Criteria.Finance, Criteria.BudgetDetails, Criteria.DataVisualization, Criteria.FinanceSettings
] as const;

export const medicalCriteria: Criteria[] = [
    Criteria.Medical
] as const;
