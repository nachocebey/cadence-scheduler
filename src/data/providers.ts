import { Booking, WorkingHours } from '@/lib/scheduling/types';
import { parseTimeToMinutes } from '@/lib/scheduling/time';

interface ProviderRecord {
  id: string;
  name: string;
  workingHours: WorkingHours;
  slotDurationMinutes: number;
  bufferMinutes: number;
  bookingsByDate: Record<string, Booking[]>;
}

// Mock data store standing in for the providers/bookings tables until the
// Postgres migration lands (see TODO in db/README).
const providers: ProviderRecord[] = [
  {
    id: 'jane-doe',
    name: 'Jane Doe, Licensed Esthetician',
    workingHours: {
      start: parseTimeToMinutes('09:00'),
      end: parseTimeToMinutes('17:00'),
    },
    slotDurationMinutes: 30,
    bufferMinutes: 15,
    bookingsByDate: {
      '2026-10-01': [
        { id: 'b1', clientName: 'Priya S.', start: parseTimeToMinutes('10:00'), end: parseTimeToMinutes('11:00') },
        { id: 'b2', clientName: 'Marcus L.', start: parseTimeToMinutes('13:00'), end: parseTimeToMinutes('13:30') },
      ],
    },
  },
  {
    id: 'sam-okafor',
    name: 'Sam Okafor, Financial Coach',
    workingHours: {
      start: parseTimeToMinutes('08:00'),
      end: parseTimeToMinutes('12:00'),
    },
    slotDurationMinutes: 45,
    bufferMinutes: 0,
    bookingsByDate: {},
  },
];

export function getProviderById(id: string): ProviderRecord | undefined {
  return providers.find((provider) => provider.id === id);
}
