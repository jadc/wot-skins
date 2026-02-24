<script lang="ts">
	import Slideshow from "$lib/components/Slideshow.svelte";
	import DownloadButton from "$lib/components/DownloadButton.svelte";

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

<article class="mx-auto flex w-[70%] flex-col justify-center max-lg:w-full">
	<header class="flex w-full items-center justify-between text-white max-lg:flex-col max-lg:text-center">
		<main class="my-4">
			<a
				href="/"
				class="selectable mb-2 inline-block rounded border border-[#301a81] px-4 py-1 text-white no-underline"
			>
				Return
			</a>
			{#if skin.name}
				<h1 class="m-0 mt-2 text-[5vw] leading-none font-black">{skin.name}</h1>
			{/if}
			{#if skin.artist}
				<h2 class="m-0 text-[2vw] font-semibold max-lg:text-xl">by {skin.artist}</h2>
			{/if}
			{#if skin.category}
				<h3 class="m-0 text-base font-semibold">{skin.category}</h3>
			{/if}
			{#if skin.description}
				<p>{skin.description}</p>
			{/if}
		</main>
		<div class="links max-lg:text-center">
			{#each skin.downloads as file}
				<DownloadButton slug={skin.slug} {file} />
			{/each}
		</div>
	</header>

	<Slideshow slug={skin.slug} images={skin.images} />

	{#if formattedDate}
		<footer class="text-center text-white opacity-50">
			<p>Uploaded on {formattedDate}</p>
		</footer>
	{/if}
</article>
