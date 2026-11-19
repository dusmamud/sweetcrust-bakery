<script lang="ts">
	import { ArrowLeft, Clock } from '@lucide/svelte';
	import Picture from '#lib/components/Picture.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	const post = $derived(data.post);
	const others = $derived(data.others);
</script>

<svelte:head>
	<title>{post.title} — SweetCrust Bakery &amp; Cafe</title>
	<meta name="description" content={post.excerpt} />
</svelte:head>

<article class="mx-auto max-w-3xl px-4 py-10 sm:px-6">
	<a href="/blog" class="inline-flex min-h-12 items-center gap-2 text-sm font-bold text-choco uppercase">
		<ArrowLeft size={16} aria-hidden="true" /> Back to blog
	</a>
	<p class="mt-6 text-xs font-bold tracking-wider text-caramel uppercase">
		{post.category} · {post.date} · <Clock size={13} class="inline" aria-hidden="true" /> {post.readMinutes} min read
	</p>
	<h1 class="mt-3 font-display text-4xl leading-tight font-semibold text-choco">{post.title}</h1>
	<p class="mt-4 text-lg leading-relaxed text-muted">{post.excerpt}</p>
	<div class="mt-8 overflow-hidden rounded-3xl ring-1 ring-line">
		<Picture name={post.image} alt={post.imageAlt} width={1200} height={800} eager sizes="100vw" imgClass="aspect-[3/2] w-full object-cover" />
	</div>
	<div class="mt-8 space-y-5 text-lg leading-relaxed text-ink/90">
		{#each post.body as para}
			<p>{para}</p>
		{/each}
	</div>
	<p class="mt-10 rounded-2xl bg-cream-deep p-6 font-script text-3xl text-choco ring-1 ring-line">Baked with Love Always ♡</p>
</article>

{#if others.length > 0}
	<section class="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
		<h2 class="font-display text-3xl font-semibold text-choco">More sweet reads</h2>
		<div class="mt-6 grid gap-5 sm:grid-cols-3">
			{#each others as o}
				<a href="/blog/{o.slug}" class="group overflow-hidden rounded-2xl bg-white ring-1 ring-line transition-shadow duration-200 hover:shadow-[0_8px_30px_rgba(74,44,26,0.10)]">
					<Picture name={o.image} alt={o.imageAlt} width={800} height={533} sizes="(min-width: 640px) 33vw, 100vw" imgClass="aspect-[3/2] w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]" />
					<span class="block p-4 font-display text-lg leading-snug font-semibold text-choco">{o.title}</span>
				</a>
			{/each}
		</div>
	</section>
{/if}
