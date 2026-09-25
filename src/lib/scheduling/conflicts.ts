import { Booking, TimeRange } from './types';

export function rangesOverlap(a: TimeRange, b: TimeRange): boolean {
  return a.start < b.end && b.start < a.end;
}

/**
 * Expands each existing booking into a "blocked" range that accounts for
 * the provider's required buffer between appointments, so a newly booked
 * slot always leaves the configured gap on either side of a booking.
 */
export function getBlockedRanges(bookings: Booking[], bufferMinutes: number): TimeRange[] {
  return bookings.map((booking) => ({
    start: booking.start - bufferMinutes,
    end: booking.end,
  }));
}

export function isSlotAvailable(candidate: TimeRange, blockedRanges: TimeRange[]): boolean {
  return !blockedRanges.some((blocked) => rangesOverlap(candidate, blocked));
}
