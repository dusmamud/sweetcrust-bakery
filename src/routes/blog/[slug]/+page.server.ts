import { error } from '@sveltejs/kit';
import { blogPosts } from '#lib/data/site.ts';
import type { PageServerLoad } from './$types';

export const prerender = true;

export function entries() {
	return blogPosts.map((b) => ({ slug: b.slug }));
}

export const load: PageServerLoad = ({ params }) => {
	const post = blogPosts.find((b) => b.slug === params.slug);
	if (!post) error(404, 'That post does not exist');
	const others = blogPosts.filter((b) => b.slug !== post.slug).slice(0, 3);
	return { post, others };
};
