<script lang="ts">
	import { Check, Send } from '@lucide/svelte';

	let email = $state('');
	let done = $state(false);

	function subscribe(e: SubmitEvent) {
		e.preventDefault();
		if (!email.trim()) return;
		done = true;
	}
</script>

<section class="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8" aria-labelledby="newsletter-title">
	<div class="flex flex-col items-start gap-6 rounded-3xl bg-cream-deep p-6 sm:p-10 lg:flex-row lg:items-center lg:justify-between">
		<div class="max-w-md">
			<h2 id="newsletter-title" class="font-display text-3xl font-semibold text-choco">Stay Updated with Sweet Deals</h2>
			<p class="mt-2 leading-relaxed text-muted">
				Get exclusive offers, new flavors and special discounts straight to your inbox.
			</p>
			<p class="mt-2 font-script text-2xl text-caramel">Fresh news, every week ♡</p>
		</div>
		{#if done}
			<p class="flex min-h-12 items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-choco ring-1 ring-line" role="status">
				<Check size={19} aria-hidden="true" class="text-caramel" /> Thank you! You are on the list — sweet deals are on their way.
			</p>
		{:else}
			<form onsubmit={subscribe} class="flex w-full max-w-md flex-col gap-3 sm:flex-row">
				<label for="newsletter-email" class="sr-only">Your email address</label>
				<input
					id="newsletter-email"
					type="email"
					required
					bind:value={email}
					placeholder="Your Email Address"
					class="min-h-12 flex-1 rounded-full border border-line bg-white px-5 text-base text-ink placeholder:text-muted"
				/>
				<button
					type="submit"
					class="flex min-h-12 items-center justify-center gap-2 rounded-full bg-choco px-7 text-sm font-bold text-white uppercase transition-colors duration-200 hover:bg-choco-deep"
				>
					Subscribe <Send size={16} aria-hidden="true" />
				</button>
			</form>
		{/if}
	</div>
</section>
