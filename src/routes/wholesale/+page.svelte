<script lang="ts">
	import { Check, PartyPopper, Truck } from '@lucide/svelte';
	import { wholesaleInfo } from '#lib/data/site.ts';
	import PageHero from '#lib/components/PageHero.svelte';

	let business = $state('');
	let contact = $state('');
	let email = $state('');
	let volume = $state('10–20 loaves a week');
	let message = $state('');
	let done = $state(false);
	let ref = $state('');

	function submit(e: SubmitEvent) {
		e.preventDefault();
		ref = `SC-WHOLE-${Math.floor(1000 + Math.random() * 9000)}`;
		done = true;
	}
</script>

<svelte:head>
	<title>Wholesale — SweetCrust Bakery &amp; Cafe</title>
	<meta name="description" content="Wholesale bakes for cafes, restaurants and offices — croissants, sourdough, cakes by the slice and cookies. Minimums, delivery days and an inquiry form. Prices quoted, never published." />
</svelte:head>

<PageHero title="Wholesale" eyebrow="For cafes, restaurants &amp; offices" intro="We supply croissants, sourdough and cakes by the slice to cafes and offices across New York. Wholesale prices are quoted per account — never published on the public site." />

<section class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
	<div class="grid gap-10 lg:grid-cols-5">
		<div class="lg:col-span-2 space-y-4">
			<div class="rounded-2xl bg-white p-5 ring-1 ring-line">
				<h2 class="flex items-center gap-2 font-display text-xl font-semibold text-choco"><Truck size={20} aria-hidden="true" /> How it works</h2>
				<p class="mt-2 text-sm leading-relaxed text-muted">{wholesaleInfo.minimums}</p>
				<p class="mt-2 text-sm leading-relaxed text-muted">{wholesaleInfo.days}</p>
			</div>
			<div class="rounded-2xl bg-white p-5 ring-1 ring-line">
				<h2 class="font-display text-xl font-semibold text-choco">What we supply</h2>
				<ul class="mt-3 space-y-2 text-sm text-muted">
					{#each wholesaleInfo.products as p}
						<li class="flex gap-2"><Check size={16} aria-hidden="true" class="mt-0.5 shrink-0 text-choco" /> {p}</li>
					{/each}
				</ul>
			</div>
			<div class="rounded-2xl bg-white p-5 ring-1 ring-line">
				<h2 class="font-display text-xl font-semibold text-choco">What we ask of you</h2>
				<p class="mt-2 text-sm leading-relaxed text-muted">A standing weekly order, a named contact, and 48 hours’ notice for changes. We bake to your numbers — and we will tell you honestly when a product does not travel well.</p>
			</div>
		</div>

		<div class="lg:col-span-3">
			{#if done}
				<div class="rounded-3xl bg-white p-8 text-center ring-1 ring-line sm:p-10" role="status">
					<span class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-choco-soft text-choco"><PartyPopper size={28} aria-hidden="true" /></span>
					<h2 class="mt-5 font-display text-3xl font-semibold text-choco">Inquiry received!</h2>
					<p class="mx-auto mt-3 max-w-md leading-relaxed text-muted">Thank you, {contact || 'friend'} at {business || 'your business'}! Our wholesale team will email {email || 'you'} within two working days with pricing and a tasting box.</p>
					<p class="mt-5 inline-block rounded-full bg-cream-deep px-5 py-2.5 font-bold text-choco ring-1 ring-line">Reference: {ref}</p>
				</div>
			{:else}
				<form onsubmit={submit} class="rounded-3xl bg-white p-6 ring-1 ring-line sm:p-8">
					<h2 class="font-display text-2xl font-semibold text-choco">Wholesale inquiry</h2>
					<div class="mt-6 grid gap-5 sm:grid-cols-2">
						<div>
							<label for="business" class="text-sm font-bold text-ink">Business name</label>
							<input id="business" type="text" autocomplete="organization" required bind:value={business} placeholder="Cafe, restaurant or office" class="mt-2 min-h-12 w-full rounded-full border border-line bg-white px-5 text-base text-ink placeholder:text-muted" />
						</div>
						<div>
							<label for="contact" class="text-sm font-bold text-ink">Your name</label>
							<input id="contact" type="text" autocomplete="name" required bind:value={contact} placeholder="Your full name" class="mt-2 min-h-12 w-full rounded-full border border-line bg-white px-5 text-base text-ink placeholder:text-muted" />
						</div>
						<div>
							<label for="email" class="text-sm font-bold text-ink">Work email</label>
							<input id="email" type="email" autocomplete="email" required bind:value={email} placeholder="you@business.com" class="mt-2 min-h-12 w-full rounded-full border border-line bg-white px-5 text-base text-ink placeholder:text-muted" />
						</div>
						<div>
							<label for="volume" class="text-sm font-bold text-ink">Rough weekly volume</label>
							<select id="volume" bind:value={volume} class="mt-2 min-h-12 w-full rounded-full border border-line bg-white px-4 text-base text-ink">
								{#each ['Under 10 loaves a week', '10–20 loaves a week', '20–50 loaves a week', '50+ loaves a week'] as v}<option>{v}</option>{/each}
							</select>
						</div>
						<div class="sm:col-span-2">
							<label for="message" class="text-sm font-bold text-ink">What do you need? (optional)</label>
							<textarea id="message" rows="4" bind:value={message} placeholder="e.g. 30 croissants every Tuesday and Friday, plus a Friday sourdough…" class="mt-2 w-full rounded-3xl border border-line bg-white px-5 py-3 text-base text-ink placeholder:text-muted"></textarea>
						</div>
					</div>
					<button type="submit" class="mt-7 flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-choco px-7 text-sm font-bold text-white uppercase transition-colors duration-200 hover:bg-choco-deep">
						<Check size={17} aria-hidden="true" /> Send wholesale inquiry
					</button>
					<p class="mt-3 text-center text-xs text-muted">Mock form — no data leaves this demo. We reply within two working days.</p>
				</form>
			{/if}
		</div>
	</div>
</section>
