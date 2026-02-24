<script lang="ts">
	let { slug, images }: { slug: string; images: string[] } = $props();

	let currentIndex = $state(0);
	let viewEl: HTMLDivElement | undefined = $state();

	function scrollTo(index: number) {
		if (index < 0) index = images.length - 1;
		if (index >= images.length) index = 0;
		currentIndex = index;
		const img = viewEl?.children[index] as HTMLElement | undefined;
		if (img && viewEl) {
			viewEl.scrollTo({
				behavior: "smooth",
				left: img.offsetLeft - viewEl.offsetLeft,
			});
		}
	}

	function onScroll() {
		if (!viewEl) return;
		const scrollLeft = viewEl.scrollLeft;
		const width = viewEl.clientWidth;
		const newIndex = Math.round(scrollLeft / width);
		if (newIndex >= 0 && newIndex < images.length) {
			currentIndex = newIndex;
		}
	}
</script>

{#if images.length > 0}
	<div class="slideshow">
		<div class="my-4 flex items-center justify-center">
			<button
				onclick={() => scrollTo(currentIndex - 1)}
				class="cursor-pointer border-none bg-transparent p-1 text-white"
				aria-label="Previous slide"
			>
				&#129144;
			</button>
			{#each images as _, i}
				<button
					onclick={() => scrollTo(i)}
					class="mx-0.5 h-3 w-3 cursor-pointer rounded-full border-2 border-white p-0 transition-all duration-500"
					class:bg-white={i === currentIndex}
					class:border-transparent={i === currentIndex}
					class:bg-transparent={i !== currentIndex}
					aria-label="Go to slide {i + 1}"
				></button>
			{/each}
			<button
				onclick={() => scrollTo(currentIndex + 1)}
				class="cursor-pointer border-none bg-transparent p-1 text-white"
				aria-label="Next slide"
			>
				&#129146;
			</button>
		</div>
		<div
			bind:this={viewEl}
			onscroll={onScroll}
			class="hide-scrollbar flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain rounded scroll-smooth"
		>
			{#each images as image, i}
				<img
					id="slide-{i}"
					src="/content/{slug}/{image}"
					alt="Slide {i + 1}"
					class="aspect-video w-full shrink-0 snap-start object-contain transition-transform duration-500"
				/>
			{/each}
		</div>
	</div>
{/if}
