<script lang="ts">
	import { Cake, Check, Gift, PartyPopper } from '@lucide/svelte';
	import { loyaltyRewards, site } from '#lib/data/site.ts';
	import { account } from '#lib/account.svelte.ts';
	import PageHero from '#lib/components/PageHero.svelte';

	let name = $state('');
	let email = $state('');
	let done = $state(false);
	let ref = $state('');

	// Your real (mock) progress when signed in — one stamp per order placed.
	// Signed out, we show Maya's card, a regular since March.
	const stamps = $derived(account.user?.stamps ?? 5);
	const cardOwner = $derived(account.user ? 'Your card' : 'This is Maya’s card — a regular since March.');
	const totalStamps = 16;

	function submit(e: SubmitEvent) {
		e.preventDefault();
		ref = `SC-LOYAL-${Math.floor(1000 + Math.random() * 9000)}`;
		done = true;
	}
</script>

<svelte:head>
	<title>Loyalty — SweetCrust Bakery &amp; Cafe</title>
	<meta name="description" content="SweetCrust loyalty stamp card — one stamp per visit, free pastry after 8 stamps, free celebration cake after 16, plus a birthday treat. No app download." />
</svelte:head>

<PageHero title="SweetCrust Loyalty" eyebrow="Stamps, not apps" intro="One stamp per visit, a free pastry after 8, a free celebration cake after 16 — plus a birthday treat. No app to download, no points to do maths with." />

<section class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
	<div class="grid gap-10 lg:grid-cols-5">
		<div class="lg:col-span-3">
			<div class="rounded-3xl bg-white p-6 ring-1 ring-line sm:p-8">
				<h2 class="font-display text-2xl font-semibold text-choco">Your stamp card</h2>
				<p class="mt-2 text-sm text-muted">{cardOwner} {stamps} of {totalStamps} stamps so far{#if stamps < 8}, and a free pastry is {8 - stamps} visit{8 - stamps === 1 ? '' : 's'} away{:else if stamps < 16}, and a free 6" cake is {16 - stamps} visit{16 - stamps === 1 ? '' : 's'} away{/if}.</p>
				<div class="mt-6 grid grid-cols-4 gap-3 sm:grid-cols-8" role="img" aria-label="Stamp card: {stamps} of 16 stamps collected">
					{#each Array.from({ length: totalStamps }, (_, i) => i) as i}
						<div class="flex aspect-square items-center justify-center rounded-2xl {i < stamps ? 'bg-choco text-white' : 'bg-cream-deep text-muted ring-1 ring-line'}">
							{#if i < stamps}
								<Cake size={22} aria-hidden="true" />
							{:else}
								<span class="text-sm font-bold">{i + 1}</span>
							{/if}
						</div>
					{/each}
				</div>
				<div class="mt-4 h-2 overflow-hidden rounded-full bg-sand">
					<div class="h-full rounded-full bg-choco" style="width: {(stamps / totalStamps) * 100}%"></div>
				</div>
				<p class="mt-2 text-sm text-muted">{stamps} of {totalStamps} stamps · next reward at 8 stamps</p>
			</div>

			<div class="mt-6 overflow-hidden rounded-3xl ring-1 ring-line">
				<table class="w-full bg-white text-left text-sm">
					<thead>
						<tr class="bg-cream-deep text-choco">
							<th scope="col" class="px-5 py-3 font-bold">Stamps</th>
							<th scope="col" class="px-5 py-3 font-bold">Reward</th>
						</tr>
					</thead>
					<tbody>
						{#each loyaltyRewards as r}
							<tr class="border-t border-line">
								<td class="px-5 py-3 font-bold whitespace-nowrap text-ink">{r.stamps} stamps</td>
								<td class="px-5 py-3 text-muted">{r.reward}</td>
							</tr>
						{/each}
						<tr class="border-t border-line">
							<td class="px-5 py-3 font-bold whitespace-nowrap text-ink">Birthday</td>
							<td class="px-5 py-3 text-muted">A free cupcake and a candle, on us — every year, in your birthday week.</td>
						</tr>
					</tbody>
				</table>
			</div>

			<div class="mt-6 grid gap-4 sm:grid-cols-3">
				{#each [['No app', 'Your card lives in your phone’s wallet, or on a paper card at the counter.'], ['Double stamp days', 'Slow Tuesdays are double-stamp days — the queue is shorter and the stamps are faster.'], ['Stamps never expire', 'Come back in a year and your stamps are still there. Cake waits.']] as [h, p]}
					<div class="rounded-2xl bg-white p-5 ring-1 ring-line">
						<h2 class="font-display text-xl font-semibold text-choco">{h}</h2>
						<p class="mt-2 text-sm leading-relaxed text-muted">{p}</p>
					</div>
				{/each}
			</div>
		</div>

		<div class="lg:col-span-2">
			{#if done}
				<div class="rounded-3xl bg-white p-8 text-center ring-1 ring-line sm:p-10" role="status">
					<span class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-choco-soft text-choco"><Gift size={28} aria-hidden="true" /></span>
					<h2 class="mt-5 font-display text-3xl font-semibold text-choco">You’re in, {name || 'friend'}!</h2>
					<p class="mx-auto mt-3 max-w-md leading-relaxed text-muted">Your digital stamp card is on its way to {email || 'your email'}. Show it at the counter on your next visit for your first stamp.</p>
					<p class="mt-5 inline-block rounded-full bg-cream-deep px-5 py-2.5 font-bold text-choco ring-1 ring-line">Card: {ref}</p>
				</div>
			{:else}
				<form onsubmit={submit} class="rounded-3xl bg-white p-6 ring-1 ring-line sm:p-8">
					<h2 class="font-display text-2xl font-semibold text-choco">Join the stamp card</h2>
					<p class="mt-2 text-sm text-muted">Free, forever. One stamp per visit, starting today.</p>
					<div class="mt-6 grid gap-5">
						<div>
							<label for="name" class="text-sm font-bold text-ink">Your name</label>
							<input id="name" type="text" autocomplete="name" required bind:value={name} placeholder="Your full name" class="mt-2 min-h-12 w-full rounded-full border border-line bg-white px-5 text-base text-ink placeholder:text-muted" />
						</div>
						<div>
							<label for="email" class="text-sm font-bold text-ink">Email</label>
							<input id="email" type="email" autocomplete="email" required bind:value={email} placeholder="you@example.com" class="mt-2 min-h-12 w-full rounded-full border border-line bg-white px-5 text-base text-ink placeholder:text-muted" />
						</div>
					</div>
					<button type="submit" class="mt-7 flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-choco px-7 text-sm font-bold text-white uppercase transition-colors duration-200 hover:bg-choco-deep">
						<Check size={17} aria-hidden="true" /> Get my stamp card
					</button>
					<p class="mt-3 text-center text-xs text-muted">Mock form — no card is actually issued. Or just ask at the counter: {site.phoneDisplay}.</p>
				</form>
			{/if}
		</div>
	</div>
</section>
