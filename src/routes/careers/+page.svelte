<script lang="ts">
	import { Check, Clock, Heart, PartyPopper } from '@lucide/svelte';
	import { careers, site } from '#lib/data/site.ts';
	import PageHero from '#lib/components/PageHero.svelte';

	let role = $state(careers[0].role);
	let name = $state('');
	let email = $state('');
	let message = $state('');
	let done = $state(false);
	let ref = $state('');

	function submit(e: SubmitEvent) {
		e.preventDefault();
		ref = `SC-JOB-${Math.floor(1000 + Math.random() * 9000)}`;
		done = true;
	}
</script>

<svelte:head>
	<title>Careers — SweetCrust Bakery &amp; Cafe</title>
	<meta name="description" content="Work at SweetCrust Bakery — pastry chef, cake decorator, front of house and delivery roles. Early mornings, real butter, and a team that eats what it bakes." />
</svelte:head>

<PageHero title="Careers" eyebrow="Come bake with us" intro="Early mornings, real butter, and a team that eats what it bakes. If you love the smell of a 4 AM oven, we should talk." />

<section class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
	<div class="grid gap-10 lg:grid-cols-5">
		<div class="lg:col-span-3 space-y-4">
			{#each careers as c}
				<div class="rounded-3xl bg-white p-6 ring-1 ring-line">
					<h2 class="font-display text-2xl font-semibold text-choco">{c.role}</h2>
					<p class="mt-2 text-sm leading-relaxed text-muted">{c.detail}</p>
				</div>
			{/each}
			<div class="grid gap-4 sm:grid-cols-3">
				{#each [['Real butter', 'Always. No exceptions, no arguments.'], ['Early, not late', 'The ovens fire at 4 AM and the day ends by 4 PM.'], ['Staff cake', 'One free treat per shift. It is the best perk we have.']] as [h, p]}
					<div class="rounded-2xl bg-cream-deep p-5 ring-1 ring-line">
						<h2 class="font-display text-xl font-semibold text-choco">{h}</h2>
						<p class="mt-2 text-sm leading-relaxed text-muted">{p}</p>
					</div>
				{/each}
			</div>
			<p class="flex items-center gap-2 text-sm text-muted"><Clock size={16} aria-hidden="true" class="text-caramel" /> {site.hours} · {site.addressShort}</p>
			<p class="flex items-center gap-2 text-sm text-muted"><Heart size={16} aria-hidden="true" class="text-caramel" /> SweetCrust is an equal-opportunity employer. All roles are open to all — tell us what you bake best.</p>
		</div>

		<div class="lg:col-span-2">
			{#if done}
				<div class="rounded-3xl bg-white p-8 text-center ring-1 ring-line sm:p-10" role="status">
					<span class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-choco-soft text-choco"><PartyPopper size={28} aria-hidden="true" /></span>
					<h2 class="mt-5 font-display text-3xl font-semibold text-choco">Application received!</h2>
					<p class="mx-auto mt-3 max-w-md leading-relaxed text-muted">Thank you, {name || 'friend'}! Your application for {role} is with our team. We reply to every applicant within one week — even when the answer is no.</p>
					<p class="mt-5 inline-block rounded-full bg-cream-deep px-5 py-2.5 font-bold text-choco ring-1 ring-line">Reference: {ref}</p>
				</div>
			{:else}
				<form onsubmit={submit} class="rounded-3xl bg-white p-6 ring-1 ring-line sm:p-8">
					<h2 class="font-display text-2xl font-semibold text-choco">Apply</h2>
					<div class="mt-6 grid gap-5">
						<div>
							<label for="role" class="text-sm font-bold text-ink">Role</label>
							<select id="role" bind:value={role} class="mt-2 min-h-12 w-full rounded-full border border-line bg-white px-4 text-base text-ink">
								{#each careers as c}<option>{c.role}</option>{/each}
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
						<div>
							<label for="message" class="text-sm font-bold text-ink">Tell us about yourself</label>
							<textarea id="message" rows="4" required bind:value={message} placeholder="Experience, favourite thing to bake, why mornings don’t scare you…" class="mt-2 w-full rounded-3xl border border-line bg-white px-5 py-3 text-base text-ink placeholder:text-muted"></textarea>
						</div>
					</div>
					<button type="submit" class="mt-7 flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-choco px-7 text-sm font-bold text-white uppercase transition-colors duration-200 hover:bg-choco-deep">
						<Check size={17} aria-hidden="true" /> Send application
					</button>
					<p class="mt-3 text-center text-xs text-muted">Mock form — no application is actually sent.</p>
				</form>
			{/if}
		</div>
	</div>
</section>
