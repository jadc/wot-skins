<script lang="ts">
	import {
		CATEGORIES,
		TIERS,
		TANK_CLASSES,
		NATIONS,
		categoryIcon,
		tierIcon,
		classIcon,
		nationIcon,
		type Category,
		type Tier,
		type TankClass,
		type Nation,
	} from "$lib/types";

	let {
		search = $bindable(""),
		categories,
		tiers,
		classes,
		nations,
		ontogglecategory,
		ontoggletier,
		ontoggleclass,
		ontogglenation,
	}: {
		search: string;
		categories: Set<Category>;
		tiers: Set<Tier>;
		classes: Set<TankClass>;
		nations: Set<Nation>;
		ontogglecategory: (c: Category) => void;
		ontoggletier: (t: Tier) => void;
		ontoggleclass: (c: TankClass) => void;
		ontogglenation: (n: Nation) => void;
	} = $props();

</script>

{#snippet searchInput()}
	<input
		type="search"
		bind:value={search}
		placeholder="Search by skin name, artist, etc."
		class="w-full rounded border border-transparent bg-[#0d0723] p-4 pl-12 text-white transition-all duration-300"
		style="background-image: url('/icons/search.svg'); background-repeat: no-repeat; background-position: 1em center;"
	/>
{/snippet}

{#snippet filterGroup<T>(title: string, items: T[], selected: Set<T>, ontoggle: (v: T) => void, icon: (v: T) => string, label: (v: T) => string, cols: string)}
	<section class="rounded bg-[#0d0723] p-4 text-white">
		<h2 class="mb-2 mt-0 font-bold">{title}</h2>
		<div class="grid {cols} justify-items-center gap-2">
			{#each items as item (item)}
				<button
					onclick={() => ontoggle(item)}
					class="w-full max-w-[6em] cursor-pointer border bg-[#1c1536] transition-all duration-300 hover:border-white"
					class:border-white={selected.has(item)}
					class:bg-black={selected.has(item)}
					class:border-transparent={!selected.has(item)}
				>
					<img src={icon(item)} alt={label(item)} title={label(item)} class="block w-full" />
				</button>
			{/each}
		</div>
	</section>
{/snippet}

<aside class="sticky top-[1em] flex gap-4 max-h-screen min-w-[20em] basis-[20em] self-start flex-col overflow-y-auto max-lg:static max-lg:max-h-none max-lg:min-w-0 max-lg:basis-auto max-lg:self-stretch">
	{@render searchInput()}

	{@render filterGroup("Category", CATEGORIES, categories, ontogglecategory, categoryIcon, (c) => c, "grid-cols-3")}
	{@render filterGroup("Tier", TIERS, tiers, ontoggletier, tierIcon, (t) => `Tier ${t}`, "grid-cols-5")}
	{@render filterGroup("Class", TANK_CLASSES, classes, ontoggleclass, classIcon, (c) => c, "grid-cols-5")}
	{@render filterGroup("Nation", NATIONS, nations, ontogglenation, nationIcon, (n) => n, "grid-cols-4")}
</aside>
