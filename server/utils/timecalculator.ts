export const  daysRemaining = (date1: { getTime: () => number; }, date2: { getTime: () => number; }) => {
    const oneDay = 24 * 60 * 60 * 1000; // milliseconds in one day
    const diffInMilliseconds = date1.getTime() - date2.getTime();
    return Math.round(diffInMilliseconds / oneDay); // Convert milliseconds to days
}