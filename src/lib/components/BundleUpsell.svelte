<script lang="ts">
	// Frequently bought together: bundle add-ons (candles, card, gift wrap,
	// coffee) with one-tap add. All mock — add-ons join the basket as lines.
	import { Check, Gift, Plus } from '@lucide/svelte';
	import { productAddons, usd } from '#lib/data/site.ts';
	import { addAddon } from '#lib/cart.svelte.ts';
	import Picture from './Picture.svelte';

	let { title = 'Complete the celebration' }: { title?: string } = $props();
	let added = $state<Record<string, boolean>>({});

	function onAdd(slug: string) {
		const addon = productAddons.find((a) => a.slug === slug);
		if (!addon) return;
		addAddon(addon);
		added = { ...added, [slug]: true };
		window.setTimeout(() => {
			added = { ...added, [slug]: false };
		}, 1800);
	}
</script>

<section aria-labelledby="bundle-title" class="rounded-3xl bg-white p-6 ring-1 ring-line sm:p-8">
	<h2 id="bundle-title" class="flex items-center gap-2 font-display text-2xl font-semibold text-choco">
		<Gift size={22} aria-hidden="true" class="text-caramel" /> {title}
	</h2>
	<p class="mt-2 text-sm leading-relaxed text-muted">The little extras that make a cake feel like a celebration — added to your basket in one tap.</p>
	<ul class="mt-5 grid gap-3 sm:grid-cols-2">
		{#each productAddons as addon}
			<li class="flex min-w-0 items-center gap-3 rounded-2xl bg-cream-deep p-3 ring-1 ring-line">
				<Picture name={addon.image} alt={addon.imageAlt} width={160} height={160} imgClass="h-14 w-14 shrink-0 rounded-xl object-cover" />
				<div class="min-w-0 flex-1">
					<p class="truncate font-bold text-ink">{addon.name}</p>
					<p class="truncate text-xs text-muted">{addon.detail}</p>
					<p class="mt-0.5 text-sm font-bold text-choco">{usd(addon.price)}</p>
				</div>
				<button
					type="button"
					onclick={() => onAdd(addon.slug)}
					aria-label="Add {addon.name} to basket"
					class="flex min-h-12 shrink-0 items-center gap-1.5 rounded-full bg-choco px-4 text-sm font-bold text-white transition-colors duration-150 hover:bg-choco-deep"
				>
					{#if added[addon.slug]}<Check size={16} aria-hidden="true" /> Added{:else}<Plus size={16} aria-hidden="true" /> Add{/if}
				</button>
			</li>
		{/each}
	</ul>
</section>
