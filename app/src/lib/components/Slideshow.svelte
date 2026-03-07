<script lang="ts">
	import emblaCarouselSvelte from "embla-carousel-svelte";
	import type { EmblaCarouselType } from "embla-carousel";

	let { slug, images }: { slug: string; images: string[] } = $props();

	let emblaApi: EmblaCarouselType | undefined = $state();
	let selectedIndex = $state(0);
	let thumbnails: HTMLButtonElement[] = [];

	function onInit(event: CustomEvent<EmblaCarouselType>) {
		emblaApi = event.detail;
		emblaApi.on("select", () => {
			selectedIndex = emblaApi!.selectedScrollSnap();
			thumbnails[selectedIndex]?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
		});
	}
</script>

{#if images.length > 0}
	<div class="flex h-full flex-col">
		<div class="min-h-0 flex-1 overflow-hidden rounded-lg bg-surface p-2">
			<div
				class="h-full overflow-hidden rounded"
				use:emblaCarouselSvelte={{ options: { loop: true }, plugins: [] }}
				onemblaInit={onInit}
			>
				<div class="flex h-full touch-pan-y touch-pinch-zoom">
					{#each images as image, i (image)}
						<img
							src="/content/{slug}/{image}"
							alt="Slide {i + 1}"
							class="h-full w-full shrink-0 object-contain"
						/>
					{/each}
				</div>
			</div>
		</div>
		<div class="mt-2 shrink-0 flex gap-2 overflow-x-auto">
			{#each images as image, i (image)}
				<button
					bind:this={thumbnails[i]}
					onclick={() => emblaApi?.scrollTo(i)}
					class="shrink-0 cursor-pointer rounded border-2 p-0 transition-all duration-300"
					class:border-white={i === selectedIndex}
					class:opacity-100={i === selectedIndex}
					class:border-transparent={i !== selectedIndex}
					class:opacity-50={i !== selectedIndex}
					aria-label="Go to slide {i + 1}"
				>
					<img
						src="/content/{slug}/{image}"
						alt="Thumbnail {i + 1}"
						class="block h-16 w-28 rounded object-cover"
					/>
				</button>
			{/each}
		</div>
	</div>
{/if}
