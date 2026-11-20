<script lang="ts">
	// Promo code field (mock). Validates against the mock code list, shows
	// inline success/error, and never blocks checkout on an invalid code.
	import { Tag } from '@lucide/svelte';
	import { promo, applyPromo, clearPromo } from '#lib/promo.svelte.ts';
	import { promoCodes } from '#lib/data/site.ts';

	let input = $state('');
	let justApplied = $state(false);

	function submit(e: SubmitEvent) {
		e.preventDefault();
		if (applyPromo(input)) {
			justApplied = true;
			window.setTimeout(() => (justApplied = false), 2500);
		}
	}
</script>

<div class="rounded-2xl bg-cream-deep p-4 ring-1 ring-line">
	{#if promo.applied}
		<p class="flex flex-wrap items-center gap-2 text-sm font-bold text-choco" role="status">
			<Tag size={16} aria-hidden="true" />
			Code {promo.applied.code} applied — {promo.applied.note}
			<button type="button" onclick={clearPromo} class="ml-auto flex min-h-11 items-center rounded-full px-3 text-xs font-bold text-muted underline">Remove</button>
		</p>
	{:else}
		<form onsubmit={submit}>
			<label for="promo-code" class="flex items-center gap-2 text-sm font-bold text-ink">
				<Tag size={16} aria-hidden="true" class="text-caramel" /> Have a promo code?
			</label>
			<div class="mt-2 flex gap-2">
				<input
					id="promo-code"
					type="text"
					bind:value={input}
					placeholder="e.g. WELCOME10"
					autocomplete="off"
					aria-invalid={!!promo.error}
					aria-describedby={promo.error ? 'promo-err' : 'promo-hint'}
					class="min-h-12 min-w-0 flex-1 rounded-full border border-line bg-white px-5 text-base text-ink uppercase placeholder:normal-case placeholder:text-muted"
				/>
				<button type="submit" class="flex min-h-12 shrink-0 items-center rounded-full bg-choco px-6 text-sm font-bold text-white uppercase">Apply</button>
			</div>
			{#if promo.error}
				<p id="promo-err" class="mt-2 text-sm font-semibold text-choco" role="alert">{promo.error}</p>
			{:else if justApplied}
				<p class="mt-2 text-sm font-semibold text-choco" role="status">Promo code applied!</p>
			{:else}
				<p id="promo-hint" class="mt-2 text-xs text-muted">Try {promoCodes.map((c) => c.code).join(', ')} — demo codes, no real discounts.</p>
			{/if}
		</form>
	{/if}
</div>
