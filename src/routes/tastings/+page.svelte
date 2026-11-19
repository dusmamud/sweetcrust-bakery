<script lang="ts">
	import { Check, PartyPopper } from '@lucide/svelte';
	import { tastingFeeNote, tastingSessions } from '#lib/data/site.ts';
	import PageHero from '#lib/components/PageHero.svelte';
	import Picture from '#lib/components/Picture.svelte';

	let session = $state(`${tastingSessions[0].date} — ${tastingSessions[0].time}`);
	let name = $state('');
	let phone = $state('');
	let email = $state('');
	let guests = $state('2');
	let done = $state(false);
	let ref = $state('');

	function submit(e: SubmitEvent) {
		e.preventDefault();
		ref = `SC-TASTE-${Math.floor(1000 + Math.random() * 9000)}`;
		done = true;
	}
</script>

<svelte:head>
	<title>Cake Tastings &amp; Consultations — SweetCrust Bakery &amp; Cafe</title>
	<meta name="description" content="Book a wedding cake tasting at SweetCrust — six flavours, one hour, $80 per couple, fully deductible from orders over $600." />
</svelte:head>

<PageHero title="Tastings &amp; Consultations" eyebrow="Taste before you choose" intro="Six flavours, one hour, and a designer’s ear. {tastingFeeNote}" />

<section class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
	<div class="grid gap-10 lg:grid-cols-5">
		<div class="lg:col-span-2">
			<div class="overflow-hidden rounded-3xl ring-1 ring-line">
				<Picture
					name="wedding-tasting"
					alt="Cake tasting table with slices in several flavours, forks and coffee"
					width={1200}
					height={800}
					eager
					sizes="(min-width: 1024px) 40vw, 100vw"
					imgClass="aspect-[3/2] w-full object-cover"
				/>
			</div>
			<div class="mt-6 space-y-4">
				{#each [['What you taste', 'Six flavours: vanilla bean, chocolate truffle, red velvet, strawberry, lemon & elderflower, and carrot & walnut — plus fillings and frostings.'], ['What you leave with', 'A flavour shortlist, a design sketch, a written quote and a reserved date — held for 7 days while you decide.'], ['Who should come', 'The two of you, plus anyone whose opinion actually matters. Children are welcome — there is cake.']] as [h, p]}
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
					<h2 class="mt-5 font-display text-3xl font-semibold text-choco">Your tasting is booked!</h2>
					<p class="mx-auto mt-3 max-w-md leading-relaxed text-muted">
						Thank you, {name || 'friend'}! Your tasting is {session} for {guests} guest{guests === '1' ? '' : 's'}.
						We will call {phone || 'you'} to confirm and take the $80 tasting fee (deductible from orders over $600).
					</p>
					<p class="mt-5 inline-block rounded-full bg-cream-deep px-5 py-2.5 font-bold text-choco ring-1 ring-line">Reference: {ref}</p>
					<div class="mt-7 flex flex-wrap justify-center gap-3">
						<a href="/wedding-cakes" class="inline-flex min-h-12 items-center rounded-full bg-choco px-7 text-sm font-bold text-white uppercase">Wedding cakes</a>
						<a href="/track-order" class="inline-flex min-h-12 items-center rounded-full border-2 border-choco px-7 text-sm font-bold text-choco uppercase">Track your order</a>
					</div>
				</div>
			{:else}
				<form onsubmit={submit} class="rounded-3xl bg-white p-6 ring-1 ring-line sm:p-8">
					<h2 class="font-display text-2xl font-semibold text-choco">Book your tasting</h2>
					<div class="mt-6 grid gap-5 sm:grid-cols-2">
						<div class="sm:col-span-2">
							<label for="session" class="text-sm font-bold text-ink">Session</label>
							<select id="session" bind:value={session} class="mt-2 min-h-12 w-full rounded-full border border-line bg-white px-4 text-base text-ink">
								{#each tastingSessions as s}
									<option value={`${s.date} — ${s.time}`}>{s.date} — {s.time} ({s.spots} spot{s.spots === 1 ? '' : 's'} left)</option>
								{/each}
							</select>
						</div>
						<div>
							<label for="name" class="text-sm font-bold text-ink">Your name</label>
							<input id="name" type="text" autocomplete="name" required bind:value={name} placeholder="Your full name" class="mt-2 min-h-12 w-full rounded-full border border-line bg-white px-5 text-base text-ink placeholder:text-muted" />
						</div>
						<div>
							<label for="phone" class="text-sm font-bold text-ink">Phone</label>
							<input id="phone" type="tel" autocomplete="tel" required bind:value={phone} placeholder="+1 234 567 8900" class="mt-2 min-h-12 w-full rounded-full border border-line bg-white px-5 text-base text-ink placeholder:text-muted" />
						</div>
						<div>
							<label for="email" class="text-sm font-bold text-ink">Email</label>
							<input id="email" type="email" autocomplete="email" required bind:value={email} placeholder="you@example.com" class="mt-2 min-h-12 w-full rounded-full border border-line bg-white px-5 text-base text-ink placeholder:text-muted" />
						</div>
						<div>
							<label for="guests" class="text-sm font-bold text-ink">Guests</label>
							<select id="guests" bind:value={guests} class="mt-2 min-h-12 w-full rounded-full border border-line bg-white px-4 text-base text-ink">
								{#each ['1', '2', '3', '4'] as g}<option>{g}</option>{/each}
							</select>
						</div>
					</div>
					<button type="submit" class="mt-7 flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-choco px-7 text-sm font-bold text-white uppercase transition-colors duration-200 hover:bg-choco-deep">
						<Check size={17} aria-hidden="true" /> Book my tasting
					</button>
					<p class="mt-3 text-center text-xs text-muted">Mock booking — no payment is taken. We confirm every tasting by phone.</p>
				</form>
			{/if}
		</div>
	</div>
</section>
