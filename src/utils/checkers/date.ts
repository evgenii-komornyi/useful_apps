import { Season } from '../common.ts';

export const isToday = (monthToCheck: number, yearToCheck: number): boolean => {
    const today = new Date();
    return (
        today.getFullYear() === yearToCheck && today.getMonth() === monthToCheck
    );
};

export const isTodayOrFuture = (month: number, year: number): boolean => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    return (
        year > currentYear || (year === currentYear && month >= currentMonth)
    );
};

export const isFuture = (month: number, year: number): boolean => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    return year > currentYear || (year === currentYear && month > currentMonth);
};

export const getCurrentMonth = (): number => {
    const now = new Date();
    return now.getMonth();
};

export const parseDate = (dateString: string | undefined): Date | null => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? null : date;
};

export const isPaymentDay = (
    dayToCheck: number,
    monthToCheck: number,
    yearToCheck: number
): boolean => {
    const now = new Date();
    const paymentDate = new Date(yearToCheck, monthToCheck, dayToCheck);

    return now >= paymentDate;
};

const monthToSeason: { [key: number]: Season } = {
    0: Season.Winter,
    1: Season.Winter,
    2: Season.Spring,
    3: Season.Spring,
    4: Season.Spring,
    5: Season.Summer,
    6: Season.Summer,
    7: Season.Summer,
    8: Season.Autumn,
    9: Season.Autumn,
    10: Season.Autumn,
    11: Season.Winter,
};

const seasonColors: Record<Season, string> = {
    [Season.Winter]: '255, 255, 255',
    [Season.Spring]: '162, 217, 247',
    [Season.Summer]: '0, 191, 255',
    [Season.Autumn]: '210, 105, 30',
};

const getSeason = (month: number): Season => {
    if (month < 0 || month > 11) throw new Error('Invalid month');
    return monthToSeason[month];
};

export const colorBySeason = (month: number): string =>
    seasonColors[getSeason(month)];
