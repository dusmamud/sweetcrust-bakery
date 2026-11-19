<script lang="ts">
	import { allergenClaims, allergenList, products, productExtras, sharedKitchenCaveat } from '#lib/data/site.ts';
	import PageHero from '#lib/components/PageHero.svelte';

	const matrixAllergens = ['Wheat (gluten)', 'Egg', 'Milk', 'Tree nuts', 'Peanuts', 'Soy', 'Sesame'];
	const hasAllergen = (slug: string, a: string) =>
		(productExtras[slug]?.allergens ?? []).some((x) => x.toLowerCase().includes(a.split(' ')[0].toLowerCase()));
</script>

<svelte:head>
	<title>Allergen &amp; Dietary Information — SweetCrust Bakery &amp; Cafe</title>
	<meta name="description" content="Allergen guide for SweetCrust Bakery — what contains, made without, free from and certified mean, our shared-kitchen caveat, and the allergen matrix for every product." />
</svelte:head>

<PageHero title="Allergens &amp; Dietary" eyebrow="Safety first, cake second" intro="Every product page carries the same allergen information as its physical label. If you are unsure about anything, ask us before you order — we would rather say no than guess." />

<section class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
	<div class="rounded-3xl bg-white p-6 ring-1 ring-line sm:p-8">
		<h2 class="font-display text-3xl font-semibold text-choco">What our words mean</h2>
		<p class="mt-3 max-w-3xl leading-relaxed text-muted">“Nut-free” when we mean “made without nuts” in a shared kitchen can put a customer in hospital. So we use a claim ladder — and we use it the same way, everywhere.</p>
		<div class="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
			{#each allergenClaims as c}
				<div class="rounded-2xl bg-cream-deep p-5 ring-1 ring-line">
					<h3 class="font-display text-xl font-semibold text-choco">{c.level}</h3>
					<p class="mt-2 text-sm leading-relaxed text-muted">{c.meaning}</p>
				</div>
			{/each}
		</div>
		<p class="mt-6 rounded-2xl bg-blush p-4 text-sm leading-relaxed text-ink ring-1 ring-line"><strong>Shared-kitchen caveat:</strong> {sharedKitchenCaveat}</p>
	</div>

	<div class="mt-10">
		<h2 class="font-display text-3xl font-semibold text-choco">Allergens we handle</h2>
		<div class="mt-5 grid gap-4 sm:grid-cols-2">
			{#each allergenList as a}
				<div class="rounded-2xl bg-white p-5 ring-1 ring-line">
					<h3 class="font-bold text-ink">{a.name}</h3>
					<p class="mt-1 text-sm leading-relaxed text-muted">{a.note}</p>
				</div>
			{/each}
		</div>
	</div>

	<div class="mt-10">
		<h2 class="font-display text-3xl font-semibold text-choco">Allergen matrix — every product</h2>
		<p class="mt-2 text-sm text-muted">✓ = contains · — = not in the recipe (shared kitchen — traces possible). Always check the product page and the label on the day.</p>
		<div class="mt-5 overflow-x-auto rounded-3xl ring-1 ring-line">
			<table class="w-full min-w-[640px] bg-white text-left text-sm">
				<thead>
					<tr class="bg-cream-deep text-choco">
						<th scope="col" class="px-4 py-3 font-bold">Product</th>
						{#each matrixAllergens as a}<th scope="col" class="px-3 py-3 text-center font-bold">{a}</th>{/each}
					</tr>
				</thead>
				<tbody>
					{#each products as p}
						<tr class="border-t border-line">
							<th scope="row" class="px-4 py-3 font-semibold text-ink"><a href="/product/{p.slug}" class="hover:underline">{p.name}</a></th>
							{#each matrixAllergens as a}
								<td class="px-3 py-3 text-center {hasAllergen(p.slug, a) ? 'font-bold text-choco' : 'text-muted'}">{hasAllergen(p.slug, a) ? '✓' : '—'}</td>
							{/each}
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>

	<div class="mt-10 rounded-3xl bg-cream-deep p-6 ring-1 ring-line sm:p-8">
		<h2 class="font-display text-2xl font-semibold text-choco">Dietary options</h2>
		<p class="mt-3 leading-relaxed text-muted">Eggless versions of most celebration cakes (48 hours’ notice), naturally gluten-free macarons, and a vegan chocolate cake baked to order. Use the dietary filters on the <a href="/shop" class="font-bold text-choco hover:underline">shop page</a> — eggless, gluten-free and vegan — and tell us your needs in the order notes. We confirm what is possible before we bake.</p>
	</div>
</section>
