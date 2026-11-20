<script lang="ts">
	// Press & media (mock). Founder story, coverage, press-kit note, contact.
	import { Mail, Newspaper } from '@lucide/svelte';
	import { pressItems, site } from '#lib/data/site.ts';
	import PageHero from '#lib/components/PageHero.svelte';
	import Picture from '#lib/components/Picture.svelte';
</script>

<svelte:head>
	<title>Press &amp; Media — SweetCrust Bakery &amp; Cafe</title>
	<meta name="description" content="SweetCrust Bakery press page — our story, press coverage, photos and how to reach us for media enquiries." />
</svelte:head>

<PageHero title="Press &amp; Media" eyebrow="Our story, in print" intro="A neighbourhood bakery, a slow way of baking, and a lot of butter. Everything a journalist — or a curious reader — needs is on this page." />

<section class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
	<div class="grid gap-10 lg:grid-cols-5">
		<div class="space-y-6 lg:col-span-3">
			<div class="overflow-hidden rounded-3xl ring-1 ring-line">
				<Picture name="press-bakery" alt="Inside the SweetCrust bakery at dawn, with the founder shaping croissants" width={1200} height={800} eager sizes="(min-width: 1024px) 60vw, 100vw" imgClass="aspect-[3/2] w-full object-cover" />
			</div>
			<article class="rounded-3xl bg-white p-6 ring-1 ring-line sm:p-8">
				<h2 class="font-display text-3xl font-semibold text-choco">The story so far</h2>
				<p class="mt-4 leading-relaxed text-muted">
					SweetCrust started in 2019 with one oven, a second-hand mixer and a stubborn idea: that a neighbourhood bakery
					should bake everything from scratch, every morning, with real butter — even when it costs more and takes longer.
				</p>
				<p class="mt-3 leading-relaxed text-muted">
					Seven years later the oven is bigger and the queue is longer, but the idea has not changed. We still laminate our
					croissants over three days, still frost cakes to order, and still close on Sundays so the ovens — and the bakers —
					can rest.
				</p>
				<p class="mt-3 leading-relaxed text-muted">
					Today SweetCrust bakes for birthdays, weddings, offices and ordinary Tuesdays across New York City, from our
					bakery at 123 Baker Street.
				</p>
			</article>
			<div class="rounded-3xl bg-white p-6 ring-1 ring-line sm:p-8">
				<h2 class="font-display text-2xl font-semibold text-choco">Facts at a glance</h2>
				<ul class="mt-4 grid gap-3 text-sm sm:grid-cols-2">
					{#each [['Founded', '2019, New York City'], ['Bakery', '123 Baker Street, NY 10001'], ['Open', 'Mon – Sat, 8:00 AM – 8:00 PM'], ['Team', '14 bakers, decorators & counter staff'], ['Bakes daily', 'Cakes, cupcakes, pastries, bread & cookies'], ['Signature', 'Chocolate Truffle Cake · Butter Croissant']] as [k, v]}
						<li class="rounded-2xl bg-cream-deep px-4 py-3 ring-1 ring-line"><span class="block text-xs font-bold tracking-wider text-muted uppercase">{k}</span><span class="mt-0.5 block font-semibold text-ink">{v}</span></li>
					{/each}
				</ul>
			</div>
		</div>

		<div class="space-y-6 lg:col-span-2">
			<div class="rounded-3xl bg-white p-6 ring-1 ring-line sm:p-8">
				<h2 class="flex items-center gap-2 font-display text-2xl font-semibold text-choco"><Newspaper size={22} aria-hidden="true" class="text-caramel" /> Coverage</h2>
				<ul class="mt-5 space-y-5">
					{#each pressItems as item}
						<li class="border-b border-line/60 pb-5 last:border-0 last:pb-0">
							<p class="text-xs font-bold tracking-wider text-muted uppercase">{item.outlet} · {item.date}</p>
							<p class="mt-1.5 leading-relaxed text-ink">{item.title}</p>
						</li>
					{/each}
				</ul>
			</div>
			<div class="rounded-3xl bg-white p-6 ring-1 ring-line sm:p-8">
				<h2 class="font-display text-2xl font-semibold text-choco">Press kit</h2>
				<p class="mt-3 text-sm leading-relaxed text-muted">
					Hi-res photos of the bakery and our bakes, our logo in light and dark, and a one-page fact sheet — email us and
					we will send the pack within one working day.
				</p>
				<p class="mt-4 flex items-center gap-2 text-sm">
					<Mail size={17} aria-hidden="true" class="shrink-0 text-caramel" />
					<a href="mailto:{site.email}" class="font-bold break-all text-choco">{site.email}</a>
				</p>
				<p class="mt-3 text-sm text-muted">Subject: “Press kit — SweetCrust”</p>
			</div>
		</div>
	</div>
</section>
