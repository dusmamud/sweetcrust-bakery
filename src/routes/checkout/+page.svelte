<script lang="ts">
	import { Check, Clock, MapPin, PartyPopper, Truck } from '@lucide/svelte';
	import { cart, clearCart, setFulfilment, type Fulfilment } from '#lib/cart.svelte.ts';
	import { cutoffText, site, usd } from '#lib/data/site.ts';
	import { leadTimeForSlugs } from '#lib/fulfilment.ts';
	import PageHero from '#lib/components/PageHero.svelte';
	import SlotPicker from '#lib/components/SlotPicker.svelte';
	import ZipChecker from '#lib/components/ZipChecker.svelte';

	let step = $state(1);
	let method = $state<'delivery' | 'pickup'>(cart.fulfilment?.method ?? 'delivery');
	let name = $state('');
	let email = $state('');
	let phone = $state('');
	let address = $state('');
	let city = $state('New York');
	let zip = $state('');
	let payMethod = $state('Card');
	let billingSame = $state(true);
	let placed = $state(false);
	let ref = $state('');
	let eta = $state('');
	let errors = $state<Record<string, string>>({});

	const leadDays = $derived(leadTimeForSlugs(cart.lines.map((l) => l.slug)));
	const deliveryFee = $derived(method === 'pickup' ? 0 : cart.delivery);
	const total = $derived(cart.subtotal + deliveryFee);
	const slotText = $derived(
		cart.fulfilment ? `${cart.fulfilment.label}, ${cart.fulfilment.slot}` : 'No slot chosen yet'
	);

	function onSlot(f: NonNullable<Fulfilment>) {
		setFulfilment({ ...f, method });
	}

	function validateDetails(): boolean {
		const e: Record<string, string> = {};
		if (name.trim().length < 2) e.name = 'Please enter your full name.';
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) e.email = 'Please enter a valid email address, e.g. maya@example.com.';
		if (phone.replace(/[^0-9]/g, '').length < 10) e.phone = 'Please enter a phone number we can reach you on (10+ digits).';
		if (method === 'delivery') {
			if (address.trim().length < 5) e.address = 'Please enter your street address.';
			if (!/^\d{5}$/.test(zip.trim())) e.zip = 'Please enter a 5-digit ZIP code.';
		}
		if (!cart.fulfilment) e.slot = 'Please choose a date and time slot above.';
		errors = e;
		if (Object.keys(e).length > 0) {
			const first = document.querySelector('[data-error="true"]');
			first?.scrollIntoView({ behavior: 'smooth', block: 'center' });
		}
		return Object.keys(e).length === 0;
	}

	function toPayment(e: SubmitEvent) {
		e.preventDefault();
		if (!validateDetails()) return;
		step = 2;
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}

	function placeOrder(e: SubmitEvent) {
		e.preventDefault();
		ref = `SC-2026-${Math.floor(1000 + Math.random() * 9000)}`;
		eta =
			method === 'delivery'
				? `${cart.fulfilment?.label ?? 'Today'}, ${cart.fulfilment?.slot ?? '2:00 – 4:00 PM'} — delivery to ${address || 'your address'}`
				: `${cart.fulfilment?.label ?? 'Today'}, ${cart.fulfilment?.slot ?? '2:00 – 4:00 PM'} — pickup at 123 Baker Street`;
		placed = true;
		clearCart();
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}
</script>

<svelte:head>
	<title>Checkout — SweetCrust Bakery &amp; Cafe</title>
	<meta name="description" content="Guest checkout for SweetCrust Bakery — delivery or pickup, pick your date and time slot, then a mock payment step. No real payment is taken." />
</svelte:head>

<PageHero title="Checkout" eyebrow="Almost there" intro="Guest checkout — no account needed. Pick your date and time slot, then a mock payment step. No card details are collected and no payment is taken." />

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
			<p class="mt-2 text-sm text-muted">{cutoffText} — we will text you when your order is on its way.</p>
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
			{#if Object.keys(errors).length > 0}
				<div class="mb-5 rounded-2xl bg-blush p-4 text-sm leading-relaxed text-ink ring-1 ring-line" role="alert">
					<p class="font-bold">A few details need attention:</p>
					<ul class="mt-1 list-disc pl-5">
						{#each Object.values(errors) as msg}<li>{msg}</li>{/each}
					</ul>
				</div>
			{/if}
			<form onsubmit={toPayment} class="rounded-3xl bg-white p-6 ring-1 ring-line sm:p-8" novalidate>
				<h2 class="font-display text-2xl font-semibold text-choco">Delivery or pickup?</h2>
				<div class="mt-4 grid gap-3 sm:grid-cols-2" role="group" aria-label="Delivery or pickup">
					<button type="button" onclick={() => { method = 'delivery'; if (cart.fulfilment) setFulfilment({ ...cart.fulfilment, method: 'delivery' }); }} aria-pressed={method === 'delivery'} class="flex min-h-14 items-center gap-3 rounded-2xl border px-5 text-left font-bold transition-colors duration-150 {method === 'delivery' ? 'border-choco bg-choco-soft text-choco' : 'border-line bg-white text-ink'}">
						<Truck size={20} aria-hidden="true" /> Delivery · {deliveryFee === 0 ? 'Free' : usd(deliveryFee)}
					</button>
					<button type="button" onclick={() => { method = 'pickup'; if (cart.fulfilment) setFulfilment({ ...cart.fulfilment, method: 'pickup' }); }} aria-pressed={method === 'pickup'} class="flex min-h-14 items-center gap-3 rounded-2xl border px-5 text-left font-bold transition-colors duration-150 {method === 'pickup' ? 'border-choco bg-choco-soft text-choco' : 'border-line bg-white text-ink'}">
						<MapPin size={20} aria-hidden="true" /> Pickup · Free
					</button>
				</div>

				<h3 class="mt-7 font-display text-xl font-semibold text-choco">Your date &amp; time slot</h3>
				<p class="mt-1 text-sm text-muted">
					{#if cart.fulfilment}Current slot: <strong class="text-ink">{slotText}</strong> — change it below. {cutoffText}.{:else}{cutoffText}. Closed Sundays.{/if}
				</p>
				<div class="mt-3" data-error={errors.slot ? 'true' : undefined}>
					<SlotPicker leadDays={leadDays} value={cart.fulfilment} onselect={onSlot} />
					{#if errors.slot}<p class="mt-1 text-sm font-semibold text-choco" role="alert">{errors.slot}</p>{/if}
				</div>

				<h3 class="mt-7 font-display text-xl font-semibold text-choco">Your details</h3>
				<div class="mt-4 grid gap-5 sm:grid-cols-2">
					<div>
						<label for="name" class="text-sm font-bold text-ink">Your name</label>
						<input id="name" name="name" type="text" autocomplete="name" bind:value={name} placeholder="Your full name" aria-invalid={!!errors.name} aria-describedby={errors.name ? 'name-err' : undefined} class="mt-2 min-h-12 w-full rounded-full border border-line bg-white px-5 text-base text-ink placeholder:text-muted" />
						{#if errors.name}<p id="name-err" class="mt-1 text-sm font-semibold text-choco" role="alert">{errors.name}</p>{/if}
					</div>
					<div>
						<label for="email" class="text-sm font-bold text-ink">Email</label>
						<input id="email" name="email" type="email" autocomplete="email" bind:value={email} placeholder="you@example.com" aria-invalid={!!errors.email} aria-describedby={errors.email ? 'email-err' : undefined} class="mt-2 min-h-12 w-full rounded-full border border-line bg-white px-5 text-base text-ink placeholder:text-muted" />
						{#if errors.email}<p id="email-err" class="mt-1 text-sm font-semibold text-choco" role="alert">{errors.email}</p>{/if}
					</div>
					<div>
						<label for="phone" class="text-sm font-bold text-ink">Phone</label>
						<input id="phone" name="phone" type="tel" autocomplete="tel" bind:value={phone} placeholder="+1 234 567 8900" aria-invalid={!!errors.phone} aria-describedby={errors.phone ? 'phone-err' : undefined} class="mt-2 min-h-12 w-full rounded-full border border-line bg-white px-5 text-base text-ink placeholder:text-muted" />
						{#if errors.phone}<p id="phone-err" class="mt-1 text-sm font-semibold text-choco" role="alert">{errors.phone}</p>{/if}
					</div>
					{#if method === 'delivery'}
						<div class="sm:col-span-2">
							<label for="address" class="text-sm font-bold text-ink">Delivery address</label>
							<input id="address" name="address" type="text" autocomplete="street-address" bind:value={address} placeholder="Street, apartment, New York, NY" aria-invalid={!!errors.address} aria-describedby={errors.address ? 'address-err' : undefined} class="mt-2 min-h-12 w-full rounded-full border border-line bg-white px-5 text-base text-ink placeholder:text-muted" />
							{#if errors.address}<p id="address-err" class="mt-1 text-sm font-semibold text-choco" role="alert">{errors.address}</p>{/if}
						</div>
						<div>
							<label for="city" class="text-sm font-bold text-ink">City</label>
							<input id="city" name="city" type="text" autocomplete="address-level2" bind:value={city} class="mt-2 min-h-12 w-full rounded-full border border-line bg-white px-5 text-base text-ink" />
						</div>
						<div>
							<label for="zip" class="text-sm font-bold text-ink">ZIP code</label>
							<input id="zip" name="zip" type="text" inputmode="numeric" autocomplete="postal-code" bind:value={zip} placeholder="10001" aria-invalid={!!errors.zip} aria-describedby={errors.zip ? 'zip-err' : undefined} class="mt-2 min-h-12 w-full rounded-full border border-line bg-white px-5 text-base text-ink placeholder:text-muted" />
							{#if errors.zip}<p id="zip-err" class="mt-1 text-sm font-semibold text-choco" role="alert">{errors.zip}</p>{/if}
						</div>
					{:else}
						<p class="rounded-2xl bg-cream-deep p-4 text-sm leading-relaxed text-muted sm:col-span-2">Pickup from <strong class="text-ink">123 Baker Street, New York, NY 10001</strong>. We will have your order boxed and ready at your chosen time, and hold it for up to 2 hours past your slot.</p>
					{/if}
				</div>

				<div class="mt-6 space-y-2 border-t border-line pt-4 text-sm">
					<p class="flex justify-between"><span class="text-muted">Subtotal</span><span class="font-semibold">{usd(cart.subtotal)}</span></p>
					<p class="flex justify-between"><span class="text-muted">{method === 'delivery' ? 'Delivery' : 'Pickup'}</span><span class="font-semibold">{deliveryFee === 0 ? 'Free' : usd(deliveryFee)}</span></p>
					<p class="flex justify-between"><span class="text-muted">Slot</span><span class="font-semibold">{slotText}</span></p>
					<p class="flex justify-between text-base font-bold text-ink"><span>Total</span><span>{usd(total)}</span></p>
				</div>
				<button type="submit" class="mt-6 flex min-h-12 w-full items-center justify-center rounded-full bg-choco px-7 text-sm font-bold text-white uppercase transition-colors duration-200 hover:bg-choco-deep">Continue to payment</button>
				<p class="mt-3 text-center text-xs text-muted">No account needed — guest checkout. We only ask for what delivery needs.</p>
			</form>
			{#if method === 'delivery'}
				<div class="mt-6"><ZipChecker /></div>
			{/if}
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
							<input id="card-name" name="cc-name" type="text" autocomplete="cc-name" placeholder="As shown on the card (demo only)" class="mt-2 min-h-12 w-full rounded-full border border-line bg-white px-5 text-base text-ink placeholder:text-muted" />
						</div>
						<div class="sm:col-span-2">
							<label for="card-num" class="text-sm font-bold text-ink">Card number</label>
							<input id="card-num" name="cc-number" type="text" inputmode="numeric" autocomplete="cc-number" placeholder="4242 4242 4242 4242 (demo only)" class="mt-2 min-h-12 w-full rounded-full border border-line bg-white px-5 text-base text-ink placeholder:text-muted" />
						</div>
					</div>
					<label class="mt-5 flex min-h-12 cursor-pointer items-center gap-3 text-sm font-semibold text-ink">
						<input type="checkbox" bind:checked={billingSame} class="h-5 w-5 accent-[#4a2c1a]" />
						Billing address is the same as delivery address
					</label>
					{#if !billingSame}
						<p class="mt-2 text-sm text-muted">Billing address is collected after the order in the mock flow — no payment is taken either way.</p>
					{/if}
				{/if}
				<div class="mt-6 space-y-2 border-t border-line pt-4 text-sm">
					<p class="flex justify-between"><span class="text-muted">Subtotal</span><span class="font-semibold">{usd(cart.subtotal)}</span></p>
					<p class="flex justify-between"><span class="text-muted">{method === 'delivery' ? 'Delivery' : 'Pickup'}</span><span class="font-semibold">{deliveryFee === 0 ? 'Free' : usd(deliveryFee)}</span></p>
					<p class="flex justify-between"><span class="text-muted">Slot</span><span class="font-semibold">{slotText}</span></p>
					<p class="flex justify-between text-base font-bold text-ink"><span>Total to pay</span><span>{usd(total)}</span></p>
				</div>
				<div class="mt-6 flex gap-3">
					<button type="button" onclick={() => (step = 1)} class="flex min-h-12 items-center rounded-full border border-line px-6 text-sm font-bold text-ink">Back</button>
					<button type="submit" class="flex min-h-12 flex-1 items-center justify-center rounded-full bg-choco px-7 text-sm font-bold text-white uppercase transition-colors duration-200 hover:bg-choco-deep">Place order · {usd(total)}</button>
				</div>
			</form>
		{/if}
	{/if}
</section>
