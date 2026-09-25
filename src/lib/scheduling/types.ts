/** A span of time expressed as minutes elapsed since midnight (0-1439). */
export interface TimeRange {
  start: number;
  end: number;
}

export type WorkingHours = TimeRange;

export interface Booking extends TimeRange {
  id: string;
  clientName: string;
}
