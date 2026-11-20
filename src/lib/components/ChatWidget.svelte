<script lang="ts">
	// Mock "Chat with us" widget + floating WhatsApp button. The chat answers
	// are canned mock replies; WhatsApp is a wa.me deep link with prefilled
	// text (no real chat backend, no messages sent from the site).
	import { MessageCircle, X } from '@lucide/svelte';
	import { chatAnswers, site } from '#lib/data/site.ts';
	import BrandIcon from './BrandIcon.svelte';

	let open = $state(false);
	let answer = $state<string | null>(null);
	const waHref = `https://wa.me/12345678900?text=${encodeURIComponent('Hi SweetCrust! I have a question about an order.')}`;
</script>

<!-- Mobile offset clears BOTH bottom bars: the 56px tab bar and the
     ~80px sticky add-to-cart on product pages (both include safe-area). -->
<div class="fixed right-4 bottom-[calc(5.75rem+env(safe-area-inset-bottom))] z-40 flex flex-col items-end gap-3 lg:right-6 lg:bottom-6">
	{#if open}
		<div class="w-[min(20rem,calc(100vw-2rem))] overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-line" role="dialog" aria-label="Chat with SweetCrust">
			<div class="flex items-center justify-between bg-choco px-5 py-4 text-white">
				<div>
					<p class="font-display text-lg font-semibold">Chat with us</p>
					<p class="text-xs text-white/80">Demo chat — replies are instant mock answers.</p>
				</div>
				<button type="button" onclick={() => (open = false)} aria-label="Close chat" class="flex h-11 w-11 items-center justify-center rounded-full hover:bg-white/10">
					<X size={20} aria-hidden="true" />
				</button>
			</div>
			<div class="max-h-80 overflow-y-auto p-4">
				{#if answer}
					<p class="rounded-2xl rounded-bl-none bg-cream-deep p-3 text-sm leading-relaxed text-ink ring-1 ring-line">{answer}</p>
					<button type="button" onclick={() => (answer = null)} class="mt-3 flex min-h-11 items-center text-sm font-bold text-choco hover:underline">← Ask something else</button>
				{:else}
					<p class="text-sm leading-relaxed text-muted">Hi! How can we help? Pick a question below — or message us on WhatsApp.</p>
					<ul class="mt-3 space-y-2">
						{#each chatAnswers as item}
							<li>
								<button
									type="button"
									onclick={() => (answer = item.a)}
									class="flex min-h-12 w-full items-center rounded-2xl bg-cream-deep px-4 text-left text-sm font-semibold text-ink ring-1 ring-line transition-colors duration-150 hover:bg-sand"
								>
									{item.q}
								</button>
							</li>
						{/each}
					</ul>
				{/if}
			</div>
			<div class="border-t border-line p-3">
				<a
					href={waHref}
					target="_blank"
					rel="noopener"
					class="flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#25d366] px-5 text-sm font-bold text-white"
				>
					<BrandIcon name="whatsapp" size={18} /> Continue on WhatsApp
				</a>
				<p class="mt-2 text-center text-xs text-muted">Or call us: <a href={site.phoneHref} class="font-bold text-choco">{site.phoneDisplay}</a></p>
			</div>
		</div>
	{/if}
	<div class="flex gap-2">
		<a
			href={waHref}
			target="_blank"
			rel="noopener"
			aria-label="Message SweetCrust on WhatsApp"
			class="flex h-14 w-14 items-center justify-center rounded-full bg-[#25d366] text-white shadow-lg transition-transform duration-150 hover:scale-105"
		>
			<BrandIcon name="whatsapp" size={26} />
		</a>
		<button
			type="button"
			onclick={() => (open = !open)}
			aria-expanded={open}
			aria-label={open ? 'Close chat' : 'Chat with SweetCrust'}
			class="flex h-14 w-14 items-center justify-center rounded-full bg-choco text-white shadow-lg transition-transform duration-150 hover:scale-105"
		>
			{#if open}<X size={24} aria-hidden="true" />{:else}<MessageCircle size={24} aria-hidden="true" />{/if}
		</button>
	</div>
</div>
