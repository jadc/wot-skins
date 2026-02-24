<script lang="ts">
	import Sidebar from "$lib/components/Sidebar.svelte";
	import SkinCard from "$lib/components/SkinCard.svelte";
	import { filterSkins } from "$lib/filter";
	import type { Category, Tier, TankClass, Nation, FilterState } from "$lib/types";

	let { data } = $props();

	let search = $state("");
	let categories = $state(new Set<Category>());
	let tiers = $state(new Set<Tier>());
	let classes = $state(new Set<TankClass>());
	let nations = $state(new Set<Nation>());

	let filterState: FilterState = $derived({
		search,
		categories,
		tiers,
		classes,
		nations,
	});

	let filtered = $derived(filterSkins(data.skins, filterState));

	function toggle<T>(set: Set<T>, value: T) {
		if (set.has(value)) {
			set.delete(value);
		} else {
			set.add(value);
		}
	}
</script>

<div class="flex max-lg:flex-col">
	<Sidebar
		bind:search
		{categories}
		{tiers}
		{classes}
		{nations}
		ontogglecategory={(c) => toggle(categories, c)}
		ontoggletier={(t) => toggle(tiers, t)}
		ontoggleclass={(c) => toggle(classes, c)}
		ontogglenation={(n) => toggle(nations, n)}
	/>
	<main class="flex flex-wrap justify-between">
		{#each filtered as skin (skin.slug)}
			<SkinCard {skin} />
		{/each}
	</main>
</div>
