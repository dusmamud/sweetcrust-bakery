<script lang="ts">
	import PageHero from '#lib/components/PageHero.svelte';
	import CustomCakeContent from '#lib/components/CustomCakeContent.svelte';
</script>

<svelte:head>
	<title>Custom Cakes — SweetCrust Bakery &amp; Cafe</title>
	<meta name="description" content="Custom cakes for birthdays, weddings and anniversaries — flavours, sizes with starting prices, lead times and deposit rules, plus a structured order form." />
</svelte:head>

<PageHero title="Custom Cakes" eyebrow="Your ideas, our creations" intro="Birthdays, weddings, anniversaries and everything worth celebrating — tell us your idea and we will bake it into a cake. Custom cakes need at least 7 days’ notice." />

<CustomCakeContent />
