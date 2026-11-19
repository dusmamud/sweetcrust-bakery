<script lang="ts">
	import { Check, Gift, PartyPopper } from '@lucide/svelte';
	import { giftCardDenominations, usd } from '#lib/data/site.ts';
	import PageHero from '#lib/components/PageHero.svelte';
	import Picture from '#lib/components/Picture.svelte';

	let amount = $state(50);
	let kind = $state<'Digital' | 'Physical'>('Digital');
	let recipient = $state('');
	let recipientEmail = $state('');
	let message = $state('');
	let buyer = $state('');
	let done = $state(false);
	let code = $state('');

	function submit(e: SubmitEvent) {
		e.preventDefault();
		code = `SC-GIFT-${Math.floor(1000 + Math.random() * 9000)}`;
		done = true;
	}
</script>

<svelte:head>
	<title>Gift Cards — SweetCrust Bakery &amp; Cafe</title>
	<meta name="description" content="SweetCrust gift cards from $25 — digital or physical, redeemable in store and online, never expires. The easiest impressive gift we sell." />
</svelte:head>

<PageHero title="Gift Cards" eyebrow="Give something sweet" intro="Digital or physical, from $25 to $150, redeemable in store and online. Gift cards never expire — and neither does cake." />

<section class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
	<div class="grid gap-10 lg:grid-cols-5">
		<div class="lg:col-span-2">
			<div class="overflow-hidden rounded-3xl ring-1 ring-line">
				<Picture
					name="gift-card"
					alt="Elegant bakery gift card with a small cake and ribbon"
					width={1200}
					height={800}
					eager
					sizes="(min-width: 1024px) 40vw, 100vw"
					imgClass="aspect-[3/2] w-full object-cover"
				/>
			</div>
			<div class="mt-6 space-y-4">
				{#each [['Digital', 'Sent by email within minutes — perfect for last-minute birthdays. The code works online and in store.'], ['Physical', 'A beautiful card in a gift envelope, posted or collected in store. Add a handwritten note and we will write it for you.'], ['No expiry, no fees', 'The full value stays on the card until it is spent. Partial use is fine — the balance carries over.']] as [h, p]}
					<div class="rounded-2xl bg-white p-5 ring-1 ring-line">
						<h2 class="font-display text-xl font-semibold text-choco">{h}</h2>
						<p class="mt-2 text-sm leading-relaxed text-muted">{p}</p>
					</div>
				{/each}
			</div>
		</div>

		<div class="lg:col-span-3">
			{#if done}
				<div class="rounded-3xl bg-white p-8 text-center ring-1 ring-line sm:p-10" role="status">
					<span class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-choco-soft text-choco"><Gift size={28} aria-hidden="true" /></span>
					<h2 class="mt-5 font-display text-3xl font-semibold text-choco">Your gift card is ready!</h2>
					<p class="mx-auto mt-3 max-w-md leading-relaxed text-muted">
						A {usd(amount)} {kind.toLowerCase()} gift card for {recipient || 'your lucky recipient'}
						{#if kind === 'Digital' && recipientEmail} — sent to {recipientEmail}{/if}.
						{#if message}With your message: “{message}”{/if}
					</p>
					<p class="mt-5 inline-block rounded-full bg-cream-deep px-5 py-2.5 font-bold text-choco ring-1 ring-line">Gift card code: {code}</p>
					<p class="mt-3 text-sm text-muted">Mock purchase — no payment is taken. In the real shop, this code would be emailed to the recipient.</p>
					<div class="mt-7 flex flex-wrap justify-center gap-3">
						<a href="/shop" class="inline-flex min-h-12 items-center rounded-full bg-choco px-7 text-sm font-bold text-white uppercase">Shop treats</a>
					</div>
				</div>
			{:else}
				<form onsubmit={submit} class="rounded-3xl bg-white p-6 ring-1 ring-line sm:p-8">
					<h2 class="font-display text-2xl font-semibold text-choco">Send a gift card</h2>
					<fieldset class="mt-5">
						<legend class="text-sm font-bold text-ink">Amount</legend>
						<div class="mt-2 flex flex-wrap gap-2">
							{#each giftCardDenominations as d}
								<label
									class="flex min-h-12 cursor-pointer items-center rounded-full border px-6 text-sm font-bold transition-colors duration-150 {amount === d
										? 'border-choco bg-choco text-white'
										: 'border-line bg-white text-ink hover:bg-cream-deep'}"
								>
									<input type="radio" name="amount" value={d} checked={amount === d} onchange={() => (amount = d)} class="sr-only" />
									{usd(d)}
								</label>
							{/each}
						</div>
					</fieldset>
					<fieldset class="mt-5">
						<legend class="text-sm font-bold text-ink">Digital or physical?</legend>
						<div class="mt-2 flex flex-wrap gap-2">
							{#each ['Digital', 'Physical'] as k}
								<label
									class="flex min-h-12 cursor-pointer items-center rounded-full border px-6 text-sm font-bold transition-colors duration-150 {kind === k
										? 'border-choco bg-choco text-white'
										: 'border-line bg-white text-ink hover:bg-cream-deep'}"
								>
									<input type="radio" name="kind" value={k} checked={kind === k} onchange={() => (kind = k as 'Digital' | 'Physical')} class="sr-only" />
									{k}
								</label>
							{/each}
						</div>
					</fieldset>
					<div class="mt-5 grid gap-5 sm:grid-cols-2">
						<div>
							<label for="recipient" class="text-sm font-bold text-ink">Recipient’s name</label>
							<input id="recipient" type="text" required bind:value={recipient} placeholder="Who is it for?" class="mt-2 min-h-12 w-full rounded-full border border-line bg-white px-5 text-base text-ink placeholder:text-muted" />
						</div>
						<div>
							<label for="buyer" class="text-sm font-bold text-ink">Your name</label>
							<input id="buyer" type="text" autocomplete="name" required bind:value={buyer} placeholder="From…" class="mt-2 min-h-12 w-full rounded-full border border-line bg-white px-5 text-base text-ink placeholder:text-muted" />
						</div>
						{#if kind === 'Digital'}
							<div class="sm:col-span-2">
								<label for="recipient-email" class="text-sm font-bold text-ink">Recipient’s email</label>
								<input id="recipient-email" type="email" autocomplete="email" required bind:value={recipientEmail} placeholder="them@example.com" class="mt-2 min-h-12 w-full rounded-full border border-line bg-white px-5 text-base text-ink placeholder:text-muted" />
							</div>
						{/if}
						<div class="sm:col-span-2">
							<label for="message" class="text-sm font-bold text-ink">Message on the card (optional)</label>
							<input id="message" type="text" bind:value={message} maxlength={120} placeholder="Happy birthday — cake is on me!" class="mt-2 min-h-12 w-full rounded-full border border-line bg-white px-5 text-base text-ink placeholder:text-muted" />
						</div>
					</div>
					<button type="submit" class="mt-7 flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-choco px-7 text-sm font-bold text-white uppercase transition-colors duration-200 hover:bg-choco-deep">
						<Check size={17} aria-hidden="true" /> Send {usd(amount)} gift card
					</button>
					<p class="mt-3 text-center text-xs text-muted">Mock purchase — no payment is taken.</p>
				</form>
			{/if}
		</div>
	</div>
</section>
