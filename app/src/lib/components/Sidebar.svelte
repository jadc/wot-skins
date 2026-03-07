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

	let open = $state(false);
</script>

<!-- Mobile sticky search + hamburger -->
<div class="sticky top-0 z-10 flex items-center gap-2 bg-[#110a2a] pb-2 lg:hidden">
	<button
		onclick={() => (open = !open)}
		class="flex-shrink-0 cursor-pointer rounded bg-[#0d0723] p-3 text-white"
		aria-label="Toggle filters"
	>
		<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
			{#if open}
				<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
			{:else}
				<path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
			{/if}
		</svg>
	</button>
	<input
		type="search"
		bind:value={search}
		placeholder="Search by skin name, artist, etc."
		class="w-full rounded border border-transparent bg-[#0d0723] p-4 pl-12 text-white transition-all duration-300"
		style="background-image: url('/icons/search.svg'); background-repeat: no-repeat; background-position: 1em center;"
	/>
</div>

<aside class="sticky top-[1em] flex max-h-screen min-w-[20em] basis-[20em] self-start flex-col overflow-y-auto max-lg:static max-lg:max-h-none max-lg:min-w-0 max-lg:basis-auto max-lg:self-stretch" class:max-lg:hidden={!open}>
	<section class="mb-2 bg-transparent p-0 max-lg:hidden">
		<input
			type="search"
			bind:value={search}
			placeholder="Search by skin name, artist, etc."
			class="mb-4 w-full rounded border border-transparent bg-[#0d0723] p-4 pl-12 text-white transition-all duration-300"
			style="background-image: url('/icons/search.svg'); background-repeat: no-repeat; background-position: 1em center;"
		/>
	</section>

	<section class="mb-2 rounded bg-[#0d0723] p-4 text-white">
		<h2 class="mb-2 mt-0 font-bold">Category</h2>
		<div class="grid grid-cols-3 justify-items-center gap-2">
			{#each CATEGORIES as cat}
				<button
					onclick={() => ontogglecategory(cat)}
					class="w-full max-w-[6em] cursor-pointer rounded border bg-[#1c1536] transition-all duration-300 hover:border-white"
					class:border-white={categories.has(cat)}
					class:bg-black={categories.has(cat)}
					class:border-transparent={!categories.has(cat)}
				>
					<img src={categoryIcon(cat)} alt={cat} title={cat} class="block w-full" />
				</button>
			{/each}
		</div>
	</section>

	<section class="mb-2 rounded bg-[#0d0723] p-4 text-white">
		<h2 class="mb-2 mt-0 font-bold">Tier</h2>
		<div class="grid grid-cols-5 justify-items-center gap-2">
			{#each TIERS as tier}
				<button
					onclick={() => ontoggletier(tier)}
					class="w-full max-w-[6em] cursor-pointer rounded border bg-[#1c1536] transition-all duration-300 hover:border-white"
					class:border-white={tiers.has(tier)}
					class:bg-black={tiers.has(tier)}
					class:border-transparent={!tiers.has(tier)}
				>
					<img src={tierIcon(tier)} alt="Tier {tier}" title={String(tier)} class="block w-full" />
				</button>
			{/each}
		</div>
	</section>

	<section class="mb-2 rounded bg-[#0d0723] p-4 text-white">
		<h2 class="mb-2 mt-0 font-bold">Class</h2>
		<div class="grid grid-cols-5 justify-items-center gap-2">
			{#each TANK_CLASSES as cls}
				<button
					onclick={() => ontoggleclass(cls)}
					class="w-full max-w-[6em] cursor-pointer rounded border bg-[#1c1536] transition-all duration-300 hover:border-white"
					class:border-white={classes.has(cls)}
					class:bg-black={classes.has(cls)}
					class:border-transparent={!classes.has(cls)}
				>
					<img src={classIcon(cls)} alt={cls} title={cls} class="block w-full" />
				</button>
			{/each}
		</div>
	</section>

	<section class="mb-2 rounded bg-[#0d0723] p-4 text-white">
		<h2 class="mb-2 mt-0 font-bold">Nation</h2>
		<div class="grid grid-cols-5 justify-items-center gap-2">
			{#each NATIONS as nation}
				<button
					onclick={() => ontogglenation(nation)}
					class="w-full max-w-[6em] cursor-pointer rounded border bg-[#1c1536] transition-all duration-300 hover:border-white"
					class:border-white={nations.has(nation)}
					class:bg-black={nations.has(nation)}
					class:border-transparent={!nations.has(nation)}
				>
					<img src={nationIcon(nation)} alt={nation} title={nation} class="block w-full" />
				</button>
			{/each}
		</div>
	</section>
</aside>
