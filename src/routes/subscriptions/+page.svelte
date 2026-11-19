<script lang="ts">
	import { Check, PartyPopper, Pause } from '@lucide/svelte';
	import { subscriptionPlans, usd } from '#lib/data/site.ts';
	import PageHero from '#lib/components/PageHero.svelte';
	import Picture from '#lib/components/Picture.svelte';

	let plan = $state(subscriptionPlans[0].name);
	let day = $state('Friday');
	let name = $state('');
	let email = $state('');
	let done = $state(false);
	let ref = $state('');

	function submit(e: SubmitEvent) {
		e.preventDefault();
		ref = `SC-SUB-${Math.floor(1000 + Math.random() * 9000)}`;
		done = true;
	}
</script>

<svelte:head>
	<title>Subscriptions — SweetCrust Bakery &amp; Cafe</title>
	<meta name="description" content="SweetCrust subscriptions — weekly bread box, monthly treat box and weekend brunch box. Pause or skip any week, delivery or pickup." />
</svelte:head>

<PageHero title="Subscriptions" eyebrow="Never run out of cake" intro="A box of fresh bakes on your schedule — weekly or monthly, delivery or pickup. Pause or skip any week, no questions asked." />

<section class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
	<div class="grid gap-10 lg:grid-cols-5">
		<div class="lg:col-span-2">
			<div class="overflow-hidden rounded-3xl ring-1 ring-line">
				<Picture
					name="subscription-box"
					alt="Open bakery subscription box with sourdough, croissants, cinnamon rolls and jam"
					width={1200}
					height={800}
					eager
					sizes="(min-width: 1024px) 40vw, 100vw"
					imgClass="aspect-[3/2] w-full object-cover"
				/>
			</div>
			<div class="mt-6 rounded-2xl bg-white p-5 ring-1 ring-line">
				<h2 class="flex items-center gap-2 font-display text-xl font-semibold text-choco"><Pause size={19} aria-hidden="true" /> Pause or skip, any week</h2>
				<p class="mt-2 text-sm leading-relaxed text-muted">Going away? Pause from your confirmation email — one tap, no call, no fee. Skipped weeks are never charged, and the box waits for you when you are back.</p>
			</div>
		</div>

		<div class="lg:col-span-3">
			<div class="grid gap-4 sm:grid-cols-3">
				{#each subscriptionPlans as p}
					<div class="flex flex-col rounded-3xl bg-white p-6 ring-1 ring-line">
						<h2 class="font-display text-xl font-semibold text-choco">{p.name}</h2>
						<p class="mt-2 text-3xl font-bold text-ink">{usd(p.price)}<span class="text-base font-normal text-muted"> {p.per}</span></p>
						<p class="mt-3 flex-1 text-sm leading-relaxed text-muted">{p.detail}</p>
					</div>
				{/each}
			</div>

			{#if done}
				<div class="mt-8 rounded-3xl bg-white p-8 text-center ring-1 ring-line sm:p-10" role="status">
					<span class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-choco-soft text-choco"><PartyPopper size={28} aria-hidden="true" /></span>
					<h2 class="mt-5 font-display text-3xl font-semibold text-choco">Welcome to the club, {name || 'friend'}!</h2>
					<p class="mx-auto mt-3 max-w-md leading-relaxed text-muted">Your {plan} starts on {day}. We will email {email || 'you'} with your first box details and a link to pause or skip any week.</p>
					<p class="mt-5 inline-block rounded-full bg-cream-deep px-5 py-2.5 font-bold text-choco ring-1 ring-line">Reference: {ref}</p>
				</div>
			{:else}
				<form onsubmit={submit} class="mt-8 rounded-3xl bg-white p-6 ring-1 ring-line sm:p-8">
					<h2 class="font-display text-2xl font-semibold text-choco">Start a subscription</h2>
					<div class="mt-6 grid gap-5 sm:grid-cols-2">
						<div>
							<label for="plan" class="text-sm font-bold text-ink">Plan</label>
							<select id="plan" bind:value={plan} class="mt-2 min-h-12 w-full rounded-full border border-line bg-white px-4 text-base text-ink">
								{#each subscriptionPlans as p}<option value={p.name}>{p.name} — {usd(p.price)} {p.per}</option>{/each}
							</select>
						</div>
						<div>
							<label for="day" class="text-sm font-bold text-ink">Delivery / pickup day</label>
							<select id="day" bind:value={day} class="mt-2 min-h-12 w-full rounded-full border border-line bg-white px-4 text-base text-ink">
								{#each ['Friday', 'Saturday', 'Wednesday'] as d}<option>{d}</option>{/each}
							</select>
						</div>
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
						<Check size={17} aria-hidden="true" /> Start my subscription
					</button>
					<p class="mt-3 text-center text-xs text-muted">Mock form — no payment is taken. Subscriptions are confirmed by email.</p>
				</form>
			{/if}
		</div>
	</div>
</section>
