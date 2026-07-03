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

export const formatCurrentTime = (timezone: string) =>
  new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: timezone,
  }).format(new Date());

export const formatClockTime = (iso: string) => {
  const timePart = iso.split('T')[1] ?? '';
  const [hourStr, minuteStr = '00'] = timePart.split(':');
  const hour = Number(hourStr);
  const period = hour >= 12 ? 'PM' : 'AM';
  const hour12 = hour % 12 === 0 ? 12 : hour % 12;
  return `${hour12}:${minuteStr} ${period}`;
};

export const getDateKey = (isoDate: string, timezone: string) =>
  new Intl.DateTimeFormat('en-CA', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    timeZone: timezone,
  }).format(new Date(isoDate));
