// Times are represented as minutes-since-midnight integers throughout the
// scheduling code rather than Date objects, so slot math never has to think
// about timezones or DST. Conversion to/from human-readable strings happens
// only at the edges (here).

export function parseTimeToMinutes(time: string): number {
  const [hoursStr, minutesStr] = time.split(':');
  const hours = Number(hoursStr);
  const minutes = Number(minutesStr);

  if (Number.isNaN(hours) || Number.isNaN(minutes)) {
    throw new Error(`Invalid time string: "${time}"`);
  }

  return hours * 60 + minutes;
}

export function minutesToTimeLabel(totalMinutes: number): string {
  const hours24 = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const period = hours24 >= 12 ? 'PM' : 'AM';
  const hours12 = hours24 % 12 === 0 ? 12 : hours24 % 12;

  return `${hours12}:${minutes.toString().padStart(2, '0')} ${period}`;
}
