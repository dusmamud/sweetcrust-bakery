<script lang="ts">
	import { ArrowRight, Cake, Clock, Heart, Leaf, Truck } from '@lucide/svelte';
	import gsap from 'gsap';
	import { SplitText } from 'gsap/SplitText';
	import { categories, cutoffText, instagramImages, products, seasonalCollections, site, siteReviews } from '#lib/data/site.ts';
	import Picture from '#lib/components/Picture.svelte';
	import ProductCard from '#lib/components/ProductCard.svelte';
	import Stars from '#lib/components/Stars.svelte';
	import HowOrderingWorks from '#lib/components/HowOrderingWorks.svelte';

	const bestsellers = products.filter((p) => p.badge === 'Bestseller').slice(0, 4);
	type IconRow = [typeof Leaf, string, string];
	const trustItems: IconRow[] = [
		[Leaf, '100%', 'Fresh Ingredients'],
		[Cake, 'Custom', 'Cakes'],
		[Truck, 'Fast & Safe', 'Delivery'],
		[Heart, 'Made', 'With Love']
	];
	const topReviews = siteReviews.slice(0, 3);

	// Hero headline: SplitText word reveal, once, reduced-motion gated.
	// Svelte transitions ignore CSS reduced-motion, so the check is in code.
	// NOTE: SplitText wraps words in block-level divs — after the tween
	// completes we revert() to the original markup, or the headline would
	// stay stacked one word per line (clearProps alone is not enough).
	$effect(() => {
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		gsap.registerPlugin(SplitText);
		let reverted = false;
		const revertOnce = () => {
			if (!reverted) {
				reverted = true;
				split.revert();
			}
		};
		const split = new SplitText('#hero-title', { type: 'words' });
		gsap.from(split.words, {
			y: 24,
			opacity: 0,
			duration: 0.5,
			stagger: 0.06,
			ease: 'power3.out',
			onComplete: revertOnce
		});
		return revertOnce;
	});
</script>

<svelte:head>
	<title>SweetCrust Bakery &amp; Cafe — Life is Sweeter with Cake</title>
	<meta
		name="description"
		content="Delicious cakes, pastries, and baked treats made with the finest ingredients, just for you. Order custom cakes for birthdays, weddings and anniversaries in New York."
	/>
	<!-- Hero image preload (AVIF, same srcset/sizes as the <picture> below,
	     so the preloaded file is the one the browser uses — no double fetch). -->
	<link
		rel="preload"
		as="image"
		type="image/avif"
		href="/images/hero-cake-800.avif"
		imagesrcset="/images/hero-cake-480.avif 480w, /images/hero-cake-800.avif 800w, /images/hero-cake-1200.avif 1200w, /images/hero-cake-1600.avif 1600w"
		imagesizes="(min-width: 1024px) 50vw, 100vw"
		fetchpriority="high"
	/>
</svelte:head>

<!-- ── Hero: one primary CTA + hours visible without scrolling ──────────── -->
<section class="overflow-hidden bg-cream">
	<div class="mx-auto grid max-w-7xl items-center gap-8 px-4 pt-10 pb-8 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:px-8 lg:pt-16">
		<div class="reveal is-visible">
			<p class="text-xs font-bold tracking-[0.3em] text-caramel uppercase">— Freshly Baked Happiness —</p>
			<h1 id="hero-title" class="mt-4 font-display text-[clamp(2.6rem,7vw,4.2rem)] leading-[1.05] font-semibold text-choco">
				Life is Sweeter<br />with Cake ♡
			</h1>
			<p class="mt-5 max-w-md text-lg leading-relaxed text-muted">
				Delicious cakes, pastries, and baked treats made with the finest ingredients, just for you.
			</p>
			<div class="mt-7 flex flex-wrap items-center gap-4">
				<a
					href="/shop"
					class="inline-flex min-h-12 items-center gap-2 rounded-full bg-choco px-8 text-sm font-bold text-white uppercase transition-all duration-200 hover:bg-choco-deep active:scale-[0.97]"
				>
					Order Now <ArrowRight size={17} aria-hidden="true" />
				</a>
				<a href="/cafe-menu" class="inline-flex min-h-12 items-center gap-1 text-sm font-bold text-choco hover:underline">
					See today’s cafe menu <ArrowRight size={16} aria-hidden="true" />
				</a>
			</div>
			<p class="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm font-semibold text-ink">
				<span class="flex items-center gap-1.5"><Clock size={16} aria-hidden="true" class="text-caramel" /> Open today 8:00 AM – 8:00 PM</span>
				<span>· {cutoffText}</span>
				<span>· {site.addressShort}</span>
			</p>
		</div>

		<div class="relative mx-auto w-full max-w-md lg:max-w-none">
			<div class="overflow-hidden rounded-[2rem] shadow-[0_20px_50px_rgba(74,44,26,0.18)]">
				<Picture
					name="hero-cake"
					alt="Chocolate drip cake with fresh strawberries on a wooden cake stand"
					width={1280}
					height={1600}
					eager
					sizes="(min-width: 1024px) 50vw, 100vw"
					imgClass="aspect-[4/5] w-full object-cover"
				/>
			</div>
			<p class="absolute top-4 right-2 rotate-6 text-right font-script text-3xl leading-tight text-choco sm:text-4xl">
				Good Food<br />Brings Good<br />Mood ♡
			</p>
			<div class="absolute -bottom-4 left-4 flex h-28 w-28 rotate-[-6deg] flex-col items-center justify-center rounded-full bg-cream-deep text-center shadow-lg ring-1 ring-line sm:h-32 sm:w-32">
				<p class="font-script text-2xl leading-tight text-choco">Cakes<br />for Every<br />Occasion ♡</p>
			</div>
		</div>
	</div>

	<!-- Trust strip -->
	<div class="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
		<ul class="grid grid-cols-2 gap-4 border-t border-line pt-6 sm:grid-cols-4">
			{#each trustItems as [Icon, strong, label]}
				<li class="flex min-h-12 items-center gap-3">
					<span class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-choco-soft text-choco"><Icon size={20} aria-hidden="true" /></span>
					<span class="text-sm leading-snug"><span class="block font-bold text-ink">{strong}</span><span class="text-muted">{label}</span></span>
				</li>
			{/each}
		</ul>
	</div>
</section>

<!-- ── Bestsellers ──────────────────────────────────────────────────────── -->
<section class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8" aria-labelledby="bestsellers-title">
	<div class="mb-6 flex items-end justify-between gap-4">
		<div>
			<p class="text-xs font-bold tracking-[0.3em] text-caramel uppercase">— Baked fresh today —</p>
			<h2 id="bestsellers-title" class="mt-2 font-display text-3xl font-semibold text-choco sm:text-4xl">Our Bestsellers</h2>
		</div>
		<a href="/shop" class="inline-flex min-h-12 items-center gap-1 text-sm font-bold text-choco hover:underline">
			View All Products <ArrowRight size={16} aria-hidden="true" />
		</a>
	</div>
	<div class="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
		{#each bestsellers as product}
			<ProductCard {product} />
		{/each}
	</div>
</section>

<!-- ── How ordering works ───────────────────────────────────────────────── -->
<HowOrderingWorks />

<!-- ── Categories ───────────────────────────────────────────────────────── -->
<section class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8" aria-labelledby="categories-title">
	<div class="mb-6">
		<p class="text-xs font-bold tracking-[0.3em] text-caramel uppercase">— Shop by craving —</p>
		<h2 id="categories-title" class="mt-2 font-display text-3xl font-semibold text-choco sm:text-4xl">What are you craving?</h2>
	</div>
	<div class="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-6">
		{#each categories as cat}
			<a href={cat.href} class="group reveal overflow-hidden rounded-2xl bg-white ring-1 ring-line transition-shadow duration-200 hover:shadow-[0_8px_30px_rgba(74,44,26,0.10)]">
				<div class="overflow-hidden bg-sand">
					<Picture
						name={cat.image}
						alt={cat.imageAlt}
						width={800}
						height={533}
						sizes="(min-width: 1024px) 16vw, (min-width: 640px) 33vw, 50vw"
						imgClass="aspect-[3/2] w-full object-cover transition-transform duration-300 group-hover:scale-[1.05]"
					/>
				</div>
				<div class="p-3 text-center sm:p-4">
					<p class="font-display text-lg font-semibold text-choco">{cat.name}</p>
					<p class="mt-0.5 text-xs leading-snug text-muted sm:text-sm">{cat.blurb}</p>
				</div>
			</a>
		{/each}
	</div>
</section>

<!-- ── Occasion banner ──────────────────────────────────────────────────── -->
<section class="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8" aria-labelledby="occasion-title">
	<div class="grid gap-8 lg:grid-cols-5">
		<div class="relative overflow-hidden rounded-3xl bg-cream-deep ring-1 ring-line lg:col-span-2">
			<Picture
				name="occasion-cake"
				alt="Whole chocolate celebration cake with berries on a cake stand"
				width={1200}
				height={800}
				sizes="(min-width: 1024px) 40vw, 100vw"
				imgClass="h-56 w-full object-cover sm:h-64"
			/>
			<div class="p-6 sm:p-8">
				<h2 id="occasion-title" class="font-display text-3xl leading-tight font-semibold text-choco">Make Every Occasion Special</h2>
				<p class="mt-3 leading-relaxed text-muted">
					Custom cakes for birthdays, weddings, anniversaries and more — from $45, with 7 days’ notice.
				</p>
				<div class="mt-5 flex flex-wrap gap-3">
					<a
						href="/custom-cakes"
						class="inline-flex min-h-12 items-center gap-2 rounded-full bg-choco px-7 text-sm font-bold text-white uppercase transition-colors duration-200 hover:bg-choco-deep"
					>
						Order Custom Cake <ArrowRight size={17} aria-hidden="true" />
					</a>
					<a
						href="/wedding-cakes"
						class="inline-flex min-h-12 items-center rounded-full border-2 border-choco px-7 text-sm font-bold text-choco uppercase transition-colors duration-200 hover:bg-choco-soft"
					>
						Wedding Cakes
					</a>
				</div>
				<p class="mt-5 font-script text-3xl text-caramel">Celebrate Smiles Always ♡</p>
			</div>
		</div>

		<div class="lg:col-span-3">
			<div class="rounded-3xl bg-white p-6 ring-1 ring-line sm:p-8">
				<h2 class="font-display text-3xl font-semibold text-choco">Our Story</h2>
				<p class="mt-4 leading-relaxed text-muted">
					At SweetCrust, we believe every bite tells a story. Our passion for baking goes beyond just ingredients
					— it’s about creating moments of joy, love, and togetherness. From classic recipes to modern delights,
					we bake happiness into everything we make.
				</p>
				<div class="relative mt-6 overflow-hidden rounded-3xl">
					<Picture
						name="about-baking"
						alt="Baking flat lay with flour, eggs, butter and a rolling pin"
						width={1200}
						height={800}
						sizes="(min-width: 1024px) 60vw, 100vw"
						imgClass="aspect-[3/2] w-full object-cover"
					/>
					<p class="absolute bottom-4 left-4 -rotate-3 font-script text-4xl text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]">Baked with Love Always ♡</p>
				</div>
				<a
					href="/about"
					class="mt-6 inline-flex min-h-12 items-center gap-2 rounded-full bg-choco px-7 text-sm font-bold text-white uppercase transition-colors duration-200 hover:bg-choco-deep"
				>
					Learn More About Us <ArrowRight size={17} aria-hidden="true" />
				</a>
			</div>
			<div class="mt-6 grid grid-cols-3 gap-4 text-center">
				{#each [['4.9', 'Average rating'], ['12k+', 'Happy customers'], ['35+', 'Cake flavours']] as [num, label]}
					<div class="rounded-2xl bg-cream-deep p-4 ring-1 ring-line">
						<p class="font-display text-2xl font-semibold text-choco">{num}</p>
						<p class="mt-1 text-xs text-muted">{label}</p>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>

<!-- ── Reviews ──────────────────────────────────────────────────────────── -->
<section class="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8" aria-labelledby="reviews-title">
	<div class="mb-6 flex flex-wrap items-end justify-between gap-4">
		<div>
			<p class="text-xs font-bold tracking-[0.3em] text-caramel uppercase">— Loved in New York —</p>
			<h2 id="reviews-title" class="mt-2 font-display text-3xl font-semibold text-choco sm:text-4xl">What Our Customers Say</h2>
		</div>
		<a href="/reviews" class="inline-flex min-h-12 items-center gap-1 text-sm font-bold text-choco hover:underline">
			Read all reviews <ArrowRight size={16} aria-hidden="true" />
		</a>
	</div>
	<div class="grid gap-4 md:grid-cols-3">
		{#each topReviews as r}
			<figure class="reveal rounded-3xl bg-white p-6 ring-1 ring-line">
				<Stars rating={r.rating} />
				<blockquote class="mt-3 leading-relaxed text-ink">“{r.text}”</blockquote>
				<figcaption class="mt-4">
					<p class="font-bold text-ink">{r.author}</p>
					<p class="text-sm text-muted">{r.source} · {r.date}</p>
				</figcaption>
			</figure>
		{/each}
	</div>
</section>

<!-- ── Seasonal pre-order banner ────────────────────────────────────────── -->
<section class="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8" aria-labelledby="seasonal-title">
	<div class="mb-6">
		<p class="text-xs font-bold tracking-[0.3em] text-caramel uppercase">— Order before the deadline —</p>
		<h2 id="seasonal-title" class="mt-2 font-display text-3xl font-semibold text-choco sm:text-4xl">Seasonal Pre-Orders</h2>
	</div>
	<div class="grid gap-5 md:grid-cols-2">
		{#each seasonalCollections as c}
			<a href="/seasonal" class="group reveal overflow-hidden rounded-3xl bg-white ring-1 ring-line transition-shadow duration-200 hover:shadow-[0_8px_30px_rgba(74,44,26,0.10)]">
				<div class="overflow-hidden bg-sand">
					<Picture
						name={c.image}
						alt={c.imageAlt}
						width={1200}
						height={800}
						sizes="(min-width: 768px) 50vw, 100vw"
						imgClass="aspect-[3/2] w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
					/>
				</div>
				<div class="p-6">
					<h3 class="font-display text-2xl font-semibold text-choco">{c.name}</h3>
					<p class="mt-1 text-sm font-bold text-caramel">{c.deadline}</p>
					<p class="mt-2 text-sm leading-relaxed text-muted">{c.items.map((i) => i.name).join(' · ')}</p>
				</div>
			</a>
		{/each}
	</div>
</section>

<!-- ── Instagram ────────────────────────────────────────────────────────── -->
<section class="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8" aria-labelledby="insta-title">
	<h2 id="insta-title" class="font-display text-3xl font-semibold text-choco">Follow Our Sweet Journey</h2>
	<p class="mt-2 text-muted">
		Tag us <a href={site.instagram} target="_blank" rel="noopener" class="font-semibold text-choco hover:underline">@sweetcrustbakery</a> for a chance to be featured!
	</p>
	<div class="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
		{#each instagramImages as shot, i}
			<a
				href={site.instagram}
				target="_blank"
				rel="noopener"
				aria-label="SweetCrust on Instagram — photo {i + 1}"
				class="group overflow-hidden rounded-2xl bg-sand"
			>
				<Picture
					name={shot.image}
					alt={shot.alt}
					width={800}
					height={800}
					sizes="(min-width: 1024px) 16vw, (min-width: 640px) 33vw, 50vw"
					imgClass="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-[1.05]"
				/>
			</a>
		{/each}
	</div>
</section>
