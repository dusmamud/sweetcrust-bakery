<script lang="ts">
	// Corporate gifting & bulk orders (mock). Hampers, branded cards, tiered
	// volume pricing, festive lead times, enquiry form (mock confirmation).
	import { Check, Gift, PartyPopper } from '@lucide/svelte';
	import { corporateHampers, corporateTiers, usd } from '#lib/data/site.ts';
	import PageHero from '#lib/components/PageHero.svelte';
	import Picture from '#lib/components/Picture.svelte';

	let company = $state('');
	let email = $state('');
	let count = $state('25');
	let message = $state('');
	let done = $state(false);
	let ref = $state('');

	function submit(e: SubmitEvent) {
		e.preventDefault();
		ref = `SC-CORP-${Math.floor(1000 + Math.random() * 9000)}`;
		done = true;
	}
</script>

<svelte:head>
	<title>Corporate Gifting — SweetCrust Bakery &amp; Cafe</title>
	<meta name="description" content="Corporate hampers and bulk gifting from SweetCrust — branded cards, tiered volume pricing, festive lead times and scheduled delivery in New York." />
</svelte:head>

<PageHero title="Corporate Gifting" eyebrow="For teams & clients" intro="Hampers, snack boxes and celebration cakes for your people — with your branding on the card, and delivery on your schedule." />

<section class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
	<div class="grid gap-10 lg:grid-cols-5">
		<div class="min-w-0 space-y-8 lg:col-span-3">
			<div class="overflow-hidden rounded-3xl ring-1 ring-line">
				<Picture name="corporate-hamper" alt="Corporate gift hamper with macarons, cookies, a mini cake and a branded card" width={1200} height={800} eager sizes="(min-width: 1024px) 60vw, 100vw" imgClass="aspect-[3/2] w-full object-cover" />
			</div>

			<div>
				<h2 class="font-display text-3xl font-semibold text-choco">Hampers &amp; boxes</h2>
				<div class="mt-5 grid gap-4 sm:grid-cols-3">
					{#each corporateHampers as h}
						<article class="rounded-3xl bg-white p-5 ring-1 ring-line">
							<Gift size={20} class="text-caramel" aria-hidden="true" />
							<h3 class="mt-3 font-display text-xl font-semibold text-choco">{h.name}</h3>
							<p class="mt-2 text-sm leading-relaxed text-muted">{h.detail}</p>
							<p class="mt-3 font-bold text-ink">From {usd(h.price)} <span class="text-sm font-normal text-muted">each</span></p>
						</article>
					{/each}
				</div>
			</div>

			<div>
				<h2 class="font-display text-3xl font-semibold text-choco">Volume pricing</h2>
				<p class="mt-2 text-sm leading-relaxed text-muted">The more hampers, the better the price — and every order includes branded message cards.</p>
				<div class="mt-5 overflow-x-auto rounded-3xl bg-white ring-1 ring-line">
					<table class="w-full min-w-[480px] text-left text-sm">
						<thead>
							<tr class="border-b border-line text-xs tracking-wider text-muted uppercase">
								<th scope="col" class="px-5 py-4">Quantity</th>
								<th scope="col" class="px-5 py-4">Discount</th>
								<th scope="col" class="px-5 py-4">Includes</th>
							</tr>
						</thead>
						<tbody>
							{#each corporateTiers as t}
								<tr class="border-b border-line/60 last:border-0">
									<td class="px-5 py-4 font-bold text-ink">{t.orders}</td>
									<td class="px-5 py-4 font-bold text-choco">{t.discount}</td>
									<td class="px-5 py-4 text-muted">{t.note}</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			</div>

			<div class="rounded-3xl bg-white p-6 ring-1 ring-line sm:p-8">
				<h2 class="font-display text-2xl font-semibold text-choco">Festive lead times</h2>
				<ul class="mt-3 space-y-2 text-sm leading-relaxed text-muted">
					<li>· <strong class="text-ink">Christmas:</strong> order by Dec 1 for delivery Dec 15–23. Large orders (50+) by Nov 20.</li>
					<li>· <strong class="text-ink">Valentine’s &amp; year-end:</strong> 3–4 weeks ahead for 50+ hampers.</li>
					<li>· <strong class="text-ink">Invoices &amp; POs:</strong> we invoice net-30 for established companies — ask in the enquiry.</li>
					<li>· <strong class="text-ink">Delivery:</strong> scheduled drops across Manhattan, Brooklyn and Queens; pickup from 123 Baker Street works too.</li>
				</ul>
			</div>
		</div>

		<div class="min-w-0 lg:col-span-2">
			{#if done}
				<div class="rounded-3xl bg-white p-8 text-center ring-1 ring-line sm:p-10" role="status">
					<span class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-choco-soft text-choco"><PartyPopper size={28} aria-hidden="true" /></span>
					<h2 class="mt-5 font-display text-3xl font-semibold text-choco">Enquiry received!</h2>
					<p class="mx-auto mt-3 max-w-md leading-relaxed text-muted">
						Thank you, {company || 'friend'}! We will send a quote for {count} hampers to {email || 'your inbox'} within
						two working days.
					</p>
					<p class="mt-5 inline-block rounded-full bg-cream-deep px-5 py-2.5 font-bold text-choco ring-1 ring-line">Reference: {ref}</p>
				</div>
			{:else}
				<form onsubmit={submit} class="rounded-3xl bg-white p-6 ring-1 ring-line sm:p-8 lg:sticky lg:top-32">
					<h2 class="font-display text-2xl font-semibold text-choco">Get a quote</h2>
					<p class="mt-2 text-sm text-muted">Tell us what you need — we reply within two working days.</p>
					<div class="mt-5 space-y-5">
						<div>
							<label for="corp-company" class="text-sm font-bold text-ink">Company</label>
							<input id="corp-company" type="text" autocomplete="organization" required bind:value={company} placeholder="Your company" class="mt-2 min-h-12 w-full rounded-full border border-line bg-white px-5 text-base text-ink placeholder:text-muted" />
						</div>
						<div>
							<label for="corp-email" class="text-sm font-bold text-ink">Work email</label>
							<input id="corp-email" type="email" autocomplete="email" required bind:value={email} placeholder="you@company.com" class="mt-2 min-h-12 w-full rounded-full border border-line bg-white px-5 text-base text-ink placeholder:text-muted" />
						</div>
						<div>
							<label for="corp-count" class="text-sm font-bold text-ink">How many hampers?</label>
							<select id="corp-count" bind:value={count} class="mt-2 min-h-12 w-full rounded-full border border-line bg-white px-4 text-base text-ink">
								{#each ['10', '25', '50', '100+'] as n}<option>{n}</option>{/each}
							</select>
						</div>
						<div>
							<label for="corp-message" class="text-sm font-bold text-ink">Anything we should know? (optional)</label>
							<textarea id="corp-message" bind:value={message} rows={3} placeholder="Occasion, delivery date, branding, dietary needs…" class="mt-2 w-full rounded-3xl border border-line bg-white px-5 py-3 text-base text-ink placeholder:text-muted"></textarea>
						</div>
					</div>
					<button type="submit" class="mt-6 flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-choco px-7 text-sm font-bold text-white uppercase">
						<Check size={17} aria-hidden="true" /> Request my quote
					</button>
					<p class="mt-3 text-center text-xs text-muted">Mock enquiry — nothing is really sent.</p>
				</form>
			{/if}
		</div>
	</div>
</section>
