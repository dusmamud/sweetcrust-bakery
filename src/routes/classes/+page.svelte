<script lang="ts">
	// Baking classes & workshops (mock). Booking reuses the tasting pattern:
	// pick a class, leave details, get a mock confirmation + reference.
	// Event JSON-LD per class (schema.org Event with offers).
	import { CalendarDays, Check, Clock, PartyPopper, Users } from '@lucide/svelte';
	import { bakingClasses, site, usd } from '#lib/data/site.ts';
	import PageHero from '#lib/components/PageHero.svelte';
	import Picture from '#lib/components/Picture.svelte';

	let selected = $state(bakingClasses[0].id);
	let name = $state('');
	let email = $state('');
	let guests = $state('1');
	let done = $state(false);
	let ref = $state('');

	const chosen = $derived(bakingClasses.find((c) => c.id === selected) ?? bakingClasses[0]);

	const eventsLd = {
		'@context': 'https://schema.org',
		'@graph': bakingClasses.map((c) => ({
			'@type': 'Event',
			name: c.title,
			description: c.detail,
			startDate: '2026-11-29T09:00:00-05:00',
			location: {
				'@type': 'Place',
				name: site.name,
				address: { '@type': 'PostalAddress', streetAddress: '123 Baker Street', addressLocality: 'New York', addressRegion: 'NY', postalCode: '10001', addressCountry: 'US' }
			},
			offers: { '@type': 'Offer', price: c.price, priceCurrency: 'USD', availability: 'https://schema.org/InStock', url: `${site.url}/classes` },
			organizer: { '@type': 'Organization', name: site.name, url: site.url }
		}))
	};

	function submit(e: SubmitEvent) {
		e.preventDefault();
		ref = `SC-CLASS-${Math.floor(1000 + Math.random() * 9000)}`;
		done = true;
	}
</script>

<svelte:head>
	<title>Baking Classes &amp; Workshops — SweetCrust Bakery &amp; Cafe</title>
	<meta name="description" content="Learn to bake at SweetCrust — croissant masterclasses, cake decorating, macaron workshops and kids' bake days in New York. Book a seat." />
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html `<script type="application/ld+json">${JSON.stringify(eventsLd)}</script>`}
</svelte:head>

<PageHero title="Baking Classes" eyebrow="Flour on your hands" intro="Small classes, real ovens, and a box of something delicious to take home. Aprons provided — enthusiasm required." />

<section class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
	<div class="grid gap-10 lg:grid-cols-5">
		<div class="space-y-5 lg:col-span-3">
			{#each bakingClasses as c}
				<article class="overflow-hidden rounded-3xl bg-white ring-1 ring-line">
					<div class="grid sm:grid-cols-5">
						<div class="sm:col-span-2">
							<Picture name={c.image} alt={c.imageAlt} width={800} height={533} imgClass="aspect-[3/2] h-full w-full object-cover sm:aspect-auto" />
						</div>
						<div class="p-6 sm:col-span-3">
							<div class="flex flex-wrap items-center gap-2 text-xs font-bold tracking-wider text-muted uppercase">
								<span class="rounded-full bg-cream-deep px-3 py-1 ring-1 ring-line">{c.level}</span>
								<span class="rounded-full bg-cream-deep px-3 py-1 ring-1 ring-line">{c.duration}</span>
								<span class="rounded-full {c.spots <= 2 ? 'bg-blush text-choco' : 'bg-cream-deep text-muted'} px-3 py-1 ring-1 ring-line">
									{c.spots <= 2 ? `Only ${c.spots} spot${c.spots === 1 ? '' : 's'} left` : `${c.spots} spots left`}
								</span>
							</div>
							<h2 class="mt-3 font-display text-2xl font-semibold text-choco">{c.title}</h2>
							<p class="mt-2 text-sm leading-relaxed text-muted">{c.detail}</p>
							<p class="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted">
								<span class="flex items-center gap-1.5"><CalendarDays size={15} aria-hidden="true" class="text-caramel" /> {c.date}</span>
								<span class="flex items-center gap-1.5"><Clock size={15} aria-hidden="true" class="text-caramel" /> {c.time}</span>
								<span class="flex items-center gap-1.5"><Users size={15} aria-hidden="true" class="text-caramel" /> Max 10 bakers</span>
							</p>
							<div class="mt-4 flex items-center justify-between gap-3">
								<p class="text-xl font-bold text-ink">{usd(c.price)} <span class="text-sm font-normal text-muted">per person</span></p>
								<button
									type="button"
									onclick={() => {
										selected = c.id;
										done = false;
										document.getElementById('book-class')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
									}}
									class="flex min-h-12 items-center rounded-full bg-choco px-6 text-sm font-bold text-white uppercase"
								>
									Book this class
								</button>
							</div>
						</div>
					</div>
				</article>
			{/each}
			<p class="text-sm leading-relaxed text-muted">
				Corporate team bakes? We run private bake-offs for 8–20 people — see our <a href="/corporate-gifting" class="font-bold text-choco">corporate gifting</a> page or call us.
			</p>
		</div>

		<div id="book-class" class="lg:col-span-2">
			{#if done}
				<div class="rounded-3xl bg-white p-8 text-center ring-1 ring-line sm:p-10" role="status">
					<span class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-choco-soft text-choco"><PartyPopper size={28} aria-hidden="true" /></span>
					<h2 class="mt-5 font-display text-3xl font-semibold text-choco">You are booked in!</h2>
					<p class="mx-auto mt-3 max-w-md leading-relaxed text-muted">
						Thank you, {name || 'friend'}! {chosen.title} on {chosen.date}, {chosen.time}, for {guests} guest{guests === '1' ? '' : 's'}.
						We will email {email || 'you'} to confirm.
					</p>
					<p class="mt-5 inline-block rounded-full bg-cream-deep px-5 py-2.5 font-bold text-choco ring-1 ring-line">Reference: {ref}</p>
				</div>
			{:else}
				<form onsubmit={submit} class="rounded-3xl bg-white p-6 ring-1 ring-line sm:p-8 lg:sticky lg:top-32">
					<h2 class="font-display text-2xl font-semibold text-choco">Book your seat</h2>
					<div class="mt-5 space-y-5">
						<div>
							<label for="class-select" class="text-sm font-bold text-ink">Class</label>
							<select id="class-select" bind:value={selected} class="mt-2 min-h-12 w-full rounded-full border border-line bg-white px-4 text-base text-ink">
								{#each bakingClasses as c}
									<option value={c.id}>{c.title} — {c.date} ({usd(c.price)})</option>
								{/each}
							</select>
						</div>
						<div>
							<label for="class-name" class="text-sm font-bold text-ink">Your name</label>
							<input id="class-name" type="text" autocomplete="name" required bind:value={name} placeholder="Your full name" class="mt-2 min-h-12 w-full rounded-full border border-line bg-white px-5 text-base text-ink placeholder:text-muted" />
						</div>
						<div>
							<label for="class-email" class="text-sm font-bold text-ink">Email</label>
							<input id="class-email" type="email" autocomplete="email" required bind:value={email} placeholder="you@example.com" class="mt-2 min-h-12 w-full rounded-full border border-line bg-white px-5 text-base text-ink placeholder:text-muted" />
						</div>
						<div>
							<label for="class-guests" class="text-sm font-bold text-ink">Seats</label>
							<select id="class-guests" bind:value={guests} class="mt-2 min-h-12 w-full rounded-full border border-line bg-white px-4 text-base text-ink">
								{#each ['1', '2', '3', '4'] as g}<option>{g}</option>{/each}
							</select>
						</div>
						<p class="rounded-2xl bg-cream-deep p-4 text-sm leading-relaxed text-muted">
							<strong class="text-ink">{chosen.title}</strong> — {chosen.date}, {chosen.time} · {usd(chosen.price)} per person ·
							{chosen.spots} spot{chosen.spots === 1 ? '' : 's'} left.
						</p>
					</div>
					<button type="submit" class="mt-6 flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-choco px-7 text-sm font-bold text-white uppercase">
						<Check size={17} aria-hidden="true" /> Book my seat
					</button>
					<p class="mt-3 text-center text-xs text-muted">Mock booking — no payment is taken. Full refund up to 72 hours before the class.</p>
				</form>
			{/if}
		</div>
	</div>
</section>
