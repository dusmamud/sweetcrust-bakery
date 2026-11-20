// Real mock order state (frontend only — no checkout, no payment).
// Kept in a .svelte.ts module so Header, product cards and /cart share one
// live cart. Prices in USD; free delivery over $35, flat $4.95 below.
// Lines carry the chosen options (size, flavour, cake message, gift note)
// and the basket carries one shared fulfilment slot (date + time).
// Round 3: the basket persists in localStorage (versioned key) so a reload
// no longer empties it, and promo codes discount the totals.
import { products } from '#lib/data/site.ts';
import { promo } from '#lib/promo.svelte.ts';

export type CartLine = {
	slug: string;
	name: string;
	price: number;
	image: string;
	option: string;
	qty: number;
	flavour?: string;
	message?: string;
	giftMessage?: string;
	giftRecipient?: string;
};

export type Fulfilment = { date: string; label: string; slot: string; method?: 'delivery' | 'pickup' } | null;

const CART_KEY = 'sweetcrust-cart-v1';

const lines = $state<CartLine[]>([]);
const fulfilment = $state<{ value: Fulfilment }>({ value: null });
// True when a non-empty basket was restored from storage on this visit —
// the layout shows a "Welcome back" banner for it (once per session).
export const cartMeta = $state({ restored: false, restoredDismissed: false });

function persist() {
	if (typeof window === 'undefined') return;
	try {
		window.localStorage.setItem(CART_KEY, JSON.stringify({ lines: $state.snapshot(lines), fulfilment: fulfilment.value }));
	} catch {
		// Storage full or blocked (private mode) — the in-memory cart still works.
	}
}

/** Load a saved basket (client only). Returns true if it had items. */
export function restoreCart(): boolean {
	if (typeof window === 'undefined') return false;
	try {
		const raw = window.localStorage.getItem(CART_KEY);
		if (!raw) return false;
		const parsed = JSON.parse(raw) as { lines?: CartLine[]; fulfilment?: Fulfilment };
		const saved = (parsed.lines ?? []).filter(
			(l) =>
				typeof l?.slug === 'string' &&
				typeof l?.qty === 'number' &&
				l.qty > 0 &&
				(products.some((p) => p.slug === l.slug) || l.slug.startsWith('addon-'))
		);
		if (saved.length === 0 && !parsed.fulfilment) return false;
		lines.splice(0, lines.length, ...saved);
		fulfilment.value = parsed.fulfilment ?? null;
		if (saved.length > 0) cartMeta.restored = true;
		return saved.length > 0;
	} catch {
		return false;
	}
}

export const cart = {
	get lines() {
		return lines;
	},
	get count() {
		return lines.reduce((a, l) => a + l.qty, 0);
	},
	get subtotal() {
		return lines.reduce((a, l) => a + l.qty * l.price, 0);
	},
	/** Promo discount on the subtotal (0 when no percent code is applied). */
	get discount() {
		const applied = promo.applied;
		if (!applied || applied.kind !== 'percent') return 0;
		return (this.subtotal * applied.value) / 100;
	},
	get delivery() {
		if (this.subtotal === 0) return 0;
		if (promo.applied?.kind === 'freeship') return 0;
		return this.subtotal - this.discount >= 35 ? 0 : 4.95;
	},
	get total() {
		return this.subtotal - this.discount + this.delivery;
	},
	/** Total for pickup (no delivery fee, promo still applies). */
	get pickupTotal() {
		return this.subtotal - this.discount;
	},
	get fulfilment(): Fulfilment {
		return fulfilment.value;
	}
};

export function setFulfilment(f: Fulfilment) {
	fulfilment.value = f;
	persist();
}

export function lineKey(l: Pick<CartLine, 'slug' | 'option' | 'flavour' | 'message'>): string {
	return `${l.slug}::${l.option}::${l.flavour ?? ''}::${l.message ?? ''}`;
}

export function addToCart(
	slug: string,
	option = '',
	qty = 1,
	extras: { flavour?: string; message?: string; giftMessage?: string; giftRecipient?: string; price?: number } = {}
) {
	const product = products.find((p) => p.slug === slug);
	if (!product) return;
	const key = lineKey({ slug, option, flavour: extras.flavour, message: extras.message });
	const line = lines.find((l) => lineKey(l) === key);
	if (line) line.qty += qty;
	// Unit price comes from the caller (product pages add size/flavour
	// deltas); fall back to the base price for plain add-to-cart buttons.
	else lines.push({ slug, name: product.name, image: product.image, option, qty, ...extras, price: extras.price ?? product.price });
	persist();
}

/** Add a bundle add-on (candles, card, gift wrap, coffee) as its own line. */
export function addAddon(addon: { slug: string; name: string; price: number; image: string }) {
	const line = lines.find((l) => l.slug === addon.slug);
	if (line) line.qty += 1;
	else lines.push({ slug: addon.slug, name: addon.name, price: addon.price, image: addon.image, option: 'Add-on', qty: 1 });
	persist();
}

export function setQty(slug: string, option: string, qty: number, flavour = '', message = '') {
	const key = `${slug}::${option}::${flavour}::${message}`;
	const line = lines.find((l) => lineKey(l) === key);
	if (!line) return;
	if (qty <= 0) lines.splice(lines.indexOf(line), 1);
	else line.qty = qty;
	persist();
}

export function removeLine(slug: string, option: string, flavour = '', message = '') {
	const key = `${slug}::${option}::${flavour}::${message}`;
	const i = lines.findIndex((l) => lineKey(l) === key);
	if (i >= 0) lines.splice(i, 1);
	persist();
}

export function clearCart() {
	lines.splice(0, lines.length);
	fulfilment.value = null;
	persist();
}
