import { getLocale } from '@/i18n/runtime';

export function formatNumberToCurrentLocale(num: number, options?: Intl.NumberFormatOptions) {
  const locale = getLocale();

  return Intl.NumberFormat(locale, options).format(num);
}

export function formatMemory(
  kilobytes: number | null | undefined,
  options?: Intl.NumberFormatOptions
): string {
  if (kilobytes == null || kilobytes < 0) {
    return '--';
  }

  if (kilobytes === 0) {
    return '0 KB';
  }

  const units = ['KB', 'MB', 'GB', 'TB', 'PB'];
  const base = 1024;
  const i = Math.floor(Math.log(kilobytes) / Math.log(base));

  const unitIndex = Math.min(i, units.length - 1);

  const value = kilobytes / base ** unitIndex;

  // Format to a maximum of 2 decimal places and remove trailing zeros
  const formattedValue = formatNumberToCurrentLocale(Number(value.toFixed(2)), options);

  return `${formattedValue} ${units[unitIndex]}`;
}
