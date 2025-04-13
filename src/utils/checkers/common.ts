export const isNotEnoughMoney = (
    availableMoneyPerDay: number,
    dailyLimit: number
): boolean => availableMoneyPerDay > 0 && availableMoneyPerDay > dailyLimit;
