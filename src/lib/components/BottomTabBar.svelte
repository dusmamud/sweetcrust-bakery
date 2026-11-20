<script lang="ts">
	// Mobile bottom tab bar: Home / Shop / Search / Cart (badge) / Account.
	// Thumb-zone navigation for one-handed use. Safe-area aware. It is the
	// ONLY mobile bottom bar — product pages use their own sticky add-to-cart
	// bar instead, so the two never stack (WCAG 2.2 2.4.11).
	import { Home, Search, ShoppingBag, Store, User } from '@lucide/svelte';
	import { page } from '$app/state';
	import { cart } from '#lib/cart.svelte.ts';
	import { account } from '#lib/account.svelte.ts';

	const path = $derived(page.url.pathname);
	const tabs = [
		{ label: 'Home', href: '/', icon: Home },
		{ label: 'Shop', href: '/shop', icon: Store },
		{ label: 'Search', href: '/search', icon: Search },
		{ label: 'Cart', href: '/cart', icon: ShoppingBag, badge: true },
		{ label: 'Account', href: '/account', icon: User }
	];

	function active(href: string) {
		if (href === '/') return path === '/';
		return path === href || path.startsWith(`${href}/`);
	}
</script>

<nav aria-label="Quick navigation" class="fixed inset-x-0 bottom-0 z-40 grid grid-cols-5 border-t border-line bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden">
	{#each tabs as tab}
		{@const Icon = tab.icon}
		<a
			href={tab.href}
			aria-current={active(tab.href) ? 'page' : undefined}
			class="relative flex min-h-14 flex-col items-center justify-center gap-0.5 text-[0.7rem] font-semibold {active(tab.href) ? 'text-choco' : 'text-muted'}"
		>
			<span class="relative">
				<Icon size={21} aria-hidden="true" />
				{#if tab.badge && cart.count > 0}
					<span class="absolute -top-1.5 -right-2.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-choco px-1 text-[0.65rem] font-bold text-white">
						{cart.count}
					</span>
				{/if}
				{#if tab.href === '/account' && account.signedIn}
					<span class="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-[#2e7d32] ring-2 ring-white" aria-hidden="true"></span>
				{/if}
			</span>
			{tab.label}
		</a>
	{/each}
</nav>
<!-- Spacer so the tab bar never covers footer content on mobile -->
<div class="h-14 lg:hidden" aria-hidden="true"></div>
