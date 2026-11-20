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
	import { afterNavigate, onNavigate } from '$app/navigation';
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import Lenis from 'lenis';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import { MotionConfig } from '@humanspeak/svelte-motion';
	import Header from '#lib/components/Header.svelte';
	import Footer from '#lib/components/Footer.svelte';
	import Newsletter from '#lib/components/Newsletter.svelte';
	import BottomTabBar from '#lib/components/BottomTabBar.svelte';
	import ChatWidget from '#lib/components/ChatWidget.svelte';
	import CartRecoveryBanner from '#lib/components/CartRecoveryBanner.svelte';
	import { site } from '#lib/data/site.ts';
	import { restoreCart } from '#lib/cart.svelte.ts';
	import { restoreWishlist } from '#lib/wishlist.svelte.ts';
	import { restorePromo } from '#lib/promo.svelte.ts';
	import { restoreAccount } from '#lib/account.svelte.ts';

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

	// Organization + Bakery LocalBusiness (one graph): policies are declared
	// once at Organization level (MerchantReturnPolicy, ShippingService) so
	// product Offers only override by exception. No aggregateRating anywhere
	// on the business — Product pages carry their own first-party ratings.
	const jsonLd = {
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'Organization',
				name: site.name,
				url: site.url,
				logo: `${site.url}/favicon.svg`,
				sameAs: [site.instagram, site.facebook],
				hasMerchantReturnPolicy: {
					'@type': 'MerchantReturnPolicy',
					applicableCountry: 'US',
					returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
					merchantReturnDays: 1,
					returnMethod: 'https://schema.org/ReturnInStore',
					returnFees: 'https://schema.org/FreeReturn'
				},
				hasShippingService: {
					'@type': 'ShippingService',
					name: 'Local delivery',
					areaServed: { '@type': 'City', name: 'New York' }
				}
			},
			{
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
			}
		]
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

	// Scroll reveals via GSAP ScrollTrigger: fade + 16px rise, once, stagger
	// 60ms on grids. The layout stays mounted across client-side
	// navigations, so re-batch after every navigation — otherwise .reveal
	// sections on a newly visited page would stay invisible forever.
	// Reduced motion (gsap.matchMedia): the reduce branch sets every .reveal
	// to its end state with no animation — content is never hidden waiting
	// for JS. The CSS default for .reveal is VISIBLE for the same reason;
	// gsap.set() hides elements only when motion is allowed.
	// (Svelte transitions ignore CSS reduced-motion, so the check is in code.)
	let revealTriggers: ScrollTrigger[] = [];
	let revealMm: gsap.MatchMedia | null = null;
	function setupReveals() {
		gsap.registerPlugin(ScrollTrigger);
		revealMm?.revert();
		revealMm = gsap.matchMedia();
		revealMm.add('(prefers-reduced-motion: reduce)', () => {
			document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-visible'));
			return () => {};
		});
		revealMm.add('(prefers-reduced-motion: no-preference)', () => {
			// Kill the previous page's batch triggers (their elements are gone).
			revealTriggers.forEach((t) => t.kill());
			revealTriggers = ScrollTrigger.batch('.reveal:not(.is-visible)', {
				start: 'top 88%',
				once: true,
				onEnter: (els) => {
					gsap.to(els, {
						opacity: 1,
						y: 0,
						duration: 0.3,
						stagger: 0.06,
						ease: 'power3.out',
						overwrite: true,
						onComplete: () => els.forEach((el) => el.classList.add('is-visible'))
					});
				}
			});
			// Hide only when motion is allowed — elements already in view are
			// revealed by the batch immediately; the rest on scroll.
			gsap.set('.reveal:not(.is-visible)', { opacity: 0, y: 16 });
			ScrollTrigger.refresh();
			return () => {
				revealTriggers.forEach((t) => t.kill());
				revealTriggers = [];
			};
		});
	}
	$effect(() => {
		setupReveals();
	});
	afterNavigate(() => {
		// New page content is in the DOM by the time afterNavigate runs.
		requestAnimationFrame(setupReveals);
	});

	// Restore persisted mock state (cart, wishlist, promo, account) once,
	// client-side only — prerendering must stay deterministic.
	// NOTE: this must be onMount, NOT $effect. The restore functions read
	// the same reactive state they write (e.g. lines.splice reads
	// lines.length), so an $effect tracking those reads re-runs on every
	// splice forever — effect_update_depth_exceeded, which aborted the
	// update flush and left pages (cart, checkout, account) half-rendered.
	// onMount runs once and tracks no dependencies.
	onMount(() => {
		restoreCart();
		restoreWishlist();
		restorePromo();
		restoreAccount();
	});

	// Product pages have their own sticky add-to-cart bar, so the global
	// mobile bar is hidden there — the two must never stack.
	const isProduct = $derived(page.url.pathname.startsWith('/product/'));
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

<!-- MotionConfig reducedMotion="user": every @humanspeak/svelte-motion
     animation below honours the visitor's reduced-motion preference. -->
<MotionConfig reducedMotion="user">
	<Header />
	<CartRecoveryBanner />
	<main id="main">{@render children()}</main>
	<Newsletter />
	<Footer />
</MotionConfig>

<ChatWidget />

{#if !isProduct}
	<!-- Mobile bottom tab bar (Home / Shop / Search / Cart / Account). Product
	     pages use their own sticky add-to-cart bar instead — never stacked. -->
	<BottomTabBar />
{/if}
