const formatDate = (
    locale: string,
    dateToFormat: Date,
    isShortFormat: boolean = false,
    hasDay: boolean = false,
    hasMonth: boolean = true
) =>
    new Intl.DateTimeFormat(locale, {
        day: hasDay ? 'numeric' : undefined,
        month: !hasMonth ? undefined : isShortFormat ? 'numeric' : 'long',
        year: hasDay ? undefined : isShortFormat ? '2-digit' : 'numeric',
    }).format(dateToFormat);

export const formatDateByLocale = (
    locale: string,
    dateToFormat: Date,
    isShortFormat: boolean = false,
    hasDay: boolean = false,
    hasMonth: boolean = true
): string => formatDate(locale, dateToFormat, isShortFormat, hasDay, hasMonth);

export const formatDateByLocaleOnMobiles = (
    locale: string,
    dateToFormat: Date,
    isShortFormat: boolean = false,
    hasDay: boolean = false,
    hasMonth: boolean = true
): string =>
    formatDate(locale, dateToFormat, isShortFormat, hasDay, hasMonth).replace(
        ' ',
        '\n'
    );
