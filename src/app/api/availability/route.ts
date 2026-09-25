import { NextRequest, NextResponse } from 'next/server';
import { getProviderById } from '@/data/providers';
import { getAvailableSlots } from '@/lib/scheduling/availability';
import { minutesToTimeLabel } from '@/lib/scheduling/time';

export async function GET(request: NextRequest) {
  const providerId = request.nextUrl.searchParams.get('providerId');
  const date = request.nextUrl.searchParams.get('date');

  if (!providerId || !date) {
    return NextResponse.json({ error: 'providerId and date are required' }, { status: 400 });
  }

  const provider = getProviderById(providerId);
  if (!provider) {
    return NextResponse.json({ error: 'Unknown provider' }, { status: 404 });
  }

  const existingBookings = provider.bookingsByDate[date] ?? [];

  const slots = getAvailableSlots({
    workingHours: provider.workingHours,
    existingBookings,
    slotDurationMinutes: provider.slotDurationMinutes,
    bufferMinutes: provider.bufferMinutes,
  });

  return NextResponse.json(
    slots.map((slot) => ({
      start: slot.start,
      end: slot.end,
      label: minutesToTimeLabel(slot.start),
    }))
  );
}
