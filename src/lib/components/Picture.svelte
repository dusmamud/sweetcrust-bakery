<script lang="ts">
	// Reusable image component — AVIF → WebP → JPG → original PNG fallback.
	// Native <picture> selection is instant (no JS): the browser takes the
	// first <source> type it supports and never downloads the rest.
	// Files live under static/images/<name>/-<width>.<ext>
	// Widths: 480 / 800 / 1200 / 1600. <img> carries alt + dimensions + loading.
	let {
		name,
		alt,
		width,
		height,
		sizes = '100vw',
		eager = false,
		imgClass = '',
		pictureClass = ''
	}: {
		name: string;
		alt: string;
		width: number;
		height: number;
		sizes?: string;
		eager?: boolean;
		imgClass?: string;
		pictureClass?: string;
	} = $props();

	const widths = [480, 800, 1200, 1600];
	const avifSrcset = $derived(widths.map((w) => `/images/${name}-${w}.avif ${w}w`).join(', '));
	const webpSrcset = $derived(widths.map((w) => `/images/${name}-${w}.webp ${w}w`).join(', '));
	const jpgSrcset = $derived(widths.map((w) => `/images/${name}-${w}.jpg ${w}w`).join(', '));
	const fallbackSrc = $derived(`/images/${name}-800.jpg`);
</script>

<picture class={pictureClass}>
	<source type="image/avif" srcset={avifSrcset} {sizes} />
	<source type="image/webp" srcset={webpSrcset} {sizes} />
	<img
		src={fallbackSrc}
		srcset={jpgSrcset}
		{sizes}
		{alt}
		{width}
		{height}
		loading={eager ? 'eager' : 'lazy'}
		fetchpriority={eager ? 'high' : 'auto'}
		decoding="async"
		class={imgClass}
	/>
</picture>
