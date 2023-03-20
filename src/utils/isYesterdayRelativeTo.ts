export function isYesterdayRelativeTo(date1: Date, date2: Date): boolean {
  const oneDay = 24 * 60 * 60 * 1000; // milliseconds in one day
  const diffInDays = Math.round(
    Math.abs((date1.getTime() - date2.getTime()) / oneDay)
  );
  return diffInDays === 1 && date1 < date2;
}
