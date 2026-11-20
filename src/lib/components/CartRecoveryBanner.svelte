<script lang="ts">
	// Abandoned-cart recovery (mock, consent-gated by the account page's
	// notification preferences). Shows once per session when a saved basket
	// was restored: "Welcome back — your basket is waiting."
	import { ShoppingBag, X } from '@lucide/svelte';
	import { cart, cartMeta, clearCart } from '#lib/cart.svelte.ts';

	const show = $derived(cartMeta.restored && !cartMeta.restoredDismissed && cart.count > 0);

	function dismiss() {
		cartMeta.restoredDismissed = true;
	}
</script>

{#if show}
	<div class="border-b border-line bg-choco-soft" role="status">
		<div class="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
			<ShoppingBag size={19} aria-hidden="true" class="shrink-0 text-choco" />
			<p class="min-w-0 flex-1 text-sm leading-relaxed text-ink">
				<strong>Welcome back — your basket is waiting.</strong>
				<span class="text-muted"> {cart.count} treat{cart.count === 1 ? '' : 's'} saved from your last visit.</span>
			</p>
			<div class="flex items-center gap-2">
				<a href="/cart" class="flex min-h-11 items-center rounded-full bg-choco px-5 text-sm font-bold text-white">View basket</a>
				<button
					type="button"
					onclick={() => {
						clearCart();
						dismiss();
					}}
					class="flex min-h-11 items-center rounded-full border border-line bg-white px-4 text-sm font-bold text-muted"
				>
					Clear
				</button>
				<button type="button" onclick={dismiss} aria-label="Dismiss" class="flex h-11 w-11 items-center justify-center rounded-full text-muted hover:text-ink">
					<X size={18} aria-hidden="true" />
				</button>
			</div>
		</div>
	</div>
{/if}
