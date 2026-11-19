<script lang="ts">
	import { Check, MessageSquareHeart } from '@lucide/svelte';
	import { siteReviews } from '#lib/data/site.ts';
	import PageHero from '#lib/components/PageHero.svelte';
	import Stars from '#lib/components/Stars.svelte';

	let name = $state('');
	let rating = $state(5);
	let text = $state('');
	let done = $state(false);

	function submit(e: SubmitEvent) {
		e.preventDefault();
		done = true;
	}
</script>

<svelte:head>
	<title>Reviews — SweetCrust Bakery &amp; Cafe</title>
	<meta name="description" content="What customers say about SweetCrust Bakery — Google, Yelp and on-site reviews, with replies from the bakery. 4.9 out of 5 from 12,000+ happy customers." />
</svelte:head>

<PageHero title="Reviews" eyebrow="4.9 out of 5 · 12,000+ happy customers" intro="Real reviews from Google, Yelp and this site — and we reply to every single one. A review that mentions what you bought helps the next person find their cake." />

<section class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
	<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
		{#each siteReviews as r}
			<div class="flex flex-col rounded-3xl bg-white p-6 ring-1 ring-line">
				<figure class="flex flex-1 flex-col">
					<Stars rating={r.rating} />
					<blockquote class="mt-3 flex-1 leading-relaxed text-ink">“{r.text}”</blockquote>
					<figcaption class="mt-4">
						<p class="font-bold text-ink">{r.author}</p>
						<p class="text-sm text-muted">{r.source} · {r.date}</p>
					</figcaption>
				</figure>
				{#if r.reply}
					<div class="mt-4 rounded-2xl bg-cream-deep p-4 text-sm leading-relaxed text-muted ring-1 ring-line">
						<p class="font-bold text-choco">SweetCrust replies</p>
						<p class="mt-1">{r.reply}</p>
					</div>
				{/if}
			</div>
		{/each}
	</div>

	<div class="mt-12 grid gap-8 lg:grid-cols-2">
		<div class="rounded-3xl bg-white p-6 ring-1 ring-line sm:p-8">
			<h2 class="font-display text-2xl font-semibold text-choco">How we handle reviews</h2>
			<ul class="mt-4 space-y-3 text-sm leading-relaxed text-muted">
				<li>· We ask for a review at pickup — a card with a link, never a pushy ask.</li>
				<li>· We reply to every review, good or bad, within two working days.</li>
				<li>· We never pay for reviews and never hide honest ones. If we got it wrong, we say so — and we make it right.</li>
				<li>· Reviews on this site are collected here, on product pages. Our Google Business Profile carries the same reviews for “bakery near me” searchers.</li>
			</ul>
		</div>
		{#if done}
			<div class="rounded-3xl bg-white p-8 text-center ring-1 ring-line sm:p-10" role="status">
				<span class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-choco-soft text-choco"><MessageSquareHeart size={28} aria-hidden="true" /></span>
				<h2 class="mt-5 font-display text-3xl font-semibold text-choco">Thank you, {name || 'friend'}!</h2>
				<p class="mx-auto mt-3 max-w-md leading-relaxed text-muted">Your {rating}-star review is with our team. We read every one — and we really do reply.</p>
				<p class="mt-3 text-sm text-muted">Mock form — reviews are not published from this demo.</p>
			</div>
		{:else}
			<form onsubmit={submit} class="rounded-3xl bg-white p-6 ring-1 ring-line sm:p-8">
				<h2 class="font-display text-2xl font-semibold text-choco">Share your experience</h2>
				<div class="mt-5 grid gap-5 sm:grid-cols-2">
					<div>
						<label for="name" class="text-sm font-bold text-ink">Your name</label>
						<input id="name" type="text" autocomplete="name" required bind:value={name} placeholder="Your name" class="mt-2 min-h-12 w-full rounded-full border border-line bg-white px-5 text-base text-ink placeholder:text-muted" />
					</div>
					<div>
						<label for="rating" class="text-sm font-bold text-ink">Rating</label>
						<select id="rating" bind:value={rating} class="mt-2 min-h-12 w-full rounded-full border border-line bg-white px-4 text-base text-ink">
							{#each [5, 4, 3, 2, 1] as r}<option value={r}>{r} star{r === 1 ? '' : 's'}</option>{/each}
						</select>
					</div>
					<div class="sm:col-span-2">
						<label for="text" class="text-sm font-bold text-ink">What did you buy — and how was it?</label>
						<textarea id="text" rows="4" required bind:value={text} placeholder="e.g. The chocolate truffle cake for my dad’s 60th — the ganache was perfect…" class="mt-2 w-full rounded-3xl border border-line bg-white px-5 py-3 text-base text-ink placeholder:text-muted"></textarea>
					</div>
				</div>
				<button type="submit" class="mt-6 flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-choco px-7 text-sm font-bold text-white uppercase transition-colors duration-200 hover:bg-choco-deep">
					<Check size={17} aria-hidden="true" /> Share my review
				</button>
				<p class="mt-3 text-center text-xs text-muted">Mock form — nothing is published from this demo.</p>
			</form>
		{/if}
	</div>
</section>
