<script lang="ts">
	import { Accessibility, Car, Clock, MapPin, Phone, ShoppingBag, TrainFront } from '@lucide/svelte';
	import { site } from '#lib/data/site.ts';
	import PageHero from '#lib/components/PageHero.svelte';
	import Picture from '#lib/components/Picture.svelte';
	import ZipChecker from '#lib/components/ZipChecker.svelte';
</script>

<svelte:head>
	<title>Visit Us — SweetCrust Bakery &amp; Cafe</title>
	<meta name="description" content="SweetCrust Bakery at 123 Baker Street, New York — hours, holiday hours, pickup instructions, parking and step-free access. Open Mon–Sat, 8 AM–8 PM." />
</svelte:head>

<PageHero title="Visit Us" eyebrow="123 Baker Street, New York" intro="One bakery, one counter, one smell of fresh bread that follows you down the street. Open Monday to Saturday, 8 AM to 8 PM — closed Sundays." />

<section class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
	<div class="grid gap-10 lg:grid-cols-2">
		<div class="overflow-hidden rounded-3xl ring-1 ring-line">
			<Picture
				name="storefront"
				alt="SweetCrust Bakery storefront with a striped awning and a display window full of cakes"
				width={1200}
				height={800}
				eager
				sizes="(min-width: 1024px) 50vw, 100vw"
				imgClass="aspect-[3/2] w-full object-cover"
			/>
			<!-- Mock map-style block: a styled panel, not a live embed. -->
			<div class="border-t border-line bg-cream-deep p-6">
				<p class="flex items-start gap-2 text-sm leading-relaxed text-muted">
					<MapPin size={18} aria-hidden="true" class="mt-0.5 shrink-0 text-choco" />
					<span><strong class="text-ink">123 Baker Street, New York, NY 10001</strong> — between 5th and 6th Avenue, two doors down from the flower shop. Look for the striped awning and the smell of cinnamon.</span>
				</p>
				<div class="mt-4 flex flex-wrap gap-3">
					<a href={site.phoneHref} class="inline-flex min-h-12 items-center gap-2 rounded-full bg-choco px-6 text-sm font-bold text-white uppercase"><Phone size={16} aria-hidden="true" /> {site.phoneDisplay}</a>
					<a href="/shop" class="inline-flex min-h-12 items-center gap-2 rounded-full border-2 border-choco px-6 text-sm font-bold text-choco uppercase"><ShoppingBag size={16} aria-hidden="true" /> Order for pickup</a>
				</div>
			</div>
		</div>

		<div>
			<h2 class="flex items-center gap-2 font-display text-3xl font-semibold text-choco"><Clock size={24} aria-hidden="true" /> Hours</h2>
			<div class="mt-4 overflow-hidden rounded-3xl ring-1 ring-line">
				<table class="w-full bg-white text-left text-sm">
					<tbody>
						{#each [['Monday – Friday', '8:00 AM – 8:00 PM'], ['Saturday', '8:00 AM – 8:00 PM'], ['Sunday', 'Closed — the ovens rest']] as [day, hours]}
							<tr class="border-t border-line first:border-t-0">
								<td class="px-5 py-3 font-semibold text-ink">{day}</td>
								<td class="px-5 py-3 text-muted">{hours}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
			<h3 class="mt-8 font-display text-2xl font-semibold text-choco">Holiday hours</h3>
			<ul class="mt-3 space-y-2 text-sm leading-relaxed text-muted">
				<li>· <strong class="text-ink">Christmas Eve (Dec 24):</strong> 8 AM – 2 PM, pre-orders only after 12 PM.</li>
				<li>· <strong class="text-ink">Christmas Day &amp; New Year’s Day:</strong> closed.</li>
				<li>· <strong class="text-ink">Valentine’s Day (Feb 14):</strong> 8 AM – 9 PM, pre-orders recommended.</li>
				<li>· <strong class="text-ink">Thanksgiving:</strong> 8 AM – 12 PM, pie pickups only.</li>
			</ul>
			<h3 class="mt-8 font-display text-2xl font-semibold text-choco">Getting here</h3>
			<ul class="mt-3 space-y-3 text-sm leading-relaxed text-muted">
				<li class="flex gap-2.5"><TrainFront size={17} aria-hidden="true" class="mt-0.5 shrink-0 text-caramel" /> Subway: 6 train to 33rd St, 4 minutes’ walk.</li>
				<li class="flex gap-2.5"><Car size={17} aria-hidden="true" class="mt-0.5 shrink-0 text-caramel" /> Parking: street parking on Baker Street (meters) and a garage on 5th Avenue. 15-minute loading zone right outside for cake pickups.</li>
				<li class="flex gap-2.5"><Accessibility size={17} aria-hidden="true" class="mt-0.5 shrink-0 text-caramel" /> Step-free entrance, wide counter aisle, and curbside pickup — call when you arrive and we will bring your order out.</li>
				<li class="flex gap-2.5"><ShoppingBag size={17} aria-hidden="true" class="mt-0.5 shrink-0 text-caramel" /> Pickup: tell us your name at the counter. We hold orders for 2 hours past your slot.</li>
			</ul>
		</div>
	</div>

	<div class="mt-10"><ZipChecker /></div>
</section>
