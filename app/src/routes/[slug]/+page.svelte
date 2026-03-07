<script lang="ts">
	import { afterNavigate } from "$app/navigation";
	import { resolve } from "$app/paths";
	import { page } from "$app/state";
	import Slideshow from "$lib/components/Slideshow.svelte";

	let { data } = $props();
	let article: HTMLElement;

    // Mostly for mobile, scroll to article (past the sidebar) on page load
	afterNavigate(() => {
		article?.scrollIntoView();
	});

	let title = $derived(data.skin.name ?? data.skin.slug);
	let description = $derived(
		[data.skin.tank, data.skin.description].filter(Boolean).join(" — ") || title,
	);
	let imageUrl = $derived(
		data.skin.images.length > 0
			? `${page.url.origin}/content/${data.skin.slug}/${data.skin.images[0]}`
			: null,
	);

	let formattedDate = $derived(
		data.skin.date
			? new Date(data.skin.date + "T00:00:00").toLocaleDateString("en-US", {
					year: "numeric",
					month: "long",
					day: "numeric",
				})
			: null,
	);
</script>

<svelte:head>
	<title>{title} - chems</title>
	<meta property="og:title" content={title} />
	<meta name="description" content={description} />
	<meta property="og:description" content={description} />
	<meta name="twitter:card" content="summary_large_image" />
	{#if imageUrl}
		<meta property="og:image" content={imageUrl} />
		<meta name="twitter:image" content={imageUrl} />
	{/if}
</svelte:head>

<article bind:this={article} class="flex h-[calc(100dvh-2em)] flex-col gap-4 text-white scroll-mt-[1em]">
	<div class="shrink-0">
		<a
			href={resolve("/")}
			class="selectable inline-flex items-center gap-2 rounded border border-transparent bg-surface px-4 py-2 text-white no-underline"
		>
			<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="shrink-0 opacity-60"><polyline points="15 18 9 12 15 6"></polyline></svg>
			Return
		</a>
	</div>

	<div class="shrink-0 flex gap-4 max-lg:flex-col">
		<div class="min-w-0 flex-1 rounded-lg bg-surface p-4">
			{#if data.skin.name}
				<h1 class="m-0 text-4xl leading-none font-black">{data.skin.name}</h1>
			{/if}
			{#if data.skin.artist}
				<h2 class="m-0 mt-1 text-xl font-semibold opacity-80">by {data.skin.artist}</h2>
			{/if}
			{#if data.skin.description}
				<p class="mt-2">{data.skin.description}</p>
			{/if}
			{#if formattedDate}
				<p class="mt-4 text-sm opacity-50">{formattedDate}</p>
			{/if}
		</div>

		{#if data.skin.downloads.length > 0}
			<div class="flex w-64 shrink-0 flex-col self-start max-lg:w-full rounded-lg bg-surface">
				{#each data.skin.downloads as file, i (file)}
					{#if i > 0}
						<hr class="m-0 border-white/10" />
					{/if}
					<a
						href={resolve(`/content/${data.skin.slug}/${file}`)}
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

	<div class="min-h-0 flex-1">
		<Slideshow slug={data.skin.slug} images={data.skin.images} />
	</div>
</article>
