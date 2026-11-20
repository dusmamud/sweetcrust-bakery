<script lang="ts">
	// Slide-in cart drawer: line items, qty steppers, free-delivery progress over $35.
	// Slide + fade via @humanspeak/svelte-motion AnimatePresence (exit
	// animation included); reduced motion is honoured by MotionConfig.
	import { Minus, Plus, Trash2, X } from '@lucide/svelte';
	import { AnimatePresence, motion } from '@humanspeak/svelte-motion';
	import { cart, clearCart, removeLine, setQty } from '#lib/cart.svelte.ts';
	import { usd } from '#lib/data/site.ts';
	import Picture from './Picture.svelte';

	let { open = $bindable(false) }: { open: boolean } = $props();

	const remaining = $derived(Math.max(0, 35 - cart.subtotal));
	const progress = $derived(Math.min(100, (cart.subtotal / 35) * 100));
</script>

<AnimatePresence>
	{#if open}
		<div class="fixed inset-0 z-[70]" role="dialog" aria-modal="true" aria-label="Your basket">
			<motion.button
				key="cart-backdrop"
				type="button"
				class="absolute inset-0 cursor-default bg-choco-deep/50"
				aria-label="Close bag"
				onclick={() => (open = false)}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				transition={{ duration: 0.2 }}
			></motion.button>
			<motion.aside
				key="cart-drawer"
				class="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-white shadow-2xl"
				data-lenis-prevent
				initial={{ x: '100%' }}
				animate={{ x: 0 }}
				exit={{ x: '100%' }}
				transition={{ duration: 0.25, ease: 'easeOut' }}
			>
			<div class="flex items-center justify-between border-b border-line px-5 py-4">
				<h2 class="font-display text-2xl font-medium text-choco">Your basket ({cart.count})</h2>
				<button
					type="button"
					onclick={() => (open = false)}
					aria-label="Close bag"
					class="flex h-12 w-12 items-center justify-center rounded-full text-ink hover:bg-sand"
				>
					<X size={22} aria-hidden="true" />
				</button>
			</div>

			{#if cart.count === 0}
				<div class="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
					<p class="font-display text-3xl text-choco">Your basket is empty</p>
					<p class="text-muted">Add something sweet — it will wait for you here.</p>
					<a
						href="/shop"
						onclick={() => (open = false)}
						class="mt-2 flex min-h-12 items-center rounded-full bg-choco px-8 text-sm font-bold tracking-wider text-white uppercase"
					>
						Shop treats
					</a>
				</div>
			{:else}
				<div class="border-b border-line px-5 py-3">
					{#if remaining > 0}
						<p class="text-sm font-semibold text-ink">Add {usd(remaining)} more for free delivery</p>
					{:else}
						<p class="text-sm font-semibold text-choco-light">Free delivery unlocked</p>
					{/if}
					<div class="mt-2 h-2 overflow-hidden rounded-full bg-sand">
						<div class="h-full rounded-full bg-choco transition-all duration-300" style="width: {progress}%"></div>
					</div>
				</div>

				<ul class="flex-1 overflow-y-auto px-5 py-4" data-lenis-prevent>
					{#each cart.lines as line (line.slug + line.option)}
						<li class="flex items-center gap-3 border-b border-line/70 py-3">
							<Picture
								name={line.image}
								alt={line.name}
								width={160}
								height={160}
								imgClass="h-16 w-16 shrink-0 rounded-lg object-cover"
							/>
							<div class="min-w-0 flex-1">
								<p class="truncate font-semibold text-ink">{line.name}</p>
								{#if line.option}<p class="text-sm text-muted">{line.option}</p>{/if}
								{#if line.flavour}<p class="text-sm text-muted">{line.flavour}</p>{/if}
								{#if line.message}<p class="truncate text-sm text-muted">“{line.message}”</p>{/if}
								{#if line.giftRecipient}<p class="text-sm text-muted">Gift for {line.giftRecipient}</p>{/if}
								<p class="text-sm text-muted">{usd(line.price)} each</p>
							</div>
							<div class="flex shrink-0 flex-col items-end gap-2">
								<div class="flex items-center rounded-full bg-sand">
									<button
										type="button"
										onclick={() => setQty(line.slug, line.option, line.qty - 1, line.flavour ?? '', line.message ?? '')}
										aria-label={`One less ${line.name}`}
										class="flex h-11 w-11 items-center justify-center rounded-full text-ink"
									>
										<Minus size={15} aria-hidden="true" />
									</button>
									<span class="w-6 text-center text-sm font-bold" aria-label={`${line.qty} of ${line.name}`}>{line.qty}</span>
									<button
										type="button"
										onclick={() => setQty(line.slug, line.option, line.qty + 1, line.flavour ?? '', line.message ?? '')}
										aria-label={`One more ${line.name}`}
										class="flex h-11 w-11 items-center justify-center rounded-full text-ink"
									>
										<Plus size={15} aria-hidden="true" />
									</button>
								</div>
								<div class="flex items-center gap-1">
									<p class="text-sm font-bold text-ink">{usd(line.price * line.qty)}</p>
									<button
										type="button"
										onclick={() => removeLine(line.slug, line.option, line.flavour ?? '', line.message ?? '')}
										aria-label={`Remove ${line.name}`}
										class="flex h-11 w-11 items-center justify-center rounded-full text-muted hover:text-ink"
									>
										<Trash2 size={16} aria-hidden="true" />
									</button>
								</div>
							</div>
						</li>
					{/each}
				</ul>

				{#if cart.fulfilment}
					<p class="border-t border-line px-5 py-3 text-sm leading-relaxed text-muted" role="status">
						<strong class="text-ink">{cart.fulfilment.method === 'pickup' ? 'Pickup' : 'Delivery'}:</strong>
						{cart.fulfilment.label}, {cart.fulfilment.slot}
						<a href="/cart" onclick={() => (open = false)} class="ml-1 font-bold text-choco hover:underline">Change</a>
					</p>
				{/if}

				<div class="space-y-1 border-t border-line px-5 py-4 text-sm">
					<p class="flex justify-between"><span class="text-muted">Subtotal</span><span class="font-semibold">{usd(cart.subtotal)}</span></p>
					{#if cart.discount > 0}
						<p class="flex justify-between"><span class="text-muted">Promo discount</span><span class="font-semibold text-choco">−{usd(cart.discount)}</span></p>
					{/if}
					<p class="flex justify-between">
						<span class="text-muted">Delivery</span><span class="font-semibold"
							>{cart.delivery === 0 ? 'Free' : usd(cart.delivery)}</span
						>
					</p>
					<p class="flex justify-between border-t border-line pt-2 text-base font-bold text-ink">
						<span>Total</span><span>{usd(cart.total)}</span>
					</p>
					<div class="flex gap-3 pt-3">
						<button
							type="button"
							onclick={clearCart}
							class="min-h-12 rounded-full border border-line px-5 text-sm font-bold text-muted"
						>
							Clear
						</button>
						<a
							href="/cart"
							onclick={() => (open = false)}
							class="flex min-h-12 flex-1 items-center justify-center rounded-full bg-choco text-sm font-bold tracking-wider text-white uppercase"
						>
							Checkout · {usd(cart.total)}
						</a>
					</div>
				</div>
			{/if}
			</motion.aside>
		</div>
	{/if}
</AnimatePresence>
