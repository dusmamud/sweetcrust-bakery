<script lang="ts">
	import { ChevronDown, Menu, Package, Phone, Search, ShoppingBag, User, X } from '@lucide/svelte';
	import { categories, nav, site } from '#lib/data/site.ts';
	import { cart } from '#lib/cart.svelte.ts';
	import Logo from './Logo.svelte';
	import BrandIcon from './BrandIcon.svelte';
	import CartDrawer from './CartDrawer.svelte';

	let open = $state(false);
	let searchOpen = $state(false);
	let drawerOpen = $state(false);
	let dropOpen = $state(false);
	let scrolled = $state(false);
	let query = $state('');

	$effect(() => {
		const onScroll = () => {
			scrolled = window.scrollY > 8;
		};
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	});
</script>

<!-- Top bar -->
<div class="bg-choco-deep text-white">
	<div class="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2 text-xs sm:px-6 sm:text-[0.8rem] lg:px-8">
		<p class="min-w-0 truncate font-medium tracking-wide">Freshly Baked &nbsp;•&nbsp; Happier Days &nbsp;•&nbsp; Made With Love ♡</p>
		<div class="flex items-center gap-1 sm:gap-3">
			<a href={site.instagram} target="_blank" rel="noopener" aria-label="SweetCrust on Instagram" class="flex h-8 w-8 items-center justify-center rounded-full transition-colors duration-150 hover:bg-white/10">
				<BrandIcon name="instagram" size={15} />
			</a>
			<a href={site.facebook} target="_blank" rel="noopener" aria-label="SweetCrust on Facebook" class="hidden h-8 w-8 items-center justify-center rounded-full transition-colors duration-150 hover:bg-white/10 sm:flex">
				<BrandIcon name="facebook" size={15} />
			</a>
			<a href="https://www.youtube.com/" target="_blank" rel="noopener" aria-label="SweetCrust on YouTube" class="hidden h-8 w-8 items-center justify-center rounded-full transition-colors duration-150 hover:bg-white/10 sm:flex">
				<BrandIcon name="youtube" size={15} />
			</a>
			<span class="hidden h-4 w-px bg-white/25 sm:block" aria-hidden="true"></span>
			<a href="/track-order" class="hidden items-center gap-1.5 font-semibold transition-colors duration-150 hover:text-amber-100 sm:flex">
				<Package size={14} aria-hidden="true" /> Track Order
			</a>
			<a href={site.phoneHref} class="flex shrink-0 items-center gap-1.5 font-semibold whitespace-nowrap transition-colors duration-150 hover:text-amber-100">
				<Phone size={14} aria-hidden="true" /> {site.phoneDisplay}
			</a>
		</div>
	</div>
</div>

<header
	class="sticky top-0 z-50 border-b border-line bg-cream/95 backdrop-blur transition-shadow duration-200 {scrolled
		? 'shadow-[0_2px_16px_rgba(74,44,26,0.10)]'
		: ''}"
>
	<div class="mx-auto flex max-w-7xl items-center justify-between gap-2 px-4 py-2 sm:px-6 lg:px-8">
		<a href="/" class="flex min-h-12 items-center" aria-label="SweetCrust Bakery & Cafe — home">
			<Logo />
		</a>

		<nav aria-label="Primary" class="hidden items-center gap-1 lg:flex">
			{#each nav as item}
				{#if item.label === 'Our Products'}
					<div class="relative">
						<button
							type="button"
							onclick={() => (dropOpen = !dropOpen)}
							aria-expanded={dropOpen}
							aria-haspopup="true"
							class="flex min-h-12 items-center gap-1 rounded-full px-3 text-[0.95rem] font-medium whitespace-nowrap text-ink/80 transition-colors duration-150 hover:text-choco"
						>
							Our Products <ChevronDown size={15} aria-hidden="true" class="transition-transform duration-200 {dropOpen ? 'rotate-180' : ''}" />
						</button>
						{#if dropOpen}
							<div class="absolute left-1/2 top-full z-50 w-72 -translate-x-1/2 rounded-2xl bg-white p-2 shadow-xl ring-1 ring-line">
								{#each categories as cat}
									<a
										href={cat.href}
										onclick={() => (dropOpen = false)}
										class="flex min-h-12 items-center justify-between rounded-xl px-4 text-sm font-medium text-ink transition-colors duration-150 hover:bg-cream-deep"
									>
										{cat.name} <span class="text-xs font-normal text-muted">{cat.blurb}</span>
									</a>
								{/each}
								<a
									href="/shop"
									onclick={() => (dropOpen = false)}
									class="mt-1 flex min-h-12 items-center justify-center rounded-xl bg-choco px-4 text-sm font-bold text-white"
								>
									View All Products →
								</a>
							</div>
						{/if}
					</div>
				{:else}
					<a
						href={item.href}
						class="flex min-h-12 items-center rounded-full px-3 text-[0.95rem] font-medium whitespace-nowrap text-ink/80 transition-colors duration-150 hover:text-choco"
					>
						{item.label}
					</a>
				{/if}
			{/each}
		</nav>

		<div class="flex items-center">
			<button
				type="button"
				onclick={() => (searchOpen = !searchOpen)}
				aria-expanded={searchOpen}
				aria-label="Search treats"
				class="hidden h-12 w-12 items-center justify-center rounded-full text-ink transition-colors duration-150 hover:text-choco sm:flex"
			>
				<Search size={20} aria-hidden="true" />
			</button>
			<a
				href="/account"
				aria-label="Your account"
				class="hidden h-12 w-12 items-center justify-center rounded-full text-ink transition-colors duration-150 hover:text-choco sm:flex"
			>
				<User size={20} aria-hidden="true" />
			</a>
			<button
				type="button"
				onclick={() => (drawerOpen = true)}
				aria-label="Shopping basket, {cart.count} items"
				class="relative flex h-12 w-12 items-center justify-center rounded-full text-ink transition-colors duration-150 hover:text-choco"
			>
				<ShoppingBag size={20} aria-hidden="true" />
				{#if cart.count > 0}
					<span class="absolute top-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-choco text-[0.65rem] font-bold text-white">
						{cart.count}
					</span>
				{/if}
			</button>
			<a
				href="/contact"
				class="ml-2 hidden min-h-12 items-center rounded-full bg-choco px-6 text-sm font-bold text-white transition-colors duration-200 hover:bg-choco-deep md:flex"
			>
				Contact Us
			</a>
			<button
				type="button"
				class="flex h-12 w-12 items-center justify-center rounded-full text-ink lg:hidden"
				aria-expanded={open}
				aria-controls="mobile-menu"
				aria-label={open ? 'Close menu' : 'Open menu'}
				onclick={() => (open = !open)}
			>
				{#if open}<X size={24} aria-hidden="true" />{:else}<Menu size={24} aria-hidden="true" />{/if}
			</button>
		</div>
	</div>

	{#if searchOpen}
		<div class="border-t border-line bg-cream px-4 py-3 sm:px-6">
			<form role="search" action="/search" method="get" class="mx-auto flex max-w-2xl items-center gap-2" onsubmit={() => (searchOpen = false)}>
				<label for="site-search" class="sr-only">Search cakes and treats</label>
				<input
					id="site-search"
					name="q"
					type="search"
					bind:value={query}
					placeholder="Search cakes, cupcakes, croissants…"
					class="min-h-12 flex-1 rounded-full border border-line bg-white px-5 text-base text-ink placeholder:text-muted"
				/>
				<button
					type="submit"
					class="flex min-h-12 items-center rounded-full bg-choco px-6 text-sm font-bold text-white uppercase transition-colors duration-200 hover:bg-choco-deep"
				>
					Search
				</button>
			</form>
		</div>
	{/if}

	{#if open}
		<nav id="mobile-menu" aria-label="Mobile" data-lenis-prevent class="border-t border-line bg-cream px-4 pt-2 pb-4 lg:hidden">
			{#each nav as item}
				<a
					href={item.href}
					class="block min-h-12 content-center border-b border-line/60 py-2 text-base font-medium text-ink"
					onclick={() => (open = false)}
				>
					{item.label}
				</a>
			{/each}
			<p class="pt-3 pb-1 text-xs font-bold tracking-wider text-muted uppercase">More from SweetCrust</p>
			<div class="grid grid-cols-2 gap-x-4">
				{#each [['My Account', '/account'], ['Wishlist', '/wishlist'], ['Search', '/search'], ['Wedding Cakes', '/wedding-cakes'], ['Tastings', '/tastings'], ['Gift Cards', '/gift-cards'], ['Catering', '/catering'], ['Subscriptions', '/subscriptions'], ['Loyalty', '/loyalty'], ['Seasonal', '/seasonal'], ['Cafe Menu', '/cafe-menu'], ['Baking Classes', '/classes'], ['Corporate Gifting', '/corporate-gifting'], ['Reviews', '/reviews'], ['Visit Us', '/locations'], ['Delivery & Pickup', '/delivery'], ['Allergens', '/allergens'], ['Accessibility', '/accessibility'], ['Press', '/press'], ['Sitemap', '/sitemap']] as [label, href]}
					<a
						href={href}
						class="flex min-h-11 items-center text-sm font-medium text-ink/80"
						onclick={() => (open = false)}
					>
						{label}
					</a>
				{/each}
			</div>
			<div class="mt-4 flex gap-3">
				<a
					href="/track-order"
					class="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full border border-line text-sm font-bold text-ink"
					onclick={() => (open = false)}
				>
					<Package size={17} aria-hidden="true" /> Track Order
				</a>
				<a
					href="/contact"
					class="flex min-h-12 flex-1 items-center justify-center rounded-full bg-choco text-sm font-bold text-white"
					onclick={() => (open = false)}
				>
					Contact Us
				</a>
			</div>
		</nav>
	{/if}
</header>

<CartDrawer bind:open={drawerOpen} />
