<script lang="ts">
	// Mock express-pay buttons (Apple Pay / Google Pay). Demo only: no real
	// wallet, no real payment — the button completes the existing mock order
	// flow via the onExpress callback the parent provides.
	import { usd } from '#lib/data/site.ts';

	let {
		amount,
		label = 'Express checkout',
		onExpress
	}: {
		amount: number;
		label?: string;
		onExpress: (method: 'Apple Pay' | 'Google Pay') => void;
	} = $props();
</script>

<div>
	<p class="text-center text-xs font-bold tracking-wider text-muted uppercase">{label} — demo only, no payment is taken</p>
	<div class="mt-2 grid gap-2 sm:grid-cols-2">
		<button
			type="button"
			onclick={() => onExpress('Apple Pay')}
			class="flex min-h-12 items-center justify-center gap-2 rounded-full bg-black px-5 text-sm font-bold text-white transition-transform duration-150 active:scale-[0.97]"
			aria-label="Pay with Apple Pay (demo) — {usd(amount)}"
		>
			<span aria-hidden="true" class="text-base"> Pay</span>
			<span>{usd(amount)}</span>
		</button>
		<button
			type="button"
			onclick={() => onExpress('Google Pay')}
			class="flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-5 text-sm font-bold text-ink ring-1 ring-line transition-transform duration-150 active:scale-[0.97]"
			aria-label="Pay with Google Pay (demo) — {usd(amount)}"
		>
			<span aria-hidden="true" class="flex items-center gap-0.5 text-base font-bold">
				<span class="text-[#4285F4]">G</span> Pay
			</span>
			<span>{usd(amount)}</span>
		</button>
	</div>
</div>
