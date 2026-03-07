<script lang="ts">
	import emblaCarouselSvelte from "embla-carousel-svelte";
	import type { EmblaCarouselType } from "embla-carousel";

	let { slug, images }: { slug: string; images: string[] } = $props();

	let emblaApi: EmblaCarouselType | undefined = $state();
	let selectedIndex = $state(0);

	function onInit(event: CustomEvent<EmblaCarouselType>) {
		emblaApi = event.detail;
		emblaApi.on("select", () => {
			selectedIndex = emblaApi!.selectedScrollSnap();
		});
	}
</script>

{#if images.length > 0}
	<div class="slideshow">
		<div class="overflow-hidden rounded-lg bg-black/30 p-2">
			<div
				class="overflow-hidden rounded"
				use:emblaCarouselSvelte={{ options: { loop: true }, plugins: [] }}
				onemblaInit={onInit}
			>
				<div class="flex touch-pan-y touch-pinch-zoom">
					{#each images as image, i (image)}
						<img
							src="/content/{slug}/{image}"
							alt="Slide {i + 1}"
							class="aspect-video w-full shrink-0 object-contain"
						/>
					{/each}
				</div>
			</div>
		</div>
		<div class="my-3 flex items-center justify-center gap-1">
			<button
				onclick={() => emblaApi?.scrollPrev()}
				class="cursor-pointer border-none bg-transparent p-1 text-white opacity-70 hover:opacity-100"
				aria-label="Previous slide"
			>
				<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
			</button>
			<!-- eslint-disable-next-line @typescript-eslint/no-unused-vars -->
		{#each images as _, i (i)}
				<button
					onclick={() => emblaApi?.scrollTo(i)}
					class="mx-0.5 h-2.5 w-2.5 cursor-pointer rounded-full border-2 border-white/60 p-0 transition-all duration-300"
					class:bg-white={i === selectedIndex}
					class:border-white={i === selectedIndex}
					class:bg-transparent={i !== selectedIndex}
					aria-label="Go to slide {i + 1}"
				></button>
			{/each}
			<button
				onclick={() => emblaApi?.scrollNext()}
				class="cursor-pointer border-none bg-transparent p-1 text-white opacity-70 hover:opacity-100"
				aria-label="Next slide"
			>
				<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 6 15 12 9 18"></polyline></svg>
			</button>
		</div>
	</div>
{/if}
