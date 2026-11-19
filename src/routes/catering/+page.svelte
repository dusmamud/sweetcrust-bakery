<script lang="ts">
	import { Check, PartyPopper } from '@lucide/svelte';
	import { cateringTrays, usd } from '#lib/data/site.ts';
	import PageHero from '#lib/components/PageHero.svelte';
	import Picture from '#lib/components/Picture.svelte';

	let tray = $state(cateringTrays[0].name);
	let date = $state('');
	let guests = $state('20');
	let name = $state('');
	let phone = $state('');
	let email = $state('');
	let done = $state(false);
	let ref = $state('');

	function submit(e: SubmitEvent) {
		e.preventDefault();
		ref = `SC-CATER-${Math.floor(1000 + Math.random() * 9000)}`;
		done = true;
	}
</script>

<svelte:head>
	<title>Catering &amp; Office Orders — SweetCrust Bakery &amp; Cafe</title>
	<meta name="description" content="Catering trays and boxes for offices, weddings and parties — what each tray feeds, prices, minimums and lead times. Enquire in a minute." />
</svelte:head>

<PageHero title="Catering &amp; Office Orders" eyebrow="Feed a crowd, properly" intro="Trays and boxes for offices, weddings, baby showers and birthdays. Minimum order $50, 48 hours’ notice, delivery within New York City." />

<section class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
	<div class="grid gap-10 lg:grid-cols-5">
		<div class="lg:col-span-2">
			<div class="overflow-hidden rounded-3xl ring-1 ring-line">
				<Picture
					name="catering-tray"
					alt="Catering spread with trays of mini pastries, sandwiches and cupcakes"
					width={1200}
					height={800}
					eager
					sizes="(min-width: 1024px) 40vw, 100vw"
					imgClass="aspect-[3/2] w-full object-cover"
				/>
			</div>
			<div class="mt-6 space-y-4">
				{#each [['Minimums & lead time', 'Minimum order $50. Order at least 48 hours ahead; weddings and large events need 2 weeks.'], ['Delivery', 'Delivered in insulated boxes with a “this side up” promise, set up on your table, and collected afterwards on request.'], ['Dietary', 'Every tray can be made with eggless, gluten-free or vegan options — tell us in the enquiry and we will confirm.']] as [h, p]}
					<div class="rounded-2xl bg-white p-5 ring-1 ring-line">
						<h2 class="font-display text-xl font-semibold text-choco">{h}</h2>
						<p class="mt-2 text-sm leading-relaxed text-muted">{p}</p>
					</div>
				{/each}
			</div>
		</div>

		<div class="lg:col-span-3">
			<div class="overflow-hidden rounded-3xl ring-1 ring-line">
				<table class="w-full bg-white text-left text-sm">
					<thead>
						<tr class="bg-cream-deep text-choco">
							<th scope="col" class="px-5 py-3 font-bold">Tray</th>
							<th scope="col" class="px-5 py-3 font-bold">Feeds</th>
							<th scope="col" class="px-5 py-3 font-bold">Price</th>
						</tr>
					</thead>
					<tbody>
						{#each cateringTrays as t}
							<tr class="border-t border-line">
								<td class="px-5 py-3 font-semibold text-ink">{t.name}<span class="block text-xs font-normal text-muted">{t.detail}</span></td>
								<td class="px-5 py-3 whitespace-nowrap text-muted">{t.feeds}</td>
								<td class="px-5 py-3 font-bold whitespace-nowrap text-choco">{usd(t.price)}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>

			{#if done}
				<div class="mt-8 rounded-3xl bg-white p-8 text-center ring-1 ring-line sm:p-10" role="status">
					<span class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-choco-soft text-choco"><PartyPopper size={28} aria-hidden="true" /></span>
					<h2 class="mt-5 font-display text-3xl font-semibold text-choco">Enquiry received!</h2>
					<p class="mx-auto mt-3 max-w-md leading-relaxed text-muted">Thank you, {name || 'friend'}! Your {tray} for {guests} guests on {date || 'your date'} is with our catering team. We will call {phone || 'you'} within one working day with a quote.</p>
					<p class="mt-5 inline-block rounded-full bg-cream-deep px-5 py-2.5 font-bold text-choco ring-1 ring-line">Reference: {ref}</p>
				</div>
			{:else}
				<form onsubmit={submit} class="mt-8 rounded-3xl bg-white p-6 ring-1 ring-line sm:p-8">
					<h2 class="font-display text-2xl font-semibold text-choco">Enquire about catering</h2>
					<div class="mt-6 grid gap-5 sm:grid-cols-2">
						<div>
							<label for="tray" class="text-sm font-bold text-ink">Tray</label>
							<select id="tray" bind:value={tray} class="mt-2 min-h-12 w-full rounded-full border border-line bg-white px-4 text-base text-ink">
								{#each cateringTrays as t}<option>{t.name}</option>{/each}
							</select>
						</div>
						<div>
							<label for="guests" class="text-sm font-bold text-ink">Guests (approx.)</label>
							<input id="guests" type="number" min="5" max="500" bind:value={guests} class="mt-2 min-h-12 w-full rounded-full border border-line bg-white px-5 text-base text-ink" />
						</div>
						<div>
							<label for="date" class="text-sm font-bold text-ink">Event date</label>
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
							<label for="email" class="text-sm font-bold text-ink">Email</label>
							<input id="email" type="email" autocomplete="email" required bind:value={email} placeholder="you@example.com" class="mt-2 min-h-12 w-full rounded-full border border-line bg-white px-5 text-base text-ink placeholder:text-muted" />
						</div>
					</div>
					<button type="submit" class="mt-7 flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-choco px-7 text-sm font-bold text-white uppercase transition-colors duration-200 hover:bg-choco-deep">
						<Check size={17} aria-hidden="true" /> Send catering enquiry
					</button>
					<p class="mt-3 text-center text-xs text-muted">Mock form — no payment is taken. We confirm every order by phone first.</p>
				</form>
			{/if}
		</div>
	</div>
</section>
