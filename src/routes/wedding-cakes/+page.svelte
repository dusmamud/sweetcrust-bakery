<script lang="ts">
	import { ArrowRight, CalendarClock, Check, Truck } from '@lucide/svelte';
	import { tastingFeeNote, usd, weddingFlavours, weddingTiers } from '#lib/data/site.ts';
	import PageHero from '#lib/components/PageHero.svelte';
	import Picture from '#lib/components/Picture.svelte';
</script>

<svelte:head>
	<title>Wedding Cakes — SweetCrust Bakery &amp; Cafe</title>
	<meta name="description" content="Wedding cakes from $180 — tiered cakes by servings, flavours, lead times, 50% deposit, delivery and setup. Book a tasting and let’s design your cake." />
</svelte:head>

<PageHero title="Wedding Cakes" eyebrow="Your day, your cake" intro="Tiered cakes baked for your guest list, delivered and set up at your venue. Book 3–4 months ahead for peak season — and taste first." />

<section class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
	<div class="grid gap-10 lg:grid-cols-2">
		<div class="overflow-hidden rounded-3xl ring-1 ring-line">
			<Picture
				name="wedding-cake"
				alt="Three-tier white wedding cake with buttercream flowers and gold leaf"
				width={1200}
				height={800}
				eager
				sizes="(min-width: 1024px) 50vw, 100vw"
				imgClass="aspect-[3/2] w-full object-cover"
			/>
		</div>
		<div>
			<h2 class="font-display text-3xl font-semibold text-choco">Sizes &amp; starting prices</h2>
			<p class="mt-3 leading-relaxed text-muted">Prices are starting prices for a classic finish — hand-piped flowers, gold leaf and shaped tiers are quoted individually. Every wedding cake includes a tasting, a design sketch and a delivery slot.</p>
			<div class="mt-6 overflow-hidden rounded-3xl ring-1 ring-line">
				<table class="w-full bg-white text-left text-sm">
					<thead>
						<tr class="bg-cream-deep text-choco">
							<th scope="col" class="px-5 py-3 font-bold">Cake</th>
							<th scope="col" class="px-5 py-3 font-bold">Serves</th>
							<th scope="col" class="px-5 py-3 font-bold">From</th>
						</tr>
					</thead>
					<tbody>
						{#each weddingTiers as t}
							<tr class="border-t border-line">
								<td class="px-5 py-3 font-semibold text-ink">{t.tiers}<span class="block text-xs font-normal text-muted">{t.note}</span></td>
								<td class="px-5 py-3 text-muted">{t.serves}</td>
								<td class="px-5 py-3 font-bold text-choco">{usd(t.from)}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
			<h3 class="mt-8 font-display text-2xl font-semibold text-choco">Flavours</h3>
			<div class="mt-3 flex flex-wrap gap-2">
				{#each weddingFlavours as f}
					<span class="rounded-full bg-choco-soft px-4 py-2 text-sm font-bold text-choco">{f}</span>
				{/each}
			</div>
			<p class="mt-3 text-sm text-muted">Different tiers can be different flavours — most couples pick two or three.</p>
		</div>
	</div>

	<div class="mt-12 grid gap-4 md:grid-cols-3">
		{#each [['How far ahead?', 'Book 3–4 months ahead for May–October weekends. Winter weddings: 6–8 weeks is usually enough.'], ['Deposit', 'A 50% deposit reserves your date. The balance is due one week before the wedding.'], ['Delivery & setup', 'We deliver, assemble and style your cake at the venue, and return the stands the next day — included in the quote.']] as [h, p]}
			<div class="rounded-3xl bg-white p-6 ring-1 ring-line">
				<h2 class="font-display text-xl font-semibold text-choco">{h}</h2>
				<p class="mt-2 text-sm leading-relaxed text-muted">{p}</p>
			</div>
		{/each}
	</div>

	<div class="mt-12 grid gap-8 rounded-3xl bg-cream-deep p-6 ring-1 ring-line sm:p-8 lg:grid-cols-2">
		<div class="overflow-hidden rounded-3xl ring-1 ring-line">
			<Picture
				name="wedding-tasting"
				alt="Cake tasting table with slices in several flavours, forks and coffee"
				width={1200}
				height={800}
				sizes="(min-width: 1024px) 50vw, 100vw"
				imgClass="aspect-[3/2] w-full object-cover"
			/>
		</div>
		<div>
			<h2 class="flex items-center gap-2 font-display text-3xl font-semibold text-choco"><CalendarClock size={26} aria-hidden="true" /> Taste before you choose</h2>
			<p class="mt-3 leading-relaxed text-muted">{tastingFeeNote} Tastings run on Saturdays at 10 AM, 12 PM and 2 PM, and take about an hour — bring your colours, your Pinterest board and your appetite.</p>
			<div class="mt-6 flex flex-wrap gap-3">
				<a href="/tastings" class="inline-flex min-h-12 items-center gap-2 rounded-full bg-choco px-7 text-sm font-bold text-white uppercase transition-colors duration-200 hover:bg-choco-deep">Book a tasting <ArrowRight size={17} aria-hidden="true" /></a>
				<a href="/custom-cakes" class="inline-flex min-h-12 items-center rounded-full border-2 border-choco px-7 text-sm font-bold text-choco uppercase">Start a custom cake</a>
			</div>
			<p class="mt-5 flex items-center gap-2 text-sm text-muted"><Truck size={16} aria-hidden="true" class="text-caramel" /> Delivery &amp; setup within New York City included — outside the city, quoted by distance.</p>
			<ul class="mt-4 space-y-2 text-sm text-muted">
				{#each ['A design sketch before we bake', 'A cake stand to borrow, free', 'A cutting guide for your caterer'] as item}
					<li class="flex gap-2"><Check size={16} aria-hidden="true" class="mt-0.5 shrink-0 text-choco" /> {item}</li>
				{/each}
			</ul>
		</div>
	</div>
</section>
