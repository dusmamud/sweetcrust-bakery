<script lang="ts">
	import { Check, Clock, Mail, MapPin, Phone } from '@lucide/svelte';
	import { site } from '#lib/data/site.ts';
	import PageHero from '#lib/components/PageHero.svelte';

	let name = $state('');
	let email = $state('');
	let subject = $state('General question');
	let message = $state('');
	let done = $state(false);

	const infoItems: [typeof MapPin, string, string][] = [
		[MapPin, 'Visit us', '123 Baker Street, New York, NY 10001'],
		[Phone, 'Call us', site.phoneDisplay],
		[Mail, 'Email us', site.email],
		[Clock, 'Opening hours', 'Mon – Sat: 8:00 AM – 8:00 PM · Closed Sundays']
	];

	function submit(e: SubmitEvent) {
		e.preventDefault();
		done = true;
	}
</script>

<svelte:head>
	<title>Contact Us — SweetCrust Bakery &amp; Cafe</title>
	<meta name="description" content="Visit SweetCrust Bakery at 123 Baker Street, New York, or call +1 234 567 8900. We reply to messages within one working day." />
</svelte:head>

<PageHero title="Contact Us" eyebrow="We'd love to hear from you" intro="Questions about an order, a custom cake, or catering? Send us a message — we reply within one working day." />

<section class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
	<div class="grid gap-10 lg:grid-cols-5">
		<div class="space-y-5 lg:col-span-2">
			{#each infoItems as [Icon, h, p]}
				<div class="flex gap-4 rounded-2xl bg-white p-5 ring-1 ring-line">
					<span class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-choco-soft text-choco"><Icon size={21} aria-hidden="true" /></span>
					<div>
						<h2 class="font-bold text-ink">{h}</h2>
						<p class="mt-1 text-sm leading-relaxed text-muted">{p}</p>
					</div>
				</div>
			{/each}
			<div class="rounded-2xl bg-choco-deep p-6 text-white">
				<h2 class="font-display text-xl font-semibold">Find us on Baker Street</h2>
				<p class="mt-2 text-sm leading-relaxed text-white/80">
					Two blocks from the 23rd Street subway, next to the flower shop with the green awning. Look for the
					smell of cinnamon — you will find us before you see us.
				</p>
				<p class="mt-4 font-script text-3xl text-amber-100">Happiness is Homemade ♡</p>
			</div>
		</div>

		<div class="lg:col-span-3">
			{#if done}
				<div class="rounded-3xl bg-white p-8 text-center ring-1 ring-line sm:p-10" role="status">
					<span class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-choco-soft text-choco"><Check size={28} aria-hidden="true" /></span>
					<h2 class="mt-5 font-display text-3xl font-semibold text-choco">Message received!</h2>
					<p class="mx-auto mt-3 max-w-md leading-relaxed text-muted">
						Thank you, {name || 'friend'} — your message is with our team. We will reply to {email || 'your email'} within one working day.
					</p>
					<a href="/shop" class="mt-7 inline-flex min-h-12 items-center rounded-full bg-choco px-7 text-sm font-bold text-white uppercase">Browse the shop</a>
				</div>
			{:else}
				<form onsubmit={submit} class="rounded-3xl bg-white p-6 ring-1 ring-line sm:p-8">
					<h2 class="font-display text-2xl font-semibold text-choco">Send us a message</h2>
					<div class="mt-6 grid gap-5 sm:grid-cols-2">
						<div>
							<label for="name" class="text-sm font-bold text-ink">Your name</label>
							<input id="name" type="text" required bind:value={name} placeholder="Your full name" class="mt-2 min-h-12 w-full rounded-full border border-line bg-white px-5 text-base text-ink placeholder:text-muted" />
						</div>
						<div>
							<label for="email" class="text-sm font-bold text-ink">Email</label>
							<input id="email" type="email" required bind:value={email} placeholder="you@example.com" class="mt-2 min-h-12 w-full rounded-full border border-line bg-white px-5 text-base text-ink placeholder:text-muted" />
						</div>
						<div class="sm:col-span-2">
							<label for="subject" class="text-sm font-bold text-ink">Subject</label>
							<select id="subject" bind:value={subject} class="mt-2 min-h-12 w-full rounded-full border border-line bg-white px-4 text-base text-ink">
								{#each ['General question', 'Custom cake enquiry', 'Catering & events', 'Feedback', 'Order question'] as s}<option>{s}</option>{/each}
							</select>
						</div>
						<div class="sm:col-span-2">
							<label for="message" class="text-sm font-bold text-ink">Message</label>
							<textarea id="message" rows="5" required bind:value={message} placeholder="How can we help?" class="mt-2 w-full rounded-3xl border border-line bg-white px-5 py-3 text-base text-ink placeholder:text-muted"></textarea>
						</div>
					</div>
					<button type="submit" class="mt-7 flex min-h-12 w-full items-center justify-center rounded-full bg-choco px-7 text-sm font-bold text-white uppercase transition-colors duration-200 hover:bg-choco-deep">Send message</button>
					<p class="mt-3 text-center text-xs text-muted">Mock form — nothing is sent anywhere. For a real order, call us at {site.phoneDisplay}.</p>
				</form>
			{/if}
		</div>
	</div>
</section>
