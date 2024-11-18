import {ProfitExpenseType} from "../common.ts";

export const withoutLastLetterIfTypeExpenses = (type: string): string => type === ProfitExpenseType.Expenses ? type.substring(0, 7) : type;