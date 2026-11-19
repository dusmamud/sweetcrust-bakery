<script lang="ts">
	import { ArrowRight, Phone } from '@lucide/svelte';
	import { seasonalCollections, site, usd } from '#lib/data/site.ts';
	import PageHero from '#lib/components/PageHero.svelte';
	import Picture from '#lib/components/Picture.svelte';
</script>

<svelte:head>
	<title>Seasonal Pre-Orders — SweetCrust Bakery &amp; Cafe</title>
	<meta name="description" content="Seasonal collections with hard order deadlines — Christmas collection (order by Dec 18) and Valentine’s collection (order by Feb 10). Pre-order before the ovens fill up." />
</svelte:head>

<PageHero title="Seasonal Pre-Orders" eyebrow="The ovens fill up fast" intro="Holiday collections with hard order deadlines — published here, on the homepage and in every email, before the season starts. When a deadline passes, the ovens are full." />

<section class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
	<div class="space-y-12">
		{#each seasonalCollections as c}
			<article class="grid gap-8 lg:grid-cols-2">
				<div class="overflow-hidden rounded-3xl ring-1 ring-line">
					<Picture
						name={c.image}
						alt={c.imageAlt}
						width={1200}
						height={800}
						sizes="(min-width: 1024px) 50vw, 100vw"
						imgClass="aspect-[3/2] w-full object-cover"
					/>
				</div>
				<div>
					<h2 class="font-display text-3xl font-semibold text-choco">{c.name}</h2>
					<p class="mt-2 inline-block rounded-full bg-blush px-4 py-1.5 text-sm font-bold text-choco ring-1 ring-line">{c.deadline}</p>
					<ul class="mt-5 space-y-4">
						{#each c.items as item}
							<li class="flex items-start justify-between gap-4 rounded-2xl bg-white p-5 ring-1 ring-line">
								<div>
									<p class="font-display text-xl font-semibold text-choco">{item.name}</p>
									<p class="mt-1 text-sm leading-relaxed text-muted">{item.detail}</p>
								</div>
								<p class="shrink-0 text-lg font-bold text-ink">{usd(item.price)}</p>
							</li>
						{/each}
					</ul>
					<div class="mt-6 flex flex-wrap gap-3">
						<a href="/shop" class="inline-flex min-h-12 items-center gap-2 rounded-full bg-choco px-7 text-sm font-bold text-white uppercase transition-colors duration-200 hover:bg-choco-deep">Order from the shop <ArrowRight size={17} aria-hidden="true" /></a>
						<a href={site.phoneHref} class="inline-flex min-h-12 items-center gap-2 rounded-full border-2 border-choco px-7 text-sm font-bold text-choco uppercase"><Phone size={16} aria-hidden="true" /> Pre-order by phone</a>
					</div>
					<p class="mt-4 text-sm text-muted">Pre-orders are confirmed by phone. Pickup Dec 23–24 (Christmas) or Feb 13–14 (Valentine’s) — choose your slot at checkout.</p>
				</div>
			</article>
		{/each}
	</div>

	<div class="mt-12 rounded-3xl bg-cream-deep p-6 ring-1 ring-line sm:p-8">
		<h2 class="font-display text-2xl font-semibold text-choco">How seasonal pre-orders work</h2>
		<ol class="mt-4 grid gap-4 text-sm leading-relaxed text-muted sm:grid-cols-3">
			<li><strong class="text-ink">1 · Order before the deadline.</strong> The deadline is the last day we can bake your order — not the last day we feel like it.</li>
			<li><strong class="text-ink">2 · Choose your pickup slot.</strong> Holiday pickups run in timed slots so the queue never wraps around the block.</li>
			<li><strong class="text-ink">3 · We call you.</strong> Every seasonal order gets a confirmation call, because Christmas cake is not a guessing game.</li>
		</ol>
	</div>
</section>
