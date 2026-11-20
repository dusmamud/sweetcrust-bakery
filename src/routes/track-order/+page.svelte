<script lang="ts">
	import { PackageSearch, Search } from '@lucide/svelte';
	import { mockOrders } from '#lib/data/site.ts';
	import PageHero from '#lib/components/PageHero.svelte';

	let orderId = $state('');
	let lookedUp = $state(false);
	let found = $state<(typeof mockOrders)[string] | null>(null);

	function lookup(e: SubmitEvent) {
		e.preventDefault();
		const key = orderId.trim().toUpperCase();
		found = mockOrders[key] ?? null;
		lookedUp = true;
	}
</script>

<svelte:head>
	<title>Track Order — SweetCrust Bakery &amp; Cafe</title>
	<meta name="description" content="Track your SweetCrust order by order reference — see whether it is being baked, out for delivery, or delivered." />
</svelte:head>

<PageHero title="Track Your Order" eyebrow="Where's my cake?" intro="Enter your order reference (for example SC-2026-1042) to see where your treats are. Mock lookup — try one of the sample orders below." />

<section class="mx-auto max-w-2xl px-4 py-10 sm:px-6">
	<form onsubmit={lookup} class="rounded-3xl bg-white p-6 ring-1 ring-line sm:p-8">
		<label for="order-id" class="text-sm font-bold text-ink">Order reference</label>
		<div class="mt-3 flex flex-col gap-3 sm:flex-row">
			<input
				id="order-id"
				type="text"
				required
				bind:value={orderId}
				placeholder="e.g. SC-2026-1042"
				class="min-h-12 flex-1 rounded-full border border-line bg-white px-5 text-base text-ink placeholder:text-muted"
			/>
			<button type="submit" class="flex min-h-12 items-center justify-center gap-2 rounded-full bg-choco px-7 text-sm font-bold text-white uppercase transition-colors duration-200 hover:bg-choco-deep">
				<Search size={17} aria-hidden="true" /> Track
			</button>
		</div>
		<p class="mt-4 text-sm text-muted">Try a sample order: <button type="button" onclick={() => { orderId = 'SC-2026-1042'; }} class="font-bold text-choco underline">SC-2026-1042</button> · <button type="button" onclick={() => { orderId = 'SC-2026-1038'; }} class="font-bold text-choco underline">SC-2026-1038</button> · <button type="button" onclick={() => { orderId = 'SC-2026-1021'; }} class="font-bold text-choco underline">SC-2026-1021</button></p>
	</form>

	{#if lookedUp}
		<div class="mt-6 rounded-3xl bg-white p-6 ring-1 ring-line sm:p-8" role="status">
			{#if found}
				<span class="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-choco-soft text-choco"><PackageSearch size={24} aria-hidden="true" /></span>
				<h2 class="mt-4 text-center font-display text-2xl font-semibold text-choco">{found.status}</h2>
				<dl class="mt-5 space-y-2 text-sm">
					<div class="flex justify-between gap-4"><dt class="text-muted">Order</dt><dd class="font-bold text-ink">{orderId.trim().toUpperCase()}</dd></div>
					<div class="flex justify-between gap-4"><dt class="text-muted">Items</dt><dd class="text-right font-semibold text-ink">{found.items}</dd></div>
					<div class="flex justify-between gap-4"><dt class="text-muted">Placed</dt><dd class="font-semibold text-ink">{found.placed}</dd></div>
					<div class="flex justify-between gap-4"><dt class="text-muted">Estimated</dt><dd class="font-semibold text-ink">{found.eta}</dd></div>
				</dl>
				<p class="mt-5 rounded-2xl bg-cream-deep p-4 text-center text-sm leading-relaxed text-muted">
					<strong class="text-ink">Courier:</strong> SweetCrust van · mock ETA {found.eta}. Status updates are sent by SMS and WhatsApp
					when enabled in your <a href="/account" class="font-bold text-choco">account</a> — demo only, nothing is really sent.
				</p>
				<p class="mt-3 rounded-2xl bg-cream-deep p-4 text-center text-sm text-muted">Questions? Call us at <a href="tel:+12345678900" class="font-bold text-choco">+1 234 567 8900</a> with your order reference.</p>
			{:else}
				<h2 class="text-center font-display text-2xl font-semibold text-choco">We could not find that order</h2>
				<p class="mx-auto mt-3 max-w-md text-center leading-relaxed text-muted">
					Check the reference and try again — it looks like <strong class="text-ink">SC-2026-XXXX</strong>.
					If you just ordered, give it a minute: our bakers confirm new orders by hand.
				</p>
			{/if}
		</div>
	{/if}
</section>
