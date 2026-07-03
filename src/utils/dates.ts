export const formatLongDate = (isoDate: string, timezone: string) =>
  new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: timezone,
  }).format(new Date(isoDate));

export const formatDayShort = (isoDate: string, timezone: string) =>
  new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    timeZone: timezone,
  }).format(new Date(isoDate));

export const formatDayLong = (isoDate: string, timezone: string) =>
  new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    timeZone: timezone,
  }).format(new Date(isoDate));

export const formatHour = (isoDate: string, timezone: string) =>
  new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    timeZone: timezone,
  }).format(new Date(isoDate));

export const getDateKey = (isoDate: string, timezone: string) =>
  new Intl.DateTimeFormat('en-CA', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    timeZone: timezone,
  }).format(new Date(isoDate));
