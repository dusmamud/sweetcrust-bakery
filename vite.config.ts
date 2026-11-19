import adapter from '@sveltejs/adapter-static';
import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit({
			adapter: adapter({ pages: 'build', assets: 'build', fallback: undefined, precompress: false, strict: true }),
			preprocess: vitePreprocess()
		})
	]
});
