<script lang="ts">
	// Shared by /custom-cakes and /custom-orders (same page, both URLs work).
	import { Check, PartyPopper } from '@lucide/svelte';
	import { customCakeFillings, customCakeFlavours, customCakeSizes, usd } from '#lib/data/site.ts';
	import Picture from '#lib/components/Picture.svelte';

	let occasion = $state('Birthday');
	let size = $state('8" — Serves 10');
	let flavour = $state('Chocolate Truffle');
	let filling = $state('Chocolate ganache');
	let tiers = $state('One tier');
	let date = $state('');
	let servings = $state('10');
	let allergens = $state('');
	let message = $state('');
	let name = $state('');
	let phone = $state('');
	let done = $state(false);
	let ref = $state('');

	function submit(e: SubmitEvent) {
		e.preventDefault();
		ref = `SC-CUSTOM-${Math.floor(1000 + Math.random() * 9000)}`;
		done = true;
	}
</script>

<section class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
	<div class="grid gap-10 lg:grid-cols-5">
		<div class="lg:col-span-2">
			<div class="overflow-hidden rounded-3xl ring-1 ring-line">
				<Picture
					name="cat-custom"
					alt="White birthday cake with pastel buttercream flowers"
					width={1200}
					height={800}
					sizes="(min-width: 1024px) 40vw, 100vw"
					imgClass="aspect-[3/2] w-full object-cover"
				/>
			</div>
			<div class="mt-6 grid grid-cols-2 gap-4">
				<div class="overflow-hidden rounded-3xl ring-1 ring-line">
					<Picture
						name="occasion-cake"
						alt="Chocolate celebration cake with berries"
						width={800}
						height={533}
						sizes="(min-width: 1024px) 20vw, 50vw"
						imgClass="aspect-[3/2] w-full object-cover"
					/>
				</div>
				<div class="overflow-hidden rounded-3xl ring-1 ring-line">
					<Picture
						name="wedding-cake"
						alt="Three-tier white wedding cake with buttercream flowers"
						width={800}
						height={533}
						sizes="(min-width: 1024px) 20vw, 50vw"
						imgClass="aspect-[3/2] w-full object-cover"
					/>
				</div>
			</div>
			<div class="mt-6 space-y-4">
				{#each [['Starting prices by size', customCakeSizes.map((s) => `${s.size} — from ${usd(s.from)}`).join(' · ')], ['Lead times', 'Standard custom cakes: 7 days. Tiered or shaped cakes: 2 weeks. Wedding cakes: 3–4 weeks — see our wedding page. Rush orders (under 7 days) carry a 20% rush fee when we can fit them in.'], ['Deposit', 'A 50% deposit reserves your date; the balance is due at pickup or delivery. Cancellations up to 72 hours ahead get a full refund.'], ['Allergens', 'Tell us about allergies in the form — most celebration cakes can be made eggless, and we always confirm what is possible before we bake.']] as [h, p]}
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
					<span class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-choco-soft text-choco"><PartyPopper size={28} aria-hidden="true" /></span>
					<h2 class="mt-5 font-display text-3xl font-semibold text-choco">Your custom cake request is in!</h2>
					<p class="mx-auto mt-3 max-w-md leading-relaxed text-muted">
						Thank you, {name || 'friend'}! Your {occasion.toLowerCase()} cake ({flavour} with {filling.toLowerCase()}, {size}) is with our bakers.
						We will call you at {phone || 'your number'} within one working day to confirm the design and price.
					</p>
					<p class="mt-5 inline-block rounded-full bg-cream-deep px-5 py-2.5 font-bold text-choco ring-1 ring-line">Reference: {ref}</p>
					<p class="mt-3 text-sm text-muted">Keep this reference — you can track your order with it.</p>
					<div class="mt-7 flex flex-wrap justify-center gap-3">
						<a href="/track-order" class="inline-flex min-h-12 items-center rounded-full bg-choco px-7 text-sm font-bold text-white uppercase">Track your order</a>
						<a href="/shop" class="inline-flex min-h-12 items-center rounded-full border-2 border-choco px-7 text-sm font-bold text-choco uppercase">Browse the shop</a>
					</div>
				</div>
			{:else}
				<form onsubmit={submit} class="rounded-3xl bg-white p-6 ring-1 ring-line sm:p-8">
					<h2 class="font-display text-2xl font-semibold text-choco">Design your cake</h2>
					<p class="mt-2 text-sm text-muted">Flavours, sizes, starting prices and lead times are on the left — no surprises, ever.</p>
					<div class="mt-6 grid gap-5 sm:grid-cols-2">
						<div>
							<label for="occasion" class="text-sm font-bold text-ink">Occasion</label>
							<select id="occasion" bind:value={occasion} class="mt-2 min-h-12 w-full rounded-full border border-line bg-white px-4 text-base text-ink">
								{#each ['Birthday', 'Wedding', 'Anniversary', 'Baby Shower', 'Graduation', 'Other Celebration'] as o}<option>{o}</option>{/each}
							</select>
						</div>
						<div>
							<label for="tiers" class="text-sm font-bold text-ink">Tiers</label>
							<select id="tiers" bind:value={tiers} class="mt-2 min-h-12 w-full rounded-full border border-line bg-white px-4 text-base text-ink">
								{#each ['One tier', 'Two tiers', 'Three tiers', 'Four tiers'] as t}<option>{t}</option>{/each}
							</select>
						</div>
						<div>
							<label for="flavour" class="text-sm font-bold text-ink">Flavour</label>
							<select id="flavour" bind:value={flavour} class="mt-2 min-h-12 w-full rounded-full border border-line bg-white px-4 text-base text-ink">
								{#each customCakeFlavours as f}<option>{f}</option>{/each}
							</select>
						</div>
						<div>
							<label for="filling" class="text-sm font-bold text-ink">Filling</label>
							<select id="filling" bind:value={filling} class="mt-2 min-h-12 w-full rounded-full border border-line bg-white px-4 text-base text-ink">
								{#each customCakeFillings as f}<option>{f}</option>{/each}
							</select>
						</div>
						<div>
							<label for="size" class="text-sm font-bold text-ink">Size</label>
							<select id="size" bind:value={size} class="mt-2 min-h-12 w-full rounded-full border border-line bg-white px-4 text-base text-ink">
								{#each customCakeSizes as s}<option value={s.size}>{s.size} — from {usd(s.from)}</option>{/each}
							</select>
						</div>
						<div>
							<label for="servings" class="text-sm font-bold text-ink">Guests (approx.)</label>
							<input id="servings" type="number" min="1" max="500" bind:value={servings} class="mt-2 min-h-12 w-full rounded-full border border-line bg-white px-5 text-base text-ink" />
						</div>
						<div>
							<label for="date" class="text-sm font-bold text-ink">Date needed</label>
							<input id="date" type="date" required bind:value={date} class="mt-2 min-h-12 w-full rounded-full border border-line bg-white px-5 text-base text-ink" />
						</div>
						<div>
							<label for="phone" class="text-sm font-bold text-ink">Phone</label>
							<input id="phone" type="tel" autocomplete="tel" required bind:value={phone} placeholder="+1 234 567 8900" class="mt-2 min-h-12 w-full rounded-full border border-line bg-white px-5 text-base text-ink placeholder:text-muted" />
						</div>
						<div class="sm:col-span-2">
							<label for="name" class="text-sm font-bold text-ink">Your name</label>
							<input id="name" type="text" autocomplete="name" required bind:value={name} placeholder="Your full name" class="mt-2 min-h-12 w-full rounded-full border border-line bg-white px-5 text-base text-ink placeholder:text-muted" />
						</div>
						<div class="sm:col-span-2">
							<label for="allergens" class="text-sm font-bold text-ink">Allergies or dietary needs (optional)</label>
							<input id="allergens" type="text" bind:value={allergens} placeholder="e.g. nut allergy, eggless" class="mt-2 min-h-12 w-full rounded-full border border-line bg-white px-5 text-base text-ink placeholder:text-muted" />
						</div>
						<div class="sm:col-span-2">
							<label for="message" class="text-sm font-bold text-ink">Design &amp; message details</label>
							<textarea id="message" rows="4" bind:value={message} placeholder="Colours, theme, message on the cake, inspiration (describe a photo — you can show it to us in store)…" class="mt-2 w-full rounded-3xl border border-line bg-white px-5 py-3 text-base text-ink placeholder:text-muted"></textarea>
						</div>
					</div>
					<button type="submit" class="mt-7 flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-choco px-7 text-sm font-bold text-white uppercase transition-colors duration-200 hover:bg-choco-deep">
						<Check size={17} aria-hidden="true" /> Request my custom cake
					</button>
					<p class="mt-3 text-center text-xs text-muted">Mock form — no payment is taken. We confirm every order by phone first.</p>
				</form>
			{/if}
		</div>
	</div>
</section>
