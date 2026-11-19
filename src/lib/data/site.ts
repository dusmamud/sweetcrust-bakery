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

// ─── Round-2 data: ordering core, allergens, reviews, new pages ────────────
// All mock. Cut-off: same-day pickup/delivery by 1 PM. Closed Sundays.
// Lead times are per product; the longest lead time in the basket wins.

export const cutoffText = 'Same-day pickup by 1 PM';
export const closedDayText = 'Closed Sundays — the ovens rest, too.';

export const fulfilmentSlots = ['9:00 – 11:00 AM', '11:00 AM – 1:00 PM', '2:00 – 4:00 PM', '4:00 – 6:00 PM'];

export type DeliveryZone = { prefixes: string[]; area: string; fee: number; min: number; note: string };

export const deliveryZones: DeliveryZone[] = [
	{ prefixes: ['100', '101', '102'], area: 'Manhattan', fee: 4.95, min: 0, note: 'Same-day available' },
	{ prefixes: ['112'], area: 'Brooklyn', fee: 6.95, min: 25, note: 'Next-day available' },
	{ prefixes: ['111', '113', '114'], area: 'Queens', fee: 7.95, min: 25, note: 'Next-day available' },
	{ prefixes: ['073', '070'], area: 'Jersey City & Hoboken', fee: 9.95, min: 35, note: 'Next-day available' }
];

export type ProductExtra = {
	sizePrices: number[];
	flavours?: { label: string; delta: number }[];
	allergens: string[];
	leadTimeDays: number;
};

// sizePrices line up with product.sizes. Flavours only where they apply.
export const productExtras: Record<string, ProductExtra> = {
	'chocolate-truffle-cake': {
		sizePrices: [28, 38, 48],
		flavours: [
			{ label: 'Classic dark chocolate', delta: 0 },
			{ label: 'Salted caramel truffle', delta: 4 },
			{ label: 'Espresso truffle', delta: 4 }
		],
		allergens: ['Wheat (gluten)', 'Egg', 'Milk'],
		leadTimeDays: 2
	},
	'red-velvet-cake': {
		sizePrices: [26, 36, 46],
		flavours: [
			{ label: 'Classic red velvet', delta: 0 },
			{ label: 'Chocolate fudge', delta: 4 },
			{ label: 'Lemon cream', delta: 4 }
		],
		allergens: ['Wheat (gluten)', 'Egg', 'Milk'],
		leadTimeDays: 2
	},
	'blueberry-cheesecake': {
		sizePrices: [24, 32, 42],
		flavours: [
			{ label: 'Blueberry', delta: 0 },
			{ label: 'Strawberry', delta: 2 },
			{ label: 'Classic New York', delta: 0 }
		],
		allergens: ['Wheat (gluten)', 'Egg', 'Milk'],
		leadTimeDays: 2
	},
	'chocolate-cupcakes': { sizePrices: [18, 32], allergens: ['Wheat (gluten)', 'Egg', 'Milk'], leadTimeDays: 0 },
	'vanilla-bean-cake': {
		sizePrices: [25, 35, 45],
		flavours: [
			{ label: 'Madagascar vanilla', delta: 0 },
			{ label: 'Strawberry cream', delta: 4 },
			{ label: 'Lemon curd', delta: 4 }
		],
		allergens: ['Wheat (gluten)', 'Egg', 'Milk'],
		leadTimeDays: 2
	},
	'strawberry-shortcake': {
		sizePrices: [27, 37, 47],
		flavours: [
			{ label: 'Classic strawberry', delta: 0 },
			{ label: 'Mixed berries', delta: 4 },
			{ label: 'Peach & cream', delta: 4 }
		],
		allergens: ['Wheat (gluten)', 'Egg', 'Milk'],
		leadTimeDays: 2
	},
	'lemon-tart': { sizePrices: [16, 28], allergens: ['Wheat (gluten)', 'Egg', 'Milk'], leadTimeDays: 1 },
	'cinnamon-rolls': { sizePrices: [14, 36], allergens: ['Wheat (gluten)', 'Egg', 'Milk'], leadTimeDays: 0 },
	'butter-croissant': { sizePrices: [6, 20], allergens: ['Wheat (gluten)', 'Milk'], leadTimeDays: 0 },
	'macaron-box': { sizePrices: [12, 22], allergens: ['Tree nuts (almond)', 'Egg', 'Milk'], leadTimeDays: 1 },
	'carrot-cake': {
		sizePrices: [24, 34, 44],
		flavours: [
			{ label: 'Classic walnut', delta: 0 },
			{ label: 'Pecan praline', delta: 4 },
			{ label: 'Orange spice', delta: 4 }
		],
		allergens: ['Wheat (gluten)', 'Egg', 'Milk', 'Tree nuts (walnut)'],
		leadTimeDays: 2
	},
	tiramisu: { sizePrices: [12, 23], allergens: ['Wheat (gluten)', 'Egg', 'Milk'], leadTimeDays: 1 }
};

export const sharedKitchenCaveat =
	'Made in a kitchen that also handles wheat, nuts, dairy, egg, sesame and soy. We cannot guarantee the absence of traces — please tell us about allergies before you order.';

export type ProductReview = { author: string; date: string; rating: number; title: string; text: string };

export const productReviews: Record<string, ProductReview[]> = {
	'chocolate-truffle-cake': [
		{ author: 'Maya S.', date: 'Nov 14, 2026', rating: 5, title: 'The birthday hero', text: 'Ordered the 8-inch for my husband’s birthday — the ganache was glossy, the sponge stayed moist, and there was not a single slice left. We have ordered it three times now.' },
		{ author: 'James L.', date: 'Nov 2, 2026', rating: 5, title: 'Better than the photos', text: 'It looked exactly like the picture and tasted even better. The truffle centre is dangerously good. Pickup was ready right on time.' },
		{ author: 'Anita R.', date: 'Oct 21, 2026', rating: 4, title: 'Rich — in the best way', text: 'Very rich, so small slices go a long way. Next time I would ask for the salted caramel version, but the classic is a crowd-pleaser.' }
	],
	'red-velvet-cake': [
		{ author: 'Grace W.', date: 'Nov 10, 2026', rating: 5, title: 'Valentine’s winner', text: 'The cream cheese frosting is perfectly tangy and the crumb is so soft. My partner asked where it was from before finishing the first slice.' },
		{ author: 'Tom B.', date: 'Oct 30, 2026', rating: 5, title: 'Beautiful and delicious', text: 'Ordered for an anniversary. It sliced cleanly, looked stunning on the plate, and the red velvet crumbs on top are a lovely touch.' },
		{ author: 'Priya K.', date: 'Oct 12, 2026', rating: 4, title: 'A little sweet for me', text: 'Gorgeous cake and lovely texture. I found the frosting a touch sweet, but everyone else at the table disagreed and went back for seconds.' }
	],
	'blueberry-cheesecake': [
		{ author: 'Elena M.', date: 'Nov 15, 2026', rating: 5, title: 'The one I gift most', text: 'I have sent this cheesecake to four different friends and every single one asked for the bakery’s name. Dense, creamy, perfect blueberries.' },
		{ author: 'David H.', date: 'Nov 1, 2026', rating: 5, title: 'Better than my New York benchmark', text: 'I grew up on New York cheesecake and this one holds up — proper density, a real graham crumb, and the compote is not too sweet.' },
		{ author: 'Sara F.', date: 'Oct 18, 2026', rating: 5, title: 'Travels well', text: 'Took it to a dinner party across town in the insulated box — arrived perfect, sliced beautifully, and vanished in minutes.' }
	],
	'chocolate-cupcakes': [
		{ author: 'Nina P.', date: 'Nov 12, 2026', rating: 5, title: 'Party saviours', text: 'Two boxes for a school party — the kids went wild for the buttercream swirls and the teachers asked where they were from.' },
		{ author: 'Omar D.', date: 'Oct 27, 2026', rating: 4, title: 'Moist and generous', text: 'Properly chocolatey with a tall swirl. I wish the box of 12 was a little cheaper, but the quality is there.' },
		{ author: 'Lily C.', date: 'Oct 9, 2026', rating: 5, title: 'My Friday ritual', text: 'A box of six every Friday. No regrets, no sharing. The sprinkles make me unreasonably happy.' }
	],
	'vanilla-bean-cake': [
		{ author: 'Hannah G.', date: 'Nov 8, 2026', rating: 5, title: 'The quiet classic', text: 'You can see the vanilla seeds in the sponge. Subtle, elegant, and the eggless version tasted identical — my mother-in-law never noticed.' },
		{ author: 'Marcus T.', date: 'Oct 25, 2026', rating: 5, title: 'Converted a cake sceptic', text: 'I “don’t like cake”. I ate two slices of this. The vanilla buttercream is the real deal.' },
		{ author: 'Zoe A.', date: 'Oct 5, 2026', rating: 4, title: 'Lovely, light and pretty', text: 'Beautiful with white flowers on top. A touch more vanilla would make it perfect for me, but it is a wonderful wedding-style cake.' }
	],
	'strawberry-shortcake': [
		{ author: 'Ivy J.', date: 'Nov 11, 2026', rating: 5, title: 'Tastes like June', text: 'The strawberries were fresh and the chantilly cream was whipped just right. Eat it the same day — it is at its best then.' },
		{ author: 'Ben K.', date: 'Oct 22, 2026', rating: 5, title: 'Spring in a box', text: 'Light, not too sweet, and the berries on top looked like a magazine photo. My go-to for Mother’s Day now.' },
		{ author: 'Rosa V.', date: 'Oct 3, 2026', rating: 4, title: 'Delicate and fresh', text: 'Wonderful flavour. It is a soft cake, so handle the box gently on the way home — worth it.' }
	],
	'lemon-tart': [
		{ author: 'Clara D.', date: 'Nov 9, 2026', rating: 5, title: 'Sharp, bright, perfect', text: 'The lemon curd has a real bite and the meringue peaks are torched beautifully. My favourite thing in the shop with a cup of tea.' },
		{ author: 'Sam O.', date: 'Oct 19, 2026', rating: 5, title: 'Afternoon tea star', text: 'Crisp shell, silky curd, not too sweet. I brought the whole tart to a book club and it was gone before the first chapter was discussed.' },
		{ author: 'Mia N.', date: 'Oct 1, 2026', rating: 4, title: 'Lovely and lemony', text: 'Very good — I would love a slightly bigger meringue topping, but the tart itself is spot on.' }
	],
	'cinnamon-rolls': [
		{ author: 'Alex P.', date: 'Nov 16, 2026', rating: 5, title: 'Dangerous. In a good way.', text: 'Still warm when I got them, glaze melting into the swirls. I came in for one croissant and left with a tray of twelve.' },
		{ author: 'Fatima Z.', date: 'Nov 3, 2026', rating: 5, title: 'Sunday morning essential', text: 'Twenty seconds in the microwave and they taste fresh from the oven. The cream cheese glaze is the best part.' },
		{ author: 'Chris E.', date: 'Oct 15, 2026', rating: 5, title: 'Office hero', text: 'Ordered the tray of twelve for the office. Gone by 10 AM and I was asked to bring them every Friday. I have accepted my fate.' }
	],
	'butter-croissant': [
		{ author: 'Julien B.', date: 'Nov 13, 2026', rating: 5, title: 'Proper lamination', text: 'You can hear the shatter when you bite in. Three days of lamination is not a marketing line — you can taste the patience.' },
		{ author: 'Emma W.', date: 'Oct 28, 2026', rating: 5, title: 'My morning ritual', text: 'Still warm at 8 AM, with coffee, at the little table by the window. This is my favourite twenty minutes of the day.' },
		{ author: 'Raj M.', date: 'Oct 8, 2026', rating: 4, title: 'Buttery and flaky', text: 'Excellent croissant. They sell out fast on weekends, so go early or order ahead.' }
	],
	'macaron-box': [
		{ author: 'Yuki T.', date: 'Nov 7, 2026', rating: 5, title: 'The easiest impressive gift', text: 'The pistachio ones are unreal — crisp shell, chewy middle, proper ganache. The gift box makes it feel like a luxury present.' },
		{ author: 'Olivia S.', date: 'Oct 24, 2026', rating: 5, title: 'Pretty and delicious', text: 'Pastel colours, delicate flavours, and naturally gluten-free which my sister appreciated. The raspberry is my favourite.' },
		{ author: 'Noah F.', date: 'Oct 11, 2026', rating: 4, title: 'A little sweet, very good', text: 'Beautiful box and lovely textures. I would happily pay a little more for a salted caramel flavour in the mix.' }
	],
	'carrot-cake': [
		{ author: 'Helen R.', date: 'Nov 6, 2026', rating: 5, title: 'The vegetables count', text: 'Moist, spiced, proper walnuts and cream cheese frosting that is not too sweet. My grandmother’s recipe would approve.' },
		{ author: 'Peter G.', date: 'Oct 20, 2026', rating: 5, title: 'Birthday favourite', text: 'Ordered for my wife’s birthday after years of chocolate cakes — she says this is the new house favourite. The cinnamon is just right.' },
		{ author: 'Dana L.', date: 'Oct 6, 2026', rating: 4, title: 'Warm and homely', text: 'Lovely spiced sponge. I asked for extra walnuts on top next time and they happily did it.' }
	],
	tiramisu: [
		{ author: 'Giulia C.', date: 'Nov 5, 2026', rating: 5, title: 'Proper tiramisu', text: 'As an Italian, I am fussy about tiramisu. The espresso is strong, the mascarpone is gentle, and the cocoa dusting is generous. Bravo.' },
		{ author: 'Mark S.', date: 'Oct 23, 2026', rating: 5, title: 'Dinner party win', text: 'Served chilled with a spoon and no plans to share — the family size fed six and everyone wanted the recipe.' },
		{ author: 'Aisha B.', date: 'Oct 14, 2026', rating: 4, title: 'Creamy and coffee-rich', text: 'Delicious and well balanced. A little more cocoa on top would be my only note.' }
	]
};

// ─── Allergen page data ──────────────────────────────────────────────────────
export const allergenClaims = [
	{ level: 'Contains', meaning: 'The ingredient is in the recipe. It is listed on the product page and on the label.' },
	{ level: 'Made without', meaning: 'The recipe omits the ingredient, but the kitchen still handles it. Traces are possible — ask us first.' },
	{ level: 'Free from', meaning: 'Made with separate ingredients, equipment and process, meeting the legal definition (for gluten-free: under 20 ppm).' },
	{ level: 'Certified', meaning: 'Verified by an outside body. We currently hold no certified allergen-free lines.' }
];

export const allergenList = [
	{ name: 'Wheat (gluten)', note: 'In most cakes, breads and pastries. Gluten-free macarons and selected bakes available to order.' },
	{ name: 'Egg', note: 'In cakes, tarts and glazes. Eggless versions of most celebration cakes available with 48 hours’ notice.' },
	{ name: 'Milk', note: 'Butter, cream and milk in most bakes. Vegan chocolate cake baked to order.' },
	{ name: 'Tree nuts', note: 'Almond (macarons), walnut (carrot cake), pistachio (macarons). Never in our standard sponge unless listed.' },
	{ name: 'Peanuts', note: 'Not used in any standard recipe. Peanut butter bakes are seasonal only and clearly labelled.' },
	{ name: 'Soy', note: 'In some chocolate and margarine-based bakes. Ask for the soy-free list in store.' },
	{ name: 'Sesame', note: 'On some breads and rolls only. All other bakes are sesame-free.' },
	{ name: 'Fish, shellfish, mustard, celery, lupin, sulphites', note: 'Not used in any SweetCrust recipe.' }
];

// ─── Wedding cakes + tastings ────────────────────────────────────────────────
export const weddingTiers = [
	{ tiers: 'Two tiers', serves: 'Serves 30–40', from: 180, note: 'Small weddings & intimate receptions' },
	{ tiers: 'Three tiers', serves: 'Serves 50–70', from: 320, note: 'Our most popular wedding size' },
	{ tiers: 'Four tiers', serves: 'Serves 90–120', from: 480, note: 'Grand celebrations' },
	{ tiers: 'Five tiers +', serves: 'Serves 150+', from: 650, note: 'Quoted individually' }
];

export const weddingFlavours = ['Vanilla Bean', 'Chocolate Truffle', 'Red Velvet', 'Strawberry Shortcake', 'Lemon & Elderflower', 'Carrot & Walnut'];

export const tastingSessions = [
	{ date: 'Saturday, Nov 22, 2026', time: '10:00 AM', spots: 3 },
	{ date: 'Saturday, Nov 22, 2026', time: '12:00 PM', spots: 2 },
	{ date: 'Saturday, Nov 29, 2026', time: '10:00 AM', spots: 4 },
	{ date: 'Saturday, Nov 29, 2026', time: '12:00 PM', spots: 1 },
	{ date: 'Saturday, Dec 6, 2026', time: '10:00 AM', spots: 5 },
	{ date: 'Saturday, Dec 6, 2026', time: '2:00 PM', spots: 4 }
];

export const tastingFeeNote = 'Tastings are $80 per couple for six flavours — fully deductible from any wedding cake order over $600.';

// ─── Gift cards, catering, subscriptions, loyalty, seasonal, cafe, wholesale, careers ──
export const giftCardDenominations = [25, 50, 100, 150];

export const cateringTrays = [
	{ name: 'Pastry Breakfast Tray', feeds: 'Feeds 10–12', price: 58, detail: 'Croissants, cinnamon rolls and muffins, butter & jam on the side.' },
	{ name: 'Mini Cake & Tart Platter', feeds: 'Feeds 15–20', price: 85, detail: 'Lemon tarts, macarons, mini cheesecakes and brownie bites.' },
	{ name: 'Celebration Cake + Cupcakes', feeds: 'Feeds 20–25', price: 120, detail: 'One 8" celebration cake plus a box of 12 cupcakes in your flavours.' },
	{ name: 'Office Coffee Break Box', feeds: 'Feeds 8–10', price: 46, detail: 'Cookies, brownies and macarons — the meeting-friendly box.' }
];

export const subscriptionPlans = [
	{ name: 'Weekly Bread Box', price: 24, per: 'per week', detail: 'A sourdough or country loaf, a pack of croissants and a surprise bake, every Friday.' },
	{ name: 'Monthly Treat Box', price: 39, per: 'per month', detail: 'A rotating box of 12 seasonal treats — macarons, tarts, cookies and a mini cake.' },
	{ name: 'Weekend Brunch Box', price: 32, per: 'per week', detail: 'Cinnamon rolls, croissants and jam for slow Saturday mornings. Skip or pause any week.' }
];

export const loyaltyRewards = [
	{ stamps: 4, reward: 'Free coffee with any pastry' },
	{ stamps: 8, reward: 'Free pastry of your choice' },
	{ stamps: 12, reward: 'Free box of 6 cupcakes' },
	{ stamps: 16, reward: 'Free 6" celebration cake' }
];

export const seasonalCollections = [
	{
		id: 'christmas',
		name: 'Christmas Collection',
		deadline: 'Order by Dec 18 for pickup Dec 23–24',
		image: 'seasonal-christmas',
		imageAlt: 'Festive Christmas cake with red berries, pine sprigs and gold stars',
		items: [
			{ name: 'Christmas Fruit Cake', price: 34, detail: 'Spiced, brandy-soaked, marzipan-topped.' },
			{ name: 'Yule Log (Bûche de Noël)', price: 38, detail: 'Chocolate sponge, ganache bark, meringue mushrooms.' },
			{ name: 'Gingerbread House Kit', price: 28, detail: 'Bake-and-build kit with icing and sweets.' }
		]
	},
	{
		id: 'valentines',
		name: 'Valentine’s Collection',
		deadline: 'Order by Feb 10 for pickup Feb 13–14',
		image: 'seasonal-valentines',
		imageAlt: 'Romantic Valentine’s Day cake with pink frosting, fresh roses and heart chocolates',
		items: [
			{ name: 'Rose & Raspberry Cake', price: 32, detail: 'Pink buttercream, fresh roses, raspberry centre.' },
			{ name: 'Heart-Shaped Red Velvet', price: 30, detail: 'Our red velvet, shaped for two (or one).' },
			{ name: 'Chocolate Truffle Hearts', price: 18, detail: 'Box of 6 hand-rolled truffles.' }
		]
	}
];

export const cafeMenu = [
	{ section: 'Coffee & Drinks', items: [
		{ name: 'Espresso', price: 3.5, detail: 'Double shot, single-origin beans.' },
		{ name: 'Cappuccino', price: 4.5, detail: 'Velvety milk, cocoa dusting.' },
		{ name: 'Flat White', price: 4.5, detail: 'Silky microfoam, strong and smooth.' },
		{ name: 'Hot Chocolate', price: 5, detail: 'Made with our own ganache — properly rich.' },
		{ name: 'Fresh Lemonade', price: 4, detail: 'Squeezed daily, lightly sweetened.' }
	] },
	{ section: 'From the Counter', items: [
		{ name: 'Butter Croissant', price: 6, detail: 'Laminated over three days. Still warm at 8 AM.' },
		{ name: 'Cinnamon Roll', price: 7, detail: 'Glazed while warm, cream cheese on top.' },
		{ name: 'Almond Croissant', price: 7.5, detail: 'Twice-baked with frangipane and flaked almonds.' },
		{ name: 'Lemon Tart (slice)', price: 6.5, detail: 'Sharp curd, torched meringue.' },
		{ name: 'Sourdough Toast', price: 8, detail: 'With butter and jam, or avocado and sea salt.' }
	] },
	{ section: 'Fridays Only', items: [
		{ name: 'Sourdough Loaf', price: 9, detail: 'Baked Fridays, sold until it runs out.' },
		{ name: 'Cardamom Buns', price: 6, detail: 'Swedish-style, pearl sugar on top.' }
	] }
];

export const wholesaleInfo = {
	minimums: 'Minimum order $150 per delivery. Two deliveries a week: Tuesdays and Fridays.',
	days: 'Delivery days: Tuesday & Friday, 7–10 AM. Pickup any weekday from 8 AM.',
	products: ['Croissants & pastries', 'Sourdough & sandwich loaves', 'Cakes by the slice', 'Cookies & brownies']
};

export const careers = [
	{ role: 'Pastry Chef (full-time)', detail: 'Two years’ experience, early mornings, real butter. You will run the morning bake.' },
	{ role: 'Cake Decorator (part-time)', detail: 'Buttercream, piping and fondant work for custom and wedding cakes. Weekends included.' },
	{ role: 'Front of House — Weekends', detail: 'Counter service, coffee, and telling people the cinnamon rolls are worth it. They are.' },
	{ role: 'Delivery Driver (part-time)', detail: 'Tuesday–Saturday, careful hands and a clean licence. Cakes travel like royalty.' }
];

export type SiteReview = { author: string; source: string; date: string; rating: number; text: string; reply?: string };

export const siteReviews: SiteReview[] = [
	{ author: 'Priya Mehta', source: 'Google', date: 'Nov 2026', rating: 5, text: 'The cake was not only beautiful but absolutely delicious! SweetCrust made my birthday extra special. Highly recommended!', reply: 'Thank you, Priya — it was a joy to bake for you. Happy birthday again!' },
	{ author: 'Daniel Carter', source: 'Google', date: 'Nov 2026', rating: 5, text: 'I ordered a custom wedding cake and it was beyond perfect — three tiers of vanilla bean and strawberry, and guests are still talking about it.', reply: 'Congratulations, Daniel! Three tiers of vanilla bean is a house favourite — thank you for trusting us.' },
	{ author: 'Sofia Ramirez', source: 'Google', date: 'Oct 2026', rating: 5, text: 'The cinnamon rolls are dangerous. I came in for one croissant and left with a tray of twelve. Zero regrets.', reply: 'We take full responsibility, Sofia. The tray of twelve is the correct life choice.' },
	{ author: 'James Okafor', source: 'Yelp', date: 'Oct 2026', rating: 5, text: 'Best croissant in the neighbourhood, and the coffee is proper too. The staff remember your order by the second visit.', reply: 'Thank you, James — the usual is already on the counter when you walk in.' },
	{ author: 'Hannah Lee', source: 'Google', date: 'Sep 2026', rating: 4, text: 'Lovely bakery, beautiful cakes, and the eggless vanilla cake was a hit with my family. It gets busy on Saturday mornings, so order ahead.', reply: 'Thank you, Hannah — Saturday mornings are our busiest, and pre-orders always skip the queue.' },
	{ author: 'Marco Silva', source: 'On-site', date: 'Sep 2026', rating: 5, text: 'Ordered the catering tray for an office lunch — the pastry tray disappeared in twenty minutes and the cake platter got a round of applause.', reply: 'Thank you, Marco — office catering is our favourite kind of chaos. See you next month!' }
];

// ─── Custom-cake page data ───────────────────────────────────────────────────
export const customCakeSizes = [
	{ size: '6" — Serves 6', from: 45 },
	{ size: '8" — Serves 10', from: 58 },
	{ size: '10" — Serves 16', from: 75 },
	{ size: 'Two-tier — Serves 30', from: 140 },
	{ size: 'Three-tier — Serves 50', from: 210 }
];

export const customCakeFlavours = ['Chocolate Truffle', 'Red Velvet', 'Vanilla Bean', 'Strawberry Shortcake', 'Blueberry Cheesecake', 'Carrot Cake', 'Lemon'];

export const customCakeFillings = ['Chocolate ganache', 'Salted caramel', 'Fresh berries', 'Cream cheese', 'Lemon curd', 'Nutella-style hazelnut'];
