<script lang="ts">
	import Sidebar from "$lib/components/Sidebar.svelte";
	import SkinCard from "$lib/components/SkinCard.svelte";
	import type { Category, Tier, TankClass, Nation, SkinData } from "$lib/types";

	let { data } = $props();

	// svelte-ignore state_referenced_locally
	const { initialFilters, skins: initialSkins } = data;

	let search = $state(initialFilters.search);
	let categories = $state(new Set<Category>(initialFilters.categories));
	let tiers = $state(new Set<Tier>(initialFilters.tiers));
	let classes = $state(new Set<TankClass>(initialFilters.classes));
	let nations = $state(new Set<Nation>(initialFilters.nations));
	let skins: SkinData[] = $state(initialSkins);

	let mounted = false;
	let abortController: AbortController | null = null;
	let debounceTimer: ReturnType<typeof setTimeout> | null = null;

	function buildQueryString(): string {
		const params = new URLSearchParams();
		if (search.trim()) params.set("search", search.trim());
		if (categories.size > 0) params.set("categories", [...categories].join(","));
		if (tiers.size > 0) params.set("tiers", [...tiers].join(","));
		if (classes.size > 0) params.set("classes", [...classes].join(","));
		if (nations.size > 0) params.set("nations", [...nations].join(","));
		return params.toString();
	}

	async function fetchFiltered() {
		if (!mounted) return;

		abortController?.abort();
		abortController = new AbortController();

		const qs = buildQueryString();
		const url = qs ? `/?${qs}` : "/";
		history.replaceState(history.state, "", url);

		try {
			const res = await fetch(`/api/skins${qs ? `?${qs}` : ""}`, {
				signal: abortController.signal,
			});
			if (res.ok) {
				skins = await res.json();
			}
		} catch (e) {
			if (e instanceof DOMException && e.name === "AbortError") return;
			throw e;
		}
	}

	function fetchFilteredDebounced() {
		if (debounceTimer) clearTimeout(debounceTimer);
		debounceTimer = setTimeout(fetchFiltered, 300);
	}

	function toggleCategory(value: Category) {
		const next = new Set(categories);
		next.has(value) ? next.delete(value) : next.add(value);
		categories = next;
		fetchFiltered();
	}

	function toggleTier(value: Tier) {
		const next = new Set(tiers);
		next.has(value) ? next.delete(value) : next.add(value);
		tiers = next;
		fetchFiltered();
	}

	function toggleClass(value: TankClass) {
		const next = new Set(classes);
		next.has(value) ? next.delete(value) : next.add(value);
		classes = next;
		fetchFiltered();
	}

	function toggleNation(value: Nation) {
		const next = new Set(nations);
		next.has(value) ? next.delete(value) : next.add(value);
		nations = next;
		fetchFiltered();
	}

	$effect(() => {
		// Track search reactively for debounced fetch
		search;
		fetchFilteredDebounced();
	});

	$effect(() => {
		mounted = true;
		return () => {
			mounted = false;
		};
	});
</script>

<div class="flex max-lg:flex-col">
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
	<main class="flex flex-wrap justify-between">
		{#each skins as skin (skin.slug)}
			<SkinCard {skin} />
		{/each}
	</main>
</div>
