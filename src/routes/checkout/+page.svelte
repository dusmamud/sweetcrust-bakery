<script lang="ts">
	import { Check, Clock, MapPin, PartyPopper, Truck } from '@lucide/svelte';
	import { cart, clearCart } from '#lib/cart.svelte.ts';
	import { site, usd } from '#lib/data/site.ts';
	import PageHero from '#lib/components/PageHero.svelte';

	let step = $state(1);
	let method = $state<'delivery' | 'pickup'>('delivery');
	let name = $state('');
	let phone = $state('');
	let address = $state('');
	let slot = $state('Today, 2:00 – 4:00 PM');
	let payMethod = $state('Card');
	let placed = $state(false);
	let ref = $state('');
	let eta = $state('');

	function toPayment(e: SubmitEvent) {
		e.preventDefault();
		step = 2;
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}

	function placeOrder(e: SubmitEvent) {
		e.preventDefault();
		ref = `SC-2026-${Math.floor(1000 + Math.random() * 9000)}`;
		eta = method === 'delivery' ? 'Today, 2:30 – 3:30 PM' : 'Today, 3:00 PM — pickup at 123 Baker Street';
		placed = true;
		clearCart();
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}
</script>

<svelte:head>
	<title>Checkout — SweetCrust Bakery &amp; Cafe</title>
	<meta name="description" content="Mock checkout for SweetCrust Bakery — delivery or pickup, then a mock payment step. No real payment is taken." />
</svelte:head>

<PageHero title="Checkout" eyebrow="Almost there" intro="Delivery or pickup, then a mock payment step — no card details are collected and no payment is taken." />

<section class="mx-auto max-w-3xl px-4 py-10 sm:px-6">
	{#if cart.count === 0 && !placed}
		<div class="rounded-3xl bg-white p-10 text-center ring-1 ring-line">
			<p class="font-display text-3xl font-semibold text-choco">Nothing to check out yet</p>
			<p class="mt-3 text-muted">Your basket is empty. Add a cake or two first.</p>
			<a href="/shop" class="mt-7 inline-flex min-h-12 items-center rounded-full bg-choco px-7 text-sm font-bold text-white uppercase">Shop treats</a>
		</div>
	{:else if placed}
		<div class="rounded-3xl bg-white p-8 text-center ring-1 ring-line sm:p-10" role="status">
			<span class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-choco-soft text-choco"><PartyPopper size={28} aria-hidden="true" /></span>
			<h2 class="mt-5 font-display text-3xl font-semibold text-choco">Order confirmed!</h2>
			<p class="mt-3 leading-relaxed text-muted">Thank you, {name || 'friend'} — your treats are being prepared with love.</p>
			<p class="mt-5 inline-block rounded-full bg-cream-deep px-5 py-2.5 font-bold text-choco ring-1 ring-line">Order ref: {ref}</p>
			<div class="mx-auto mt-6 max-w-md space-y-3 text-left">
				{#each [[true, 'Order received', 'We have your order and the bakers are on it.'], [true, 'Being baked', 'Your treats are in the oven right now.'], [false, method === 'delivery' ? 'Out for delivery' : 'Ready for pickup', eta], [false, method === 'delivery' ? 'Delivered' : 'Picked up', 'Enjoy every bite!']] as [done, label, detail]}
					<div class="flex gap-3">
						<span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full {done ? 'bg-choco text-white' : 'bg-cream-deep text-choco ring-1 ring-line'}">
							{#if done}<Check size={15} aria-hidden="true" />{:else}<Clock size={15} aria-hidden="true" />{/if}
						</span>
						<div>
							<p class="font-bold text-ink">{label}</p>
							<p class="text-sm text-muted">{detail}</p>
						</div>
					</div>
				{/each}
			</div>
			<p class="mt-6 flex items-center justify-center gap-2 text-sm text-muted">
				{#if method === 'delivery'}<Truck size={16} aria-hidden="true" class="text-caramel" />{:else}<MapPin size={16} aria-hidden="true" class="text-caramel" />{/if}
				{eta}
			</p>
			<div class="mt-7 flex flex-wrap justify-center gap-3">
				<a href="/track-order" class="inline-flex min-h-12 items-center rounded-full bg-choco px-7 text-sm font-bold text-white uppercase">Track your order</a>
				<a href="/shop" class="inline-flex min-h-12 items-center rounded-full border-2 border-choco px-7 text-sm font-bold text-choco uppercase">Order more treats</a>
			</div>
		</div>
	{:else}
		<ol class="mb-8 flex items-center gap-2 text-sm font-bold" aria-label="Checkout steps">
			<li class="flex min-h-11 flex-1 items-center justify-center rounded-full {step >= 1 ? 'bg-choco text-white' : 'bg-white text-muted ring-1 ring-line'}">1 · Details</li>
			<li class="flex min-h-11 flex-1 items-center justify-center rounded-full {step >= 2 ? 'bg-choco text-white' : 'bg-white text-muted ring-1 ring-line'}">2 · Payment</li>
			<li class="flex min-h-11 flex-1 items-center justify-center rounded-full bg-white text-muted ring-1 ring-line">3 · Done</li>
		</ol>

		{#if step === 1}
			<form onsubmit={toPayment} class="rounded-3xl bg-white p-6 ring-1 ring-line sm:p-8">
				<h2 class="font-display text-2xl font-semibold text-choco">Delivery or pickup?</h2>
				<div class="mt-4 grid gap-3 sm:grid-cols-2" role="group" aria-label="Delivery or pickup">
					<button type="button" onclick={() => (method = 'delivery')} aria-pressed={method === 'delivery'} class="flex min-h-14 items-center gap-3 rounded-2xl border px-5 text-left font-bold transition-colors duration-150 {method === 'delivery' ? 'border-choco bg-choco-soft text-choco' : 'border-line bg-white text-ink'}">
						<Truck size={20} aria-hidden="true" /> Delivery · {cart.delivery === 0 ? 'Free' : usd(cart.delivery)}
					</button>
					<button type="button" onclick={() => (method = 'pickup')} aria-pressed={method === 'pickup'} class="flex min-h-14 items-center gap-3 rounded-2xl border px-5 text-left font-bold transition-colors duration-150 {method === 'pickup' ? 'border-choco bg-choco-soft text-choco' : 'border-line bg-white text-ink'}">
						<MapPin size={20} aria-hidden="true" /> Pickup · Free
					</button>
				</div>
				<div class="mt-6 grid gap-5 sm:grid-cols-2">
					<div>
						<label for="name" class="text-sm font-bold text-ink">Your name</label>
						<input id="name" type="text" required bind:value={name} placeholder="Your full name" class="mt-2 min-h-12 w-full rounded-full border border-line bg-white px-5 text-base text-ink placeholder:text-muted" />
					</div>
					<div>
						<label for="phone" class="text-sm font-bold text-ink">Phone</label>
						<input id="phone" type="tel" required bind:value={phone} placeholder="+1 234 567 8900" class="mt-2 min-h-12 w-full rounded-full border border-line bg-white px-5 text-base text-ink placeholder:text-muted" />
					</div>
					{#if method === 'delivery'}
						<div class="sm:col-span-2">
							<label for="address" class="text-sm font-bold text-ink">Delivery address</label>
							<input id="address" type="text" required bind:value={address} placeholder="Street, apartment, New York, NY" class="mt-2 min-h-12 w-full rounded-full border border-line bg-white px-5 text-base text-ink placeholder:text-muted" />
						</div>
					{:else}
						<p class="rounded-2xl bg-cream-deep p-4 text-sm leading-relaxed text-muted sm:col-span-2">Pickup from <strong class="text-ink">123 Baker Street, New York, NY 10001</strong>. We will have your order boxed and ready at your chosen time.</p>
					{/if}
					<div class="sm:col-span-2">
						<label for="slot" class="text-sm font-bold text-ink">Time slot</label>
						<select id="slot" bind:value={slot} class="mt-2 min-h-12 w-full rounded-full border border-line bg-white px-4 text-base text-ink">
							{#each ['Today, 2:00 – 4:00 PM', 'Today, 4:00 – 6:00 PM', 'Tomorrow, 9:00 – 11:00 AM', 'Tomorrow, 2:00 – 4:00 PM'] as s}<option>{s}</option>{/each}
						</select>
					</div>
				</div>
				<div class="mt-6 space-y-2 border-t border-line pt-4 text-sm">
					<p class="flex justify-between"><span class="text-muted">Subtotal</span><span class="font-semibold">{usd(cart.subtotal)}</span></p>
					<p class="flex justify-between"><span class="text-muted">{method === 'delivery' ? 'Delivery' : 'Pickup'}</span><span class="font-semibold">{method === 'pickup' ? 'Free' : cart.delivery === 0 ? 'Free' : usd(cart.delivery)}</span></p>
					<p class="flex justify-between text-base font-bold text-ink"><span>Total</span><span>{usd(method === 'pickup' ? cart.subtotal : cart.total)}</span></p>
				</div>
				<button type="submit" class="mt-6 flex min-h-12 w-full items-center justify-center rounded-full bg-choco px-7 text-sm font-bold text-white uppercase transition-colors duration-200 hover:bg-choco-deep">Continue to payment</button>
			</form>
		{:else}
			<form onsubmit={placeOrder} class="rounded-3xl bg-white p-6 ring-1 ring-line sm:p-8">
				<h2 class="font-display text-2xl font-semibold text-choco">Mock payment</h2>
				<p class="mt-2 text-sm leading-relaxed text-muted">This is a demo checkout. Choose any method — no card details are collected and no payment is taken.</p>
				<div class="mt-5 grid gap-3 sm:grid-cols-3" role="group" aria-label="Payment method">
					{#each ['Card', 'UPI', 'Cash on delivery'] as p}
						<button type="button" onclick={() => (payMethod = p)} aria-pressed={payMethod === p} class="flex min-h-12 items-center justify-center rounded-full border px-4 text-sm font-bold transition-colors duration-150 {payMethod === p ? 'border-choco bg-choco text-white' : 'border-line bg-white text-ink'}">{p}</button>
					{/each}
				</div>
				{#if payMethod === 'Card'}
					<div class="mt-5 grid gap-5 sm:grid-cols-2">
						<div class="sm:col-span-2">
							<label for="card-name" class="text-sm font-bold text-ink">Name on card</label>
							<input id="card-name" type="text" placeholder="As shown on the card (demo only)" class="mt-2 min-h-12 w-full rounded-full border border-line bg-white px-5 text-base text-ink placeholder:text-muted" />
						</div>
						<div class="sm:col-span-2">
							<label for="card-num" class="text-sm font-bold text-ink">Card number</label>
							<input id="card-num" type="text" inputmode="numeric" placeholder="4242 4242 4242 4242 (demo only)" class="mt-2 min-h-12 w-full rounded-full border border-line bg-white px-5 text-base text-ink placeholder:text-muted" />
						</div>
					</div>
				{/if}
				<p class="mt-6 flex justify-between border-t border-line pt-4 text-base font-bold text-ink"><span>Total to pay</span><span>{usd(method === 'pickup' ? cart.subtotal : cart.total)}</span></p>
				<div class="mt-6 flex gap-3">
					<button type="button" onclick={() => (step = 1)} class="flex min-h-12 items-center rounded-full border border-line px-6 text-sm font-bold text-ink">Back</button>
					<button type="submit" class="flex min-h-12 flex-1 items-center justify-center rounded-full bg-choco px-7 text-sm font-bold text-white uppercase transition-colors duration-200 hover:bg-choco-deep">Place order · {usd(method === 'pickup' ? cart.subtotal : cart.total)}</button>
				</div>
			</form>
		{/if}
	{/if}
</section>
