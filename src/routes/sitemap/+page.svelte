<script lang="ts">
	// Human-readable sitemap — an index of every page on the site, grouped
	// by section. (The machine-readable version is /sitemap.xml.)
	import { blogPosts, products } from '#lib/data/site.ts';
	import PageHero from '#lib/components/PageHero.svelte';

	const groups: { title: string; links: { label: string; href: string }[] }[] = [
		{
			title: 'Shop & order',
			links: [
				{ label: 'Home', href: '/' },
				{ label: 'Our Products', href: '/shop' },
				{ label: 'Search', href: '/search' },
				{ label: 'Your Basket', href: '/cart' },
				{ label: 'Checkout', href: '/checkout' },
				{ label: 'Track Your Order', href: '/track-order' },
				{ label: 'Your Wishlist', href: '/wishlist' },
				{ label: 'Your Account', href: '/account' }
			]
		},
		{
			title: 'Cakes & occasions',
			links: [
				{ label: 'Custom Cakes', href: '/custom-cakes' },
				{ label: 'Custom Orders', href: '/custom-orders' },
				{ label: 'Wedding Cakes', href: '/wedding-cakes' },
				{ label: 'Tastings & Consultations', href: '/tastings' },
				{ label: 'Gift Cards', href: '/gift-cards' },
				{ label: 'Seasonal Pre-Orders', href: '/seasonal' }
			]
		},
		{
			title: 'Eat, learn & celebrate',
			links: [
				{ label: 'Cafe Menu', href: '/cafe-menu' },
				{ label: 'Baking Classes', href: '/classes' },
				{ label: 'Catering', href: '/catering' },
				{ label: 'Subscriptions', href: '/subscriptions' },
				{ label: 'Loyalty — SweetCrust Stamps', href: '/loyalty' },
				{ label: 'Corporate Gifting', href: '/corporate-gifting' },
				{ label: 'Wholesale', href: '/wholesale' }
			]
		},
		{
			title: 'About SweetCrust',
			links: [
				{ label: 'About Us', href: '/about' },
				{ label: 'Visit Us', href: '/locations' },
				{ label: 'Reviews', href: '/reviews' },
				{ label: 'Blog', href: '/blog' },
				{ label: 'Press & Media', href: '/press' },
				{ label: 'Careers', href: '/careers' },
				{ label: 'Contact Us', href: '/contact' }
			]
		},
		{
			title: 'Help & policies',
			links: [
				{ label: 'Delivery & Pickup', href: '/delivery' },
				{ label: 'Allergens & Dietary', href: '/allergens' },
				{ label: 'FAQs', href: '/faq' },
				{ label: 'Shipping Policy', href: '/shipping' },
				{ label: 'Return & Refund', href: '/returns' },
				{ label: 'Accessibility Statement', href: '/accessibility' },
				{ label: 'Terms & Conditions', href: '/terms' },
				{ label: 'Privacy Policy', href: '/privacy' },
				{ label: 'Sitemap (this page)', href: '/sitemap' }
			]
		}
	];
</script>

<svelte:head>
	<title>Sitemap — SweetCrust Bakery &amp; Cafe</title>
	<meta name="description" content="Every page on sweetcrustbakery.com — shop, cakes, classes, help and policies, all in one place." />
</svelte:head>

<PageHero title="Sitemap" eyebrow="Every page, in one place" intro="Looking for something? Every page on our site is listed below — including every cake and every blog post." />

<section class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
	<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
		{#each groups as group}
			<nav aria-label={group.title} class="h-fit rounded-3xl bg-white p-6 ring-1 ring-line">
				<h2 class="font-display text-2xl font-semibold text-choco">{group.title}</h2>
				<ul class="mt-4 space-y-1">
					{#each group.links as link}
						<li><a href={link.href} class="inline-flex min-h-11 items-center text-sm font-medium text-ink hover:text-choco">{link.label}</a></li>
					{/each}
				</ul>
			</nav>
		{/each}

		<nav aria-label="All treats" class="h-fit rounded-3xl bg-white p-6 ring-1 ring-line">
			<h2 class="font-display text-2xl font-semibold text-choco">All treats</h2>
			<ul class="mt-4 space-y-1">
				{#each products as p}
					<li><a href="/product/{p.slug}" class="inline-flex min-h-11 items-center text-sm font-medium text-ink hover:text-choco">{p.name}</a></li>
				{/each}
			</ul>
		</nav>

		<nav aria-label="Blog posts" class="h-fit rounded-3xl bg-white p-6 ring-1 ring-line">
			<h2 class="font-display text-2xl font-semibold text-choco">From the blog</h2>
			<ul class="mt-4 space-y-1">
				{#each blogPosts as b}
					<li><a href="/blog/{b.slug}" class="inline-flex min-h-11 items-center text-sm font-medium text-ink hover:text-choco">{b.title}</a></li>
				{/each}
			</ul>
		</nav>
	</div>
</section>
