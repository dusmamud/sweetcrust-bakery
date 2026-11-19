<script lang="ts">
	import PageHero from '#lib/components/PageHero.svelte';
</script>

<svelte:head>
	<title>Shipping Policy — SweetCrust Bakery &amp; Cafe</title>
	<meta name="description" content="SweetCrust delivery and pickup policy: delivery within New York City, free over $35, and pickup from 123 Baker Street." />
</svelte:head>

<PageHero title="Shipping Policy" eyebrow="Delivery & pickup" intro="Fresh from our ovens to your door — carefully packed, clearly timed." />

<section class="mx-auto max-w-3xl px-4 py-10 sm:px-6">
	<div class="space-y-6 leading-relaxed text-muted">
		<div class="rounded-3xl bg-white p-6 ring-1 ring-line sm:p-8">
			<h2 class="font-display text-2xl font-semibold text-choco">Delivery</h2>
			<p class="mt-3">We deliver within New York City, Tuesday to Sunday, 9:00 AM to 7:00 PM. Delivery costs $4.95 and is free on orders over $35. Cakes travel in insulated boxes, flat and “this side up”, and your driver will call when they are five minutes away.</p>
			<p class="mt-3">Order by 2:00 PM for next-day delivery. Custom and tiered cakes need at least 7 days’ notice and are delivered by our own team, never by courier.</p>
		</div>
		<div class="rounded-3xl bg-white p-6 ring-1 ring-line sm:p-8">
			<h2 class="font-display text-2xl font-semibold text-choco">Pickup</h2>
			<p class="mt-3">Pickup is free from 123 Baker Street, New York, NY 10001. Choose your time slot at checkout and we will have your order boxed and ready. We hold pickup orders for up to 2 hours past your slot — after that, please call us.</p>
		</div>
		<div class="rounded-3xl bg-white p-6 ring-1 ring-line sm:p-8">
			<h2 class="font-display text-2xl font-semibold text-choco">Outside New York City</h2>
			<p class="mt-3">We do not ship cakes outside the city — cream, meringue and New York traffic do not mix well. For events outside the five boroughs, ask us about our catering team.</p>
		</div>
	</div>
</section>
