<script lang="ts">
	import { ArrowRight, CalendarClock, MapPin, Minus, Plus, ShoppingBag, Trash2, Truck } from '@lucide/svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import autoAnimate from '@formkit/auto-animate';
	import { cart, clearCart, removeLine, setFulfilment, setQty, type Fulfilment } from '#lib/cart.svelte.ts';
	import { promo, applyPromo } from '#lib/promo.svelte.ts';
	import { cutoffText, site, usd } from '#lib/data/site.ts';
	import { leadTimeForSlugs } from '#lib/fulfilment.ts';
	import PageHero from '#lib/components/PageHero.svelte';
	import Picture from '#lib/components/Picture.svelte';
	import SlotPicker from '#lib/components/SlotPicker.svelte';
	import ZipChecker from '#lib/components/ZipChecker.svelte';
	import PromoField from '#lib/components/PromoField.svelte';
	import ExpressPay from '#lib/components/ExpressPay.svelte';
	import BundleUpsell from '#lib/components/BundleUpsell.svelte';

	let method = $state<'delivery' | 'pickup'>(cart.fulfilment?.method ?? 'delivery');
	const leadDays = $derived(leadTimeForSlugs(cart.lines.map((l) => l.slug)));
	const deliveryFee = $derived(method === 'pickup' ? 0 : cart.delivery);
	const total = $derived(cart.subtotal - cart.discount + deliveryFee);
	const freeProgress = $derived(Math.min(100, ((cart.subtotal - cart.discount) / 35) * 100));
	const freeRemaining = $derived(Math.max(0, 35 - (cart.subtotal - cart.discount)));

	// Auto-apply a promo code from a link (?promo=WELCOME10) — e.g. from a
	// recovery message. Runs once, client-side only.
	let promoAutoApplied = $state(false);
	$effect(() => {
		if (promoAutoApplied || typeof window === 'undefined') return;
		const code = page.url.searchParams.get('promo');
		if (code) {
			applyPromo(code);
			promoAutoApplied = true;
		}
	});

	function onSlot(f: NonNullable<Fulfilment>) {
		setFulfilment({ ...f, method });
	}

	function onExpress(methodName: 'Apple Pay' | 'Google Pay') {
		goto(`/checkout?express=${methodName === 'Apple Pay' ? 'apple-pay' : 'google-pay'}`);
	}
</script>

<svelte:head>
	<title>Your Basket — SweetCrust Bakery &amp; Cafe</title>
	<meta name="description" content="Review your SweetCrust basket — cakes, cupcakes and treats, ready for delivery or pickup. Pick your date and time slot before checkout." />
</svelte:head>

<PageHero title="Your Basket" eyebrow="Fresh and ready" intro="Review your treats below. Free delivery over $35 — otherwise $4.95 within New York City. {cutoffText}." />

<section class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
	{#if cart.count === 0}
		<div class="mx-auto max-w-xl rounded-3xl bg-white p-10 text-center ring-1 ring-line">
			<span class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-choco-soft text-choco"><ShoppingBag size={28} aria-hidden="true" /></span>
			<h2 class="mt-5 font-display text-3xl font-semibold text-choco">Your basket is empty</h2>
			<p class="mt-3 leading-relaxed text-muted">Add something sweet — a cake, a box of cupcakes, a tray of cinnamon rolls. It will wait for you here.</p>
			<a href="/shop" class="mt-7 inline-flex min-h-12 items-center rounded-full bg-choco px-7 text-sm font-bold text-white uppercase">Shop treats</a>
		</div>
	{:else}
		<div class="mx-auto mb-8 max-w-3xl">
			<ExpressPay amount={total} onExpress={onExpress} />
		</div>
		<div class="grid gap-8 lg:grid-cols-3">
			<div class="space-y-6 lg:col-span-2">
				<ul class="space-y-4" use:autoAnimate>
					{#each cart.lines as line (line.slug + line.option + (line.flavour ?? '') + (line.message ?? ''))}
						<li class="flex flex-col gap-4 rounded-3xl bg-white p-4 ring-1 ring-line sm:flex-row sm:items-center sm:p-5">
							<a href="/product/{line.slug}" class="shrink-0 overflow-hidden rounded-2xl bg-sand">
								<Picture name={line.image} alt={line.name} width={320} height={213} imgClass="h-24 w-full object-cover sm:h-24 sm:w-32" />
							</a>
							<div class="min-w-0 flex-1">
								<a href="/product/{line.slug}" class="font-display text-xl font-semibold text-choco hover:underline">{line.name}</a>
								{#if line.option}<p class="mt-0.5 text-sm text-muted">{line.option}</p>{/if}
								{#if line.flavour}<p class="text-sm text-muted">{line.flavour}</p>{/if}
								{#if line.message}<p class="truncate text-sm text-muted">Cake message: “{line.message}”</p>{/if}
								{#if line.giftRecipient}<p class="text-sm text-muted">Gift for {line.giftRecipient}{line.giftMessage ? ` — “${line.giftMessage}”` : ''}</p>{/if}
								<p class="mt-1 text-sm text-muted">{usd(line.price)} each</p>
							</div>
							<div class="flex items-center justify-between gap-3 sm:flex-col sm:items-end">
								<div class="flex items-center rounded-full bg-cream-deep ring-1 ring-line">
									<button type="button" onclick={() => setQty(line.slug, line.option, line.qty - 1, line.flavour ?? '', line.message ?? '')} aria-label={`One less ${line.name}`} class="flex h-12 w-12 items-center justify-center rounded-full text-ink"><Minus size={16} aria-hidden="true" /></button>
									<span class="w-7 text-center font-bold" aria-label={`${line.qty} of ${line.name}`}>{line.qty}</span>
									<button type="button" onclick={() => setQty(line.slug, line.option, line.qty + 1, line.flavour ?? '', line.message ?? '')} aria-label={`One more ${line.name}`} class="flex h-12 w-12 items-center justify-center rounded-full text-ink"><Plus size={16} aria-hidden="true" /></button>
								</div>
								<div class="flex items-center gap-2">
									<p class="font-bold text-ink">{usd(line.price * line.qty)}</p>
									<button type="button" onclick={() => removeLine(line.slug, line.option, line.flavour ?? '', line.message ?? '')} aria-label={`Remove ${line.name}`} class="flex h-12 w-12 items-center justify-center rounded-full text-muted hover:text-ink"><Trash2 size={18} aria-hidden="true" /></button>
								</div>
							</div>
						</li>
					{/each}
				</ul>
				<button type="button" onclick={clearCart} class="inline-flex min-h-12 items-center rounded-full border border-line bg-white px-6 text-sm font-bold text-muted transition-colors duration-150 hover:text-ink">Clear basket</button>

				<!-- Fulfilment: method + date/slot picker -->
				<div class="rounded-3xl bg-white p-6 ring-1 ring-line sm:p-8">
					<h2 class="flex items-center gap-2 font-display text-2xl font-semibold text-choco"><CalendarClock size={22} aria-hidden="true" /> When should we have it ready?</h2>
					<p class="mt-2 text-sm leading-relaxed text-muted">
						{#if leadDays > 0}
							Your basket includes cakes that need {leadDays} day{leadDays === 1 ? '' : 's'} of preparation — the earliest date below already accounts for that.
						{:else}
							Everything in your basket is baked fresh daily. {cutoffText}.
						{/if}
						Closed Sundays.
					</p>
					<div class="mt-5 grid gap-3 sm:grid-cols-2" role="group" aria-label="Delivery or pickup">
						<button
							type="button"
							onclick={() => {
								method = 'delivery';
								if (cart.fulfilment) setFulfilment({ ...cart.fulfilment, method: 'delivery' });
							}}
							aria-pressed={method === 'delivery'}
							class="flex min-h-14 items-center gap-3 rounded-2xl border px-5 text-left font-bold transition-colors duration-150 {method === 'delivery' ? 'border-choco bg-choco-soft text-choco' : 'border-line bg-white text-ink'}"
						>
							<Truck size={20} aria-hidden="true" /> Delivery · {deliveryFee === 0 && method === 'delivery' ? 'Free over $35' : 'from $4.95'}
						</button>
						<button
							type="button"
							onclick={() => {
								method = 'pickup';
								if (cart.fulfilment) setFulfilment({ ...cart.fulfilment, method: 'pickup' });
							}}
							aria-pressed={method === 'pickup'}
							class="flex min-h-14 items-center gap-3 rounded-2xl border px-5 text-left font-bold transition-colors duration-150 {method === 'pickup' ? 'border-choco bg-choco-soft text-choco' : 'border-line bg-white text-ink'}"
						>
							<MapPin size={20} aria-hidden="true" /> Pickup · Free · 123 Baker Street
						</button>
					</div>
					<div class="mt-6">
						<SlotPicker leadDays={leadDays} value={cart.fulfilment} onselect={onSlot} />
					</div>
					{#if method === 'delivery'}
						<div class="mt-6"><ZipChecker /></div>
					{/if}
				</div>
			</div>

			<aside class="h-fit rounded-3xl bg-white p-6 ring-1 ring-line lg:sticky lg:top-32">
				<h2 class="font-display text-2xl font-semibold text-choco">Order summary</h2>
				{#if method === 'delivery'}
					<div class="mt-4">
						{#if freeRemaining > 0}
							<p class="text-sm font-semibold text-ink">Add {usd(freeRemaining)} more for free delivery</p>
						{:else}
							<p class="text-sm font-semibold text-choco-light">Free delivery unlocked</p>
						{/if}
						<div class="mt-2 h-2 overflow-hidden rounded-full bg-sand" role="progressbar" aria-valuenow={Math.round(freeProgress)} aria-valuemin={0} aria-valuemax={100} aria-label="Progress to free delivery">
							<div class="h-full rounded-full bg-choco transition-all duration-300" style="width: {freeProgress}%"></div>
						</div>
					</div>
				{/if}
				<div class="mt-4">
					<PromoField />
				</div>
				<div class="mt-4 space-y-2 text-sm">
					<p class="flex justify-between"><span class="text-muted">Subtotal</span><span class="font-semibold">{usd(cart.subtotal)}</span></p>
					{#if cart.discount > 0}
						<p class="flex justify-between"><span class="text-muted">Promo ({promo.applied?.code})</span><span class="font-semibold text-choco">−{usd(cart.discount)}</span></p>
					{/if}
					<p class="flex justify-between"><span class="text-muted">{method === 'pickup' ? 'Pickup' : 'Delivery'}</span><span class="font-semibold">{deliveryFee === 0 ? 'Free' : usd(deliveryFee)}</span></p>
					{#if cart.fulfilment}
						<p class="flex justify-between"><span class="text-muted">Slot</span><span class="text-right font-semibold">{cart.fulfilment.label}, {cart.fulfilment.slot}</span></p>
					{:else}
						<p class="rounded-xl bg-cream-deep px-3 py-2 text-xs leading-relaxed text-muted">Pick a date and time slot above — it takes ten seconds and guarantees your treats are ready.</p>
					{/if}
					<p class="flex justify-between border-t border-line pt-3 text-base font-bold text-ink"><span>Total</span><span>{usd(total)}</span></p>
				</div>
				<a href="/checkout" class="mt-6 flex min-h-12 items-center justify-center gap-2 rounded-full bg-choco px-7 text-sm font-bold text-white uppercase transition-colors duration-200 hover:bg-choco-deep">
					Checkout <ArrowRight size={17} aria-hidden="true" />
				</a>
				<a href="/shop" class="mt-3 flex min-h-12 items-center justify-center rounded-full border-2 border-choco px-7 text-sm font-bold text-choco uppercase">Continue shopping</a>
				<p class="mt-4 text-center text-xs leading-relaxed text-muted">Mock checkout — no payment is taken and no card details are collected.</p>
			</aside>
		</div>
		<div class="mt-8">
			<BundleUpsell />
		</div>
	{/if}
</section>
