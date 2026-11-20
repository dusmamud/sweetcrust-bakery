<script lang="ts">
	// Mock account (demo only — no real auth, no backend). Magic-link sign-in
	// is simulated: any email works, and the demo account (Priya Mehta) signs
	// in. Orders, addresses, notification preferences and loyalty stamps
	// persist in localStorage.
	import { Check, Heart, LogOut, Mail, MapPin, Package, RotateCcw, Settings, Stamp } from '@lucide/svelte';
	import { account, requestMagicLink, confirmMagicLink, signOut, setPref, addAddress, removeAddress, type Prefs } from '#lib/account.svelte.ts';
	import { addToCart } from '#lib/cart.svelte.ts';
	import { products, usd } from '#lib/data/site.ts';
	import { wishlist } from '#lib/wishlist.svelte.ts';
	import PageHero from '#lib/components/PageHero.svelte';
	import Picture from '#lib/components/Picture.svelte';

	let email = $state('');
	let emailError = $state('');
	let newLabel = $state('');
	let newDetail = $state('');
	let reordered = $state<string | null>(null);
	let tab = $state<'orders' | 'favourites' | 'addresses' | 'notifications' | 'loyalty'>('orders');

	const user = $derived(account.user);
	const favProducts = $derived(products.filter((p) => wishlist.has(p.slug)));

	function submitEmail(e: SubmitEvent) {
		e.preventDefault();
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
			emailError = 'Please enter a valid email address.';
			return;
		}
		emailError = '';
		requestMagicLink(email);
	}

	function reorder(ref: string) {
		const order = user?.orders.find((o) => o.ref === ref);
		if (!order) return;
		for (const item of order.items) {
			const p = products.find((x) => x.slug === item.slug);
			if (p) addToCart(p.slug, '', item.qty);
		}
		reordered = ref;
		window.setTimeout(() => (reordered = null), 2500);
	}

	function togglePref(key: keyof Prefs) {
		if (!user) return;
		setPref(key, !user.prefs[key]);
	}

	function submitAddress(e: SubmitEvent) {
		e.preventDefault();
		if (newLabel.trim().length < 2 || newDetail.trim().length < 5) return;
		addAddress(newLabel.trim(), newDetail.trim());
		newLabel = '';
		newDetail = '';
	}
</script>

<svelte:head>
	<title>Your Account — SweetCrust Bakery &amp; Cafe</title>
	<meta name="description" content="Your SweetCrust account — order history with one-tap reorder, saved addresses, favourites, loyalty stamps and notification preferences. Demo only." />
</svelte:head>

<PageHero title="Your Account" eyebrow="Welcome back" intro="Orders, favourites, addresses and rewards — all in one place. Demo account: no real sign-in, no real data leaves your browser." />

<section class="mx-auto max-w-5xl px-4 py-10 sm:px-6">
	{#if !user}
		<div class="mx-auto max-w-xl rounded-3xl bg-white p-6 ring-1 ring-line sm:p-8">
			{#if account.pendingEmail}
				<div role="status" class="text-center">
					<span class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-choco-soft text-choco"><Mail size={28} aria-hidden="true" /></span>
					<h2 class="mt-5 font-display text-3xl font-semibold text-choco">Check your inbox</h2>
					<p class="mt-3 leading-relaxed text-muted">
						We sent a magic link to <strong class="text-ink">{account.pendingEmail}</strong>. This is a demo, so no email
						really arrives — press the button below to sign in as our demo customer instead.
					</p>
					<button type="button" onclick={confirmMagicLink} class="mt-7 flex min-h-12 w-full items-center justify-center rounded-full bg-choco px-7 text-sm font-bold text-white uppercase">Sign in as demo customer</button>
					<button type="button" onclick={() => requestMagicLink('')} class="mt-3 min-h-11 text-sm font-bold text-muted underline">Use a different email</button>
				</div>
			{:else}
				<h2 class="font-display text-3xl font-semibold text-choco">Sign in with a magic link</h2>
				<p class="mt-3 leading-relaxed text-muted">
					No password to remember — we email you a one-time link. This is a <strong class="text-ink">demo</strong>: any email
					works, nothing is really sent, and the demo account (Priya Mehta) signs in.
				</p>
				<form onsubmit={submitEmail} class="mt-6">
					<label for="account-email" class="text-sm font-bold text-ink">Email address</label>
					<input
						id="account-email"
						type="email"
						autocomplete="email"
						bind:value={email}
						placeholder="you@example.com"
						aria-invalid={!!emailError}
						aria-describedby={emailError ? 'account-email-err' : undefined}
						class="mt-2 min-h-12 w-full rounded-full border border-line bg-white px-5 text-base text-ink placeholder:text-muted"
					/>
					{#if emailError}<p id="account-email-err" class="mt-1 text-sm font-semibold text-choco" role="alert">{emailError}</p>{/if}
					<button type="submit" class="mt-4 flex min-h-12 w-full items-center justify-center rounded-full bg-choco px-7 text-sm font-bold text-white uppercase">Email me a sign-in link</button>
				</form>
				<div class="mt-5 border-t border-line pt-5">
					<p class="text-sm text-muted">Just browsing? <a href="/shop" class="font-bold text-choco">Guest checkout</a> works too — no account needed.</p>
				</div>
			{/if}
		</div>
	{:else}
		<div class="flex flex-wrap items-start justify-between gap-4 rounded-3xl bg-white p-6 ring-1 ring-line sm:p-8">
			<div>
				<p class="text-sm font-bold tracking-wider text-muted uppercase">Signed in as</p>
				<h2 class="mt-1 font-display text-3xl font-semibold text-choco">{user.name}</h2>
				<p class="mt-1 text-sm text-muted">{user.email} · {user.phone}</p>
			</div>
			<button type="button" onclick={signOut} class="flex min-h-12 items-center gap-2 rounded-full border border-line px-5 text-sm font-bold text-ink">
				<LogOut size={17} aria-hidden="true" /> Sign out
			</button>
		</div>

		<div class="mt-6 flex flex-wrap gap-2" role="tablist" aria-label="Account sections">
			{#each [['orders', 'Orders'], ['favourites', 'Favourites'], ['addresses', 'Addresses'], ['notifications', 'Notifications'], ['loyalty', 'Loyalty']] as [id, label]}
				<button
					type="button"
					role="tab"
					aria-selected={tab === id}
					onclick={() => (tab = id as typeof tab)}
					class="flex min-h-12 items-center rounded-full px-5 text-sm font-bold transition-colors duration-150 {tab === id ? 'bg-choco text-white' : 'bg-white text-ink ring-1 ring-line'}"
				>
					{label}
				</button>
			{/each}
		</div>

		{#if tab === 'orders'}
			<div class="mt-6 space-y-4">
				{#each user.orders as order}
					<article class="rounded-3xl bg-white p-6 ring-1 ring-line sm:p-7">
						<div class="flex flex-wrap items-center justify-between gap-3">
							<div>
								<p class="font-display text-xl font-semibold text-choco">{order.ref}</p>
								<p class="text-sm text-muted">{order.date} · {order.status} · {order.eta}</p>
							</div>
							<p class="font-bold text-ink">{usd(order.total)}</p>
						</div>
						<ul class="mt-4 space-y-1.5 text-sm text-muted">
							{#each order.items as item}
								<li class="flex justify-between gap-4"><span>{item.name} × {item.qty}</span><span class="font-semibold text-ink">{usd(item.price * item.qty)}</span></li>
							{/each}
						</ul>
						<div class="mt-5 flex flex-wrap gap-3">
							<button
								type="button"
								onclick={() => reorder(order.ref)}
								class="flex min-h-12 items-center gap-2 rounded-full bg-choco px-6 text-sm font-bold text-white uppercase"
								aria-live="polite"
							>
								{#if reordered === order.ref}<Check size={17} aria-hidden="true" /> Added to basket{:else}<RotateCcw size={17} aria-hidden="true" /> Reorder{/if}
							</button>
							<a href="/track-order" class="flex min-h-12 items-center gap-2 rounded-full border border-line px-6 text-sm font-bold text-ink">
								<Package size={17} aria-hidden="true" /> Track
							</a>
						</div>
					</article>
				{/each}
				<p class="text-sm text-muted">Orders placed in this demo checkout appear here too — mock only, nothing is really ordered.</p>
			</div>
		{:else if tab === 'favourites'}
			<div class="mt-6">
				{#if favProducts.length === 0}
					<div class="rounded-3xl bg-white p-8 text-center ring-1 ring-line">
						<Heart size={28} class="mx-auto text-caramel" aria-hidden="true" />
						<p class="mt-3 font-display text-2xl font-semibold text-choco">No favourites yet</p>
						<p class="mx-auto mt-2 max-w-md text-muted">Tap the heart on any cake or treat to save it here — it stays saved even after you close the tab.</p>
						<a href="/shop" class="mt-5 inline-flex min-h-12 items-center rounded-full bg-choco px-7 text-sm font-bold text-white uppercase">Browse treats</a>
					</div>
				{:else}
					<div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
						{#each favProducts as p}
							<article class="overflow-hidden rounded-3xl bg-white ring-1 ring-line">
								<a href="/product/{p.slug}"><Picture name={p.image} alt={p.imageAlt} width={800} height={533} imgClass="aspect-[3/2] w-full object-cover" /></a>
								<div class="p-5">
									<a href="/product/{p.slug}" class="font-display text-xl font-semibold text-choco hover:underline">{p.name}</a>
									<p class="mt-1 text-sm text-muted">{usd(p.price)} · {p.serves}</p>
									<button type="button" onclick={() => addToCart(p.slug)} class="mt-4 flex min-h-12 w-full items-center justify-center rounded-full bg-choco px-6 text-sm font-bold text-white uppercase">Add to basket</button>
								</div>
							</article>
						{/each}
					</div>
				{/if}
			</div>
		{:else if tab === 'addresses'}
			<div class="mt-6 grid gap-5 lg:grid-cols-2">
				<div class="space-y-4">
					{#each user.addresses as a, i}
						<div class="flex items-start justify-between gap-3 rounded-3xl bg-white p-5 ring-1 ring-line">
							<div class="flex gap-3">
								<MapPin size={19} aria-hidden="true" class="mt-0.5 shrink-0 text-caramel" />
								<div>
									<p class="font-bold text-ink">{a.label}</p>
									<p class="mt-0.5 text-sm text-muted">{a.detail}</p>
								</div>
							</div>
							<button type="button" onclick={() => removeAddress(i)} class="flex min-h-11 items-center text-sm font-bold text-muted underline">Remove</button>
						</div>
					{/each}
				</div>
				<form onsubmit={submitAddress} class="h-fit rounded-3xl bg-white p-6 ring-1 ring-line">
					<h3 class="font-display text-xl font-semibold text-choco">Add an address</h3>
					<label for="addr-label" class="mt-4 block text-sm font-bold text-ink">Label</label>
					<input id="addr-label" type="text" bind:value={newLabel} placeholder="e.g. Home" class="mt-2 min-h-12 w-full rounded-full border border-line bg-white px-5 text-base text-ink placeholder:text-muted" />
					<label for="addr-detail" class="mt-4 block text-sm font-bold text-ink">Address</label>
					<input id="addr-detail" type="text" bind:value={newDetail} placeholder="Street, apartment, city, ZIP" class="mt-2 min-h-12 w-full rounded-full border border-line bg-white px-5 text-base text-ink placeholder:text-muted" />
					<button type="submit" class="mt-5 flex min-h-12 w-full items-center justify-center rounded-full bg-choco px-7 text-sm font-bold text-white uppercase">Save address</button>
				</form>
			</div>
		{:else if tab === 'notifications'}
			<div class="mt-6 rounded-3xl bg-white p-6 ring-1 ring-line sm:p-8">
				<h3 class="flex items-center gap-2 font-display text-2xl font-semibold text-choco"><Settings size={22} aria-hidden="true" class="text-caramel" /> Order notifications</h3>
				<p class="mt-2 text-sm leading-relaxed text-muted">
					Choose how we tell you your order is ready or out for delivery. Demo only — nothing is really sent, and we only
					ever message the contact details you give us directly.
				</p>
				<ul class="mt-5 space-y-3">
					{#each [['orderSms', 'SMS updates', 'Text when your order is ready or out for delivery.'], ['orderWhatsapp', 'WhatsApp updates', 'Same updates on WhatsApp — with a chat link if you need us.'], ['orderEmail', 'Email updates', 'Order confirmation and delivery updates by email.'], ['promoEmail', 'Sweet deals by email', 'New flavours, seasonal pre-orders and offers. Once a week at most.']] as [key, label, detail]}
						<li>
							<label class="flex min-h-14 cursor-pointer items-center gap-3 rounded-2xl bg-cream-deep px-4 ring-1 ring-line">
								<input type="checkbox" checked={user.prefs[key as keyof Prefs]} onchange={() => togglePref(key as keyof Prefs)} class="h-5 w-5 shrink-0 accent-[#4a2c1a]" />
								<span><span class="block font-bold text-ink">{label}</span><span class="block text-sm text-muted">{detail}</span></span>
							</label>
						</li>
					{/each}
				</ul>
				<p class="mt-4 text-sm text-muted">Turn everything off any time — saved instantly, and your abandoned-basket reminders stop too.</p>
			</div>
		{:else}
			<div class="mt-6 rounded-3xl bg-white p-6 ring-1 ring-line sm:p-8">
				<h3 class="flex items-center gap-2 font-display text-2xl font-semibold text-choco"><Stamp size={22} aria-hidden="true" class="text-caramel" /> Your SweetCrust stamps</h3>
				<p class="mt-2 text-sm leading-relaxed text-muted">One stamp per order. Collect 8 for a free pastry, 16 for a free 6" celebration cake.</p>
				<div class="mt-5 flex flex-wrap gap-2" aria-label="{user.stamps} of 16 stamps collected">
					{#each Array(16) as _, i}
						<span class="flex h-12 w-12 items-center justify-center rounded-full text-sm font-bold {i < user.stamps ? 'bg-choco text-white' : 'bg-cream-deep text-muted ring-1 ring-line'}" aria-hidden="true">
							{i < user.stamps ? '✓' : i + 1}
						</span>
					{/each}
				</div>
				<p class="mt-4 font-bold text-ink">{user.stamps} of 16 stamps · {16 - user.stamps} more to a free 6" cake</p>
				<a href="/loyalty" class="mt-4 inline-flex min-h-12 items-center rounded-full bg-choco px-7 text-sm font-bold text-white uppercase">See all rewards</a>
			</div>
		{/if}
	{/if}
</section>
