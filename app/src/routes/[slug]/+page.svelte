<script lang="ts">
	import Slideshow from "$lib/components/Slideshow.svelte";

	let { data } = $props();
	let skin = $derived(data.skin);

	let formattedDate = $derived(
		skin.date
			? new Date(skin.date + "T00:00:00").toLocaleDateString("en-US", {
					year: "numeric",
					month: "long",
					day: "numeric",
				})
			: null,
	);
</script>

<article class="flex flex-col gap-4 text-white">
	<div>
		<a
			href="/"
			class="selectable inline-flex items-center gap-2 rounded border border-transparent bg-black/30 px-4 py-2 text-white no-underline"
		>
			<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="shrink-0 opacity-60"><polyline points="15 18 9 12 15 6"></polyline></svg>
			Return
		</a>
	</div>

	<div class="flex gap-4 max-lg:flex-col">
		<div class="min-w-0 flex-1 rounded-lg bg-black/30 p-4">
			{#if skin.name}
				<h1 class="m-0 text-4xl leading-none font-black">{skin.name}</h1>
			{/if}
			{#if skin.artist}
				<h2 class="m-0 mt-1 text-xl font-semibold opacity-80">by {skin.artist}</h2>
			{/if}
			{#if skin.description}
				<p class="mt-2">{skin.description}</p>
			{/if}
			{#if formattedDate}
				<p class="mt-4 text-sm opacity-50">{formattedDate}</p>
			{/if}
		</div>

		{#if skin.downloads.length > 0}
			<div class="flex w-64 shrink-0 flex-col self-start max-lg:w-full rounded-lg bg-black/30">
				{#each skin.downloads as file, i}
					{#if i > 0}
						<hr class="m-0 border-white/10" />
					{/if}
					<a
						href="/content/{skin.slug}/{file}"
						download
						class="selectable flex items-center gap-3 border border-transparent px-4 py-3 text-white no-underline"
					>
						<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="shrink-0 opacity-60"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
						<span>{file}</span>
					</a>
				{/each}
			</div>
		{/if}
	</div>

	<Slideshow slug={skin.slug} images={skin.images} />

</article>
