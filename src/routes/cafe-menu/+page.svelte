<script lang="ts">
	import { Clock, Coffee } from '@lucide/svelte';
	import { cafeMenu, cutoffText, site, usd } from '#lib/data/site.ts';
	import PageHero from '#lib/components/PageHero.svelte';
	import Picture from '#lib/components/Picture.svelte';
</script>

<svelte:head>
	<title>Cafe Menu — SweetCrust Bakery &amp; Cafe</title>
	<meta name="description" content="The SweetCrust cafe counter menu — coffee, drinks and bakes to eat in, plus Fridays-only sourdough. A menu, not a store: order at the counter." />
</svelte:head>

<PageHero title="Cafe Menu" eyebrow="Eat in, slow down" intro="A menu, not a store — coffee and bakes to enjoy at the counter, at the little table by the window, or on the bench outside. Prices include everything." />

<section class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
	<div class="grid gap-10 lg:grid-cols-5">
		<div class="lg:col-span-2">
			<div class="overflow-hidden rounded-3xl ring-1 ring-line">
				<Picture
					name="cafe-counter"
					alt="Cosy bakery cafe counter with a glass display of cakes and pastries"
					width={1200}
					height={800}
					eager
					sizes="(min-width: 1024px) 40vw, 100vw"
					imgClass="aspect-[3/2] w-full object-cover"
				/>
			</div>
			<div class="mt-6 space-y-4">
				{#each [['Good to know', 'Everything on this page is served at the counter — it is not delivered. Takeaway boxes are available for the whole shop range.'], ['Hours', `Mon – Sat, 8 AM – 8 PM. Coffee is served until 7:30 PM. ${cutoffText} applies to takeaway orders, not to the counter.`], ['Fridays only', 'Our sourdough loaf and cardamom buns are baked on Fridays and sold until they run out — usually by noon.']] as [h, p]}
					<div class="rounded-2xl bg-white p-5 ring-1 ring-line">
						<h2 class="font-display text-xl font-semibold text-choco">{h}</h2>
						<p class="mt-2 text-sm leading-relaxed text-muted">{p}</p>
					</div>
				{/each}
			</div>
		</div>

		<div class="space-y-10 lg:col-span-3">
			{#each cafeMenu as section}
				<div>
					<h2 class="flex items-center gap-2 font-display text-3xl font-semibold text-choco"><Coffee size={24} aria-hidden="true" /> {section.section}</h2>
					<ul class="mt-4 space-y-3">
						{#each section.items as item}
							<li class="flex items-start justify-between gap-4 rounded-2xl bg-white p-5 ring-1 ring-line">
								<div>
									<p class="font-display text-xl font-semibold text-choco">{item.name}</p>
									<p class="mt-1 text-sm leading-relaxed text-muted">{item.detail}</p>
								</div>
								<p class="shrink-0 text-lg font-bold text-ink">{usd(item.price)}</p>
							</li>
						{/each}
					</ul>
				</div>
			{/each}
			<p class="flex items-center gap-2 text-sm text-muted"><Clock size={16} aria-hidden="true" class="text-caramel" /> {site.hours} · {site.addressShort}</p>
		</div>
	</div>
</section>
