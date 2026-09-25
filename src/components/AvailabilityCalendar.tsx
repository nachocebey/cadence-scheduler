'use client';

import { useEffect, useState } from 'react';

interface Slot {
  start: number;
  end: number;
  label: string;
}

interface AvailabilityCalendarProps {
  providerId: string;
  date: string;
}

export function AvailabilityCalendar({ providerId, date }: AvailabilityCalendarProps) {
  const [slots, setSlots] = useState<Slot[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setSlots(null);
    setError(null);

    fetch(`/api/availability?providerId=${providerId}&date=${date}`)
      .then((res) => {
        if (!res.ok) throw new Error('Could not load availability for this day.');
        return res.json();
      })
      .then((data: Slot[]) => {
        if (!cancelled) setSlots(data);
      })
      .catch((err: Error) => {
        if (!cancelled) setError(err.message);
      });

    return () => {
      cancelled = true;
    };
  }, [providerId, date]);

  if (error) {
    return <p className="text-sm text-red-600">{error}</p>;
  }

  if (!slots) {
    return <p className="text-sm text-gray-500">Loading availability…</p>;
  }

  if (slots.length === 0) {
    return <p className="text-sm text-gray-500">No open slots this day.</p>;
  }

  return (
    <ul className="grid grid-cols-3 gap-2">
      {slots.map((slot) => (
        <li key={slot.start}>
          <button
            type="button"
            className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm hover:border-gray-400"
          >
            {slot.label}
          </button>
        </li>
      ))}
    </ul>
  );
}
