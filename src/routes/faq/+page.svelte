<script lang="ts">
	import { faqs } from '#lib/data/site.ts';
	import PageHero from '#lib/components/PageHero.svelte';
	import FaqAccordion from '#lib/components/FaqAccordion.svelte';
</script>

<svelte:head>
	<title>FAQs — SweetCrust Bakery &amp; Cafe</title>
	<meta name="description" content="Frequently asked questions about SweetCrust orders, custom cakes, delivery, dietary options and cancellations." />
</svelte:head>

<PageHero title="Frequently Asked Questions" eyebrow="Good to know" intro="Everything about ordering, delivery, custom cakes and dietary options. Still curious? Call us at +1 234 567 8900." />

<section class="mx-auto max-w-3xl px-4 py-10 sm:px-6">
	<FaqAccordion items={faqs} />
	<div class="mt-8 rounded-3xl bg-cream-deep p-6 text-center ring-1 ring-line">
		<p class="font-display text-2xl font-semibold text-choco">Still have a question?</p>
		<p class="mt-2 text-muted">We reply within one working day.</p>
		<a href="/contact" class="mt-5 inline-flex min-h-12 items-center rounded-full bg-choco px-7 text-sm font-bold text-white uppercase">Contact us</a>
	</div>
</section>
