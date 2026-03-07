<script lang="ts">
	import "../app.css";
	import Sidebar from "$lib/components/Sidebar.svelte";
	import { goto } from "$app/navigation";
	import { resolve } from "$app/paths";
	import { page } from "$app/state";
	import { SvelteSet, SvelteURLSearchParams } from "svelte/reactivity";
	import type { Category, Tier, TankClass, Nation } from "$lib/types";

	let { children } = $props();

	let search = $state(page.url.searchParams.get("search") ?? "");
	let categories = $state(new Set<Category>(
		(page.url.searchParams.get("categories")?.split(",").filter(Boolean) ?? []) as Category[],
	));
	let tiers = $state(new Set<Tier>(
		(page.url.searchParams.get("tiers")?.split(",").filter(Boolean).map(Number) ?? []) as Tier[],
	));
	let classes = $state(new Set<TankClass>(
		(page.url.searchParams.get("classes")?.split(",").filter(Boolean) ?? []) as TankClass[],
	));
	let nations = $state(new Set<Nation>(
		(page.url.searchParams.get("nations")?.split(",").filter(Boolean) ?? []) as Nation[],
	));

	function buildFilterQuery(): string {
		const params = new SvelteURLSearchParams();
		if (search.trim()) params.set("search", search.trim());
		if (categories.size > 0) params.set("categories", [...categories].join(","));
		if (tiers.size > 0) params.set("tiers", [...tiers].join(","));
		if (classes.size > 0) params.set("classes", [...classes].join(","));
		if (nations.size > 0) params.set("nations", [...nations].join(","));
		return params.toString();
	}

	function navigate() {
		const qs = buildFilterQuery();
		goto(resolve(qs ? `/?${qs}` : "/"), { keepFocus: true });
	}

	function toggle<T>(set: Set<T>, value: T): Set<T> {
		const next = new SvelteSet(set);
		if (next.has(value)) {
			next.delete(value);
		} else {
			next.add(value);
		}
		return next;
	}

	function toggleCategory(value: Category) {
		categories = toggle(categories, value);
		navigate();
	}

	function toggleTier(value: Tier) {
		tiers = toggle(tiers, value);
		navigate();
	}

	function toggleClass(value: TankClass) {
		classes = toggle(classes, value);
		navigate();
	}

	function toggleNation(value: Nation) {
		nations = toggle(nations, value);
		navigate();
	}

	$effect(() => {
		void search;
		const timer = setTimeout(navigate, 300);
		return () => clearTimeout(timer);
	});
</script>

<svelte:head>
	<link rel="icon" href="/icons/search.svg" />

	<!-- OG / Discord -->
	<meta property="og:site_name" content="chems" />
	<meta name="twitter:site" content="chems" />
	<meta content="#2F3136" name="theme-color" />
	<meta property="og:type" content="website" />

	<!-- Ads -->
	<meta name="google-adsense-account" content="ca-pub-5365509455453456" />
	<script
		async
		src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5365509455453456"
		crossorigin="anonymous"
	></script>

	<title>chems</title>
	<meta property="og:title" content="chems" />
	<meta name="twitter:title" content="chems" />
</svelte:head>

<div class="flex w-full gap-[1em] p-[1em] max-lg:flex-col">
	<Sidebar
		bind:search
		{categories}
		{tiers}
		{classes}
		{nations}
		ontogglecategory={toggleCategory}
		ontoggletier={toggleTier}
		ontoggleclass={toggleClass}
		ontogglenation={toggleNation}
	/>
	<main class="min-h-screen flex-1">
		{@render children()}
	</main>
</div>
