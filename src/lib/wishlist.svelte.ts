// Wishlist state (frontend only, mock). Shared by Header and ProductCard.
const items = $state<string[]>([]);

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
}
