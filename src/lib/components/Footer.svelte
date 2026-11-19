<script lang="ts">
	import { Clock, Mail, MapPin, Phone } from '@lucide/svelte';
	import { site } from '#lib/data/site.ts';
	import Logo from './Logo.svelte';
	import BrandIcon from './BrandIcon.svelte';
</script>

<footer class="bg-choco-deep text-white/85">
	<div class="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-5 lg:px-8">
		<div>
			<a href="/" aria-label="SweetCrust Bakery & Cafe — home"><Logo light /></a>
			<p class="mt-4 max-w-xs text-sm leading-relaxed text-white/70">
				Baking a Sweeter World, One Bite at a Time.
			</p>
			<div class="mt-5 flex gap-2">
				<a href={site.facebook} target="_blank" rel="noopener" aria-label="SweetCrust on Facebook" class="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 transition-colors duration-150 hover:bg-white/20">
					<BrandIcon name="facebook" size={18} />
				</a>
				<a href={site.instagram} target="_blank" rel="noopener" aria-label="SweetCrust on Instagram" class="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 transition-colors duration-150 hover:bg-white/20">
					<BrandIcon name="instagram" size={18} />
				</a>
				<a href="https://www.youtube.com/" target="_blank" rel="noopener" aria-label="SweetCrust on YouTube" class="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 transition-colors duration-150 hover:bg-white/20">
					<BrandIcon name="youtube" size={18} />
				</a>
			</div>
		</div>

		<nav aria-label="Quick links">
			<h2 class="text-sm font-bold tracking-wider text-white uppercase">Quick Links</h2>
			<ul class="mt-4 space-y-1 text-sm">
				{#each [['Home', '/'], ['About Us', '/about'], ['Our Products', '/shop'], ['Custom Cakes', '/custom-cakes'], ['Wedding Cakes', '/wedding-cakes'], ['Gift Cards', '/gift-cards'], ['Blog', '/blog'], ['Contact Us', '/contact']] as [label, href]}
					<li><a href={href} class="inline-flex min-h-11 items-center transition-colors duration-150 hover:text-white">{label}</a></li>
				{/each}
			</ul>
		</nav>

		<nav aria-label="Explore">
			<h2 class="text-sm font-bold tracking-wider text-white uppercase">Explore</h2>
			<ul class="mt-4 space-y-1 text-sm">
				{#each [['Tastings', '/tastings'], ['Catering', '/catering'], ['Subscriptions', '/subscriptions'], ['Loyalty', '/loyalty'], ['Seasonal Pre-Orders', '/seasonal'], ['Cafe Menu', '/cafe-menu'], ['Reviews', '/reviews'], ['Visit Us', '/locations']] as [label, href]}
					<li><a href={href} class="inline-flex min-h-11 items-center transition-colors duration-150 hover:text-white">{label}</a></li>
				{/each}
			</ul>
		</nav>

		<nav aria-label="Customer support">
			<h2 class="text-sm font-bold tracking-wider text-white uppercase">Customer Support</h2>
			<ul class="mt-4 space-y-1 text-sm">
				{#each [['Track Order', '/track-order'], ['Delivery & Pickup', '/delivery'], ['Allergens & Dietary', '/allergens'], ['Shipping Policy', '/shipping'], ['Return & Refund', '/returns'], ['FAQs', '/faq'], ['Wholesale', '/wholesale'], ['Careers', '/careers'], ['Terms & Conditions', '/terms'], ['Privacy Policy', '/privacy']] as [label, href]}
					<li><a href={href} class="inline-flex min-h-11 items-center transition-colors duration-150 hover:text-white">{label}</a></li>
				{/each}
			</ul>
		</nav>

		<div>
			<h2 class="text-sm font-bold tracking-wider text-white uppercase">Contact Us</h2>
			<ul class="mt-4 space-y-3 text-sm">
				<li class="flex items-start gap-2.5"><MapPin size={17} class="mt-0.5 shrink-0 text-amber-100/80" aria-hidden="true" /><span>123 Baker Street,<br />New York, NY 10001</span></li>
				<li><a href={site.phoneHref} class="flex items-center gap-2.5 transition-colors duration-150 hover:text-white"><Phone size={17} class="shrink-0 text-amber-100/80" aria-hidden="true" />{site.phoneDisplay}</a></li>
				<li><a href="mailto:{site.email}" class="flex items-center gap-2.5 break-all transition-colors duration-150 hover:text-white"><Mail size={17} class="shrink-0 text-amber-100/80" aria-hidden="true" />{site.email}</a></li>
				<li class="flex items-center gap-2.5"><Clock size={17} class="shrink-0 text-amber-100/80" aria-hidden="true" />Mon – Sat: 8:00 AM – 8:00 PM</li>
			</ul>
			<p class="mt-6 font-script text-3xl text-amber-100">Happiness is Homemade ♡</p>
		</div>
	</div>
	<div class="border-t border-white/10">
		<div class="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-white/60 sm:flex-row sm:px-6 lg:px-8">
			<p>© 2024 SweetCrust Bakery. All Rights Reserved.</p>
			<p>Made with ♡ for sweet moments.</p>
		</div>
	</div>
</footer>
