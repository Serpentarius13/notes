export function makeLocaleDate(date: Date) {
  return new Date(date).toUTCString();
}
