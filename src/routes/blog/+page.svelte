<script lang="ts">
	import { ArrowRight, Clock } from '@lucide/svelte';
	import { blogPosts } from '#lib/data/site.ts';
	import PageHero from '#lib/components/PageHero.svelte';
	import Picture from '#lib/components/Picture.svelte';
</script>

<svelte:head>
	<title>Blog — SweetCrust Bakery &amp; Cafe</title>
	<meta name="description" content="Baking guides, behind-the-scenes mornings at the bakery, and cake decorating tips from the SweetCrust team." />
</svelte:head>

<PageHero title="From the Bakery Blog" eyebrow="Sweet reads" intro="Baking guides, behind-the-scenes mornings, and decorating tips — written by the people who flour the counters at 4 AM." />

<section class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
	<div class="grid gap-6 md:grid-cols-2">
		{#each blogPosts as post}
			<article class="group flex flex-col overflow-hidden rounded-3xl bg-white ring-1 ring-line transition-shadow duration-200 hover:shadow-[0_8px_30px_rgba(74,44,26,0.10)]">
				<a href="/blog/{post.slug}" class="block overflow-hidden bg-sand" aria-label={post.title}>
					<Picture
						name={post.image}
						alt={post.imageAlt}
						width={1200}
						height={800}
						sizes="(min-width: 768px) 50vw, 100vw"
						imgClass="aspect-[3/2] w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
					/>
				</a>
				<div class="flex flex-1 flex-col p-6 sm:p-7">
					<p class="flex items-center gap-3 text-xs font-bold tracking-wider text-caramel uppercase">
						{post.category} <span class="font-normal text-muted normal-case">· {post.date}</span>
						<span class="ml-auto flex items-center gap-1 font-normal text-muted normal-case"><Clock size={13} aria-hidden="true" /> {post.readMinutes} min read</span>
					</p>
					<a href="/blog/{post.slug}" class="mt-3 font-display text-2xl leading-snug font-semibold text-choco hover:underline">{post.title}</a>
					<p class="mt-2 flex-1 leading-relaxed text-muted">{post.excerpt}</p>
					<a href="/blog/{post.slug}" class="mt-5 inline-flex min-h-12 items-center gap-2 self-start text-sm font-bold text-choco uppercase">
						Read more <ArrowRight size={16} aria-hidden="true" />
					</a>
				</div>
			</article>
		{/each}
	</div>
</section>
