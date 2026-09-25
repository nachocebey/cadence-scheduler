# Cadence

Booking pages for independent service providers — clients pick an open slot
on a provider's calendar and book it directly, no back-and-forth email.

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind for styling
- Vitest for tests

## Getting started

```bash
npm install
npm run dev
```

The app runs at `http://localhost:3000`. There's a single demo booking page
wired up to the `jane-doe` provider (see `src/data/providers.ts` for the mock
data — there's no database yet, everything is in-memory).

## Running tests

```bash
npm test
```

## How availability is computed

The core logic lives in `src/lib/scheduling/`:

- `slots.ts` lays out every candidate slot within a provider's working hours.
- `conflicts.ts` expands existing bookings into "blocked" ranges (accounting
  for the provider's buffer setting) and checks a candidate slot against them.
- `availability.ts` combines the two into the list of bookable slots for a
  given day.

Everything is expressed as minutes-since-midnight integers rather than `Date`
objects, so this logic never has to reason about timezones or DST — that
conversion only happens at the edges (`time.ts`) when we render a label or
parse a provider's configured hours.

`src/app/api/availability/route.ts` is the only consumer right now; it looks
up a provider's mock bookings for a given date and returns the open slots.

## TODO

- Swap the mock provider/booking data for a real database (Postgres +
  Prisma, probably).
- Provider + date picker on the booking page instead of the hardcoded demo.
- Recurring availability (e.g. "every Tuesday 9-5") instead of one-off
  working-hours windows per provider.
