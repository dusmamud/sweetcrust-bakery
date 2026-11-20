<script lang="ts">
	import { Check, Heart, ShoppingBag } from '@lucide/svelte';
	import type { Product } from '#lib/data/site.ts';
	import { usd } from '#lib/data/site.ts';
	import { addToCart } from '#lib/cart.svelte.ts';
	import { toggleWishlist, wishlist } from '#lib/wishlist.svelte.ts';
	import Picture from './Picture.svelte';
	import Stars from './Stars.svelte';

	let { product }: { product: Product } = $props();
	let added = $state(false);

	function onAdd() {
		addToCart(product.slug);
		added = true;
		window.setTimeout(() => (added = false), 1500);
	}
</script>

<article class="group flex flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-line transition-shadow duration-200 hover:shadow-[0_8px_30px_rgba(74,44,26,0.10)]">
	<a href="/product/{product.slug}" class="relative block bg-sand" aria-label={product.name}>
		<Picture
			name={product.image}
			alt={product.imageAlt}
			width={800}
			height={533}
			sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
			imgClass="aspect-[3/2] w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
		/>
		{#if product.badge}
			<span class="absolute top-3 left-3 rounded-full bg-choco px-3 py-1 text-xs font-bold tracking-wide text-white uppercase">
				{product.badge}
			</span>
		{/if}
		<button
			type="button"
			onclick={(e) => {
				e.preventDefault();
				toggleWishlist(product.slug);
			}}
			aria-pressed={wishlist.has(product.slug)}
			aria-label={wishlist.has(product.slug) ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
			class="absolute top-3 right-3 flex h-11 w-11 items-center justify-center rounded-full bg-white/95 shadow ring-1 ring-line transition-colors duration-150 {wishlist.has(product.slug) ? 'text-choco' : 'text-muted hover:text-choco'}"
		>
			<Heart size={19} aria-hidden="true" fill={wishlist.has(product.slug) ? 'currentColor' : 'none'} />
		</button>
	</a>
	<div class="flex flex-1 flex-col gap-2 p-4 sm:p-5">
		<a href="/product/{product.slug}" class="min-w-0 font-display text-lg leading-snug font-medium text-ink hover:text-choco">
			{product.name}
		</a>
		<Stars rating={product.rating} reviews={product.reviews} />
		<p class="flex items-baseline gap-2">
			<span class="text-lg font-bold text-ink">{usd(product.price)}</span>
			{#if product.compareAt}
				<span class="text-sm text-muted line-through">{usd(product.compareAt)}</span>
			{/if}
			<span class="ml-auto text-xs text-muted">{product.serves}</span>
		</p>
		<button
			type="button"
			onclick={onAdd}
			class="mt-auto flex min-h-12 items-center justify-center gap-2 rounded-full bg-choco text-sm font-bold tracking-wide text-white uppercase transition-colors duration-200 hover:bg-choco-deep {added
				? 'bg-choco-light'
				: ''}"
			aria-live="polite"
		>
			{#if added}
				<Check size={17} aria-hidden="true" /> Added to basket
			{:else}
				<ShoppingBag size={17} aria-hidden="true" /> Add to cart
			{/if}
		</button>
	</div>
</article>
