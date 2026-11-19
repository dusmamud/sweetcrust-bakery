// ─── SweetCrust Bakery & Cafe — MOCK DATA ──────────────────────────────────
// Frontend-only site. All content below is mock/placeholder data so the
// client can approve the design first. Real data replaces this file later.
// Images: only the base name is stored here; Picture.svelte builds the
// AVIF → WebP → JPG → PNG fallback chain from static/images/<name>/.
// Prices in USD ($), US bakery (New York). No real orders, no real payments.
// Note: no src/env.ts in this project — SvelteKit reserves that filename
// for its explicit env variables file, so the URL lives here.

export const site = {
	name: 'SweetCrust Bakery & Cafe',
	tagline: 'Freshly Baked Happiness.',
	phoneDisplay: '+1 234 567 8900',
	phoneHref: 'tel:+12345678900',
	email: 'hello@sweetcrustbakery.com',
	address: '123 Baker Street, New York, NY 10001, United States',
	addressShort: '123 Baker Street, New York, NY 10001',
	hours: 'Mon – Sat: 8:00 AM – 8:00 PM',
	url: 'https://sweetcrustbakery.com',
	instagram: 'https://www.instagram.com/sweetcrustbakery',
	facebook: 'https://www.facebook.com/sweetcrustbakery',
	freeDeliveryOver: 35,
	deliveryFee: 4.95
} as const;

export function usd(n: number): string {
	return `$${n.toFixed(2)}`;
}

export const nav = [
	{ label: 'Home', href: '/' },
	{ label: 'About Us', href: '/about' },
	{ label: 'Our Products', href: '/shop' },
	{ label: 'Custom Orders', href: '/custom-orders' },
	{ label: 'Blog', href: '/blog' },
	{ label: 'Contact Us', href: '/contact' }
] as const;

export type Category = {
	id: string;
	name: string;
	blurb: string;
	image: string;
	imageAlt: string;
	href: string;
};

export const categories: Category[] = [
	{ id: 'cakes', name: 'Cakes', blurb: 'For all celebrations', image: 'cat-cakes', imageAlt: 'White frosted celebration cake topped with fresh berries', href: '/shop?category=cakes' },
	{ id: 'cupcakes', name: 'Cupcakes', blurb: 'Small bites, big happiness', image: 'cat-cupcakes', imageAlt: 'Pink frosted cupcake with sprinkles', href: '/shop?category=cupcakes' },
	{ id: 'pastries', name: 'Pastries', blurb: 'Layers of joy', image: 'cat-pastries', imageAlt: 'Golden fruit pastry tart with fresh berries', href: '/shop?category=pastries' },
	{ id: 'bread', name: 'Bread', blurb: 'Freshly baked daily', image: 'cat-bread', imageAlt: 'Freshly baked croissants and bread rolls in a basket', href: '/shop?category=bread' },
	{ id: 'cookies', name: 'Cookies', blurb: 'Little treats, big smiles', image: 'cat-cookies', imageAlt: 'Stack of chocolate chip cookies on a plate', href: '/shop?category=cookies' },
	{ id: 'custom', name: 'Custom Orders', blurb: 'Your ideas, our creations', image: 'cat-custom', imageAlt: 'White birthday cake with pastel buttercream flowers', href: '/custom-orders' }
];

export type Dietary = 'eggless' | 'gluten-free' | 'vegan';

export type Product = {
	slug: string;
	name: string;
	category: string;
	price: number;
	compareAt?: number;
	rating: number;
	reviews: number;
	image: string;
	imageAlt: string;
	badge?: 'Bestseller' | 'New' | 'Popular';
	dietary: Dietary[];
	serves: string;
	description: string;
	long: string[];
	ingredients: string[];
	sizes: string[];
};

export const products: Product[] = [
	{
		slug: 'chocolate-truffle-cake',
		name: 'Chocolate Truffle Cake',
		category: 'cakes',
		price: 28.0,
		rating: 4.9,
		reviews: 224,
		image: 'product-chocolate-truffle-cake',
		imageAlt: 'Rich chocolate truffle layer cake with glossy ganache and chocolate curls',
		badge: 'Bestseller',
		dietary: [],
		serves: 'Serves 8–10',
		description: 'Dark chocolate sponge, silky ganache and a truffle centre — our most-loved cake.',
		long: [
			'Three layers of dark chocolate sponge brushed with espresso syrup, filled with whipped chocolate truffle cream and finished in glossy ganache. It is the cake our regulars ask for by name.',
			'Every cake is baked to order in small batches, so the crumb stays moist and the ganache sets with a soft shine. Keep refrigerated and bring to room temperature 30 minutes before serving.',
			'Perfect for birthdays, anniversaries, or a Friday that deserves cake. Add a handwritten message card at checkout — it is on us.'
		],
		ingredients: ['Belgian dark chocolate', 'Free-range eggs', 'Fresh cream', 'Espresso syrup', 'Cocoa butter ganache'],
		sizes: ['6" — Serves 6', '8" — Serves 10', '10" — Serves 16']
	},
	{
		slug: 'red-velvet-cake',
		name: 'Red Velvet Cake',
		category: 'cakes',
		price: 26.0,
		rating: 4.8,
		reviews: 98,
		image: 'product-red-velvet-cake',
		imageAlt: 'Red velvet layer cake with cream cheese frosting',
		badge: 'Bestseller',
		dietary: [],
		serves: 'Serves 8–10',
		description: 'Classic red velvet with tangy cream cheese frosting and a soft cocoa crumb.',
		long: [
			'Our red velvet is the old-school kind: a tender cocoa crumb with just a hint of tang, layered with whipped cream cheese frosting and finished with red velvet crumbs.',
			'Baked fresh every morning and frosted to order. It slices cleanly, holds its shape on the plate, and tastes even better on day two.',
			'A favourite for Valentine’s Day, baby showers and anyone who believes a cake should be a little dramatic.'
		],
		ingredients: ['Buttermilk', 'Dutch cocoa', 'Cream cheese', 'Free-range eggs', 'Vanilla bean'],
		sizes: ['6" — Serves 6', '8" — Serves 10', '10" — Serves 16']
	},
	{
		slug: 'blueberry-cheesecake',
		name: 'Blueberry Cheesecake',
		category: 'cakes',
		price: 24.0,
		rating: 4.9,
		reviews: 156,
		image: 'product-blueberry-cheesecake',
		imageAlt: 'Blueberry cheesecake topped with fresh blueberries',
		badge: 'Bestseller',
		dietary: [],
		serves: 'Serves 8',
		description: 'Baked New York cheesecake on a buttery crumb, crowned with fresh blueberries.',
		long: [
			'Slow-baked New York cheesecake with a hint of lemon, set on a golden graham crumb and topped with a glossy blueberry compote and fresh berries.',
			'Chilled overnight so every slice is dense, creamy and clean-cutting. Best served cold, straight from the fridge.',
			'One of our most gifted cakes — it travels well and always looks like you tried very hard.'
		],
		ingredients: ['Cream cheese', 'Fresh blueberries', 'Graham crumb', 'Lemon zest', 'Free-range eggs'],
		sizes: ['6" — Serves 6', '8" — Serves 8', '10" — Serves 12']
	},
	{
		slug: 'chocolate-cupcakes',
		name: 'Chocolate Cupcakes',
		category: 'cupcakes',
		price: 18.0,
		rating: 4.7,
		reviews: 72,
		image: 'product-chocolate-cupcakes',
		imageAlt: 'Chocolate cupcakes with swirled chocolate buttercream',
		badge: 'Bestseller',
		dietary: [],
		serves: 'Box of 6',
		description: 'Moist chocolate cupcakes with swirled buttercream — a box of six little joys.',
		long: [
			'Six moist chocolate cupcakes topped with a tall swirl of chocolate buttercream and a dusting of chocolate sprinkles. Baked fresh every morning.',
			'The box is party-ready: individual, shareable, and exactly the right size for a small celebration — or a solo one. No judgement here.',
			'Available in mixed boxes too — ask in store or leave a note at checkout.'
		],
		ingredients: ['Belgian cocoa', 'Buttercream', 'Free-range eggs', 'Fresh cream'],
		sizes: ['Box of 6', 'Box of 12']
	},
	{
		slug: 'vanilla-bean-cake',
		name: 'Vanilla Bean Cake',
		category: 'cakes',
		price: 25.0,
		rating: 4.8,
		reviews: 87,
		image: 'product-vanilla-bean-cake',
		imageAlt: 'Vanilla bean layer cake with white buttercream and vanilla pods',
		dietary: ['eggless'],
		serves: 'Serves 8–10',
		description: 'Madagascar vanilla bean sponge with silky vanilla buttercream.',
		long: [
			'A quiet classic done properly: real vanilla bean seeds in a soft sponge, layered with vanilla buttercream and finished with white flowers.',
			'Also available eggless — same soft crumb, same vanilla warmth. Tell us at checkout if you need the eggless version.',
			'The cake for people who say “I don’t really like cake” — and then ask for a second slice.'
		],
		ingredients: ['Madagascar vanilla bean', 'Butter', 'Free-range eggs', 'Fresh cream'],
		sizes: ['6" — Serves 6', '8" — Serves 10', '10" — Serves 16']
	},
	{
		slug: 'strawberry-shortcake',
		name: 'Strawberry Shortcake',
		category: 'cakes',
		price: 27.0,
		rating: 4.9,
		reviews: 143,
		image: 'product-strawberry-shortcake',
		imageAlt: 'Strawberry shortcake with cream and fresh strawberries',
		badge: 'Popular',
		dietary: [],
		serves: 'Serves 8',
		description: 'Vanilla sponge, chantilly cream and macerated strawberries.',
		long: [
			'Light vanilla sponge layered with chantilly cream and strawberries macerated in a little sugar and lemon, so every bite tastes like June.',
			'Best eaten the same day — the cream is whipped to order and the berries are cut fresh each morning.',
			'Our spring bestseller, and the cake most likely to disappear before the candles are lit.'
		],
		ingredients: ['Fresh strawberries', 'Chantilly cream', 'Vanilla sponge', 'Lemon'],
		sizes: ['6" — Serves 6', '8" — Serves 8', '10" — Serves 12']
	},
	{
		slug: 'lemon-tart',
		name: 'Lemon Tart',
		category: 'pastries',
		price: 16.0,
		rating: 4.8,
		reviews: 64,
		image: 'product-lemon-tart',
		imageAlt: 'Lemon tart with torched meringue peaks',
		dietary: ['eggless'],
		serves: 'Serves 6',
		description: 'Sharp lemon curd in a crisp shell, crowned with torched meringue.',
		long: [
			'Buttery shortcrust filled with bright, sharp lemon curd and finished with soft torched meringue peaks. Sweet, sour and crisp in one bite.',
			'Made with fresh lemons, never bottled juice — you can taste the difference in the first forkful.',
			'Wonderful with afternoon tea, and even better with a second slice.'
		],
		ingredients: ['Fresh lemons', 'Butter shortcrust', 'Meringue', 'Free-range eggs'],
		sizes: ['Individual', 'Whole tart — Serves 6']
	},
	{
		slug: 'cinnamon-rolls',
		name: 'Cinnamon Rolls',
		category: 'pastries',
		price: 14.0,
		rating: 4.9,
		reviews: 201,
		image: 'product-cinnamon-rolls',
		imageAlt: 'Warm cinnamon rolls with cream cheese glaze',
		badge: 'Popular',
		dietary: [],
		serves: 'Box of 4',
		description: 'Soft, gooey cinnamon rolls with cream cheese glaze, baked every morning.',
		long: [
			'Our cinnamon rolls come out of the oven at 7 AM and rarely last past 10. Soft, swirled, properly cinnamon-y and glazed while still warm.',
			'Warm them for 20 seconds at home and the glaze melts back into the swirls. Breakfast, sorted.',
			'Available as a box of four or a tray of twelve for the office — or the family that agrees on nothing except these.'
		],
		ingredients: ['Ceylon cinnamon', 'Brown sugar', 'Cream cheese glaze', 'Butter'],
		sizes: ['Box of 4', 'Tray of 12']
	},
	{
		slug: 'butter-croissant',
		name: 'Butter Croissant',
		category: 'bread',
		price: 6.0,
		rating: 4.8,
		reviews: 312,
		image: 'product-butter-croissant',
		imageAlt: 'Golden flaky butter croissants on a wooden board',
		dietary: [],
		serves: 'Each',
		description: 'Laminated over three days — shatteringly crisp outside, soft and buttery inside.',
		long: [
			'Three days of lamination, French butter and patience. The outside shatters; the inside is soft, honeycombed and rich.',
			'Baked in small batches through the morning, so the batch you buy is never more than a couple of hours old.',
			'Best with coffee, jam, or absolutely nothing at all.'
		],
		ingredients: ['French butter', 'Flour', 'Yeast', 'Sea salt'],
		sizes: ['Each', 'Box of 4']
	},
	{
		slug: 'macaron-box',
		name: 'Macaron Gift Box',
		category: 'cookies',
		price: 22.0,
		rating: 4.9,
		reviews: 118,
		image: 'product-macaron-box',
		imageAlt: 'Box of pastel French macarons',
		badge: 'New',
		dietary: ['gluten-free'],
		serves: 'Box of 12',
		description: 'Twelve pastel macarons — pistachio, raspberry, vanilla and chocolate.',
		long: [
			'Twelve delicate macarons with crisp shells, chewy middles and ganache fillings: pistachio, raspberry, vanilla and dark chocolate.',
			'Naturally gluten-free and packed in our signature gift box — the easiest impressive gift we sell.',
			'Keep refrigerated and bring to room temperature 20 minutes before serving for the perfect bite.'
		],
		ingredients: ['Almond flour', 'Egg white', 'Ganache', 'Natural colourings'],
		sizes: ['Box of 6', 'Box of 12']
	},
	{
		slug: 'carrot-cake',
		name: 'Carrot Cake',
		category: 'cakes',
		price: 24.0,
		rating: 4.7,
		reviews: 89,
		image: 'product-carrot-cake',
		imageAlt: 'Carrot layer cake with cream cheese frosting and walnuts',
		dietary: [],
		serves: 'Serves 8–10',
		description: 'Spiced carrot sponge, walnuts and cream cheese frosting.',
		long: [
			'Moist spiced sponge with grated carrot, toasted walnuts and a whisper of cinnamon, layered with cream cheese frosting.',
			'The cake for people who want cake but also want to feel good about it. It has vegetables in it. That counts.',
			'Baked fresh daily and frosted to order.'
		],
		ingredients: ['Carrots', 'Walnuts', 'Cinnamon', 'Cream cheese', 'Free-range eggs'],
		sizes: ['6" — Serves 6', '8" — Serves 10', '10" — Serves 16']
	},
	{
		slug: 'tiramisu',
		name: 'Classic Tiramisu',
		category: 'cakes',
		price: 23.0,
		rating: 4.8,
		reviews: 105,
		image: 'product-tiramisu',
		imageAlt: 'Classic tiramisu dusted with cocoa powder',
		badge: 'New',
		dietary: [],
		serves: 'Serves 6',
		description: 'Espresso-soaked ladyfingers, mascarpone cream and a cocoa dusting.',
		long: [
			'Espresso-soaked savoiardi layered with whipped mascarpone and finished with a generous dusting of cocoa. Chilled overnight so the layers set into one creamy whole.',
			'Made with real espresso from the cafe next door — the coffee is strong, the cream is gentle, and the balance is the point.',
			'Serve chilled, with a spoon and no plans to share.'
		],
		ingredients: ['Mascarpone', 'Espresso', 'Savoiardi', 'Cocoa', 'Free-range eggs'],
		sizes: ['Individual', 'Family — Serves 6']
	}
];

export type Testimonial = {
	quote: string;
	name: string;
	detail: string;
	image: string;
	imageAlt: string;
};

export const testimonials: Testimonial[] = [
	{
		quote: 'The cake was not only beautiful but absolutely delicious! SweetCrust made my birthday extra special. Highly recommended!',
		name: 'Priya Mehta',
		detail: 'Verified Customer',
		image: 'testimonial-priya',
		imageAlt: 'Portrait of Priya Mehta, a verified SweetCrust customer'
	},
	{
		quote: 'I ordered a custom wedding cake and it was beyond perfect — three tiers of vanilla bean and strawberry, and guests are still talking about it.',
		name: 'Daniel Carter',
		detail: 'Verified Customer — Wedding Order',
		image: 'product-vanilla-bean-cake',
		imageAlt: 'Vanilla bean wedding cake'
	},
	{
		quote: 'The cinnamon rolls are dangerous. I came in for one croissant and left with a tray of twelve. Zero regrets.',
		name: 'Sofia Ramirez',
		detail: 'Verified Customer',
		image: 'product-cinnamon-rolls',
		imageAlt: 'Warm cinnamon rolls with cream cheese glaze'
	}
];

export const instagramImages = [
	{ image: 'product-chocolate-truffle-cake', alt: 'Chocolate truffle cake slice on a plate' },
	{ image: 'cat-bread', alt: 'Fresh croissants in a basket' },
	{ image: 'product-chocolate-cupcakes', alt: 'Chocolate cupcakes with buttercream swirls' },
	{ image: 'product-lemon-tart', alt: 'Lemon tart with torched meringue' },
	{ image: 'product-cinnamon-rolls', alt: 'Cinnamon rolls fresh from the oven' },
	{ image: 'product-strawberry-shortcake', alt: 'Strawberry shortcake with fresh berries' }
];

export type BlogPost = {
	slug: string;
	title: string;
	excerpt: string;
	image: string;
	imageAlt: string;
	date: string;
	readMinutes: number;
	category: string;
	body: string[];
};

export const blogPosts: BlogPost[] = [
	{
		slug: 'how-to-choose-the-perfect-birthday-cake',
		title: 'How to Choose the Perfect Birthday Cake',
		excerpt: 'Size, flavour, dietary needs and a little bit of theatre — everything to think about before you order.',
		image: 'cat-custom',
		imageAlt: 'White birthday cake with pastel buttercream flowers',
		date: 'November 12, 2026',
		readMinutes: 5,
		category: 'Guides',
		body: [
			'Start with the guest list, not the flavour. A good rule of thumb is one generous slice per guest, plus two extra — there is always someone who wants seconds, and there is always a slice for the birthday person at midnight.',
			'Then think about the room. A tall, dramatic cake suits a big party; a low, wide cake is easier to cut and serve at a family dinner. If children are involved, cupcakes or a cake with a sturdy frosting travel better than a delicate one.',
			'Flavour is personal, but safe bets exist: chocolate truffle pleases almost everyone, vanilla bean is the quiet crowd-pleaser, and red velvet photographs beautifully. If you are torn, order a small tasting box first — we bake them every Friday.',
			'Finally, give us the details that matter: dietary needs, the message on top, and the date. Order at least 48 hours ahead for standard cakes and a week ahead for custom designs, and we will handle the rest.'
		]
	},
	{
		slug: 'behind-the-scenes-a-morning-at-sweetcrust',
		title: 'Behind the Scenes: A Morning at SweetCrust',
		excerpt: 'The ovens fire at 4 AM, the croissants laminate for three days, and the first cake of the day is always the chocolate truffle.',
		image: 'about-baking',
		imageAlt: 'Baking flat lay with flour, eggs and a rolling pin',
		date: 'November 5, 2026',
		readMinutes: 4,
		category: 'Behind the Scenes',
		body: [
			'The day starts at 4 AM, when the ovens come on and the first doughs go in. By 5, the bakery smells like butter and cinnamon, and the team is already shaping croissants that were laminated two days ago.',
			'Everything is baked in small batches through the morning. That is why the croissants you buy at 9 AM were in the oven at 8 — and why the cinnamon rolls sell out by 10 most days.',
			'The cakes are a different rhythm: sponges baked the day before, chilled overnight, then filled and frosted to order. A custom cake is never rushed — the frosting alone takes an hour of quiet, steady work.',
			'By 8 AM the doors open, the display is full, and the first regulars are already at the counter. That is our favourite part of the day.'
		]
	},
	{
		slug: 'cake-decorating-tips-for-beginners',
		title: 'Cake Decorating Tips for Beginners',
		excerpt: 'A crumb coat, a hot palette knife and a little patience — the three things that make a home cake look bakery-made.',
		image: 'blog-cake-decorating',
		imageAlt: 'Hands piping buttercream roses onto a cake',
		date: 'October 28, 2026',
		readMinutes: 6,
		category: 'Tips',
		body: [
			'The single biggest difference between a home cake and a bakery cake is the crumb coat: a thin layer of frosting, chilled for 30 minutes, that traps every crumb before the final coat goes on.',
			'Use a hot palette knife — run it under hot water, wipe it dry, and smooth. The heat melts the frosting just enough to glide. Repeat as needed; nobody is counting.',
			'Keep your buttercream at room temperature and your cake cold. Cold cake, soft frosting: that contrast is what gives you clean, sharp edges.',
			'And if it all goes sideways, remember: a handful of fresh berries and a dusting of icing sugar covers almost anything. We have been doing this for years, and we still keep berries nearby.'
		]
	},
	{
		slug: 'why-we-bake-with-real-butter',
		title: 'Why We Bake With Real Butter',
		excerpt: 'It costs more, it is harder to work with, and we would never bake without it. Here is why.',
		image: 'product-butter-croissant',
		imageAlt: 'Golden butter croissants on a wooden board',
		date: 'October 15, 2026',
		readMinutes: 4,
		category: 'Our Craft',
		body: [
			'Butter is flavour. Shortening makes a cake soft; butter makes it taste like something. In a croissant, butter is also structure — the layers that shatter when you bite in are butter, flour and time.',
			'Real butter is harder to work with. It melts faster, it needs a cool kitchen, and in summer we laminate at dawn. We accept that, because the alternative is a croissant that looks right and tastes like nothing.',
			'We source our butter from a small dairy upstate, and we use it in everything — cakes, tarts, croissants, even the glaze on the cinnamon rolls. It is our biggest ingredient cost and our smallest compromise.'
		]
	}
];

export type FaqItem = { q: string; a: string };

export const faqs: FaqItem[] = [
	{
		q: 'How far in advance should I order a custom cake?',
		a: 'Standard cakes need 48 hours. Custom designs — shaped cakes, tiered cakes, hand-piped work — need at least 7 days, and wedding cakes need 3–4 weeks. If you are short on time, call us: we keep a small daily stock of celebration cakes ready to go.'
	},
	{
		q: 'Do you offer eggless, gluten-free or vegan options?',
		a: 'Yes. Several cakes are available eggless, our macarons are naturally gluten-free, and we bake a vegan chocolate cake to order. Tell us your dietary needs in the order notes and we will confirm what is possible — we take cross-contamination seriously and will always be honest about it.'
	},
	{
		q: 'Do you deliver?',
		a: 'Yes — delivery within New York City is $4.95, and free on orders over $35. We deliver Tuesday to Sunday, 9 AM to 7 PM. Cakes travel in insulated boxes with a “this side up” promise, and we will call you when we are five minutes away.'
	},
	{
		q: 'Can I pick up my order instead?',
		a: 'Of course. Choose pickup at checkout and collect from 123 Baker Street, New York. We will have it boxed and ready at your chosen time, and we will hold it for up to 2 hours past your slot.'
	},
	{
		q: 'What is your cancellation policy?',
		a: 'Standard orders can be cancelled up to 24 hours before pickup or delivery for a full refund. Custom cakes can be cancelled up to 72 hours ahead. After that we have usually already baked your cake, so we offer a 50% refund or a credit for your next order.'
	},
	{
		q: 'Do you cater events and weddings?',
		a: 'Yes — weddings, birthdays, office parties and baby showers. Tell us your guest count and date on the Custom Orders page and we will put together a tasting and a quote within two working days.'
	}
];

export const mockOrders: Record<string, { status: string; items: string; eta: string; placed: string }> = {
	'SC-2026-1042': { status: 'Out for delivery', items: 'Chocolate Truffle Cake × 1, Cinnamon Rolls × 1', eta: 'Today, 2:30 – 3:00 PM', placed: 'November 18, 2026' },
	'SC-2026-1038': { status: 'Being baked', items: 'Red Velvet Cake × 1', eta: 'Tomorrow, 10:00 AM', placed: 'November 18, 2026' },
	'SC-2026-1021': { status: 'Delivered', items: 'Blueberry Cheesecake × 1, Macaron Gift Box × 2', eta: 'Delivered Nov 17, 2026', placed: 'November 16, 2026' }
};
