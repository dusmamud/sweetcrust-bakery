<script lang="ts">
	import { Check, PartyPopper } from '@lucide/svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import Picture from '#lib/components/Picture.svelte';

	let occasion = $state('Birthday');
	let size = $state('8" — Serves 10');
	let flavour = $state('Chocolate Truffle');
	let date = $state('');
	let servings = $state('10');
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

<svelte:head>
	<title>Custom Orders — SweetCrust Bakery &amp; Cafe</title>
	<meta name="description" content="Order a custom cake for your birthday, wedding or anniversary. Choose the occasion, size, flavour and message — we bake your idea into a cake." />
</svelte:head>

<PageHero title="Custom Orders" eyebrow="Your ideas, our creations" intro="Birthdays, weddings, anniversaries and everything worth celebrating — tell us your idea and we will bake it into a cake. Custom cakes need at least 7 days’ notice." />

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
			<div class="mt-6 space-y-4">
				{#each [['How it works', 'Tell us the occasion and flavour below. We confirm your design and quote within one working day, then bake it fresh for your date.'], ['Pricing', 'Custom cakes start at $45 for a 6" cake. Tiered and shaped cakes are quoted individually — no surprises, ever.'], ['Tastings', 'Wedding tastings are $15 per couple, redeemable against your order. Book by phone or in store.']] as [h, p]}
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
						Thank you, {name || 'friend'}! Your {occasion.toLowerCase()} cake ({flavour}, {size}) is with our bakers.
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
					<div class="mt-6 grid gap-5 sm:grid-cols-2">
						<div>
							<label for="occasion" class="text-sm font-bold text-ink">Occasion</label>
							<select id="occasion" bind:value={occasion} class="mt-2 min-h-12 w-full rounded-full border border-line bg-white px-4 text-base text-ink">
								{#each ['Birthday', 'Wedding', 'Anniversary', 'Baby Shower', 'Graduation', 'Other Celebration'] as o}<option>{o}</option>{/each}
							</select>
						</div>
						<div>
							<label for="flavour" class="text-sm font-bold text-ink">Flavour</label>
							<select id="flavour" bind:value={flavour} class="mt-2 min-h-12 w-full rounded-full border border-line bg-white px-4 text-base text-ink">
								{#each ['Chocolate Truffle', 'Red Velvet', 'Vanilla Bean', 'Strawberry Shortcake', 'Blueberry Cheesecake', 'Carrot Cake', 'Lemon'] as f}<option>{f}</option>{/each}
							</select>
						</div>
						<div>
							<label for="size" class="text-sm font-bold text-ink">Size</label>
							<select id="size" bind:value={size} class="mt-2 min-h-12 w-full rounded-full border border-line bg-white px-4 text-base text-ink">
								{#each ['6" — Serves 6', '8" — Serves 10', '10" — Serves 16', 'Two-tier — Serves 30', 'Three-tier — Serves 50'] as s}<option>{s}</option>{/each}
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
							<input id="phone" type="tel" required bind:value={phone} placeholder="+1 234 567 8900" class="mt-2 min-h-12 w-full rounded-full border border-line bg-white px-5 text-base text-ink placeholder:text-muted" />
						</div>
						<div class="sm:col-span-2">
							<label for="name" class="text-sm font-bold text-ink">Your name</label>
							<input id="name" type="text" required bind:value={name} placeholder="Your full name" class="mt-2 min-h-12 w-full rounded-full border border-line bg-white px-5 text-base text-ink placeholder:text-muted" />
						</div>
						<div class="sm:col-span-2">
							<label for="message" class="text-sm font-bold text-ink">Design &amp; message details</label>
							<textarea id="message" rows="4" bind:value={message} placeholder="Tell us about colours, theme, message on the cake, dietary needs…" class="mt-2 w-full rounded-3xl border border-line bg-white px-5 py-3 text-base text-ink placeholder:text-muted"></textarea>
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
