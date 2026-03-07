<script lang="ts">
	import type { SkinData } from "$lib/types";

	let { skin }: { skin: SkinData } = $props();

	let summary = $derived([skin.tank, skin.description].filter(Boolean).join(" - "));
</script>

<a
	href="/{skin.slug}"
	class="selectable group relative flex flex-col justify-end overflow-hidden border border-black p-4 text-left text-white no-underline"
	style="aspect-ratio: 4/3;"
>
	{#if skin.images.length > 0}
		<img
			src="/content/{skin.slug}/{skin.images[0]}"
			alt={skin.name ?? skin.slug}
			loading="lazy"
			class="absolute inset-0 h-full w-full object-cover"
		/>
		<div class="absolute inset-0 bg-gradient-to-b from-transparent to-black/50"></div>
	{/if}
	<span class="relative transition-opacity duration-300 group-hover:opacity-10">
		<h1 class="m-0 text-2xl font-bold">{skin.name}</h1>
		<p class="m-0 overflow-hidden text-ellipsis whitespace-nowrap text-base">{summary}</p>
	</span>
</a>
