<script lang="ts">
	// Mock delivery-zone checker: first 3 ZIP digits decide the zone.
	import { checkZip } from '#lib/fulfilment.ts';

	let zip = $state('');
	let result = $state<{ ok: boolean; message: string } | null>(null);

	function check(e: SubmitEvent) {
		e.preventDefault();
		result = checkZip(zip);
	}
</script>

<form onsubmit={check} class="rounded-3xl bg-white p-5 ring-1 ring-line sm:p-6">
	<label for="zip-check" class="font-display text-xl font-semibold text-choco">Do we deliver to you?</label>
	<p class="mt-1 text-sm text-muted">Enter your ZIP code to see delivery fees and minimums for your area.</p>
	<div class="mt-4 flex gap-2">
		<input
			id="zip-check"
			type="text"
			inputmode="numeric"
			autocomplete="postal-code"
			bind:value={zip}
			placeholder="e.g. 10001"
			maxlength={10}
			class="min-h-12 min-w-0 flex-1 rounded-full border border-line bg-white px-5 text-base text-ink placeholder:text-muted"
		/>
		<button
			type="submit"
			class="flex min-h-12 shrink-0 items-center rounded-full bg-choco px-6 text-sm font-bold text-white uppercase transition-colors duration-200 hover:bg-choco-deep"
		>
			Check
		</button>
	</div>
	{#if result}
		<p class="mt-3 rounded-2xl px-4 py-3 text-sm leading-relaxed {result.ok ? 'bg-choco-soft text-choco' : 'bg-cream-deep text-muted'}" role="status" aria-live="polite">
			{result.message}
		</p>
	{/if}
	<p class="mt-3 text-xs text-muted">Try 10001 (Manhattan), 11215 (Brooklyn) or 99999 (outside our delivery area — pickup still works).</p>
</form>
