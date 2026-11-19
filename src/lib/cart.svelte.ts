// Real mock order state (frontend only — no checkout, no payment).
// Kept in a .svelte.ts module so Header, product cards and /cart share one
// live cart. Prices in USD; free delivery over $35, flat $4.95 below.
import { products } from '#lib/data/site.ts';

export type CartLine = { slug: string; name: string; price: number; image: string; option: string; qty: number };

const lines = $state<CartLine[]>([]);

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
	}
};

export function addToCart(slug: string, option = '', qty = 1) {
	const product = products.find((p) => p.slug === slug);
	if (!product) return;
	const key = `${slug}::${option}`;
	const line = lines.find((l) => `${l.slug}::${l.option}` === key);
	if (line) line.qty += qty;
	else lines.push({ slug, name: product.name, price: product.price, image: product.image, option, qty });
}

export function setQty(slug: string, option: string, qty: number) {
	const line = lines.find((l) => l.slug === slug && l.option === option);
	if (!line) return;
	if (qty <= 0) lines.splice(lines.indexOf(line), 1);
	else line.qty = qty;
}

export function removeLine(slug: string, option: string) {
	const i = lines.findIndex((l) => l.slug === slug && l.option === option);
	if (i >= 0) lines.splice(i, 1);
}

export function clearCart() {
	lines.splice(0, lines.length);
}
