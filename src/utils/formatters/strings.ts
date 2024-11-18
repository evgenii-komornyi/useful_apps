export const replaceLongTextWithDots = (text: string): string => {
    if (text.length > 10) {
        return text.slice(0, 9) + "...";
    }

    return text;
}