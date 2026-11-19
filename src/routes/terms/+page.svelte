<script lang="ts">
	import PageHero from '#lib/components/PageHero.svelte';
</script>

<svelte:head>
	<title>Terms &amp; Conditions — SweetCrust Bakery &amp; Cafe</title>
	<meta name="description" content="Terms and conditions for ordering from SweetCrust Bakery & Cafe." />
</svelte:head>

<PageHero title="Terms & Conditions" eyebrow="The fine print" intro="Last updated: November 2026. These terms cover ordering, payment and use of this website." />

<section class="mx-auto max-w-3xl px-4 py-10 sm:px-6">
	<div class="space-y-6 leading-relaxed text-muted">
		{#each [['Ordering', 'All orders are subject to availability. Custom cakes require confirmation by phone before baking begins. Prices are in US dollars and include applicable taxes.'], ['Payment', 'Payment is taken at checkout for standard orders. Custom cakes require a 50% deposit, with the balance due on pickup or delivery.'], ['Allergies & dietary needs', 'Our kitchen handles wheat, eggs, milk, nuts, soy and sesame. While we take care with eggless, gluten-free and vegan orders, we cannot guarantee a completely allergen-free environment. Please tell us about allergies before ordering.'], ['Website content', 'All photos, prices and descriptions on this website are for illustration. We may update menus, prices and opening hours without notice.'], ['Limitation of liability', 'Our liability for any order is limited to the price paid for that order. Nothing in these terms limits liability that cannot be limited by law.']] as [h, p]}
			<div class="rounded-3xl bg-white p-6 ring-1 ring-line sm:p-8">
				<h2 class="font-display text-2xl font-semibold text-choco">{h}</h2>
				<p class="mt-3">{p}</p>
			</div>
		{/each}
	</div>
</section>
