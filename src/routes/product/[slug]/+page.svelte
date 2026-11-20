<script lang="ts">
	import { Bell, Check, Clock, Gift, Heart, Minus, Plus, ShieldCheck, ShoppingBag, Truck, Wheat } from '@lucide/svelte';
	import { goto } from '$app/navigation';
	import { Tween } from 'svelte/motion';
	import { products, productExtras, productNutrition, productReviews, productStock, sharedKitchenCaveat, site, usd, cutoffText, closedDayText } from '#lib/data/site.ts';
	import { addToCart } from '#lib/cart.svelte.ts';
	import { toggleWishlist, wishlist } from '#lib/wishlist.svelte.ts';
	import { earliestDate, formatDay, productLeadTime } from '#lib/fulfilment.ts';
	import Picture from '#lib/components/Picture.svelte';
	import ProductCard from '#lib/components/ProductCard.svelte';
	import Stars from '#lib/components/Stars.svelte';
	import BundleUpsell from '#lib/components/BundleUpsell.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	const product = $derived(data.product);
	const related = $derived(data.related);
	const extra = $derived(productExtras[product.slug]);
	const reviews = $derived(productReviews[product.slug] ?? []);
	const leadDays = $derived(productLeadTime(product.slug));
	const stock = $derived(productStock[product.slug] ?? { state: 'in' as const, note: 'Baked to order.' });
	const nutrition = $derived(productNutrition[product.slug]);
	let notifyEmail = $state('');
	let notifyDone = $state(false);

	let sizeIdx = $state(0);
	let flavourIdx = $state(0);
	let qty = $state(1);
	let added = $state(false);
	let note = $state('');
	let giftRecipient = $state('');
	let giftMessage = $state('');

	const sizePrice = $derived(extra?.sizePrices[sizeIdx] ?? product.price);
	const flavourDelta = $derived(extra?.flavours?.[flavourIdx]?.delta ?? 0);
	const unitPrice = $derived(sizePrice + flavourDelta);
	const total = $derived(unitPrice * qty);
	const priceTween = new Tween(0, { duration: 200 });
	$effect(() => {
		priceTween.target = total;
	});

	// Earliest fulfilment (client-side; prerender shows the generic cut-off line).
	let earliest = $state('');
	$effect(() => {
		earliest = formatDay(earliestDate(leadDays, new Date()));
	});

	function onAdd() {
		addToCart(product.slug, product.sizes[sizeIdx], qty, {
			flavour: extra?.flavours?.[flavourIdx]?.label,
			message: note.trim() || undefined,
			giftMessage: giftMessage.trim() || undefined,
			giftRecipient: giftRecipient.trim() || undefined,
			price: unitPrice
		});
		added = true;
		window.setTimeout(() => (added = false), 1800);
	}

	// Mock express pay: add the configured treat, then jump to the mock
	// express checkout (no real wallet, no real payment).
	function onExpress(method: 'apple-pay' | 'google-pay') {
		onAdd();
		goto(`/checkout?express=${method}`);
	}

	const jsonLd = $derived({
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'Product',
				name: product.name,
				description: product.description,
				image: `https://sweetcrustbakery.com/images/${product.image}-800.jpg`,
				brand: { '@type': 'Brand', name: 'SweetCrust Bakery & Cafe' },
				sku: product.slug,
				offers: {
					'@type': 'Offer',
					price: unitPrice,
					priceCurrency: 'USD',
					availability:
						stock.state === 'preorder' ? 'https://schema.org/PreOrder' : stock.state === 'low' ? 'https://schema.org/LimitedAvailability' : 'https://schema.org/InStock',
					url: `${site.url}/product/${product.slug}`,
					shippingDetails: {
						'@type': 'OfferShippingDetails',
						shippingRate: { '@type': 'MonetaryAmount', value: 4.95, currency: 'USD' },
						shippingDestination: { '@type': 'DefinedRegion', addressCountry: 'US' },
						deliveryTime: {
							'@type': 'ShippingDeliveryTime',
							handlingTime: { '@type': 'QuantitativeValue', minValue: 0, maxValue: 2, unitCode: 'DAY' },
							transitTime: { '@type': 'QuantitativeValue', minValue: 0, maxValue: 1, unitCode: 'DAY' }
						}
					}
				},
				aggregateRating: { '@type': 'AggregateRating', ratingValue: product.rating, reviewCount: product.reviews },
				review: reviews.map((r) => ({
					'@type': 'Review',
					author: { '@type': 'Person', name: r.author },
					datePublished: r.date,
					reviewRating: { '@type': 'Rating', ratingValue: r.rating, bestRating: 5 },
					name: r.title,
					reviewBody: r.text
				}))
			},
			{
				'@type': 'BreadcrumbList',
				itemListElement: [
					{ '@type': 'ListItem', position: 1, name: 'Home', item: site.url },
					{ '@type': 'ListItem', position: 2, name: 'Our Products', item: `${site.url}/shop` },
					{ '@type': 'ListItem', position: 3, name: product.name, item: `${site.url}/product/${product.slug}` }
				]
			}
		]
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
			<div class="flex flex-wrap items-center gap-2">
				{#if product.badge}<span class="inline-block rounded-full bg-choco px-3 py-1 text-xs font-bold tracking-wide text-white uppercase">{product.badge}</span>{/if}
				{#if stock.state === 'low'}
					<span class="inline-block rounded-full bg-blush px-3 py-1 text-xs font-bold tracking-wide text-choco uppercase">Only {stock.left} left</span>
				{:else if stock.state === 'preorder'}
					<span class="inline-block rounded-full bg-blush px-3 py-1 text-xs font-bold tracking-wide text-choco uppercase">Pre-order</span>
				{:else}
					<span class="inline-block rounded-full bg-choco-soft px-3 py-1 text-xs font-bold tracking-wide text-choco uppercase">In stock</span>
				{/if}
				<button
					type="button"
					onclick={() => toggleWishlist(product.slug)}
					aria-pressed={wishlist.has(product.slug)}
					aria-label={wishlist.has(product.slug) ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
					class="ml-auto flex h-12 w-12 items-center justify-center rounded-full ring-1 transition-colors duration-150 {wishlist.has(product.slug) ? 'bg-blush text-choco ring-line' : 'bg-white text-muted ring-line hover:text-choco'}"
				>
					<Heart size={21} aria-hidden="true" fill={wishlist.has(product.slug) ? 'currentColor' : 'none'} />
				</button>
			</div>
			<h1 class="mt-3 font-display text-4xl leading-tight font-semibold text-choco">{product.name}</h1>
			<div class="mt-3 flex flex-wrap items-center gap-3">
				<Stars rating={product.rating} reviews={product.reviews} />
				<span class="text-sm text-muted">· {product.serves}</span>
			</div>
			<p class="mt-2 text-sm font-semibold {stock.state === 'low' ? 'text-choco' : 'text-muted'}" role="status">{stock.note}</p>
			{#if stock.state !== 'in'}
				{#if notifyDone}
					<p class="mt-3 rounded-2xl bg-cream-deep px-4 py-3 text-sm font-semibold text-choco ring-1 ring-line" role="status">
						Thanks — we will email you the moment it is back in stock. (Demo: no email is really sent.)
					</p>
				{:else}
					<form
						class="mt-3 flex flex-col gap-2 sm:flex-row"
						onsubmit={(e) => {
							e.preventDefault();
							if (notifyEmail.includes('@')) notifyDone = true;
						}}
					>
						<label for="notify-email" class="sr-only">Email for back-in-stock alert</label>
						<input
							id="notify-email"
							type="email"
							bind:value={notifyEmail}
							required
							placeholder="Email me when it is back"
							class="min-h-12 min-w-0 flex-1 rounded-full border border-line bg-white px-5 text-base text-ink placeholder:text-muted"
						/>
						<button type="submit" class="flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full border-2 border-choco px-6 text-sm font-bold text-choco">
							<Bell size={16} aria-hidden="true" /> Notify me
						</button>
					</form>
				{/if}
			{/if}
			<p class="mt-4 text-3xl font-bold text-ink" aria-live="polite">{usd(unitPrice)}</p>
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

			<!-- Size: real radio group with live price -->
			<fieldset class="mt-6">
				<legend class="text-sm font-bold text-ink">Size — {product.sizes[sizeIdx]} · {usd(sizePrice)}</legend>
				<div class="mt-2 flex flex-wrap gap-2">
					{#each product.sizes as s, i}
						<label
							class="flex min-h-12 cursor-pointer items-center rounded-full border px-5 text-sm font-semibold transition-colors duration-150 {sizeIdx === i
								? 'border-choco bg-choco text-white'
								: 'border-line bg-white text-ink hover:bg-cream-deep'}"
						>
							<input type="radio" name="size" value={s} checked={sizeIdx === i} onchange={() => (sizeIdx = i)} class="sr-only" />
							{s} · {usd(extra?.sizePrices[i] ?? product.price)}
						</label>
					{/each}
				</div>
			</fieldset>

			{#if extra?.flavours}
				<fieldset class="mt-5">
					<legend class="text-sm font-bold text-ink">Flavour — {extra.flavours[flavourIdx].label}</legend>
					<div class="mt-2 flex flex-wrap gap-2">
						{#each extra.flavours as f, i}
							<label
								class="flex min-h-12 cursor-pointer items-center rounded-full border px-5 text-sm font-semibold transition-colors duration-150 {flavourIdx === i
									? 'border-choco bg-choco text-white'
									: 'border-line bg-white text-ink hover:bg-cream-deep'}"
							>
								<input type="radio" name="flavour" value={f.label} checked={flavourIdx === i} onchange={() => (flavourIdx = i)} class="sr-only" />
								{f.label}{f.delta > 0 ? ` · +${usd(f.delta)}` : ''}
							</label>
						{/each}
					</div>
				</fieldset>
			{/if}

			<!-- Cake message with live preview -->
			<div class="mt-5">
				<label for="note" class="text-sm font-bold text-ink">Message on the cake (optional)</label>
				<input
					id="note"
					type="text"
					bind:value={note}
					maxlength={60}
					placeholder="e.g. Happy Birthday, Maya!"
					aria-describedby="note-count note-preview"
					class="mt-2 min-h-12 w-full rounded-full border border-line bg-white px-5 text-base text-ink placeholder:text-muted"
				/>
				<p id="note-count" class="mt-1 text-xs text-muted">{note.length}/60 characters</p>
				{#if note.trim()}
					<p id="note-preview" class="mt-2 rounded-2xl bg-cream-deep px-4 py-3 text-center font-script text-2xl text-choco ring-1 ring-line" aria-live="polite">
						“{note.trim()}”
					</p>
				{/if}
			</div>

			<!-- Gift message (card) with live preview — distinct from the cake message above -->
			<div class="mt-5 grid gap-4 sm:grid-cols-2">
				<div>
					<label for="gift-recipient" class="text-sm font-bold text-ink">Gift for (optional)</label>
					<input id="gift-recipient" type="text" bind:value={giftRecipient} maxlength={40} placeholder="Recipient’s name" autocomplete="off" class="mt-2 min-h-12 w-full rounded-full border border-line bg-white px-5 text-base text-ink placeholder:text-muted" />
				</div>
				<div>
					<label for="gift-message" class="text-sm font-bold text-ink">Gift message (optional)</label>
					<input id="gift-message" type="text" bind:value={giftMessage} maxlength={120} placeholder="A note in the box" class="mt-2 min-h-12 w-full rounded-full border border-line bg-white px-5 text-base text-ink placeholder:text-muted" />
				</div>
			</div>
			{#if giftMessage.trim() || giftRecipient.trim()}
				<div class="mt-3 rounded-2xl bg-white p-5 text-center ring-1 ring-line" aria-live="polite">
					<p class="text-xs font-bold tracking-wider text-muted uppercase">Your gift card will read</p>
					<p class="mt-2 font-script text-3xl leading-snug text-choco">“{giftMessage.trim() || 'With love, from SweetCrust'}”</p>
					{#if giftRecipient.trim()}<p class="mt-2 text-sm font-semibold text-ink">To {giftRecipient.trim()}</p>{/if}
					<p class="text-xs text-muted">Handwritten on our signature card, free with every gifted order.</p>
				</div>
			{/if}

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
					class="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full bg-choco px-7 text-sm font-bold text-white uppercase transition-all duration-200 hover:bg-choco-deep active:scale-[0.97] sm:flex-none sm:px-10"
					aria-live="polite"
				>
					{#if added}
						<Check size={18} aria-hidden="true" /> Added to basket
					{:else}
						<ShoppingBag size={18} aria-hidden="true" /> Add to cart · {usd(priceTween.current)}
					{/if}
				</button>
			</div>

			<div class="mt-5">
				<p class="text-center text-xs font-bold tracking-wider text-muted uppercase">Or check out instantly — demo only</p>
				<div class="mt-2 grid grid-cols-2 gap-2">
					<button type="button" onclick={() => onExpress('apple-pay')} class="flex min-h-12 items-center justify-center gap-2 rounded-full bg-black text-sm font-bold text-white" aria-label="Buy now with Apple Pay (demo)">
						<span aria-hidden="true" class="text-base"> Pay</span>
					</button>
					<button type="button" onclick={() => onExpress('google-pay')} class="flex min-h-12 items-center justify-center gap-2 rounded-full bg-white text-sm font-bold text-ink ring-1 ring-line" aria-label="Buy now with Google Pay (demo)">
						<span aria-hidden="true" class="text-base font-bold"><span class="text-[#4285F4]">G</span> Pay</span>
					</button>
				</div>
			</div>

			<p class="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-bold text-muted">
				<span class="flex items-center gap-1.5"><ShieldCheck size={15} aria-hidden="true" class="text-caramel" /> Secure mock checkout — no card details stored</span>
				<span class="flex items-center gap-1.5"><Check size={15} aria-hidden="true" class="text-caramel" /> Baked fresh today</span>
				<span class="flex items-center gap-1.5"><Truck size={15} aria-hidden="true" class="text-caramel" /> Free returns within 24 hours</span>
			</p>

			<ul class="mt-6 space-y-2 text-sm text-muted">
				<li class="flex items-center gap-2"><Truck size={17} aria-hidden="true" class="shrink-0 text-caramel" /> Free delivery over $35 · $4.95 below · Delivered in insulated boxes</li>
				<li class="flex items-center gap-2">
					<Clock size={17} aria-hidden="true" class="shrink-0 text-caramel" />
					{#if leadDays === 0}
						{cutoffText} for same-day pickup or delivery{#if earliest} · earliest today{/if}
					{:else}
						Needs {leadDays} day{leadDays === 1 ? '' : 's'} of preparation{#if earliest} · earliest {earliest}{/if}
					{/if}
				</li>
				<li class="flex items-center gap-2"><Gift size={17} aria-hidden="true" class="shrink-0 text-caramel" /> Gift wrap and a handwritten card are always free</li>
			</ul>

			<!-- Allergens -->
			<div class="mt-8 rounded-2xl bg-cream-deep p-5 ring-1 ring-line">
				<h2 class="flex items-center gap-2 font-display text-xl font-semibold text-choco"><Wheat size={19} aria-hidden="true" /> Allergens &amp; dietary</h2>
				<p class="mt-3 text-sm leading-relaxed text-muted">
					<strong class="text-ink">Contains:</strong>
					{extra?.allergens.join(', ') ?? 'See ingredients below.'}
				</p>
				<p class="mt-2 text-sm leading-relaxed text-muted">{sharedKitchenCaveat}</p>
				<a href="/allergens" class="mt-3 inline-flex min-h-11 items-center text-sm font-bold text-choco hover:underline">Full allergen guide &amp; matrix →</a>
			</div>

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

	<!-- Written reviews -->
	<section class="mt-16" aria-labelledby="reviews-title">
		<h2 id="reviews-title" class="font-display text-3xl font-semibold text-choco">What customers say about this treat</h2>
		<p class="mt-2 text-muted">
			<span class="font-bold text-ink">{product.rating} out of 5</span> · {product.reviews} verified reviews · collected on this site.
			<a href="/reviews" class="font-bold text-choco hover:underline">Read all reviews →</a>
		</p>
		<div class="mt-6 grid gap-4 md:grid-cols-3">
			{#each reviews as r}
				<figure class="rounded-3xl bg-white p-6 ring-1 ring-line">
					<Stars rating={r.rating} />
					<blockquote class="mt-3 leading-relaxed text-ink">“{r.text}”</blockquote>
					<figcaption class="mt-4">
						<p class="font-bold text-ink">{r.title}</p>
						<p class="text-sm text-muted">{r.author} · {r.date}</p>
					</figcaption>
				</figure>
			{/each}
		</div>
	</section>

	<!-- Nutrition (estimates) -->
	{#if nutrition}
		<section class="mt-16" aria-labelledby="nutrition-title">
			<h2 id="nutrition-title" class="font-display text-3xl font-semibold text-choco">Nutrition — per serving</h2>
			<p class="mt-2 text-sm text-muted">Estimates only, calculated from our recipe — not medical advice. Serving: {nutrition.serving}.</p>
			<div class="mt-5 overflow-x-auto rounded-3xl bg-white ring-1 ring-line">
				<table class="w-full min-w-[480px] text-left text-sm">
					<thead>
						<tr class="border-b border-line text-xs tracking-wider text-muted uppercase">
							<th scope="col" class="px-5 py-4">Per serving ({nutrition.serving})</th>
							<th scope="col" class="px-5 py-4">Energy</th>
							<th scope="col" class="px-5 py-4">Fat</th>
							<th scope="col" class="px-5 py-4">Carbs</th>
							<th scope="col" class="px-5 py-4">of which sugars</th>
							<th scope="col" class="px-5 py-4">Protein</th>
						</tr>
					</thead>
					<tbody>
						<tr class="border-b border-line/60">
							<td class="px-5 py-4 font-bold text-ink">Per serving</td>
							<td class="px-5 py-4">{nutrition.perServing.kcal} kcal</td>
							<td class="px-5 py-4">{nutrition.perServing.fat} g</td>
							<td class="px-5 py-4">{nutrition.perServing.carbs} g</td>
							<td class="px-5 py-4">{nutrition.perServing.sugar} g</td>
							<td class="px-5 py-4">{nutrition.perServing.protein} g</td>
						</tr>
						<tr>
							<td class="px-5 py-4 font-bold text-ink">Per 100 g</td>
							<td class="px-5 py-4">{nutrition.per100g.kcal} kcal</td>
							<td class="px-5 py-4">{nutrition.per100g.fat} g</td>
							<td class="px-5 py-4">{nutrition.per100g.carbs} g</td>
							<td class="px-5 py-4">{nutrition.per100g.sugar} g</td>
							<td class="px-5 py-4">{nutrition.per100g.protein} g</td>
						</tr>
					</tbody>
				</table>
			</div>
		</section>
	{/if}

	<!-- Frequently bought together -->
	<div class="mt-16">
		<BundleUpsell />
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

<!-- Sticky mobile add-to-cart (thumb zone, safe-area aware). The global
     mobile bar is hidden on product pages so the two never stack. -->
<div class="fixed inset-x-0 bottom-0 z-40 flex items-center gap-3 border-t border-line bg-white/95 px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] backdrop-blur lg:hidden">
	<div class="min-w-0 flex-1">
		<p class="truncate text-sm font-bold text-ink">{product.name}</p>
		<p class="text-sm font-bold text-choco" aria-live="polite">{usd(unitPrice)} · {product.sizes[sizeIdx]}</p>
	</div>
	<button
		type="button"
		onclick={onAdd}
		class="flex min-h-14 shrink-0 items-center gap-2 rounded-full bg-choco px-6 text-sm font-bold text-white uppercase transition-colors duration-200 hover:bg-choco-deep active:scale-[0.97]"
	>
		{#if added}<Check size={18} aria-hidden="true" /> Added{:else}<ShoppingBag size={18} aria-hidden="true" /> Add to cart{/if}
	</button>
</div>
<div class="h-20 lg:hidden" aria-hidden="true"></div>
