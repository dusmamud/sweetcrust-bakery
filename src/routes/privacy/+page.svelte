<script lang="ts">
	import PageHero from '#lib/components/PageHero.svelte';
</script>

<svelte:head>
	<title>Privacy Policy — SweetCrust Bakery &amp; Cafe</title>
	<meta name="description" content="Privacy policy for SweetCrust Bakery & Cafe — what information we collect and how we use it." />
</svelte:head>

<PageHero title="Privacy Policy" eyebrow="Your data, respected" intro="Last updated: November 2026. We collect only what we need to bake your cake and get it to you." />

<section class="mx-auto max-w-3xl px-4 py-10 sm:px-6">
	<div class="space-y-6 leading-relaxed text-muted">
		{#each [['What we collect', 'When you order, we collect your name, phone number, email and delivery address, plus your order details. When you subscribe to our newsletter, we collect your email address.'], ['How we use it', 'We use your details to prepare and deliver your order, confirm custom cakes by phone, and send the emails you asked for. We never sell your information to anyone.'], ['Cookies', 'This website uses only the cookies needed to run the shop — your basket and your preferences. We do not run third-party advertising trackers.'], ['Your rights', 'You can ask us at any time to see, correct or delete the information we hold about you, or to stop sending you marketing emails. Email hello@sweetcrustbakery.com and we will help.'], ['Contact', 'SweetCrust Bakery & Cafe, 123 Baker Street, New York, NY 10001 · hello@sweetcrustbakery.com · +1 234 567 8900.']] as [h, p]}
			<div class="rounded-3xl bg-white p-6 ring-1 ring-line sm:p-8">
				<h2 class="font-display text-2xl font-semibold text-choco">{h}</h2>
				<p class="mt-3">{p}</p>
			</div>
		{/each}
	</div>
</section>
