<script lang="ts">
	// /custom-orders now shows the same dedicated custom-cakes page —
	// the old URL keeps working (bookmarks, footer links, the reference).
	import PageHero from '#lib/components/PageHero.svelte';
	import CustomCakeContent from '#lib/components/CustomCakeContent.svelte';
</script>

<svelte:head>
	<title>Custom Orders — SweetCrust Bakery &amp; Cafe</title>
	<meta name="description" content="Order a custom cake for your birthday, wedding or anniversary. Choose the occasion, size, flavour and message — we bake your idea into a cake." />
</svelte:head>

<PageHero title="Custom Orders" eyebrow="Your ideas, our creations" intro="Birthdays, weddings, anniversaries and everything worth celebrating — tell us your idea and we will bake it into a cake. Custom cakes need at least 7 days’ notice." />

<CustomCakeContent />
