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
- `/product/[slug]` — 12 products with sizes, quantity, cake message, related treats
- `/custom-orders` — mock custom-cake form with confirmation + reference
- `/about`, `/blog`, `/blog/[slug]` (4 posts), `/contact` (mock form)
- `/cart`, `/checkout` (mock 3-step: details → payment → confirmation with order ref + ETA)
- `/track-order` (mock lookup — try `SC-2026-1042`), `/faq`, `/shipping`, `/returns`, `/terms`, `/privacy`, 404

## Notes

- Prices in USD ($), US bakery: 123 Baker Street, New York, NY 10001, +1 234 567 8900.
- Free delivery over $35, $4.95 below. Cart state lives in `src/lib/cart.svelte.ts`.
- Every image goes through the reusable `#lib/components/Picture.svelte` (AVIF → WebP → JPG → PNG).
- JSON-LD: Bakery schema in the layout, Product schema on detail pages. No aggregateRating (self-stars) and no FAQPage schema, per the 2026 rules.
