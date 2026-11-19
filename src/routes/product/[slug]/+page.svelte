<script lang="ts">
	import { Check, Clock, Minus, Plus, ShoppingBag, Truck } from '@lucide/svelte';
	import { products, usd } from '#lib/data/site.ts';
	import { addToCart } from '#lib/cart.svelte.ts';
	import Picture from '#lib/components/Picture.svelte';
	import ProductCard from '#lib/components/ProductCard.svelte';
	import Stars from '#lib/components/Stars.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	const product = $derived(data.product);
	const related = $derived(data.related);

	let sizeIdx = $state(0);
	const size = $derived(product.sizes[sizeIdx]);
	let qty = $state(1);
	let added = $state(false);
	let note = $state('');

	function onAdd() {
		addToCart(product.slug, size, qty);
		added = true;
		window.setTimeout(() => (added = false), 1800);
	}

	const jsonLd = $derived({
		'@context': 'https://schema.org',
		'@type': 'Product',
		name: product.name,
		description: product.description,
		image: `https://sweetcrustbakery.com/images/${product.image}-800.jpg`,
		offers: { '@type': 'Offer', price: product.price, priceCurrency: 'USD', availability: 'https://schema.org/InStock' }
	});
</script>

<svelte:head>
	<title>{product.name} — SweetCrust Bakery &amp; Cafe</title>
	<meta name="description" content={product.description} />
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`}
</svelte:head>

<section class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
	<nav aria-label="Breadcrumb" class="text-sm text-muted">
		<a href="/" class="hover:text-choco">Home</a> &nbsp;/&nbsp;
		<a href="/shop" class="hover:text-choco">Our Products</a> &nbsp;/&nbsp;
		<span class="font-semibold text-ink">{product.name}</span>
	</nav>

	<div class="mt-6 grid gap-10 lg:grid-cols-2">
		<div class="h-fit overflow-hidden rounded-3xl bg-sand ring-1 ring-line">
			<Picture
				name={product.image}
				alt={product.imageAlt}
				width={1200}
				height={800}
				eager
				sizes="(min-width: 1024px) 50vw, 100vw"
				imgClass="aspect-[3/2] w-full object-cover"
			/>
		</div>

		<div>
			{#if product.badge}<span class="inline-block rounded-full bg-choco px-3 py-1 text-xs font-bold tracking-wide text-white uppercase">{product.badge}</span>{/if}
			<h1 class="mt-3 font-display text-4xl leading-tight font-semibold text-choco">{product.name}</h1>
			<div class="mt-3 flex flex-wrap items-center gap-3">
				<Stars rating={product.rating} reviews={product.reviews} />
				<span class="text-sm text-muted">· {product.serves}</span>
			</div>
			<p class="mt-4 text-3xl font-bold text-ink">{usd(product.price)}</p>
			<p class="mt-4 leading-relaxed text-muted">{product.description}</p>
			{#each product.long as para}
				<p class="mt-3 leading-relaxed text-muted">{para}</p>
			{/each}

			{#if product.dietary.length > 0}
				<div class="mt-4 flex flex-wrap gap-2">
					{#each product.dietary as d}
						<span class="rounded-full bg-choco-soft px-3 py-1.5 text-xs font-bold text-choco uppercase">{d}</span>
					{/each}
				</div>
			{/if}

			<div class="mt-6">
				<label for="size" class="text-sm font-bold text-ink">Size</label>
				<div class="mt-2 flex flex-wrap gap-2" role="group" aria-label="Choose a size">
					{#each product.sizes as s, i}
						<button
							type="button"
							onclick={() => (sizeIdx = i)}
							aria-pressed={sizeIdx === i}
							class="flex min-h-12 items-center rounded-full border px-5 text-sm font-semibold transition-colors duration-150 {size === s
								? 'border-choco bg-choco text-white'
								: 'border-line bg-white text-ink hover:bg-cream-deep'}"
						>
							{s}
						</button>
					{/each}
				</div>
			</div>

			<div class="mt-5">
				<label for="note" class="text-sm font-bold text-ink">Message on the cake (optional)</label>
				<input
					id="note"
					type="text"
					bind:value={note}
					maxlength={60}
					placeholder="e.g. Happy Birthday, Maya!"
					class="mt-2 min-h-12 w-full rounded-full border border-line bg-white px-5 text-base text-ink placeholder:text-muted"
				/>
			</div>

			<div class="mt-6 flex flex-wrap items-center gap-3">
				<div class="flex items-center rounded-full border border-line bg-white" role="group" aria-label="Quantity">
					<button type="button" onclick={() => (qty = Math.max(1, qty - 1))} aria-label="One less" class="flex h-12 w-12 items-center justify-center rounded-full text-ink">
						<Minus size={17} aria-hidden="true" />
					</button>
					<span class="w-8 text-center font-bold" aria-label={`${qty} in basket`}>{qty}</span>
					<button type="button" onclick={() => (qty = Math.min(9, qty + 1))} aria-label="One more" class="flex h-12 w-12 items-center justify-center rounded-full text-ink">
						<Plus size={17} aria-hidden="true" />
					</button>
				</div>
				<button
					type="button"
					onclick={onAdd}
					class="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full bg-choco px-7 text-sm font-bold text-white uppercase transition-colors duration-200 hover:bg-choco-deep sm:flex-none sm:px-10"
					aria-live="polite"
				>
					{#if added}
						<Check size={18} aria-hidden="true" /> Added to basket
					{:else}
						<ShoppingBag size={18} aria-hidden="true" /> Add to cart · {usd(product.price * qty)}
					{/if}
				</button>
			</div>

			<ul class="mt-6 space-y-2 text-sm text-muted">
				<li class="flex items-center gap-2"><Truck size={17} aria-hidden="true" class="shrink-0 text-caramel" /> Free delivery over $35 · $4.95 below · Delivered in insulated boxes</li>
				<li class="flex items-center gap-2"><Clock size={17} aria-hidden="true" class="shrink-0 text-caramel" /> Order by 2 PM for next-day pickup or delivery</li>
			</ul>

			<div class="mt-8 rounded-2xl bg-cream-deep p-5 ring-1 ring-line">
				<h2 class="font-display text-xl font-semibold text-choco">What’s inside</h2>
				<ul class="mt-3 space-y-1.5 text-sm text-muted">
					{#each product.ingredients as ing}
						<li class="flex gap-2"><span aria-hidden="true">•</span> {ing}</li>
					{/each}
				</ul>
			</div>
		</div>
	</div>

	{#if related.length > 0}
		<div class="mt-16">
			<h2 class="font-display text-3xl font-semibold text-choco">You may also like</h2>
			<div class="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
				{#each related as p}
					<ProductCard product={p} />
				{/each}
			</div>
		</div>
	{/if}
</section>
