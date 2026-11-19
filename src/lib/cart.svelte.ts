// Real mock order state (frontend only — no checkout, no payment).
// Kept in a .svelte.ts module so Header, product cards and /cart share one
// live cart. Prices in USD; free delivery over $35, flat $4.95 below.
// Lines carry the chosen options (size, flavour, cake message, gift note)
// and the basket carries one shared fulfilment slot (date + time).
import { products } from '#lib/data/site.ts';

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

const lines = $state<CartLine[]>([]);
const fulfilment = $state<{ value: Fulfilment }>({ value: null });

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
	get delivery() {
		if (this.subtotal === 0) return 0;
		return this.subtotal >= 35 ? 0 : 4.95;
	},
	get total() {
		return this.subtotal + this.delivery;
	},
	get fulfilment(): Fulfilment {
		return fulfilment.value;
	}
};

export function setFulfilment(f: Fulfilment) {
	fulfilment.value = f;
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
}

export function setQty(slug: string, option: string, qty: number, flavour = '', message = '') {
	const key = `${slug}::${option}::${flavour}::${message}`;
	const line = lines.find((l) => lineKey(l) === key);
	if (!line) return;
	if (qty <= 0) lines.splice(lines.indexOf(line), 1);
	else line.qty = qty;
}

export function removeLine(slug: string, option: string, flavour = '', message = '') {
	const key = `${slug}::${option}::${flavour}::${message}`;
	const i = lines.findIndex((l) => lineKey(l) === key);
	if (i >= 0) lines.splice(i, 1);
}

export function clearCart() {
	lines.splice(0, lines.length);
}
