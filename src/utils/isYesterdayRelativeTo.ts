export function isYesterdayRelativeTo(date1: Date, date2: Date): boolean {
  return date1.getDate() === date2.getDate() - 1;
}
