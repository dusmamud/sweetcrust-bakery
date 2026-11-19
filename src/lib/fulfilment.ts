// Mock fulfilment logic — frontend only, no server, no real orders.
// Deterministic: the same date + slot always gives the same availability,
// so prerendered copy and client behaviour agree. "Now" is only read on
// the client (after mount) so prerendering stays stable.
import { deliveryZones, fulfilmentSlots, products, productExtras, type DeliveryZone } from '#lib/data/site.ts';

export const SAME_DAY_CUTOFF_HOUR = 13; // 1 PM
export const SLOT_CAPACITY = 20; // orders per slot (mock)

export function toISODate(d: Date): string {
	const y = d.getFullYear();
	const m = String(d.getMonth() + 1).padStart(2, '0');
	const day = String(d.getDate()).padStart(2, '0');
	return `${y}-${m}-${day}`;
}

export function formatDay(d: Date): string {
	return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}

// Small deterministic hash — drives the mock "booked" counts.
function hash(str: string): number {
	let h = 2166136261;
	for (let i = 0; i < str.length; i++) {
		h ^= str.charCodeAt(i);
		h = Math.imul(h, 16777619);
	}
	return Math.abs(h);
}

/** Booked orders (mock) for a date+slot, 0–19 of 20 capacity. */
export function bookedFor(dateISO: string, slot: string): number {
	return hash(`${dateISO}|${slot}`) % SLOT_CAPACITY;
}

export function slotAvailable(dateISO: string, slot: string): boolean {
	return bookedFor(dateISO, slot) < SLOT_CAPACITY;
}

/** Longest lead time (days) in the basket, from product extras. */
export function leadTimeForSlugs(slugs: string[]): number {
	let max = 0;
	for (const slug of slugs) {
		const extra = productExtras[slug];
		if (extra) max = Math.max(max, extra.leadTimeDays);
	}
	return max;
}

/** Earliest bookable date given lead time and the 1 PM same-day cut-off. */
export function earliestDate(leadDays: number, now: Date): Date {
	const d = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	if (leadDays === 0 && now.getHours() < SAME_DAY_CUTOFF_HOUR) {
		// same day is possible — unless today is Sunday (closed)
	} else {
		d.setDate(d.getDate() + Math.max(1, leadDays));
	}
	// Skip Sundays (closed).
	while (d.getDay() === 0) d.setDate(d.getDate() + 1);
	return d;
}

export type DaySlots = { date: Date; iso: string; label: string; slots: { slot: string; left: number; available: boolean }[] };

/** Next `count` bookable days (skipping Sundays) with per-slot availability. */
export function nextDays(leadDays: number, now: Date, count = 7): DaySlots[] {
	const out: DaySlots[] = [];
	let d = earliestDate(leadDays, now);
	while (out.length < count) {
		if (d.getDay() !== 0) {
			const iso = toISODate(d);
			out.push({
				date: new Date(d),
				iso,
				label: formatDay(d),
				slots: fulfilmentSlots.map((slot) => {
					const left = SLOT_CAPACITY - bookedFor(iso, slot);
					return { slot, left, available: left > 0 };
				})
			});
		}
		d.setDate(d.getDate() + 1);
	}
	return out;
}

/** ZIP checker (mock): first 3 digits decide the zone. */
export function checkZip(zip: string): { ok: boolean; zone?: DeliveryZone; message: string } {
	const clean = zip.trim().replace(/[^0-9]/g, '');
	if (clean.length < 5) return { ok: false, message: 'Enter a 5-digit ZIP code, e.g. 10001.' };
	const prefix = clean.slice(0, 3);
	const zone = deliveryZones.find((z) => z.prefixes.includes(prefix));
	if (!zone) {
		return {
			ok: false,
			message: `We don’t deliver to ${clean} yet — but pickup from 123 Baker Street is always available, and we hold orders for 2 hours past your slot.`
		};
	}
	return {
		ok: true,
		zone,
		message: `Yes — we deliver to ${zone.area} (ZIP ${clean}). Delivery $${zone.fee.toFixed(2)}${zone.min > 0 ? `, free over $${zone.min}` : ', free over $35'} · ${zone.note}.`
	};
}

export function productLeadTime(slug: string): number {
	return productExtras[slug]?.leadTimeDays ?? 0;
}

export function productName(slug: string): string {
	return products.find((p) => p.slug === slug)?.name ?? slug;
}
