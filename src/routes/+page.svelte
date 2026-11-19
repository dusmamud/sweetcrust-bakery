<script lang="ts">
	import { ArrowRight, Cake, ChevronLeft, ChevronRight, Clock, Heart, Leaf, ShieldCheck, ShoppingBag, Sparkles, Truck, Wheat } from '@lucide/svelte';
	import { categories, instagramImages, products, site, testimonials } from '#lib/data/site.ts';
	import Picture from '#lib/components/Picture.svelte';
	import ProductCard from '#lib/components/ProductCard.svelte';

	const bestsellers = products.filter((p) => p.badge === 'Bestseller').slice(0, 4);
	type IconRow = [typeof Leaf, string, string];
	const trustItems: IconRow[] = [
		[Leaf, '100%', 'Fresh Ingredients'],
		[Cake, 'Custom', 'Cakes'],
		[Truck, 'Fast & Safe', 'Delivery'],
		[Heart, 'Made', 'With Love']
	];
	const featureItems: IconRow[] = [
		[Leaf, 'Premium Quality', 'Only the best ingredients'],
		[Sparkles, 'Wide Variety', 'Something for everyone'],
		[ShieldCheck, 'Secure Ordering', 'Safe & hassle-free'],
		[Truck, 'On-Time Delivery', 'Freshness at your doorstep']
	];
	let tIndex = $state(0);
	const testimonial = $derived(testimonials[tIndex % testimonials.length]);
	function nextT() {
		tIndex = (tIndex + 1) % testimonials.length;
	}
	function prevT() {
		tIndex = (tIndex - 1 + testimonials.length) % testimonials.length;
	}
</script>

<svelte:head>
	<title>SweetCrust Bakery &amp; Cafe — Life is Sweeter with Cake</title>
	<meta
		name="description"
		content="Delicious cakes, pastries, and baked treats made with the finest ingredients, just for you. Order custom cakes for birthdays, weddings and anniversaries in New York."
	/>
</svelte:head>

<!-- ── Hero ─────────────────────────────────────────────────────────────── -->
<section class="overflow-hidden bg-cream">
	<div class="mx-auto grid max-w-7xl items-center gap-8 px-4 pt-10 pb-8 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:px-8 lg:pt-16">
		<div class="reveal is-visible">
			<p class="text-xs font-bold tracking-[0.3em] text-caramel uppercase">— Freshly Baked Happiness —</p>
			<h1 class="mt-4 font-display text-[clamp(2.6rem,7vw,4.2rem)] leading-[1.05] font-semibold text-choco">
				Life is Sweeter<br />with Cake ♡
			</h1>
			<p class="mt-5 max-w-md text-lg leading-relaxed text-muted">
				Delicious cakes, pastries, and baked treats made with the finest ingredients, just for you.
			</p>
			<div class="mt-7 flex flex-wrap gap-3">
				<a
					href="/shop"
					class="inline-flex min-h-12 items-center gap-2 rounded-full bg-choco px-7 text-sm font-bold text-white uppercase transition-colors duration-200 hover:bg-choco-deep"
				>
					Order Now <ArrowRight size={17} aria-hidden="true" />
				</a>
				<a
					href="/shop"
					class="inline-flex min-h-12 items-center rounded-full border-2 border-choco px-7 text-sm font-bold text-choco uppercase transition-colors duration-200 hover:bg-choco-soft"
				>
					Explore Our Menu
				</a>
			</div>
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

<!-- ── Categories ───────────────────────────────────────────────────────── -->
<section class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8" aria-labelledby="categories-title">
	<h2 id="categories-title" class="sr-only">Shop by category</h2>
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

<!-- ── Occasion banner + Bestsellers ────────────────────────────────────── -->
<section class="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8" aria-labelledby="bestsellers-title">
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
				<h2 class="font-display text-3xl leading-tight font-semibold text-choco">Make Every Occasion Special</h2>
				<p class="mt-3 leading-relaxed text-muted">
					Custom cakes for birthdays, weddings, anniversaries and more.
				</p>
				<a
					href="/custom-orders"
					class="mt-5 inline-flex min-h-12 items-center gap-2 rounded-full bg-choco px-7 text-sm font-bold text-white uppercase transition-colors duration-200 hover:bg-choco-deep"
				>
					Order Custom Cake <ArrowRight size={17} aria-hidden="true" />
				</a>
				<p class="mt-5 font-script text-3xl text-caramel">Celebrate Smiles Always ♡</p>
			</div>
		</div>

		<div class="lg:col-span-3">
			<div class="mb-5 flex items-end justify-between gap-4">
				<h2 id="bestsellers-title" class="font-display text-3xl font-semibold text-choco">Our Bestsellers</h2>
				<a href="/shop" class="inline-flex min-h-12 items-center gap-1 text-sm font-bold text-choco hover:underline">
					View All Products <ArrowRight size={16} aria-hidden="true" />
				</a>
			</div>
			<div class="grid gap-4 sm:grid-cols-2 sm:gap-5">
				{#each bestsellers as product}
					<ProductCard {product} />
				{/each}
			</div>
		</div>
	</div>
</section>

<!-- ── Features strip ───────────────────────────────────────────────────── -->
<section class="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8" aria-label="Why choose SweetCrust">
	<ul class="grid grid-cols-1 gap-4 rounded-3xl bg-white p-6 ring-1 ring-line sm:grid-cols-2 lg:grid-cols-4">
		{#each featureItems as [Icon, title, text]}
			<li class="flex min-h-12 items-center gap-3">
				<span class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-choco-soft text-choco"><Icon size={22} aria-hidden="true" /></span>
				<span><span class="block font-bold text-ink">{title}</span><span class="text-sm text-muted">{text}</span></span>
			</li>
		{/each}
	</ul>
</section>

<!-- ── About + Testimonial ──────────────────────────────────────────────── -->
<section class="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
	<div class="grid gap-10 lg:grid-cols-2 lg:gap-14">
		<div class="reveal">
			<h2 class="font-display text-3xl font-semibold text-choco">About SweetCrust</h2>
			<p class="mt-4 leading-relaxed text-muted">
				At SweetCrust, we believe every bite tells a story. Our passion for baking goes beyond just ingredients
				— it’s about creating moments of joy, love, and togetherness. From classic recipes to modern delights,
				we bake happiness into everything we make.
			</p>
			<a
				href="/about"
				class="mt-6 inline-flex min-h-12 items-center gap-2 rounded-full bg-choco px-7 text-sm font-bold text-white uppercase transition-colors duration-200 hover:bg-choco-deep"
			>
				Learn More About Us <ArrowRight size={17} aria-hidden="true" />
			</a>
			<div class="relative mt-8 overflow-hidden rounded-3xl">
				<Picture
					name="about-baking"
					alt="Baking flat lay with flour, eggs, butter and a rolling pin"
					width={1200}
					height={800}
					sizes="(min-width: 1024px) 50vw, 100vw"
					imgClass="aspect-[3/2] w-full object-cover"
				/>
				<p class="absolute bottom-4 left-4 -rotate-3 font-script text-4xl text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]">Baked with Love Always ♡</p>
			</div>
		</div>

		<div class="reveal">
			<div class="flex items-center justify-between gap-4">
				<h2 class="font-display text-3xl font-semibold text-choco">What Our Customers Say</h2>
				<div class="flex gap-2">
					<button type="button" onclick={prevT} aria-label="Previous testimonial" class="flex h-12 w-12 items-center justify-center rounded-full border border-line bg-white text-choco transition-colors duration-150 hover:bg-cream-deep">
						<ChevronLeft size={20} aria-hidden="true" />
					</button>
					<button type="button" onclick={nextT} aria-label="Next testimonial" class="flex h-12 w-12 items-center justify-center rounded-full border border-line bg-white text-choco transition-colors duration-150 hover:bg-cream-deep">
						<ChevronRight size={20} aria-hidden="true" />
					</button>
				</div>
			</div>
			<figure class="mt-6 rounded-3xl bg-white p-6 ring-1 ring-line sm:p-8">
				<blockquote class="text-lg leading-relaxed text-ink">“{testimonial.quote}”</blockquote>
				<figcaption class="mt-6 flex items-center gap-4">
					<Picture
						name={testimonial.image}
						alt={testimonial.imageAlt}
						width={160}
						height={160}
						imgClass="h-14 w-14 rounded-full object-cover"
					/>
					<span>
						<span class="block font-bold text-ink">{testimonial.name}</span>
						<span class="text-sm text-muted">{testimonial.detail}</span>
					</span>
				</figcaption>
			</figure>
			<div class="mt-6 grid grid-cols-3 gap-4 text-center">
				{#each [['4.9', 'Average rating'], ['12k+', 'Happy customers'], ['35+', 'Cake flavours']] as [num, label]}
					<div class="rounded-2xl bg-cream-deep p-4 ring-1 ring-line">
						<p class="font-display text-2xl font-semibold text-choco">{num}</p>
						<p class="mt-1 text-xs text-muted">{label}</p>
					</div>
				{/each}
			</div>
			<p class="mt-6 flex items-center gap-2 text-sm text-muted">
				<Clock size={16} aria-hidden="true" class="shrink-0 text-caramel" /> Open Mon – Sat, 8:00 AM – 8:00 PM · {site.addressShort}
			</p>
		</div>
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
