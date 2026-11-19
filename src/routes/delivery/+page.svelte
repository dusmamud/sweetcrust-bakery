<script lang="ts">
	import { CalendarClock, Clock, MapPin, Truck } from '@lucide/svelte';
	import { closedDayText, cutoffText, deliveryZones, site, usd } from '#lib/data/site.ts';
	import PageHero from '#lib/components/PageHero.svelte';
	import SlotPicker from '#lib/components/SlotPicker.svelte';
	import ZipChecker from '#lib/components/ZipChecker.svelte';
</script>

<svelte:head>
	<title>Delivery &amp; Pickup — SweetCrust Bakery &amp; Cafe</title>
	<meta name="description" content="Delivery and pickup at SweetCrust — time slots, delivery zones and fees, ZIP checker, same-day cut-off at 1 PM, closed Sundays, and holiday deadlines." />
</svelte:head>

<PageHero title="Delivery &amp; Pickup" eyebrow="Fresh, on time, in one piece" intro="Pickup and local delivery are how fresh cakes travel. Shipping is only for sturdy, shelf-stable treats — fresh pastries never go in a courier van for three days." />

<section class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
	<div class="grid gap-8 lg:grid-cols-2">
		<div>
			<h2 class="flex items-center gap-2 font-display text-3xl font-semibold text-choco"><CalendarClock size={24} aria-hidden="true" /> How slots work</h2>
			<ul class="mt-4 space-y-3 text-sm leading-relaxed text-muted">
				<li>· <strong class="text-ink">{cutoffText}.</strong> Order after 1 PM and the earliest slot is tomorrow.</li>
				<li>· <strong class="text-ink">Per-product lead time.</strong> Cakes need 2 days, tarts and tiramisu 1 day, pastries and bread are same-day. The longest lead time in your basket wins.</li>
				<li>· <strong class="text-ink">Capacity.</strong> Each 2-hour slot takes 20 orders. Fully booked days are shown as unavailable in text — never greyed out only.</li>
				<li>· <strong class="text-ink">{closedDayText}</strong> No pickup or delivery on Sundays, and no baking either.</li>
				<li>· <strong class="text-ink">Pickup holds.</strong> We hold your order for 2 hours past your slot, then we call you.</li>
			</ul>
			<div class="mt-6 rounded-3xl bg-white p-6 ring-1 ring-line">
				<h3 class="font-display text-xl font-semibold text-choco">Try the slot picker</h3>
				<p class="mt-1 text-sm text-muted">This is the same picker used in the basket and at checkout — with a 0-day lead time here, so you can see same-day slots.</p>
				<div class="mt-4"><SlotPicker leadDays={0} /></div>
			</div>
		</div>

		<div>
			<h2 class="flex items-center gap-2 font-display text-3xl font-semibold text-choco"><Truck size={24} aria-hidden="true" /> Delivery zones &amp; fees</h2>
			<div class="mt-4 overflow-hidden rounded-3xl ring-1 ring-line">
				<table class="w-full bg-white text-left text-sm">
					<thead>
						<tr class="bg-cream-deep text-choco">
							<th scope="col" class="px-5 py-3 font-bold">Area</th>
							<th scope="col" class="px-5 py-3 font-bold">Fee</th>
							<th scope="col" class="px-5 py-3 font-bold">Minimum</th>
						</tr>
					</thead>
					<tbody>
						{#each deliveryZones as z}
							<tr class="border-t border-line">
								<td class="px-5 py-3 font-semibold text-ink">{z.area}<span class="block text-xs font-normal text-muted">{z.note}</span></td>
								<td class="px-5 py-3 whitespace-nowrap font-bold text-choco">{usd(z.fee)}</td>
								<td class="px-5 py-3 whitespace-nowrap text-muted">{z.min === 0 ? '—' : usd(z.min)}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
			<p class="mt-3 text-sm text-muted">Delivery is free on all orders over $35 within Manhattan. Outside our zones, pickup from {site.addressShort} is always available.</p>
			<div class="mt-6"><ZipChecker /></div>
			<h3 class="mt-8 flex items-center gap-2 font-display text-2xl font-semibold text-choco"><MapPin size={20} aria-hidden="true" /> Pickup</h3>
			<p class="mt-2 text-sm leading-relaxed text-muted">Collect from {site.addressShort}, {site.hours}. Tell us your name at the counter; cakes travel in insulated boxes with a “this side up” promise. Curbside pickup is available — call {site.phoneDisplay} when you arrive.</p>
			<h3 class="mt-6 flex items-center gap-2 font-display text-2xl font-semibold text-choco"><Clock size={20} aria-hidden="true" /> Holiday deadlines</h3>
			<p class="mt-2 text-sm leading-relaxed text-muted">Christmas orders close Dec 18 for pickup Dec 23–24. Valentine’s orders close Feb 10 for pickup Feb 13–14. See the <a href="/seasonal" class="font-bold text-choco hover:underline">seasonal page</a> for the full collections.</p>
		</div>
	</div>
</section>
