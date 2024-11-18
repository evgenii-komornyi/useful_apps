export const formatCurrencyByLocation = (location: string, currency: string, numberToFormat: number): string =>
    new Intl.NumberFormat(location, { style: 'currency', currency: currency }).format(numberToFormat)