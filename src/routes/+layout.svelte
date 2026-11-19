<script lang="ts">
	import '@fontsource/playfair-display/400.css';
	import '@fontsource/playfair-display/500.css';
	import '@fontsource/playfair-display/600.css';
	import '@fontsource/playfair-display/700.css';
	import '@fontsource/inter/400.css';
	import '@fontsource/inter/500.css';
	import '@fontsource/inter/600.css';
	import '@fontsource/inter/700.css';
	import '@fontsource/caveat/500.css';
	import '@fontsource/caveat/600.css';
	import '@fontsource/caveat/700.css';
	import '../app.css';
	import { onNavigate } from '$app/navigation';
	import Lenis from 'lenis';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import { Cake, Phone, ShoppingBag } from '@lucide/svelte';
	import Header from '#lib/components/Header.svelte';
	import Footer from '#lib/components/Footer.svelte';
	import Newsletter from '#lib/components/Newsletter.svelte';
	import { site } from '#lib/data/site.ts';

	let { children } = $props();

	// View Transitions between pages (SvelteKit onNavigate). Skipped when the
	// browser has no View Transitions API or the user prefers reduced motion.
	onNavigate((navigation) => {
		if (!('startViewTransition' in document)) return;
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});

	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'Bakery',
		name: site.name,
		description:
			'Freshly baked cakes, cupcakes, pastries, bread and cookies in New York — custom cakes for birthdays, weddings and anniversaries, made with the finest ingredients.',
		telephone: site.phoneDisplay,
		email: site.email,
		address: {
			'@type': 'PostalAddress',
			streetAddress: '123 Baker Street',
			addressLocality: 'New York',
			addressRegion: 'NY',
			postalCode: '10001',
			addressCountry: 'US'
		},
		geo: { '@type': 'GeoCoordinates', latitude: 40.7484, longitude: -73.9857 },
		openingHoursSpecification: {
			'@type': 'OpeningHoursSpecification',
			dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
			opens: '08:00',
			closes: '20:00'
		},
		priceRange: '$',
		url: site.url,
		sameAs: [site.instagram, site.facebook],
		servesCuisine: 'Bakery'
	};

	// Smooth scroll (Lenis) + GSAP ScrollTrigger, one rAF loop, reduced-motion gated.
	$effect(() => {
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		gsap.registerPlugin(ScrollTrigger);
		const lenis = new Lenis({
			autoRaf: false,
			lerp: 0.1,
			smoothWheel: true,
			syncTouch: false // native inertia on touch devices
		});
		lenis.on('scroll', ScrollTrigger.update);
		gsap.ticker.add((time) => lenis.raf(time * 1000));
		gsap.ticker.lagSmoothing(0);
		// Chocolate scroll-progress bar (transform only).
		const progress = document.getElementById('scroll-progress');
		if (progress) {
			gsap.to(progress, {
				scaleX: 1,
				ease: 'none',
				scrollTrigger: { start: 0, end: 'max', scrub: 0.3 }
			});
		}
		const onLoad = () => ScrollTrigger.refresh();
		window.addEventListener('load', onLoad);
		return () => {
			window.removeEventListener('load', onLoad);
			lenis.destroy();
		};
	});

	// Reveal-on-scroll: transform + opacity only, 300ms, respects reduced motion via CSS.
	$effect(() => {
		const els = document.querySelectorAll('.reveal');
		const io = new IntersectionObserver(
			(entries) => {
				for (const e of entries) if (e.isIntersecting) e.target.classList.add('is-visible');
			},
			{ threshold: 0.12 }
		);
		els.forEach((el) => io.observe(el));
		return () => io.disconnect();
	});
</script>

<svelte:head>
	<title>SweetCrust Bakery &amp; Cafe — Life is Sweeter with Cake</title>
	<meta
		name="description"
		content="Delicious cakes, pastries, and baked treats made with the finest ingredients, just for you. Custom cakes for birthdays, weddings and anniversaries in New York."
	/>
	<link rel="canonical" href={site.url} />
	<meta property="og:type" content="website" />
	<meta property="og:title" content="SweetCrust Bakery & Cafe — Life is Sweeter with Cake" />
	<meta
		property="og:description"
		content="Freshly baked happiness — cakes, cupcakes, pastries and bread, made with love in New York."
	/>
	<meta property="og:url" content={site.url} />
	<meta name="twitter:card" content="summary_large_image" />
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`}
</svelte:head>

<a
	href="#main"
	class="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-choco focus:px-5 focus:py-3 focus:text-white"
>
	Skip to main content
</a>

<!-- Scroll progress (chocolate line, transform only) -->
<div
	id="scroll-progress"
	class="fixed top-0 left-0 z-[55] h-[3px] w-full origin-left scale-x-0 bg-choco"
	aria-hidden="true"
></div>

<Header />
<main id="main">{@render children()}</main>
<Newsletter />
<Footer />

<!-- Sticky mobile bottom bar: Call / Order / Track -->
<nav
	aria-label="Quick actions"
	class="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-line bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden"
>
	<a href={site.phoneHref} class="flex min-h-14 flex-col items-center justify-center gap-0.5 text-xs font-semibold text-ink">
		<Phone size={20} class="text-choco" aria-hidden="true" />
		Call
	</a>
	<a href="/shop" class="flex min-h-14 items-center justify-center gap-2 bg-choco text-sm font-bold text-white">
		<Cake size={18} aria-hidden="true" /> Order Now
	</a>
	<a href="/track-order" class="flex min-h-14 flex-col items-center justify-center gap-0.5 text-xs font-semibold text-ink">
		<ShoppingBag size={20} class="text-choco" aria-hidden="true" />
		Track Order
	</a>
</nav>
<!-- Spacer so the sticky bar never covers footer content on mobile -->
<div class="h-14 lg:hidden" aria-hidden="true"></div>
