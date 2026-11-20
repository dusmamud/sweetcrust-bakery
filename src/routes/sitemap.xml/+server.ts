import { blogPosts, products, site } from '#lib/data/site.ts';

export const prerender = true;

const staticPages = [
	{ path: '/', priority: '1.0', changefreq: 'weekly' },
	{ path: '/shop', priority: '0.9', changefreq: 'weekly' },
	{ path: '/custom-orders', priority: '0.9', changefreq: 'weekly' },
	{ path: '/custom-cakes', priority: '0.9', changefreq: 'weekly' },
	{ path: '/wedding-cakes', priority: '0.9', changefreq: 'weekly' },
	{ path: '/tastings', priority: '0.8', changefreq: 'weekly' },
	{ path: '/gift-cards', priority: '0.8', changefreq: 'monthly' },
	{ path: '/locations', priority: '0.8', changefreq: 'monthly' },
	{ path: '/allergens', priority: '0.7', changefreq: 'monthly' },
	{ path: '/reviews', priority: '0.8', changefreq: 'weekly' },
	{ path: '/catering', priority: '0.8', changefreq: 'monthly' },
	{ path: '/subscriptions', priority: '0.7', changefreq: 'monthly' },
	{ path: '/loyalty', priority: '0.7', changefreq: 'monthly' },
	{ path: '/seasonal', priority: '0.8', changefreq: 'weekly' },
	{ path: '/cafe-menu', priority: '0.8', changefreq: 'weekly' },
	{ path: '/wholesale', priority: '0.6', changefreq: 'monthly' },
	{ path: '/careers', priority: '0.6', changefreq: 'monthly' },
	{ path: '/delivery', priority: '0.8', changefreq: 'monthly' },
	{ path: '/search', priority: '0.8', changefreq: 'weekly' },
	{ path: '/account', priority: '0.6', changefreq: 'monthly' },
	{ path: '/wishlist', priority: '0.6', changefreq: 'monthly' },
	{ path: '/classes', priority: '0.8', changefreq: 'weekly' },
	{ path: '/corporate-gifting', priority: '0.7', changefreq: 'monthly' },
	{ path: '/press', priority: '0.6', changefreq: 'monthly' },
	{ path: '/accessibility', priority: '0.5', changefreq: 'yearly' },
	{ path: '/sitemap', priority: '0.5', changefreq: 'monthly' },
	{ path: '/about', priority: '0.8', changefreq: 'monthly' },
	{ path: '/blog', priority: '0.8', changefreq: 'weekly' },
	{ path: '/contact', priority: '0.8', changefreq: 'monthly' },
	{ path: '/cart', priority: '0.5', changefreq: 'monthly' },
	{ path: '/checkout', priority: '0.5', changefreq: 'monthly' },
	{ path: '/track-order', priority: '0.5', changefreq: 'monthly' },
	{ path: '/faq', priority: '0.7', changefreq: 'monthly' },
	{ path: '/shipping', priority: '0.5', changefreq: 'monthly' },
	{ path: '/returns', priority: '0.5', changefreq: 'monthly' },
	{ path: '/privacy', priority: '0.3', changefreq: 'yearly' },
	{ path: '/terms', priority: '0.3', changefreq: 'yearly' }
];

export function GET() {
	const urls = [
		...staticPages.map(
			(p) =>
				`  <url><loc>${site.url}${p.path}</loc><changefreq>${p.changefreq}</changefreq><priority>${p.priority}</priority></url>`
		),
		...products.map(
			(p) => `  <url><loc>${site.url}/product/${p.slug}</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>`
		),
		...blogPosts.map(
			(b) => `  <url><loc>${site.url}/blog/${b.slug}</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>`
		)
	];
	const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`;
	return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
}
