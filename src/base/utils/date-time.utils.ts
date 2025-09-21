const ONE_SECOND_IN_MS = 1000;
const ONE_MINUTE_IN_MS = 60000;
const ONE_HOUR_IN_MS = 3.6e6;
const ONE_DAY_IN_MS = 8.64e7;
const ONE_WEEK_IN_MS = 6.048e8;
const ONE_MONTH_IN_MS = 2.628e9;
const ONE_YEAR_IN_MS = 3.154e10;

export function formatRelativeTime(date: Date, locales?: Intl.LocalesArgument) {
  const relativeTimeInMs = Math.round(date.getTime() - Date.now());

  let unit: Intl.RelativeTimeFormatUnit = 'seconds';
  let smallestRelativeTime = relativeTimeInMs;

  if (Math.abs(Math.trunc(relativeTimeInMs / ONE_SECOND_IN_MS)) > 0) {
    smallestRelativeTime = Math.trunc(relativeTimeInMs / ONE_SECOND_IN_MS);
    unit = 'seconds';
  }

  if (Math.abs(Math.trunc(relativeTimeInMs / ONE_MINUTE_IN_MS)) > 0) {
    smallestRelativeTime = Math.trunc(relativeTimeInMs / ONE_MINUTE_IN_MS);
    unit = 'minutes';
  }

  if (Math.abs(Math.trunc(relativeTimeInMs / ONE_HOUR_IN_MS)) > 0) {
    smallestRelativeTime = Math.trunc(relativeTimeInMs / ONE_HOUR_IN_MS);
    unit = 'hours';
  }

  if (Math.abs(Math.trunc(relativeTimeInMs / ONE_DAY_IN_MS)) > 0) {
    smallestRelativeTime = Math.trunc(relativeTimeInMs / ONE_DAY_IN_MS);
    unit = 'days';
  }

  if (Math.abs(Math.trunc(relativeTimeInMs / ONE_WEEK_IN_MS)) > 0) {
    smallestRelativeTime = Math.trunc(relativeTimeInMs / ONE_WEEK_IN_MS);
    unit = 'weeks';
  }

  if (Math.abs(Math.trunc(relativeTimeInMs / ONE_MONTH_IN_MS)) > 0) {
    smallestRelativeTime = Math.trunc(relativeTimeInMs / ONE_MONTH_IN_MS);
    unit = 'months';
  }

  if (Math.abs(Math.trunc(relativeTimeInMs / ONE_YEAR_IN_MS)) > 0) {
    smallestRelativeTime = Math.trunc(relativeTimeInMs / ONE_YEAR_IN_MS);
    unit = 'years';
  }

  return new Intl.RelativeTimeFormat(locales, { style: 'long' }).format(smallestRelativeTime, unit);
}
