<script lang="ts">
	// Mock date + time-slot picker. Availability is deterministic per
	// date+slot (see #lib/fulfilment.ts): same-day by 1 PM, closed Sundays,
	// per-slot capacity shown in text — never greyed out only.
	// Dates are computed client-side after mount (prerender shows a note).
	import { cutoffText, closedDayText } from '#lib/data/site.ts';
	import { nextDays, type DaySlots } from '#lib/fulfilment.ts';
	import type { Fulfilment } from '#lib/cart.svelte.ts';

	let {
		leadDays = 0,
		value = null,
		onselect,
		compact = false
	}: {
		leadDays?: number;
		value?: Fulfilment;
		onselect?: (f: NonNullable<Fulfilment>) => void;
		compact?: boolean;
	} = $props();

	let mounted = $state(false);
	let days = $state<DaySlots[]>([]);
	let selectedDate = $state<string | null>(null);
	let selectedSlot = $state<string | null>(null);

	// Sync the pre-selected slot (e.g. chosen in the basket) after mount.
	$effect(() => {
		selectedDate = value?.date ?? null;
		selectedSlot = value?.slot ?? null;
	});

	$effect(() => {
		mounted = true;
		days = nextDays(leadDays, new Date(), 7);
	});

	const selectedDay = $derived(days.find((d) => d.iso === selectedDate) ?? null);
	const status = $derived(
		selectedDay && selectedSlot
			? `Selected: ${selectedDay.label}, ${selectedSlot}. We will have your order boxed and ready.`
			: `Pick a day, then a time slot. ${cutoffText}. ${closedDayText}`
	);

	function pickDay(iso: string) {
		selectedDate = iso;
		selectedSlot = null;
	}

	function pickSlot(day: DaySlots, slot: string) {
		selectedSlot = slot;
		onselect?.({ date: day.iso, label: day.label, slot });
	}
</script>

<div>
	{#if !mounted}
		<p class="rounded-2xl bg-cream-deep p-4 text-sm leading-relaxed text-muted ring-1 ring-line">
			Pick your date and time slot at the next step — {cutoffText.toLowerCase()}, closed Sundays.
			{#if leadDays > 0}This basket needs {leadDays} day{leadDays === 1 ? '' : 's'} of preparation, so the earliest date is shown first.{/if}
		</p>
	{:else}
		<fieldset>
			<legend class="text-sm font-bold text-ink">Choose a day</legend>
			<div class="mt-2 flex flex-wrap gap-2" role="group" aria-label="Pickup or delivery day">
				{#each days as day}
					<button
						type="button"
						onclick={() => pickDay(day.iso)}
						aria-pressed={selectedDate === day.iso}
						class="flex min-h-12 flex-col items-center justify-center rounded-2xl border px-4 py-1.5 text-sm font-semibold transition-colors duration-150 {selectedDate === day.iso
							? 'border-choco bg-choco text-white'
							: 'border-line bg-white text-ink hover:bg-cream-deep'}"
					>
						<span>{day.label}</span>
						<span class="text-xs font-normal opacity-80">{day.slots.filter((s) => s.available).length} of 4 slots open</span>
					</button>
				{/each}
			</div>
		</fieldset>

		{#if selectedDay}
			<fieldset class="mt-4">
				<legend class="text-sm font-bold text-ink">Choose a time slot — {selectedDay.label}</legend>
				<div class="mt-2 grid gap-2 {compact ? 'sm:grid-cols-2' : 'sm:grid-cols-2'}">
					{#each selectedDay.slots as s}
						<button
							type="button"
							disabled={!s.available}
							onclick={() => pickSlot(selectedDay, s.slot)}
							aria-pressed={selectedSlot === s.slot}
							class="flex min-h-12 flex-col items-start justify-center rounded-2xl border px-4 py-2 text-left text-sm font-semibold transition-colors duration-150 {s.available
								? selectedSlot === s.slot
									? 'border-choco bg-choco text-white'
									: 'border-line bg-white text-ink hover:bg-cream-deep'
								: 'cursor-not-allowed border-line bg-sand text-muted line-through'}"
						>
							<span>{s.slot}</span>
							<span class="text-xs font-normal {s.available ? 'opacity-80' : ''}">
								{s.available ? `${s.left} of 20 slots left` : 'Fully booked — try another slot'}
							</span>
						</button>
					{/each}
				</div>
			</fieldset>
		{/if}
	{/if}
	<p class="mt-3 text-sm text-muted" role="status" aria-live="polite">{status}</p>
</div>
