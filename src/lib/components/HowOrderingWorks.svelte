<script lang="ts">
	import { CalendarClock, Cake, ShoppingBag, Truck } from '@lucide/svelte';
	import { cutoffText } from '#lib/data/site.ts';

	const steps = [
		{ Icon: Cake, title: '1 · Choose your treats', text: 'Pick a cake, pastry or box — choose size, flavour and a message on top.' },
		{ Icon: CalendarClock, title: '2 · Pick a date & slot', text: `Choose your pickup or delivery day and time slot. ${cutoffText}.` },
		{ Icon: ShoppingBag, title: '3 · Checkout in a minute', text: 'Guest checkout, no account needed. All fees shown before you pay — no surprises.' },
		{ Icon: Truck, title: '4 · Pickup or delivery', text: 'We box it, chill it and call you when we are five minutes away.' }
	];
</script>

<section class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8" aria-labelledby="how-title">
	<div class="text-center">
		<p class="text-xs font-bold tracking-[0.3em] text-caramel uppercase">— Easy as cake —</p>
		<h2 id="how-title" class="mt-3 font-display text-3xl font-semibold text-choco sm:text-4xl">How Ordering Works</h2>
		<p class="mx-auto mt-3 max-w-xl leading-relaxed text-muted">From craving to cake in four simple steps — and we are closed Sundays, so plan around the ovens’ day off.</p>
	</div>
	<ol class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
		{#each steps as { Icon, title, text }}
			<li class="reveal rounded-3xl bg-white p-6 ring-1 ring-line">
				<span class="flex h-12 w-12 items-center justify-center rounded-full bg-choco-soft text-choco"><Icon size={22} aria-hidden="true" /></span>
				<h3 class="mt-4 font-display text-xl font-semibold text-choco">{title}</h3>
				<p class="mt-2 text-sm leading-relaxed text-muted">{text}</p>
			</li>
		{/each}
	</ol>
</section>
