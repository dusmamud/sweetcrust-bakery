<script lang="ts">
	import { page } from '$app/state';
	import autoAnimate from '@formkit/auto-animate';
	import { categories, products, site, usd, type Dietary } from '#lib/data/site.ts';
	import ProductCard from '#lib/components/ProductCard.svelte';
	import PageHero from '#lib/components/PageHero.svelte';

	// CollectionPage + ItemList for the catalogue (all 12 products).
	const collectionLd = {
		'@context': 'https://schema.org',
		'@type': 'CollectionPage',
		name: 'Our Products — SweetCrust Bakery & Cafe',
		url: `${site.url}/shop`,
		mainEntity: {
			'@type': 'ItemList',
			numberOfItems: products.length,
			itemListElement: products.map((p, i) => ({
				'@type': 'ListItem',
				position: i + 1,
				url: `${site.url}/product/${p.slug}`,
				name: p.name
			}))
		}
	};

	const dietaryOptions: { id: Dietary; label: string }[] = [
		{ id: 'eggless', label: 'Eggless' },
		{ id: 'gluten-free', label: 'Gluten-free' },
		{ id: 'vegan', label: 'Vegan' }
	];

	// searchParams are unavailable during prerender — fall back to empty
	// params there; the client hydrates with the real query string.
	const params = $derived(typeof window !== 'undefined' ? page.url.searchParams : new URLSearchParams());
	const category = $derived(params.get('category') ?? 'all');
	const qRaw = $derived(params.get('q') ?? '');
	const q = $derived(qRaw.trim().toLowerCase());
	const sort = $derived(params.get('sort') ?? 'featured');
	const dietary = $derived((params.get('dietary') ?? '') as Dietary | '');

	const filtered = $derived.by(() => {
		let list = [...products];
		if (category !== 'all') list = list.filter((p) => p.category === category);
		if (q) list = list.filter((p) => `${p.name} ${p.description} ${p.category}`.toLowerCase().includes(q));
		if (dietary) list = list.filter((p) => p.dietary.includes(dietary));
		if (sort === 'price-asc') list.sort((a, b) => a.price - b.price);
		if (sort === 'price-desc') list.sort((a, b) => b.price - a.price);
		if (sort === 'rating') list.sort((a, b) => b.rating - a.rating);
		if (sort === 'name') list.sort((a, b) => a.name.localeCompare(b.name));
		return list;
	});

	function hrefWith(patch: Record<string, string | null>) {
		const params = new URLSearchParams(typeof window !== 'undefined' ? page.url.searchParams.toString() : '');
		for (const [k, v] of Object.entries(patch)) {
			if (v === null || v === '') params.delete(k);
			else params.set(k, v);
		}
		const s = params.toString();
		return s ? `/shop?${s}` : '/shop';
	}
</script>

<svelte:head>
	<title>Our Products — SweetCrust Bakery &amp; Cafe</title>
	<meta name="description" content="Shop cakes, cupcakes, pastries, bread and cookies at SweetCrust Bakery. Filter by category, dietary needs and price — fresh from our New York bakery." />
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html `<script type="application/ld+json">${JSON.stringify(collectionLd)}</script>`}
</svelte:head>

<PageHero title="Our Products" eyebrow="Fresh from the oven" intro="Cakes, cupcakes, pastries, bread and cookies — baked fresh every morning in small batches. Filter by category or dietary needs to find your favourite." />

<section class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
	<!-- Filters -->
	<div class="flex flex-col gap-4 rounded-3xl bg-white p-4 ring-1 ring-line sm:p-5 lg:flex-row lg:items-center lg:justify-between">
		<div class="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
			<a href={hrefWith({ category: null })} aria-current={category === 'all' ? 'true' : undefined} class="flex min-h-12 items-center rounded-full px-5 text-sm font-bold transition-colors duration-150 {category === 'all' ? 'bg-choco text-white' : 'bg-cream-deep text-ink hover:bg-sand'}">All</a>
			{#each categories.filter((c) => c.id !== 'custom') as cat}
				<a href={hrefWith({ category: cat.id })} aria-current={category === cat.id ? 'true' : undefined} class="flex min-h-12 items-center rounded-full px-5 text-sm font-bold transition-colors duration-150 {category === cat.id ? 'bg-choco text-white' : 'bg-cream-deep text-ink hover:bg-sand'}">{cat.name}</a>
			{/each}
		</div>
		<div class="flex flex-wrap items-center gap-3">
			<div class="flex flex-wrap gap-2" role="group" aria-label="Filter by dietary need">
				{#each dietaryOptions as opt}
					<a href={hrefWith({ dietary: dietary === opt.id ? null : opt.id })} aria-current={dietary === opt.id ? 'true' : undefined} class="flex min-h-11 items-center rounded-full border px-4 text-xs font-bold transition-colors duration-150 {dietary === opt.id ? 'border-choco bg-choco text-white' : 'border-line bg-white text-ink hover:bg-cream-deep'}">{opt.label}</a>
				{/each}
			</div>
			<label class="flex items-center gap-2 text-sm font-semibold text-ink">
				Sort
				<select
					onchange={(e) => {
						const v = (e.currentTarget as HTMLSelectElement).value;
						window.location.href = hrefWith({ sort: v === 'featured' ? null : v });
					}}
					class="min-h-12 rounded-full border border-line bg-white px-4 text-sm font-medium text-ink"
					aria-label="Sort products"
				>
					<option value="featured" selected={sort === 'featured'}>Featured</option>
					<option value="price-asc" selected={sort === 'price-asc'}>Price: low to high</option>
					<option value="price-desc" selected={sort === 'price-desc'}>Price: high to low</option>
					<option value="rating" selected={sort === 'rating'}>Top rated</option>
					<option value="name" selected={sort === 'name'}>Name A–Z</option>
				</select>
			</label>
		</div>
	</div>

	{#if q}
		<p class="mt-6 text-muted">Showing results for “<span class="font-semibold text-ink">{qRaw}</span>” — {filtered.length} treat{filtered.length === 1 ? '' : 's'} found.</p>
	{:else}
		<p class="mt-6 text-muted">{filtered.length} treat{filtered.length === 1 ? '' : 's'} · Free delivery over {usd(35)}</p>
	{/if}

	{#if filtered.length === 0}
		<div class="mt-8 rounded-3xl bg-white p-10 text-center ring-1 ring-line">
			<p class="font-display text-3xl text-choco">Nothing sweet matched that</p>
			<p class="mx-auto mt-3 max-w-md text-muted">Try a different search or category — or ask us for a custom bake instead.</p>
			<a href="/shop" class="mt-6 inline-flex min-h-12 items-center rounded-full bg-choco px-7 text-sm font-bold text-white uppercase">Clear filters</a>
		</div>
	{:else}
		<!-- auto-animate FLIP: filtered/sorted products glide, never jump. -->
		<div class="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" use:autoAnimate>
			{#each filtered as product (product.slug)}
				<ProductCard {product} />
			{/each}
		</div>
	{/if}

	<div class="mt-10 rounded-3xl bg-cream-deep p-6 text-center ring-1 ring-line sm:p-8">
		<p class="font-display text-2xl font-semibold text-choco">Looking for something truly yours?</p>
		<p class="mx-auto mt-2 max-w-lg text-muted">Custom cakes for birthdays, weddings and anniversaries — your ideas, our creations.</p>
		<a href="/custom-orders" class="mt-5 inline-flex min-h-12 items-center rounded-full bg-choco px-7 text-sm font-bold text-white uppercase transition-colors duration-200 hover:bg-choco-deep">Order a Custom Cake</a>
	</div>
</section>
