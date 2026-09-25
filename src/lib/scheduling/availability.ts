import { Booking, TimeRange, WorkingHours } from './types';
import { generateDailySlots } from './slots';
import { getBlockedRanges, isSlotAvailable } from './conflicts';

export interface AvailabilityOptions {
  workingHours: WorkingHours;
  existingBookings: Booking[];
  slotDurationMinutes: number;
  bufferMinutes: number;
}

export function getAvailableSlots(options: AvailabilityOptions): TimeRange[] {
  const { workingHours, existingBookings, slotDurationMinutes, bufferMinutes } = options;

  const candidateSlots = generateDailySlots(workingHours, slotDurationMinutes);
  const blockedRanges = getBlockedRanges(existingBookings, bufferMinutes);

  return candidateSlots.filter((slot) => isSlotAvailable(slot, blockedRanges));
}
