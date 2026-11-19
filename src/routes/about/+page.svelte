<script lang="ts">
	import { Cake, Heart, Leaf, Users } from '@lucide/svelte';

	const stats: [typeof Cake, string, string][] = [
		[Cake, '35+', 'Cake flavours baked weekly'],
		[Users, '12,000+', 'Happy customers and counting'],
		[Leaf, '100%', 'Fresh ingredients, every day'],
		[Heart, '2018', 'Baking with love since']
	];
	import PageHero from '#lib/components/PageHero.svelte';
	import Picture from '#lib/components/Picture.svelte';
</script>

<svelte:head>
	<title>About Us — SweetCrust Bakery &amp; Cafe</title>
	<meta name="description" content="At SweetCrust, we believe every bite tells a story. Meet the bakers behind New York's favourite neighbourhood bakery — real butter, small batches, and cakes made with love since 2018." />
</svelte:head>

<PageHero title="About SweetCrust" eyebrow="Our story" intro="At SweetCrust, we believe every bite tells a story. Our passion for baking goes beyond just ingredients — it’s about creating moments of joy, love, and togetherness." />

<section class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
	<div class="grid items-center gap-10 lg:grid-cols-2">
		<div class="overflow-hidden rounded-3xl ring-1 ring-line">
			<Picture
				name="about-baking"
				alt="Baking flat lay with flour, eggs, butter and a rolling pin"
				width={1200}
				height={800}
				eager
				sizes="(min-width: 1024px) 50vw, 100vw"
				imgClass="aspect-[3/2] w-full object-cover"
			/>
		</div>
		<div>
			<h2 class="font-display text-3xl font-semibold text-choco">From a small kitchen to Baker Street</h2>
			<p class="mt-4 leading-relaxed text-muted">
				SweetCrust began in 2018 in a tiny home kitchen, with one oven, a borrowed mixer and a belief that a
				neighbourhood deserves a bakery that knows its name. Today we bake on Baker Street, but the rules have
				not changed: real butter, small batches, and nothing out of the oven that we would not serve our own family.
			</p>
			<p class="mt-4 leading-relaxed text-muted">
				From classic recipes to modern delights, we bake happiness into everything we make — the birthday cake
				that becomes a family tradition, the cinnamon roll that starts a Sunday right, the croissant that makes
				a Tuesday feel like a holiday.
			</p>
			<p class="mt-4 font-script text-3xl text-caramel">Baked with Love Always ♡</p>
		</div>
	</div>

	<div class="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
		{#each stats as [Icon, num, label]}
			<div class="rounded-3xl bg-white p-6 text-center ring-1 ring-line">
				<span class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-choco-soft text-choco"><Icon size={22} aria-hidden="true" /></span>
				<p class="mt-4 font-display text-3xl font-semibold text-choco">{num}</p>
				<p class="mt-1 text-sm text-muted">{label}</p>
			</div>
		{/each}
	</div>

	<div class="mt-14 grid gap-10 lg:grid-cols-2">
		<div class="rounded-3xl bg-cream-deep p-8 ring-1 ring-line">
			<h2 class="font-display text-2xl font-semibold text-choco">What we believe</h2>
			<ul class="mt-4 space-y-3 leading-relaxed text-muted">
				<li><strong class="text-ink">Real ingredients, always.</strong> Butter, not shortening. Fresh fruit, not syrup. Vanilla bean, not essence.</li>
				<li><strong class="text-ink">Small batches.</strong> We bake through the morning so nothing sits around — and when we sell out, we sell out.</li>
				<li><strong class="text-ink">Every celebration matters.</strong> A first birthday and a fiftieth get the same care, the same phone call, the same hand-piped message.</li>
			</ul>
		</div>
		<div class="rounded-3xl bg-choco-deep p-8 text-white">
			<h2 class="font-display text-2xl font-semibold">Visit the bakery</h2>
			<p class="mt-4 leading-relaxed text-white/80">
				123 Baker Street, New York, NY 10001<br />
				Mon – Sat: 8:00 AM – 8:00 PM<br />
				Closed Sundays (the ovens rest, too).
			</p>
			<p class="mt-4 leading-relaxed text-white/80">
				Come for a coffee, stay for a cinnamon roll. The display case is fullest before 10 AM.
			</p>
			<a href="/contact" class="mt-6 inline-flex min-h-12 items-center rounded-full bg-white px-7 text-sm font-bold text-choco uppercase transition-colors duration-200 hover:bg-cream-deep">Get in touch</a>
		</div>
	</div>
</section>
