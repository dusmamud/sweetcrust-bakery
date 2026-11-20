<script lang="ts">
	import { Mail } from '@lucide/svelte';
	import { site } from '#lib/data/site.ts';
	import PageHero from '#lib/components/PageHero.svelte';
</script>

<svelte:head>
	<title>Accessibility Statement — SweetCrust Bakery &amp; Cafe</title>
	<meta name="description" content="SweetCrust Bakery's accessibility statement: our WCAG 2.2 AA commitment, what we have done, known limits, and how to report an issue." />
</svelte:head>

<PageHero
	title="Accessibility Statement"
	eyebrow="Baking for everyone"
	intro="Everyone should be able to order a cake. This page explains what we do to make sweetcrustbakery.com accessible, what we know still needs work, and how to reach us if something gets in your way."
/>

<section class="mx-auto max-w-3xl px-4 py-10 sm:px-6">
	<div class="space-y-5">
		<div class="rounded-3xl bg-white p-6 ring-1 ring-line sm:p-8">
			<h2 class="font-display text-2xl font-semibold text-choco">Our commitment</h2>
			<p class="mt-3 leading-relaxed text-muted">
				SweetCrust Bakery &amp; Cafe is committed to ensuring digital accessibility for people of all abilities. We aim to
				conform to the <strong class="text-ink">Web Content Accessibility Guidelines (WCAG) 2.2, Level AA</strong> — the
				standard now referenced by the European Accessibility Act (EAA, in force since 28 June 2025) and EN 301 549 v4.1.1.
				We are a small US bakery with no EU establishment; the EAA does not impose a legal duty on us, but we build to
				WCAG 2.2 AA anyway, because our customers — and their grandparents, and their screen readers — deserve it.
			</p>
		</div>

		<div class="rounded-3xl bg-white p-6 ring-1 ring-line sm:p-8">
			<h2 class="font-display text-2xl font-semibold text-choco">What we have done</h2>
			<ul class="mt-3 space-y-2 leading-relaxed text-muted">
				<li>· Text contrast of at least 4.5:1 for body text and 3:1 for large text and focus indicators.</li>
				<li>· Full keyboard support: every button, link, radio group, date picker and drawer works with Tab, Enter, Space and Escape.</li>
				<li>· A visible focus style on every interactive element, and a “Skip to main content” link.</li>
				<li>· Tap targets of at least 48 × 48 px on mobile, with spacing between them.</li>
				<li>· Real labels on every form field, autocomplete on name/email/address, and specific error messages linked to their fields.</li>
				<li>· Product options as real radio groups (not div swatches), and allergen information as real text and tables — never image-only.</li>
				<li>· Reduced-motion support: animations, smooth scrolling and page transitions are disabled when your system asks for it — checked in code, not just in CSS.</li>
				<li>· Content reflows at 320 px width and at 400% zoom without horizontal scrolling or lost content.</li>
				<li>· Alt text on every meaningful image; decorative images are hidden from screen readers.</li>
			</ul>
		</div>

		<div class="rounded-3xl bg-white p-6 ring-1 ring-line sm:p-8">
			<h2 class="font-display text-2xl font-semibold text-choco">Known limits</h2>
			<ul class="mt-3 space-y-2 leading-relaxed text-muted">
				<li>· Our Instagram photo grid uses decorative images from our feed; some older photos have shorter alt text than we would like.</li>
				<li>· The map on our Locations page is a static image with a text address — the address, hours and phone are always given in text alongside it.</li>
				<li>· Some third-party embeds (social links) are outside our control; the links themselves are labelled and keyboard-accessible.</li>
				<li>· We test with a keyboard, a screen reader and automated checks on every page type — but we are a bakery first, and we may miss things. Tell us.</li>
			</ul>
		</div>

		<div class="rounded-3xl bg-white p-6 ring-1 ring-line sm:p-8">
			<h2 class="font-display text-2xl font-semibold text-choco">Feedback &amp; contact</h2>
			<p class="mt-3 leading-relaxed text-muted">
				If you find a barrier on this site — or if you need an order in a different format — please tell us. We will
				acknowledge your message within two working days and aim to fix the issue within ten.
			</p>
			<p class="mt-4 flex flex-wrap items-center gap-2 text-sm">
				<Mail size={17} aria-hidden="true" class="text-caramel" />
				<a href="mailto:{site.email}" class="font-bold text-choco">{site.email}</a>
				<span class="text-muted">·</span>
				<a href={site.phoneHref} class="font-bold text-choco">{site.phoneDisplay}</a>
				<span class="text-muted">· Mon – Sat, 8:00 AM – 8:00 PM</span>
			</p>
			<p class="mt-4 text-sm text-muted">This statement was last reviewed in November 2026 and is updated whenever we rebuild a page.</p>
		</div>
	</div>
</section>
