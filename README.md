# SweetCrust Bakery & Cafe

Frontend-only bakery website — Svelte 5 + SvelteKit 3 + Tailwind CSS 4, static prerendered. Mock data only (all in `src/lib/data/site.ts`); no real orders, no real payments.

## Develop

```bash
npm install
npm run images   # convert PNG masters in static/images/original/ to AVIF/WebP/JPG @ 480/800/1200/1600
npm run check    # svelte-check, 0 errors
npm run build    # vite build → static output in build/
npm run preview  # serve the build locally
```

## Pages

- `/` home — hero, categories, occasion banner + bestsellers, features, about + testimonial, Instagram grid
- `/shop` — filters (category, search, price sort, dietary: eggless / gluten-free / vegan)
- `/search` — autocomplete, recent + popular searches, no-results state
- `/product/[slug]` — 12 products with sizes, quantity, cake message, gift-card preview, stock states, nutrition, bundle upsell, reviews
- `/custom-orders`, `/custom-cakes`, `/wedding-cakes`, `/tastings`, `/gift-cards`, `/seasonal`, `/catering`, `/subscriptions`, `/loyalty`, `/classes`, `/corporate-gifting`, `/wholesale`, `/careers`, `/cafe-menu`
- `/account` (mock magic-link sign-in, order history + 1-tap reorder, addresses, favourites, notification prefs), `/wishlist`
- `/about`, `/blog`, `/blog/[slug]` (4 posts), `/contact` (mock form), `/press`, `/accessibility`, `/sitemap` (HTML index)
- `/cart` (promo codes, free-delivery progress, express pay, slot picker), `/checkout` (mock 3-step + mock Apple/Google Pay), `/track-order` (mock lookup — try `SC-2026-1042`), `/faq`, `/shipping`, `/returns`, `/terms`, `/privacy`, `/delivery`, `/locations`, `/allergens`, `/reviews`, 404

## Performance budget

Field targets (75th percentile, mobile + desktop, CrUX): LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1. Stricter ecommerce aim: LCP 2.0s / INP 150ms / CLS 0.05 on conversion pages. Page weight ≤ 1.5MB, first-party JS ≤ 500KB parsed, Lighthouse ≥ 90 (95+ on shop/product/checkout). Check with PageSpeed Insights / Search Console field data, not lab scores alone. Hero image is preloaded with reserved aspect ratio; below-fold images are lazy via `Picture.svelte`.

## Notes

- Prices in USD ($), US bakery: 123 Baker Street, New York, NY 10001, +1 234 567 8900.
- Free delivery over $35, $4.95 below. Cart/wishlist/promo/account state persists in localStorage (`src/lib/cart.svelte.ts`, `wishlist.svelte.ts`, `promo.svelte.ts`, `account.svelte.ts`).
- Promo codes (mock): WELCOME10 / SWEET10 (10% off), FREESHIP (free delivery). Apple/Google Pay buttons are mock — no real wallet, no real payment.
- Every image goes through the reusable `#lib/components/Picture.svelte` (AVIF → WebP → JPG → PNG).
- JSON-LD: Organization + Bakery LocalBusiness in the layout, Product/Offer/BreadcrumbList on detail pages. No aggregateRating on the business and no FAQPage schema, per the 2026 rules. Product-level aggregateRating matches the visible reviews exactly.
- Motion: GSAP ScrollTrigger reveals + Lenis + @humanspeak/svelte-motion, all reduced-motion gated in code (gsap.matchMedia); `.reveal` defaults to visible so content never hides if JS does not run.
