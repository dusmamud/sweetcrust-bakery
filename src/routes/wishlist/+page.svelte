<script lang="ts">
	// Wishlist / favourites (mock). Hearts on product cards and product pages
	// save here; the list persists in localStorage across reloads.
	import { Heart, ShoppingBag, Trash2 } from '@lucide/svelte';
	import { products, usd } from '#lib/data/site.ts';
	import { wishlist, removeWishlist } from '#lib/wishlist.svelte.ts';
	import { addToCart } from '#lib/cart.svelte.ts';
	import PageHero from '#lib/components/PageHero.svelte';
	import Picture from '#lib/components/Picture.svelte';

	const favProducts = $derived(products.filter((p) => wishlist.has(p.slug)));
</script>

<svelte:head>
	<title>Your Wishlist — SweetCrust Bakery &amp; Cafe</title>
	<meta name="description" content="Your saved SweetCrust favourites — cakes and treats you loved, ready to add to your basket. Saved on this device." />
</svelte:head>

<PageHero title="Your Wishlist" eyebrow="Saved for later" intro="The treats you loved, kept in one place. Your wishlist lives on this device — sign in to see it on every device." />

<section class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
	{#if favProducts.length === 0}
		<div class="mx-auto max-w-xl rounded-3xl bg-white p-10 text-center ring-1 ring-line">
			<span class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-choco-soft text-choco"><Heart size={28} aria-hidden="true" /></span>
			<h2 class="mt-5 font-display text-3xl font-semibold text-choco">Nothing saved yet</h2>
			<p class="mt-3 leading-relaxed text-muted">Tap the heart on any cake or treat to keep it here — it stays saved even after you close the tab.</p>
			<a href="/shop" class="mt-7 inline-flex min-h-12 items-center rounded-full bg-choco px-7 text-sm font-bold text-white uppercase">Shop treats</a>
		</div>
	{:else}
		<p class="text-muted">{favProducts.length} saved treat{favProducts.length === 1 ? '' : 's'}</p>
		<div class="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
			{#each favProducts as p}
				<article class="flex flex-col overflow-hidden rounded-3xl bg-white ring-1 ring-line">
					<a href="/product/{p.slug}" class="block bg-sand"><Picture name={p.image} alt={p.imageAlt} width={800} height={533} imgClass="aspect-[3/2] w-full object-cover" /></a>
					<div class="flex flex-1 flex-col gap-2 p-5">
						<a href="/product/{p.slug}" class="font-display text-xl font-semibold text-choco hover:underline">{p.name}</a>
						<p class="text-sm text-muted">{usd(p.price)} · {p.serves}</p>
						<div class="mt-auto flex gap-2 pt-2">
							<button type="button" onclick={() => addToCart(p.slug)} class="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full bg-choco px-4 text-sm font-bold text-white uppercase">
								<ShoppingBag size={16} aria-hidden="true" /> Add to basket
							</button>
							<button type="button" onclick={() => removeWishlist(p.slug)} aria-label="Remove {p.name} from wishlist" class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-line text-muted hover:text-ink">
								<Trash2 size={17} aria-hidden="true" />
							</button>
						</div>
					</div>
				</article>
			{/each}
		</div>
	{/if}
</section>
