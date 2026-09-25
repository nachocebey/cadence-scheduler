import { AvailabilityCalendar } from '@/components/AvailabilityCalendar';

// TODO: replace with a real date/provider picker once the booking flow
// design is finalized. Hardcoding the demo provider for now.
const DEMO_PROVIDER_ID = 'jane-doe';
const DEMO_DATE = '2026-10-01';

export default function HomePage() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-12">
      <h1 className="text-2xl font-semibold">Book a time with Jane Doe</h1>
      <p className="mt-1 text-sm text-gray-500">Licensed Esthetician &middot; 45 min consultations</p>

      <section className="mt-8">
        <h2 className="text-sm font-medium text-gray-700">Thursday, October 1</h2>
        <div className="mt-3">
          <AvailabilityCalendar providerId={DEMO_PROVIDER_ID} date={DEMO_DATE} />
        </div>
      </section>
    </main>
  );
}
