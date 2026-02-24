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

<aside class="m-4 flex min-w-[20em] basis-[20em] flex-col">
	<section class="mb-2 bg-transparent p-0">
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
