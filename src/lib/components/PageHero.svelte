<script lang="ts">
	let { title, eyebrow = '', intro = '' }: { title: string; eyebrow?: string; intro?: string } = $props();
</script>

<section class="bg-cream-deep">
	<div class="mx-auto max-w-7xl px-4 py-12 text-center sm:px-6 sm:py-16 lg:px-8">
		{#if eyebrow}<p class="text-xs font-bold tracking-[0.25em] text-caramel uppercase">{eyebrow}</p>{/if}
		<h1 class="mt-3 font-display text-4xl leading-tight font-semibold text-choco sm:text-5xl">{title}</h1>
		{#if intro}<p class="mx-auto mt-4 max-w-2xl leading-relaxed text-muted">{intro}</p>{/if}
	</div>
</section>
