// Promo / coupon codes (mock). Codes are validated against the mock list
// in site.ts — no server, no real discounts. Applied code persists so a
// reload does not lose it; ?promo=CODE auto-applies from a link.
import { promoCodes, type PromoCode } from '#lib/data/site.ts';

const PROMO_KEY = 'sweetcrust-promo-v1';

const state = $state<{ code: string | null; error: string | null }>({ code: null, error: null });

export const promo = {
	get applied(): PromoCode | null {
		return promoCodes.find((p) => p.code === state.code) ?? null;
	},
	get code() {
		return state.code;
	},
	get error() {
		return state.error;
	}
};

export function applyPromo(input: string): boolean {
	const code = input.trim().toUpperCase();
	const found = promoCodes.find((p) => p.code === code);
	if (!found) {
		state.error = `“${input.trim()}” is not a valid code. Try WELCOME10 for 10% off your first order.`;
		return false;
	}
	state.code = found.code;
	state.error = null;
	savePromo();
	return true;
}

export function clearPromo() {
	state.code = null;
	state.error = null;
	savePromo();
}

function savePromo() {
	if (typeof window === 'undefined') return;
	try {
		if (state.code) window.localStorage.setItem(PROMO_KEY, state.code);
		else window.localStorage.removeItem(PROMO_KEY);
	} catch {
		// Storage blocked — the in-memory code still works for this visit.
	}
}

export function restorePromo() {
	if (typeof window === 'undefined') return;
	try {
		const code = window.localStorage.getItem(PROMO_KEY);
		if (code && promoCodes.some((p) => p.code === code)) state.code = code;
	} catch {
		// Ignore.
	}
}
