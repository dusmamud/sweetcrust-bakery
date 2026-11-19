<script lang="ts">
	import { Cake } from '@lucide/svelte';
	let { light = false }: { light?: boolean } = $props();
</script>

<span class="flex items-center gap-2.5" aria-hidden="true">
	<span
		class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full {light
			? 'bg-white/10 text-amber-100'
			: 'bg-choco text-amber-100'}"
	>
		<Cake size={24} />
	</span>
	<span class="leading-none">
		<span class="block font-display text-[1.4rem] font-semibold tracking-wide {light ? 'text-white' : 'text-choco'}"
			>SweetCrust</span
		>
		<span class="mt-0.5 block text-[0.6rem] font-semibold tracking-[0.38em] {light ? 'text-amber-100/80' : 'text-muted'}"
			>BAKERY &amp; CAFE</span
		>
	</span>
</span>
