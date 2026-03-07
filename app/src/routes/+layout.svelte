<script lang="ts">
	import "../app.css";
	import Sidebar from "$lib/components/Sidebar.svelte";
	import { goto } from "$app/navigation";
	import { page } from "$app/state";
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

	let debounceTimer: ReturnType<typeof setTimeout> | null = null;

	function buildFilterQuery(): string {
		const params = new URLSearchParams();
		if (search.trim()) params.set("search", search.trim());
		if (categories.size > 0) params.set("categories", [...categories].join(","));
		if (tiers.size > 0) params.set("tiers", [...tiers].join(","));
		if (classes.size > 0) params.set("classes", [...classes].join(","));
		if (nations.size > 0) params.set("nations", [...nations].join(","));
		return params.toString();
	}

	function navigate() {
		const qs = buildFilterQuery();
		goto(qs ? `/?${qs}` : "/", { keepFocus: true });
	}

	function navigateDebounced() {
		if (debounceTimer) clearTimeout(debounceTimer);
		debounceTimer = setTimeout(navigate, 300);
	}

	function toggleCategory(value: Category) {
		const next = new Set(categories);
		next.has(value) ? next.delete(value) : next.add(value);
		categories = next;
		navigate();
	}

	function toggleTier(value: Tier) {
		const next = new Set(tiers);
		next.has(value) ? next.delete(value) : next.add(value);
		tiers = next;
		navigate();
	}

	function toggleClass(value: TankClass) {
		const next = new Set(classes);
		next.has(value) ? next.delete(value) : next.add(value);
		classes = next;
		navigate();
	}

	function toggleNation(value: Nation) {
		const next = new Set(nations);
		next.has(value) ? next.delete(value) : next.add(value);
		nations = next;
		navigate();
	}

	$effect(() => {
		search;
		navigateDebounced();
	});
</script>

<svelte:head>
	<link rel="icon" href="/icons/search.svg" />

	<!-- OG / Discord -->
	<meta property="og:site_name" content="chems" />
	<meta name="twitter:site" content="chems" />
	<meta content="#2F3136" data-react-helmet="true" name="theme-color" />
	<meta property="og:type" content="website" />

	<!-- Fonts -->
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Roboto&family=Roboto+Mono&display=swap"
		rel="stylesheet"
	/>

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
