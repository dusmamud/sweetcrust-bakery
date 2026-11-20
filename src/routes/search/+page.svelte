<script lang="ts">
	// Site search (mock, client-side). Autocomplete over product names,
	// occasions and dietary tags; recent searches in localStorage; popular
	// searches; a no-results state that suggests categories. The header
	// search points here; /shop?q= keeps working too.
	import { page } from '$app/state';
	import { Search, Clock, TrendingUp } from '@lucide/svelte';
	import { categories, popularSearches, products } from '#lib/data/site.ts';
	import ProductCard from '#lib/components/ProductCard.svelte';
	import PageHero from '#lib/components/PageHero.svelte';

	const RECENT_KEY = 'sweetcrust-recent-searches-v1';

	// searchParams are unavailable during prerender — fall back to empty
	// params there; the client hydrates with the real query string.
	const params = $derived(typeof window !== 'undefined' ? page.url.searchParams : new URLSearchParams());
	const initialQ = $derived(params.get('q') ?? '');

	let q = $state('');
	let recent = $state<string[]>([]);
	let committed = $state(false);

	$effect(() => {
		if (typeof window === 'undefined') return;
		try {
			recent = JSON.parse(window.localStorage.getItem(RECENT_KEY) ?? '[]') as string[];
		} catch {
			recent = [];
		}
	});

	// Seed the box from ?q= once the client hydrates.
	$effect(() => {
		if (initialQ && !q) q = initialQ;
	});

	const query = $derived(q.trim().toLowerCase());

	const suggestions = $derived.by(() => {
		if (!query) return [] as { label: string; href: string }[];
		const out: { label: string; href: string }[] = [];
		for (const p of products) {
			if (`${p.name} ${p.description} ${p.category}`.toLowerCase().includes(query)) {
				out.push({ label: p.name, href: `/product/${p.slug}` });
			}
		}
		for (const c of categories) {
			if (c.name.toLowerCase().includes(query) || c.blurb.toLowerCase().includes(query)) {
				out.push({ label: `${c.name} — ${c.blurb}`, href: c.href });
			}
		}
		for (const d of ['eggless', 'gluten-free', 'vegan']) {
			if (d.includes(query)) out.push({ label: `${d} treats`, href: `/shop?dietary=${d}` });
		}
		return out.slice(0, 6);
	});

	const results = $derived.by(() => {
		if (!query) return [] as typeof products;
		return products.filter((p) => `${p.name} ${p.description} ${p.category}`.toLowerCase().includes(query));
	});

	function saveRecent(term: string) {
		const clean = term.trim();
		if (!clean) return;
		const next = [clean, ...recent.filter((r) => r.toLowerCase() !== clean.toLowerCase())].slice(0, 5);
		recent = next;
		try {
			window.localStorage.setItem(RECENT_KEY, JSON.stringify(next));
		} catch {
			// Ignore.
		}
	}

	function submit(e: SubmitEvent) {
		e.preventDefault();
		committed = true;
		saveRecent(q);
	}
</script>

<svelte:head>
	<title>Search — SweetCrust Bakery &amp; Cafe</title>
	<meta name="description" content="Search SweetCrust cakes, cupcakes, pastries and bread — by name, occasion or dietary need." />
</svelte:head>

<PageHero title="Search Treats" eyebrow="Find something sweet" intro="Search by name, occasion or dietary need — chocolate cake, birthday, eggless, croissant…" />

<section class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
	<form role="search" onsubmit={submit} class="mx-auto max-w-2xl">
		<label for="search-box" class="sr-only">Search cakes and treats</label>
		<div class="flex gap-2">
			<div class="relative min-w-0 flex-1">
				<Search size={19} aria-hidden="true" class="pointer-events-none absolute top-1/2 left-5 -translate-y-1/2 text-muted" />
				<input
					id="search-box"
					type="search"
					role="combobox"
					bind:value={q}
					oninput={() => (committed = false)}
					placeholder="Try “chocolate cake” or “birthday”…"
					autocomplete="off"
					aria-expanded={suggestions.length > 0}
					aria-controls="search-suggestions"
					class="min-h-12 w-full rounded-full border border-line bg-white py-3 pr-5 pl-12 text-base text-ink placeholder:text-muted"
				/>
				{#if query && suggestions.length > 0}
					<ul id="search-suggestions" class="absolute top-full right-0 left-0 z-20 mt-2 overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-line">
						{#each suggestions as s}
							<li>
								<a href={s.href} onclick={() => saveRecent(q)} class="flex min-h-12 items-center px-5 text-sm font-medium text-ink transition-colors duration-150 hover:bg-cream-deep">
									{s.label}
								</a>
							</li>
						{/each}
						<li>
							<a href="/shop?q={encodeURIComponent(q)}" onclick={() => saveRecent(q)} class="flex min-h-12 items-center px-5 text-sm font-bold text-choco transition-colors duration-150 hover:bg-cream-deep">
								See all results for “{q.trim()}” →
							</a>
						</li>
					</ul>
				{/if}
			</div>
			<button type="submit" class="flex min-h-12 shrink-0 items-center rounded-full bg-choco px-7 text-sm font-bold text-white uppercase">Search</button>
		</div>
	</form>

	{#if query && committed}
		{#if results.length > 0}
			<p class="mt-8 text-muted">
				{results.length} result{results.length === 1 ? '' : 's'} for “<span class="font-semibold text-ink">{q.trim()}</span>”
			</p>
			<div class="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
				{#each results as product (product.slug)}
					<ProductCard {product} />
				{/each}
			</div>
		{:else}
			<div class="mx-auto mt-8 max-w-xl rounded-3xl bg-white p-10 text-center ring-1 ring-line">
				<p class="font-display text-3xl text-choco">Nothing sweet matched “{q.trim()}”</p>
				<p class="mx-auto mt-3 max-w-md text-muted">Try a different word — or browse a category below. Custom bakes are always an option too.</p>
				<div class="mt-6 flex flex-wrap justify-center gap-2">
					{#each categories.filter((c) => c.id !== 'custom') as c}
						<a href={c.href} class="flex min-h-12 items-center rounded-full bg-cream-deep px-5 text-sm font-bold text-ink ring-1 ring-line">{c.name}</a>
					{/each}
				</div>
				<a href="/custom-orders" class="mt-6 inline-flex min-h-12 items-center rounded-full bg-choco px-7 text-sm font-bold text-white uppercase">Ask for a custom bake</a>
			</div>
		{/if}
	{:else}
		<div class="mx-auto mt-10 grid max-w-3xl gap-6 sm:grid-cols-2">
			{#if recent.length > 0}
				<div class="rounded-3xl bg-white p-6 ring-1 ring-line">
					<h2 class="flex items-center gap-2 font-display text-xl font-semibold text-choco"><Clock size={19} aria-hidden="true" class="text-caramel" /> Recent searches</h2>
					<ul class="mt-4 space-y-1">
						{#each recent as r}
							<li><a href="/search?q={encodeURIComponent(r)}" class="flex min-h-11 items-center text-sm font-medium text-ink hover:text-choco">{r}</a></li>
						{/each}
					</ul>
					<button
						type="button"
						onclick={() => {
							recent = [];
							try {
								window.localStorage.removeItem(RECENT_KEY);
							} catch {
								// Ignore.
							}
						}}
						class="mt-2 min-h-11 text-sm font-bold text-muted underline"
					>
						Clear recent searches
					</button>
				</div>
			{/if}
			<div class="rounded-3xl bg-white p-6 ring-1 ring-line">
				<h2 class="flex items-center gap-2 font-display text-xl font-semibold text-choco"><TrendingUp size={19} aria-hidden="true" class="text-caramel" /> Popular right now</h2>
				<div class="mt-4 flex flex-wrap gap-2">
					{#each popularSearches as term}
						<a href="/search?q={encodeURIComponent(term)}" class="flex min-h-11 items-center rounded-full bg-cream-deep px-4 text-sm font-bold text-ink ring-1 ring-line">{term}</a>
					{/each}
				</div>
			</div>
		</div>
	{/if}
</section>
