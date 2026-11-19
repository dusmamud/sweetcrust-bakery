<script lang="ts">
	import { slide } from 'svelte/transition';
	import { ChevronDown } from '@lucide/svelte';
	import type { FaqItem } from '#lib/data/site.ts';

	let { items, idPrefix = 'faq' }: { items: FaqItem[]; idPrefix?: string } = $props();
	let openIndex = $state(0);
</script>

<div class="divide-y divide-line rounded-3xl bg-white ring-1 ring-line">
	{#each items as item, i}
		<div>
			<h3>
				<button
					type="button"
					class="flex min-h-14 w-full items-center justify-between gap-4 px-5 py-4 text-left font-semibold text-ink transition-colors duration-150 hover:text-gold-dark sm:px-6"
					aria-expanded={openIndex === i}
					aria-controls="{idPrefix}-panel-{i}"
					id="{idPrefix}-button-{i}"
					onclick={() => (openIndex = openIndex === i ? -1 : i)}
				>
					<span>{item.q}</span>
					<ChevronDown
						size={20}
						class="shrink-0 text-gold-dark transition-transform duration-200 {openIndex === i
							? 'rotate-180'
							: ''}"
						aria-hidden="true"
					/>
				</button>
			</h3>
			{#if openIndex === i}
				<div
					id="{idPrefix}-panel-{i}"
					role="region"
					aria-labelledby="{idPrefix}-button-{i}"
					transition:slide={{ duration: 200 }}
				>
					<p class="px-5 pb-5 leading-relaxed text-muted sm:px-6">{item.a}</p>
				</div>
			{/if}
		</div>
	{/each}
</div>
