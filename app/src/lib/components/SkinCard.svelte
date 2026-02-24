<script lang="ts">
	import type { SkinData } from "$lib/types";

	let { skin }: { skin: SkinData } = $props();

	let bgImage = $derived(
		skin.images.length > 0
			? `linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.5)), url('/content/${skin.slug}/${skin.images[0]}')`
			: "none",
	);

	let summary = $derived([skin.tank, skin.description].filter(Boolean).join(" - "));
</script>

<a
	href="/{skin.slug}"
	class="selectable group inline-flex min-w-[25%] flex-1 flex-col justify-end rounded border border-black p-4 text-white no-underline"
	style="aspect-ratio: 4/3; max-height: 20em; background-image: {bgImage}; background-size: cover; background-position: center; background-repeat: no-repeat;"
>
	<span class="transition-opacity duration-300 group-hover:opacity-10">
		<h1 class="m-0 text-2xl font-bold">{skin.name}</h1>
		<p class="m-0 overflow-hidden text-ellipsis whitespace-nowrap text-base">{summary}</p>
	</span>
</a>
