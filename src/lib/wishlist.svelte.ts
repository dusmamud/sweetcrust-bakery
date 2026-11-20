// Wishlist state (frontend only, mock). Shared by Header and ProductCard.
// Round 3: persisted in localStorage so favourites survive a reload.
import { products } from '#lib/data/site.ts';

const WISHLIST_KEY = 'sweetcrust-wishlist-v1';

const items = $state<string[]>([]);

function persist() {
	if (typeof window === 'undefined') return;
	try {
		window.localStorage.setItem(WISHLIST_KEY, JSON.stringify($state.snapshot(items)));
	} catch {
		// Storage blocked — the in-memory list still works for this visit.
	}
}

export function restoreWishlist() {
	if (typeof window === 'undefined') return;
	try {
		const raw = window.localStorage.getItem(WISHLIST_KEY);
		if (!raw) return;
		const saved = (JSON.parse(raw) as string[]).filter((s) => products.some((p) => p.slug === s));
		items.splice(0, items.length, ...saved);
	} catch {
		// Ignore corrupt storage.
	}
}

export const wishlist = {
	get items() {
		return items;
	},
	get count() {
		return items.length;
	},
	has(slug: string) {
		return items.includes(slug);
	}
};

export function toggleWishlist(slug: string) {
	const i = items.indexOf(slug);
	if (i >= 0) items.splice(i, 1);
	else items.push(slug);
	persist();
}

export function removeWishlist(slug: string) {
	const i = items.indexOf(slug);
	if (i >= 0) items.splice(i, 1);
	persist();
}
