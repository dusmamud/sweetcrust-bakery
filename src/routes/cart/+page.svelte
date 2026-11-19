<script lang="ts">
	import { ArrowRight, Minus, Plus, ShoppingBag, Trash2 } from '@lucide/svelte';
	import { cart, clearCart, removeLine, setQty } from '#lib/cart.svelte.ts';
	import { site, usd } from '#lib/data/site.ts';
	import PageHero from '#lib/components/PageHero.svelte';
	import Picture from '#lib/components/Picture.svelte';
</script>

<svelte:head>
	<title>Your Basket — SweetCrust Bakery &amp; Cafe</title>
	<meta name="description" content="Review your SweetCrust basket — cakes, cupcakes and treats, ready for delivery or pickup." />
</svelte:head>

<PageHero title="Your Basket" eyebrow="Fresh and ready" intro="Review your treats below. Free delivery over $35 — otherwise $4.95 within New York City." />

<section class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
	{#if cart.count === 0}
		<div class="mx-auto max-w-xl rounded-3xl bg-white p-10 text-center ring-1 ring-line">
			<span class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-choco-soft text-choco"><ShoppingBag size={28} aria-hidden="true" /></span>
			<h2 class="mt-5 font-display text-3xl font-semibold text-choco">Your basket is empty</h2>
			<p class="mt-3 leading-relaxed text-muted">Add something sweet — a cake, a box of cupcakes, a tray of cinnamon rolls. It will wait for you here.</p>
			<a href="/shop" class="mt-7 inline-flex min-h-12 items-center rounded-full bg-choco px-7 text-sm font-bold text-white uppercase">Shop treats</a>
		</div>
	{:else}
		<div class="grid gap-8 lg:grid-cols-3">
			<div class="lg:col-span-2">
				<ul class="space-y-4">
					{#each cart.lines as line (line.slug + line.option)}
						<li class="flex flex-col gap-4 rounded-3xl bg-white p-4 ring-1 ring-line sm:flex-row sm:items-center sm:p-5">
							<a href="/product/{line.slug}" class="shrink-0 overflow-hidden rounded-2xl bg-sand">
								<Picture name={line.image} alt={line.name} width={320} height={213} imgClass="h-24 w-full object-cover sm:h-24 sm:w-32" />
							</a>
							<div class="min-w-0 flex-1">
								<a href="/product/{line.slug}" class="font-display text-xl font-semibold text-choco hover:underline">{line.name}</a>
								{#if line.option}<p class="mt-0.5 text-sm text-muted">{line.option}</p>{/if}
								<p class="mt-1 text-sm text-muted">{usd(line.price)} each</p>
							</div>
							<div class="flex items-center justify-between gap-3 sm:flex-col sm:items-end">
								<div class="flex items-center rounded-full bg-cream-deep ring-1 ring-line">
									<button type="button" onclick={() => setQty(line.slug, line.option, line.qty - 1)} aria-label={`One less ${line.name}`} class="flex h-12 w-12 items-center justify-center rounded-full text-ink"><Minus size={16} aria-hidden="true" /></button>
									<span class="w-7 text-center font-bold" aria-label={`${line.qty} of ${line.name}`}>{line.qty}</span>
									<button type="button" onclick={() => setQty(line.slug, line.option, line.qty + 1)} aria-label={`One more ${line.name}`} class="flex h-12 w-12 items-center justify-center rounded-full text-ink"><Plus size={16} aria-hidden="true" /></button>
								</div>
								<div class="flex items-center gap-2">
									<p class="font-bold text-ink">{usd(line.price * line.qty)}</p>
									<button type="button" onclick={() => removeLine(line.slug, line.option)} aria-label={`Remove ${line.name}`} class="flex h-12 w-12 items-center justify-center rounded-full text-muted hover:text-ink"><Trash2 size={18} aria-hidden="true" /></button>
								</div>
							</div>
						</li>
					{/each}
				</ul>
				<button type="button" onclick={clearCart} class="mt-5 inline-flex min-h-12 items-center rounded-full border border-line bg-white px-6 text-sm font-bold text-muted transition-colors duration-150 hover:text-ink">Clear basket</button>
			</div>

			<aside class="h-fit rounded-3xl bg-white p-6 ring-1 ring-line lg:sticky lg:top-32">
				<h2 class="font-display text-2xl font-semibold text-choco">Order summary</h2>
				<div class="mt-4 space-y-2 text-sm">
					<p class="flex justify-between"><span class="text-muted">Subtotal</span><span class="font-semibold">{usd(cart.subtotal)}</span></p>
					<p class="flex justify-between"><span class="text-muted">Delivery</span><span class="font-semibold">{cart.delivery === 0 ? 'Free' : usd(cart.delivery)}</span></p>
					{#if cart.delivery > 0}
						<p class="rounded-xl bg-cream-deep px-3 py-2 text-xs leading-relaxed text-muted">Add {usd(35 - cart.subtotal)} more for free delivery.</p>
					{/if}
					<p class="flex justify-between border-t border-line pt-3 text-base font-bold text-ink"><span>Total</span><span>{usd(cart.total)}</span></p>
				</div>
				<a href="/checkout" class="mt-6 flex min-h-12 items-center justify-center gap-2 rounded-full bg-choco px-7 text-sm font-bold text-white uppercase transition-colors duration-200 hover:bg-choco-deep">
					Checkout <ArrowRight size={17} aria-hidden="true" />
				</a>
				<a href="/shop" class="mt-3 flex min-h-12 items-center justify-center rounded-full border-2 border-choco px-7 text-sm font-bold text-choco uppercase">Continue shopping</a>
				<p class="mt-4 text-center text-xs leading-relaxed text-muted">Mock checkout — no payment is taken and no card details are collected.</p>
			</aside>
		</div>
	{/if}
</section>
