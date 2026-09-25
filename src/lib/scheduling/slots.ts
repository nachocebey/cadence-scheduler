import { TimeRange, WorkingHours } from './types';

/**
 * Lays out every candidate slot within a provider's working hours for a
 * single day, back-to-back starting at the open time. This does not take
 * existing bookings into account — see conflicts.ts for that.
 */
export function generateDailySlots(
  workingHours: WorkingHours,
  slotDurationMinutes: number
): TimeRange[] {
  if (slotDurationMinutes <= 0) {
    throw new Error('slotDurationMinutes must be positive');
  }

  const slots: TimeRange[] = [];

  for (
    let start = workingHours.start;
    start + slotDurationMinutes < workingHours.end;
    start += slotDurationMinutes
  ) {
    slots.push({ start, end: start + slotDurationMinutes });
  }

  return slots;
}
